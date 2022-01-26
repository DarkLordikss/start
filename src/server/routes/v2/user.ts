import * as Joi from 'joi';
<<<<<<< Updated upstream
import { addAvatar, getAvatar, getUser, helloUser } from '../../api/v2/user';
=======
import { helloUser, regUser, loginUser } from '../../api/v2/user';
>>>>>>> Stashed changes
import config from '../../config/config';
import { outputOkSchema, } from '../../schemes';

export default [
  {
    method: 'POST',
    path: '/v2/user/hello',
    handler: helloUser,
    options: {
      id: 'v2.user.hello',
      tags: ['api', 'v2', 'user'],
      response: {
        schema: outputOkSchema(
          Joi.object({
            message: Joi.string().example('Hello!'),
          })
        ),
      },
    },
  },
<<<<<<< Updated upstream
=======
  {
    method: 'POST',
    path: '/v2/user/reg',
    handler: regUser,
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
    path: '/v2/user/login',
    handler: loginUser,
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
        schema: outputOkSchema(
          Joi.object({
            message: Joi.string().example('Logined!'),
          })
        ),
      },
    },
  }
>>>>>>> Stashed changes
];
