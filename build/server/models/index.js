"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_typescript_1 = require("sequelize-typescript");
const config_1 = require("../config/config");
const User_1 = require("./User");
const Session_1 = require("./Session");
const sequelize = new sequelize_typescript_1.Sequelize(config_1.default.dbLink, {
    dialect: 'postgres',
    models: [User_1.User, Session_1.Session],
});
sequelize.sync();
exports.default = sequelize;
//# sourceMappingURL=index.js.map