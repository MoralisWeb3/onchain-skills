const https = require("https");
const http = require("http");
const fs = require("fs");
const path = require("path");

// Load configuration
const swaggerConfig = require("./swagger-config.json");
const { addMissingExamples, loadExistingConfigs } = require("./utils/generate-utils.js");

const apiReferenceConfigFile = path.join(__dirname, "../swagger/api-configs.json");

// Command line arguments for selective updates
const args = process.argv.slice(2);
const specificApiKeys = args
    .filter((arg) => arg.startsWith("--api="))
    .map((arg) => arg.split("=")[1]);
const forceFullReplace = args.includes("--force-replace");

let swaggerSchemas;

/**
 * @name fetchJSON
 * @description Fetch JSON from URL using https or http module
 */
const fetchJSON = (url) => {
    return new Promise((resolve, reject) => {
        const client = url.startsWith("https") ? https : http;
        
        client.get(url, (res) => {
            let data = "";
            
            res.on("data", (chunk) => {
                data += chunk;
            });
            
            res.on("end", () => {
                try {
                    resolve(JSON.parse(data));
                } catch (error) {
                    reject(error);
                }
            });
        }).on("error", (error) => {
            reject(error);
        });
    });
};

/**
 * @name translateSchemaReference
 * @description Translate a schema in OAS to its JSON format
 */
const translateSchemaReference = (schemaRef) => {
    if (typeof schemaRef !== "string") {
        console.error("schemaRef must be a string");
        return {};
    }
    const schemaName = schemaRef.replace("#/components/schemas/", "");
    const schemaJSON = swaggerSchemas[schemaName];

    if (!schemaJSON) {
        console.error("Schema " + schemaName + " not found.");
        return {};
    }

    const { type, example, enum: schemaEnum, properties } = schemaJSON ?? {};
    if (type && !properties) {
        return {
            type: type === "integer" ? "number" : type,
            example,
            enum: schemaEnum,
        };
    } else if (properties) {
        return {
            type: "object",
            fields: Object.keys(properties).map((name) => {
                const { type, description, example, items, $ref } = properties[name];
                if (
                    (schemaName === "AbiInput" || schemaName === "AbiOutput") &&
                    name === "components"
                ) {
                    return {
                        name,
                        type: "json",
                    };
                } else if ($ref) {
                    return {
                        name,
                        type,
                        description,
                        ...swaggerSchemas[$ref.replace("#/components/schemas/", "")],
                    };
                } else if (type === "array") {
                    return {
                        name,
                        type,
                        description,
                        example,
                        ...(items && items?.$ref
                            ? { field: translateSchemaReference(items?.$ref) }
                            : { field: items }),
                    };
                } else if (type === "object" && !items) {
                    const nestedProperties = properties[name].properties;
                    let fields = [];

                    if (nestedProperties && typeof nestedProperties === "object") {
                        fields = Object.keys(nestedProperties).map((key) => {
                            return {
                                name: key,
                                ...nestedProperties[key],
                            };
                        });
                    }

                    return {
                        name,
                        type: "object",
                        description,
                        example,
                        fields,
                    };
                } else {
                    return {
                        name,
                        type: type === "integer" ? "number" : type,
                        description,
                        example,
                    };
                }
            }),
        };
    } else {
        return {};
    }
};

const extractSwaggerValueByMethod = (swaggerJSON, path, method) => {
    return {
        ...swaggerJSON.paths?.[path]?.[method],
    };
};

const formatParameters = (parameters) => {
    const queryParams = [];
    const pathParams = [];
    for (const param of parameters) {
        const { name, description, required, schema } = param ?? {};
        const { example, type, $ref, items } = schema ?? {};
        const paramsObject = {
            name,
            description,
            required,
            example,
            ...(type
                ? {
                      type: type === "integer" ? "number" : type,
                      ...(items &&
                          (items?.$ref
                              ? { fields: translateSchemaReference(items?.$ref) }
                              : { field: items })),
                  }
                : translateSchemaReference($ref)),
        };
        switch (param.in) {
            case "query":
                queryParams.push(paramsObject);
                break;
            case "path":
            default:
                pathParams.push(paramsObject);
                break;
        }
    }
    return { pathParams, queryParams };
};

const formatBodyParameters = (requestBody) => {
    if (requestBody) {
        const { required, description, content } = requestBody;
        const { type, items, $ref: schemaRef } = content?.["application/json"]?.schema;

        const bodyParam = {
            required,
            description,
            ...(schemaRef
                ? translateSchemaReference(schemaRef)
                : {
                      type: type === "object" ? "json" : type,
                      ...(items && { field: translateSchemaReference(items?.$ref) }),
                  }),
        };

        if (bodyParam.fields) {
            bodyParam.fields = addMissingExamples(bodyParam.fields);
        }

        return bodyParam;
    }

    return;
};

