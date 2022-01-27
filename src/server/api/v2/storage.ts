import { error } from '../../utils';
import { Errors } from '../../utils/errors';

const { Sequelize, Model, DataTypes } = require('sequelize');
const sequelize = new Sequelize('postgresql://postgres:123123@localhost:5432/postgres');

class User extends Model {}
class Session extends Model {}

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

Session.init(
  {
    uuid: {
      type: DataTypes.STRING,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, { sequelize, modelName: 'session' }
)

export async function addUser(user_data) {
  await sequelize.sync();
  await User.create(user_data);
}

export async function checkSession(username, uuid) {
  const session = await Session.findOne({
    where: {
      username: username,
      uuid: uuid,
    }});
  console.log(session);
  if (session != null) {
    return true;
  } else {
    return false;
  }
}

export async function checkUser(user_name, user_password){
  await sequelize.sync();
  const user = await User.findOne({
    where: {
      username: user_name,
      password: user_password,
    }});
  if (user != null) {
    await Session.create({
      uuid: user.id,
      username: user_name,
    });
    return user.id;
  } else {
    return null;
  }
}
