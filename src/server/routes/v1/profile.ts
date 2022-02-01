import * as Joi from 'joi';
import { createStudent, createTeacher } from '../../api/v1/profile';
import { outputOkSchema, } from '../../schemes';

export default [
    {
        method: 'POST',
        path: '/v1/profile/create/student',
        handler: createStudent,
        options: {
            id: 'v1.profile.create.student',
            tags: ['api', 'v1', 'user'],
            validate: {
                payload: Joi.object({
                    faculty: Joi.string().required(),
                    university: Joi.string().required(),
                    group: Joi.string().required()
                }),
                failAction: (req, h, err) => (err.isJoi
                    ? h.response(err.details[0]).takeover().code(400)
                    : h.response(err).takeover()),
            },
            response: {
                schema: outputOkSchema(
                    Joi.object({
                        message: Joi.string().example('Created!'),
                    })
                ),
            },
        },
    },
    {
        method: 'POST',
        path: '/v1/profile/create/teacher',
        handler: createTeacher,
        options: {
            id: 'v1.profile.create.teacher',
            tags: ['api', 'v1', 'user'],
            validate: {
                payload: Joi.object({
                    faculty: Joi.string().required(),
                    university: Joi.string().required()
                }),
                failAction: (req, h, err) => (err.isJoi
                    ? h.response(err.details[0]).takeover().code(400)
                    : h.response(err).takeover()),
            },
            response: {
                schema: outputOkSchema(
                    Joi.object({
                        message: Joi.string().example('Created!'),
                    })
                ),
            },
        },
    },
];
