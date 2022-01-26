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
<<<<<<< Updated upstream
exports.addAvatar = exports.getAvatar = exports.helloUser = exports.getUser = void 0;
const User_1 = require("../../models/User");
const UserAvatar_1 = require("../../models/UserAvatar");
const utils_1 = require("../../utils");
function getUser(r) {
    return __awaiter(this, void 0, void 0, function* () {
        return (0, utils_1.output)({ firstName: 'John', });
    });
}
exports.getUser = getUser;
function helloUser(r) {
    return __awaiter(this, void 0, void 0, function* () {
        const users = {
            c42021e3122c43f6a0a4212d7b02e9d1: "John",
            dg3268gd328g326dg23: "Alex",
            jf298fh298d328: "Anon",
        };
        const uid = r.payload.id;
        return (0, utils_1.output)({ message: `Hello, ${users[uid]}!`, });
    });
}
exports.helloUser = helloUser;
const getAvatar = (r) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield User_1.User.findByPk(r.auth.credentials.id, {
            include: {
                model: UserAvatar_1.UserAvatar,
                as: 'avatar',
            },
        });
        const avatarAsBase64 = `data:image/png;base64${user.avatar.image.toString('base64')}`;
        return (0, utils_1.output)({ data: avatarAsBase64, userId: user.id, });
    }
    catch (err) {
        console.log(err);
        throw err;
    }
});
exports.getAvatar = getAvatar;
const addAvatar = (r) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = r.auth.credentials;
        const { avatarImage, } = r.payload;
        const previousAvatar = yield UserAvatar_1.UserAvatar.findOne({ where: { userId: user.id, }, });
        if (previousAvatar) {
            yield previousAvatar.destroy();
        }
        yield (0, utils_1.saveImage)(user.id, avatarImage);
        return (0, utils_1.output)({ message: 'Your avatar has been added!', });
    }
    catch (err) {
        if (err.message == 'This file type is now allowed') {
            return (0, utils_1.error)(400000, 'This file type is now allowed', null);
        }
        console.log(err);
        throw err;
    }
});
exports.addAvatar = addAvatar;
=======
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
>>>>>>> Stashed changes
//# sourceMappingURL=user.js.map