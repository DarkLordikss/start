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
exports.checkUser = exports.checkSession = exports.addUser = void 0;
const { Sequelize, Model, DataTypes } = require('sequelize');
const sequelize = new Sequelize('postgresql://postgres:123123@localhost:5432/postgres');
class User extends Model {
}
class Session extends Model {
}
User.init({
    id: {
        type: DataTypes.STRING,
        primaryKey: true,
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: false,
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: false,
    },
    dateOfBirth: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: false,
    },
    sex: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: false,
    },
}, { sequelize, modelName: 'user' });
Session.init({
    uuid: {
        type: DataTypes.STRING,
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, { sequelize, modelName: 'session' });
function addUser(user_data) {
    return __awaiter(this, void 0, void 0, function* () {
        yield sequelize.sync();
        yield User.create(user_data);
    });
}
exports.addUser = addUser;
function checkSession(username, uuid) {
    return __awaiter(this, void 0, void 0, function* () {
        const session = yield Session.findOne({
            where: {
                username: username,
                uuid: uuid,
            }
        });
        console.log(session);
        if (session != null) {
            return true;
        }
        else {
            return false;
        }
    });
}
exports.checkSession = checkSession;
function checkUser(user_name, user_password) {
    return __awaiter(this, void 0, void 0, function* () {
        yield sequelize.sync();
        const user = yield User.findOne({
            where: {
                username: user_name,
                password: user_password,
            }
        });
        if (user != null) {
            yield Session.create({
                uuid: user.id,
                username: user_name,
            });
            return user.id;
        }
        else {
            return null;
        }
    });
}
exports.checkUser = checkUser;
//# sourceMappingURL=storage.js.map