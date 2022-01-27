"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.init = void 0;
const Hapi = require("@hapi/hapi");
const Nes = require("@hapi/nes");
const Inert = require("@hapi/inert");
const Vision = require("@hapi/vision");
const Pino = require("hapi-pino");
const Basic = require("@hapi/basic");
const HapiCors = require("hapi-cors");
const HapiBearer = require("hapi-auth-bearer-token");
const HapiPulse = require("hapi-pulse");
const Qs = require("qs");
const routes_1 = require("./routes");
const config_1 = require("./config/config");
const utils_1 = require("./utils");
const swagger_1 = require("./config/swagger");
const pino_1 = require("./config/pino");
const auth_1 = require("./utils/auth");
const HapiSwagger = require('hapi-swagger');
const Package = require('../../package.json');
swagger_1.default.info.version = Package.version;
const init = () => __awaiter(void 0, void 0, void 0, function* () {
    const server = yield new Hapi.Server({
        port: config_1.default.server.port,
        host: config_1.default.server.host,
        query: {
            parser: (query) => Qs.parse(query),
        },
        routes: {
            validate: {
                options: {
                    abortEarly: false,
                },
                failAction: utils_1.handleValidationError,
            },
            response: {
                failAction: 'log',
            },
        },
    });
    server.realm.modifiers.route.prefix = '/api';
    yield server.register([
        Basic,
        Nes,
        Inert,
        Vision,
        HapiBearer,
        { plugin: Pino, options: (0, pino_1.pinoConfig)(false), },
        { plugin: HapiSwagger, options: swagger_1.default, },
        {
            plugin: HapiPulse,
            options: {
                timeout: 15000,
                signals: ['SIGINT'],
            },
        },
        {
            plugin: HapiCors,
            options: config_1.default.cors,
        }
    ]);
    server.auth.strategy('jwt-access', 'bearer-access-token', {
        validate: (0, auth_1.tokenValidate)('access'),
    });
    server.auth.strategy('jwt-refresh', 'bearer-access-token', {
        validate: (0, auth_1.tokenValidate)('refresh'),
    });
    server.auth.default('jwt-access');
    server.route(routes_1.default);
    server.ext('onPreResponse', utils_1.responseHandler);
    try {
        yield server.start();
        server.log('info', `Server running at: ${server.info.uri}`);
    }
    catch (err) {
        server.log('error', JSON.stringify(err));
    }
    return server;
});
exports.init = init;
//# sourceMappingURL=index.js.map