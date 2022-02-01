import * as Joi from 'joi';
import { regUser, loginUser, editUser } from '../../api/v1/user';
import { outputOkSchema, } from '../../schemes';

export default [
  {
    method: 'POST',
    path: '/v1/user/reg',
    handler: regUser,
    options: {
      auth: false,
      id: 'v1.user.reg',
      tags: ['api', 'v1', 'user'],
      validate: {
        payload: Joi.object({
          username: Joi.string().required(),
          password: Joi.string().required(),
          email: Joi.string().required().email(),
          phone: Joi.string().required(),
          dateOfBirth: Joi.string().required(),
          sex: Joi.string().required(),
        }),
        failAction: (req, h, err) => (err.isJoi
          ? h.response(err.details[0]).takeover().code(400)
          : h.response(err).takeover()),
      },
      response: {
        schema: outputOkSchema(
          Joi.object({
            message: Joi.string().example('Registred!'),
          })
        ),
      },
    },
  },
  {
    method: 'POST',
    path: '/v1/user/login',
    handler: loginUser,
    options: {
      auth: false,
      id: 'v1.user.login',
      tags: ['api', 'v1', 'user'],
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
        schema: outputOkSchema(
          Joi.object({
            message: Joi.string().example('Logined!'),
          })
        ),
      },
    },
  },
  {
    method: 'POST',
    path: '/v1/user/edit',
    handler: editUser,
    options: {
      auth: false,
      id: 'v1.user.edit',
      tags: ['api', 'v1', 'user'],
      validate: {
        payload: Joi.object({
          username: Joi.string(),
          password: Joi.string(),
          phone: Joi.string(),
          dateOfBirth: Joi.string(),
          sex: Joi.string(),
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
  }
];
