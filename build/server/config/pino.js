"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pinoConfig = void 0;
const pinoConfig = (prettify) => ({
    prettyPrint: prettify
        ? {
            colorize: true,
            crlf: false,
            jsonPretty: false,
            translateTime: 'yyyy-mm-dd HH:MM:ss',
            ignore: 'pid,hostname,v,tags,data',
            messageFormat: '{data}',
            customPrettifiers: {
                response: { messageFormat: '{req.url} - {req.method} - code:{req.statusCode}', },
            },
        }
        : false,
    serializers: {
        req: function customReqSerializer(req) {
            return {
                method: req.method,
                url: req.url,
                payload: req.payload,
            };
        },
        res: function customResSerializer(res) {
            return {
                code: res.statusCode,
                payload: res.result,
                data: res.data,
            };
        },
    },
    logPayload: true,
    logEvents: ['response', 'request'],
    logQueryParams: true,
    redact: {
        paths: ['payload.password', 'req.headers.authorization', 'payload.avatarImage'],
        censor: '***',
    },
    formatters: {
        level() {
            return {};
        },
        bindings() {
            return {};
        },
        tags() {
            return {};
        },
    },
    timestamp: () => `,"time":"${new Date(Date.now()).toLocaleString()}"`,
});
exports.pinoConfig = pinoConfig;
//# sourceMappingURL=pino.js.map