"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
exports.default = {
    dbLink: process.env.DB_LINK,
    auth: {
        jwt: {
            access: {
                secret: "secret",
                lifetime: 10000000
            },
            refresh: {
                secret: "secret",
                lifetime: 10000000
            },
        },
    },
    server: {
        port: process.env.SERVER_PORT ? Number(process.env.SERVER_PORT) : 3000,
        host: process.env.SERVER_HOST ? process.env.SERVER_HOST : 'localhost',
        shutdownTimeout: process.env.SERVER_SHUTDOWN_TIMEOUT
            ? Number(process.env.SERVER_SHUTDOWN_TIMEOUT)
            : 15000,
    },
    files: {
        allowedExtensions: /(jpg|png|jpeg)$/,
        maxFilesSize: 1024 * 1024 * 15,
        maxFilesCount: 2,
        maxFileNameLength: 50,
    },
    cors: {
        origins: process.env.CORS_ORIGINS ? JSON.parse(process.env.CORS_ORIGINS) : ['*'],
        methods: process.env.CORS_METHODS
            ? JSON.parse(process.env.CORS_METHODS)
            : ['POST, GET, OPTIONS'],
        headers: process.env.CORS_HEADERS
            ? JSON.parse(process.env.CORS_HEADERS)
            : ['Accept', 'Content-Type', 'Authorization'],
        maxAge: process.env.CORS_MAX_AGE ? Number(process.env.CORS_MAX_AGE) : 600,
        allowCredentials: process.env.CORS_ALLOW_CREDENTIALS
            ? process.env.CORS_ALLOW_CREDENTIALS
            : 'true',
        exposeHeaders: process.env.CORS_EXPOSE_HEADERS
            ? JSON.parse(process.env.CORS_EXPOSE_HEADERS)
            : ['content-type', 'content-length'],
    },
};
//# sourceMappingURL=config.js.map