const formatResponses = (responses) => {
    const formattedResponses = Object.keys(responses).map((status) => {
        const { description, content } = responses[status];
        const schema = content?.["application/json"]?.schema;
        const schemaRef = schema?.$ref;

        if (schemaRef) {
            return {
                status,
                description,
                body: translateSchemaReference(schemaRef),
            };
        } else if (schema?.type === "array" && schema?.items?.$ref) {
            return {
                status,
                description,
                body: {
                    type: "array",
                    field: translateSchemaReference(schema.items.$ref),
                },
            };
        } else if (schema?.properties) {
            return {
                status,
                description,
                body: {
                    type: schema.type || "object",
                    fields: Object.keys(schema.properties).map((name) => {
                        const prop = schema.properties[name];
                        const { type, description, example, items, $ref } = prop;

                        if ($ref) {
                            return {
                                name,
                                type,
                                description,
                                ...swaggerSchemas[$ref.replace("#/components/schemas/", "")],
                            };
                        } else if (type === "array" && items?.properties) {
                            return {
                                name,
                                type,
                                description,
                                field: {
                                    type: items.type || "object",
                                    fields: Object.keys(items.properties).map((itemName) => {
                                        const itemProp = items.properties[itemName];
                                        const fieldType = itemProp.type === "integer" ? "number" : itemProp.type;

                                        if (fieldType === "array" && itemProp.items?.properties) {
                                            return {
                                                name: itemName,
                                                type: fieldType,
                                                description: itemProp.description || itemProp.items?.description,
                                                example: itemProp.example,
                                                field: {
                                                    type: "object",
                                                    fields: Object.keys(itemProp.items.properties).map((nestedItemName) => {
                                                        const nestedProp = itemProp.items.properties[nestedItemName];
                                                        return {
                                                            name: nestedItemName,
                                                            type: nestedProp.type === "integer" ? "number" : nestedProp.type,
                                                            description: nestedProp.description,
                                                            example: nestedProp.example,
                                                        };
                                                    }),
                                                },
                                            };
                                        } else if (fieldType === "array" && itemProp.items?.type && !itemProp.items?.properties && !itemProp.items?.$ref) {
                                            return {
                                                name: itemName,
                                                type: fieldType,
                                                description: itemProp.description || itemProp.items?.description,
                                                example: itemProp.example,
                                            };
                                        } else if (fieldType === "array" && itemProp.items?.type) {
                                            return {
                                                name: itemName,
                                                type: fieldType,
                                                description: itemProp.description || itemProp.items?.description,
                                                example: itemProp.example,
                                            };
                                        } else {
                                            return {
                                                name: itemName,
                                                type: fieldType,
                                                description: itemProp.description,
                                                example: itemProp.example,
                                            };
                                        }
                                    }),
                                },
                            };
                        } else if (type === "array" && items?.$ref) {
                            return {
                                name,
                                type,
                                description,
                                field: translateSchemaReference(items.$ref),
                            };
                        } else {
                            return {
                                name,
                                type: type === "integer" ? "number" : type,
                                description,
                                example,
                            };
                        }
                    }),
                },
            };
        } else {
            return {
                status,
                description,
            };
        }
    });
    return formattedResponses;
};

/**
 * @name formatPath
 * @description Format swagger path to modified path, replacing / with :
 */
const formatPath = (path) => {
    const pathArray = path.split("/");
    const formattedPathArray = pathArray
        .slice(1, pathArray.length)
        .map((p) => p.replace(/[{]/g, ":").replace(/[}]/g, ""));
    return "/" + formattedPathArray.join("/");
};

/**
 * @name formatSwaggerJSON
 * @description Format standard swagger OAS JSON to custom format
 */
const formatSwaggerJSON = (swaggerJSON, apiHost) => {
    const swaggerContent = {};
    for (const path in swaggerJSON.paths) {
        for (const method in swaggerJSON.paths?.[path]) {
            const swaggerValue = extractSwaggerValueByMethod(swaggerJSON, path, method);
            const {
                operationId,
                description,
                summary,
                parameters = [],
                requestBody,
                responses = [],
            } = swaggerValue;
            const codeSamples = swaggerValue?.["x-readme"]?.["code-samples"];

            const { pathParams = [], queryParams = [] } = formatParameters(parameters);
            const formattedBodyParams = formatBodyParameters(requestBody);
            const formattedResponses = formatResponses(responses);
            const formattedPath = formatPath(path);

            swaggerContent[operationId] = {
                apiHost,
                summary,
                description,
                method: method.toUpperCase(),
                path: formattedPath,
                pathParams,
                queryParams,
                bodyParam: formattedBodyParams,
                responses: formattedResponses,
                codeSamples,
            };
        }
    }
    return swaggerContent;
};

