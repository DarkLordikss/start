import * as Joi from 'joi';
import { createStudent, createTeacher, editProfile, createMark, editMark, studentAvg,
         facultyAvg } from '../../api/v1/profile';
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
                    group: Joi.string().required(),
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
                    university: Joi.string().required(),
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
        path: '/v1/profile/edit',
        handler: editProfile,
        options: {
            id: 'v1.profile.edit',
            tags: ['api', 'v1', 'user'],
            validate: {
                payload: Joi.object({
                    university: Joi.string().required(),
                    faculty: Joi.string(),
                    group: Joi.string()
                }),
                failAction: (req, h, err) => (err.isJoi
                    ? h.response(err.details[0]).takeover().code(400)
                    : h.response(err).takeover()),
            },
            response: {
                schema: outputOkSchema(
                    Joi.object({
                        message: Joi.string().example('Edited!'),
                    })
                ),
            },
        },
    },
    {
        method: 'POST',
        path: '/v1/profile/teacher/mark/create',
        handler: createMark,
        options: {
            id: 'v1.profile.teacher.mark.create',
            tags: ['api', 'v1', 'user'],
            validate: {
                payload: Joi.object({
                    student_id: Joi.number().required(),
                    grade: Joi.number().required(),
                    lesson: Joi.string().required(),
                }),
                failAction: (req, h, err) => (err.isJoi
                    ? h.response(err.details[0]).takeover().code(400)
                    : h.response(err).takeover()),
            },
            response: {
                schema: outputOkSchema(
                    Joi.object({
                        message: Joi.string().example('Rated!'),
                    })
                ),
            },
        },
    },
    {
        method: 'POST',
        path: '/v1/profile/teacher/mark/edit',
        handler: editMark,
        options: {
            id: 'v1.profile.teacher.mark.edit',
            tags: ['api', 'v1', 'user'],
            validate: {
                payload: Joi.object({
                    grade_id: Joi.number().required(),
                    new_grade: Joi.number().required()
                }),
                failAction: (req, h, err) => (err.isJoi
                    ? h.response(err.details[0]).takeover().code(400)
                    : h.response(err).takeover()),
            },
            response: {
                schema: outputOkSchema(
                    Joi.object({
                        message: Joi.string().example('Edited!'),
                    })
                ),
            },
        },
    },
    {
        method: 'POST',
        path: '/v1/profile/student_avg',
        handler: studentAvg,
        options: {
            id: 'v1.profile.student_avg',
            tags: ['api', 'v1', 'user'],
            validate: {
                payload: Joi.object({
                    student_id: Joi.number().required(),
                }),
                failAction: (req, h, err) => (err.isJoi
                    ? h.response(err.details[0]).takeover().code(400)
                    : h.response(err).takeover()),
            },
            response: {
                schema: outputOkSchema(
                    Joi.object({
                        message: Joi.string().example('Avg - 4.5'),
                    })
                ),
            },
        },
    },
    {
        method: 'POST',
        path: '/v1/profile/teacher/faculty_avg',
        handler: facultyAvg,
        options: {
            id: 'v1.profile.teacher.faculty_avg',
            tags: ['api', 'v1', 'user'],
            validate: {
                payload: Joi.object({
                    university: Joi.string().required(),
                    faculty: Joi.string().required(),
                }),
                failAction: (req, h, err) => (err.isJoi
                    ? h.response(err.details[0]).takeover().code(400)
                    : h.response(err).takeover()),
            },
            response: {
                schema: outputOkSchema(
                    Joi.object({
                        message: Joi.string().example('Avg - 4.5'),
                    })
                ),
            },
        },
    },
];
