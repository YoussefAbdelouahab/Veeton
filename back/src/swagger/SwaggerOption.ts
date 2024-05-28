export default function SwaggerOption() {
    const options = {
        definition: {
            openapi: "3.0.0",
            info: {
                title: "Veeton's Chat API",
                version: "1.0.0",
            },
            servers: [
                {
                    url: "http://localhost:8000/api/",
                    description: "Local server",
                },
            ],
            components: {
                schemas: {
                    // Define the Entities
                    Room: {
                        type: "object",
                        properties: {
                            id: { type: "string" },
                            name: { type: "string" },
                            password: { type: "string" },
                            message: {
                                type: "array",
                                items: { $ref: "#/components/schemas/Message" },
                            },
                        },
                    },
                    Message: {
                        type: "object",
                        properties: {
                            id: { type: "string" },
                            user: { type: "string" },
                            content: { type: "string" },
                            room: { type: "object", properties: { id: { type: "string" } } },
                            created_at: { type: "string" },
                            updated_at: { type: "string" },
                        },
                    }
                },
            },
        },
        apis: ["./src/controller/*.ts"], // path to the files where your routes are defined
    };

    return options;
}