/**
 * @name applySwaggerFixes
 * @description Fix known upstream swagger issues that produce incorrect output.
 *   These corrections are applied post-fetch so they survive regeneration.
 */
const applySwaggerFixes = (configs) => {
    const streams = configs.streams;
    if (!streams) return;

    // Fix: Add example values to required 'limit' query params so curl examples include them
    const endpointsNeedingLimitExample = ["GetStreams", "GetAddresses", "GetHistory", "GetLogs"];
    for (const opId of endpointsNeedingLimitExample) {
        const endpoint = streams[opId];
        if (!endpoint) continue;
        const limitParam = (endpoint.queryParams || []).find((p) => p.name === "limit");
        if (limitParam && limitParam.example === undefined) {
            limitParam.example = 100;
        }
    }

    // Fix: UpdateStreamStatus - swagger has "example": {} which becomes [object Object],
    // and includes "error"/"terminated" in enum which are read-only status values
    if (streams.UpdateStreamStatus && streams.UpdateStreamStatus.bodyParam) {
        const statusField = (streams.UpdateStreamStatus.bodyParam.fields || []).find((f) => f.name === "status");
        if (statusField) {
            if (typeof statusField.example === "object") {
                statusField.example = "active";
            }
            if (Array.isArray(statusField.enum)) {
                statusField.enum = ["active", "paused"];
            }
            statusField.description = "The stream status: active (processing blocks) or paused (not processing blocks)";
        }
    }

    // Fix: ReplaceAddressFromStream - swagger description says "removed" instead of "replace"
    if (streams.ReplaceAddressFromStream && streams.ReplaceAddressFromStream.bodyParam) {
        const addressField = (streams.ReplaceAddressFromStream.bodyParam.fields || []).find((f) => f.name === "address");
        if (addressField && addressField.description && addressField.description.includes("removed")) {
            addressField.description = addressField.description.replace("removed", "replace");
        }
    }
};

/**
 * @name generateConfigs
 * @description Generate JSON config from remote swagger files
 */
const generateConfigs = async () => {
    try {
        // Load existing configs to preserve existing data (unless force replace is specified)
        const existingConfigs = forceFullReplace ? {} : loadExistingConfigs(apiReferenceConfigFile);

        // Determine which APIs to process
        const apisToProcess =
            specificApiKeys.length > 0
                ? specificApiKeys.filter((key) => swaggerConfig[key])
                : Object.keys(swaggerConfig);

        if (specificApiKeys.length > 0) {
            console.log("Processing specific APIs: " + apisToProcess.join(", "));
        } else {
            console.log("Processing all APIs: " + apisToProcess.join(", "));
        }

        for (const key of apisToProcess) {
            console.log("Fetching and processing API: " + key);
            try {
                const swaggerJSON = await fetchJSON(swaggerConfig[key].swaggerPath);

                if (!swaggerJSON || !swaggerJSON.paths) {
                    console.error("Invalid swagger JSON for API: " + key);
                    continue;
                }

                // Store Swagger Schema for global usage
                swaggerSchemas = swaggerJSON.components.schemas;

                const apiHost = swaggerJSON.servers?.[0]?.url;
                const swaggerContent = formatSwaggerJSON(swaggerJSON, apiHost);

                // Compare with existing to show what changed
                const existingMethodCount = existingConfigs[key]
                    ? Object.keys(existingConfigs[key]).length
                    : 0;
                const newMethodCount = Object.keys(swaggerContent).length;

                // Update only the specific API group, preserving others
                existingConfigs[key] = swaggerContent;

                console.log("Updated API: " + key);
                console.log("  - Previous methods: " + existingMethodCount);
                console.log("  - New methods: " + newMethodCount);
                console.log("  - Change: " + (newMethodCount > existingMethodCount ? "+" : "") + (newMethodCount - existingMethodCount));
            } catch (error) {
                console.error("Failed to process API: " + key, error.message);
            }
        }

        // Post-process: fix known upstream swagger issues
        applySwaggerFixes(existingConfigs);

        // Write the combined result with pretty formatting
        fs.writeFileSync(
            apiReferenceConfigFile,
            JSON.stringify(existingConfigs, null, 2),
            "utf8"
        );
        const mode = forceFullReplace ? "full replacement" : "incremental update";
        const apiCount = apisToProcess.length;
        console.log("Successfully completed " + mode + " for " + apiCount + " API(s) in configs.json");
        console.log("Config file written to: " + apiReferenceConfigFile);
    } catch (e) {
        console.error(e);
    }
};

// Run the generation
generateConfigs();
