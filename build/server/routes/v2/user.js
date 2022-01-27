"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Joi = require("joi");
const user_1 = require("../../api/v2/user");
const schemes_1 = require("../../schemes");
exports.default = [
    {
        method: 'POST',
        path: '/v2/user/hello',
        handler: user_1.helloUser,
        options: {
            id: 'v2.user.hello',
            tags: ['api', 'v2', 'user'],
            response: {
                schema: (0, schemes_1.outputOkSchema)(Joi.object({
                    message: Joi.string().example('Hello!'),
                })),
            },
        },
    },
    {
        method: 'POST',
        path: '/v2/user/reg',
        handler: user_1.regUser,
        options: {
            auth: false,
            id: 'v2.user.reg',
            tags: ['api', 'v2', 'user'],
            validate: {
                payload: Joi.object({
                    username: Joi.string().required(),
                    password: Joi.string().required(),
                    email: Joi.string().required().email(),
                    phone: Joi.string().required(),
                    dateOfBirth: Joi.required(),
                    sex: Joi.string().required(),
                }),
                failAction: (req, h, err) => (err.isJoi
                    ? h.response(err.details[0]).takeover().code(400)
                    : h.response(err).takeover()),
            },
            response: {
                schema: (0, schemes_1.outputOkSchema)(Joi.object({
                    message: Joi.string().example('Registred!'),
                })),
            },
        },
    },
    {
        method: 'POST',
        path: '/v2/user/login',
        handler: user_1.loginUser,
        options: {
            auth: false,
            id: 'v2.user.login',
            tags: ['api', 'v2', 'user'],
            validate: {
                payload: Joi.object({
                    username: Joi.string().required(),
                    password: Joi.string().required(),
                }),
                failAction: (req, h, err) => (err.isJoi
                    ? h.response(err.details[0]).takeover().code(400)
                    : h.response(err).takeover()),
            },
            response: {
                schema: (0, schemes_1.outputOkSchema)(Joi.object({
                    message: Joi.string().example('Logined!'),
                })),
            },
        },
    }
];
//# sourceMappingURL=user.js.map