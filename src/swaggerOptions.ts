export const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Photo API',
            version: '1.0.0',
            description: 'An simple rest api with image upload',
        },
        servers: [
            {
                url: 'http://localhost:4000',
            },
        ],
    },
    apis: ['./src/routes/*.ts'],
};
