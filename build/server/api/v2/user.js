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
exports.loginUser = exports.regUser = exports.helloUser = void 0;
const js_sha256_1 = require("js-sha256");
const utils_1 = require("../../utils");
const storage_1 = require("./storage");
const auth_1 = require("../../utils/auth");
const errors_1 = require("../../utils/errors");
function helloUser(r) {
    return __awaiter(this, void 0, void 0, function* () {
        return (0, utils_1.output)({ message: `Hello!`, });
    });
}
exports.helloUser = helloUser;
function regUser(r) {
    return __awaiter(this, void 0, void 0, function* () {
        const uuid = String(require('uuid').v4());
        const user_data = r.payload;
        user_data.password = (0, js_sha256_1.sha256)(r.payload.password);
        user_data["id"] = uuid;
        try {
            yield (0, storage_1.addUser)(user_data);
        }
        catch (er) {
            throw (0, utils_1.error)(errors_1.Errors.RepeatUser, 'This user already exists!', {});
        }
        ;
        return (0, utils_1.output)({ message: `Registrated! UUID - ${uuid}`, });
    });
}
exports.regUser = regUser;
function loginUser(r) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const user_name = r.payload.username;
            const user_password = (0, js_sha256_1.sha256)(r.payload.password);
            const check = yield (0, storage_1.checkUser)(user_name, user_password);
            if (check !== null) {
                return (0, utils_1.output)({ message: (0, auth_1.generateJwt)({ id: check, username: user_name, }), });
            }
            else {
                throw (0, utils_1.error)(errors_1.Errors.SessionNotFound, 'InvalidCredits', {});
            }
        }
        catch (e) {
            console.log(e);
        }
    });
}
exports.loginUser = loginUser;
//# sourceMappingURL=user.js.map