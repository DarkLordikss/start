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
exports.addAvatar = exports.getAvatar = exports.loginUser = exports.regUser = exports.helloUser = exports.getUser = void 0;
const User_1 = require("../../models/User");
const UserAvatar_1 = require("../../models/UserAvatar");
const utils_1 = require("../../utils");
const storage_1 = require("./storage");
const auth_1 = require("../../utils/auth");
const errors_1 = require("../../utils/errors");
function getUser(r) {
    return __awaiter(this, void 0, void 0, function* () {
        return (0, utils_1.output)({ firstName: 'John', });
    });
}
exports.getUser = getUser;
function helloUser(r) {
    return __awaiter(this, void 0, void 0, function* () {
        if (r.payload.id == undefined) {
            throw (0, utils_1.error)(errors_1.Errors.InvalidPayload, 'No id in request!', {});
        }
        else if (storage_1.Users[r.payload.id] == undefined) {
            throw (0, utils_1.error)(errors_1.Errors.InvalidPayload, 'Incorrect id!', {});
        }
        return (0, utils_1.output)({ message: `Hello, ${storage_1.Users[r.payload.id].name}!`, });
    });
}
exports.helloUser = helloUser;
function regUser(r) {
    return __awaiter(this, void 0, void 0, function* () {
        if (r.payload.name == undefined || r.payload.password == undefined) {
            throw (0, utils_1.error)(errors_1.Errors.InvalidPayload, 'No name or password in request!', {});
        }
        const uuid = String(require('uuid').v4());
        const user_name = r.payload.name;
        const user_password = r.payload.password;
        storage_1.Users[uuid] = { name: user_name, password: user_password, id: uuid };
        return (0, utils_1.output)({ message: `Registrated! UUID - ${uuid}`, });
    });
}
exports.regUser = regUser;
function loginUser(r) {
    return __awaiter(this, void 0, void 0, function* () {
        if (r.payload.name == undefined || r.payload.password == undefined) {
            throw (0, utils_1.error)(errors_1.Errors.InvalidPayload, 'No name or password in request!', {});
        }
        const user_name = r.payload.name;
        const user_password = r.payload.password;
        const user_data = { name: user_name, password: user_password };
        var authed = false;
        let authed_key = null;
        for (var key in storage_1.Users) {
            if (storage_1.Users[key].name == user_data.name && storage_1.Users[key].password == user_data.password) {
                authed = true;
                authed_key = key;
                break;
            }
        }
        if (authed == true) {
            storage_1.Session[authed_key] = storage_1.Users[authed_key];
            return (0, utils_1.output)({ message: (0, auth_1.generateJwt)(storage_1.Session[authed_key]) });
        }
        else {
            return (0, utils_1.error)(401003, "Invalid credits!", null);
        }
    });
}
exports.loginUser = loginUser;
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
//# sourceMappingURL=user.js.map