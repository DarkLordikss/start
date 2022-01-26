import { User, } from '../../models/User';
import { UserAvatar, } from '../../models/UserAvatar';
import { error, output, saveImage, } from '../../utils';
import { Users, Session } from './storage';
import { decodeJwt, generateJwt } from '../../utils/auth';
import { Errors } from '../../utils/errors';

export async function getUser(r) {
  return output({ firstName: 'John', });
}

export async function helloUser(r) {
  if (r.payload.id == undefined) {
    throw error(Errors.InvalidPayload, 'No id in request!', {});
  } else if (Users[r.payload.id] == undefined) {
    throw error(Errors.InvalidPayload, 'Incorrect id!', {});
  }
  return output({ message: `Hello, ${Users[r.payload.id].name}!`, });
}

export async function regUser(r) {
  if (r.payload.name == undefined || r.payload.password == undefined) {
    throw error(Errors.InvalidPayload, 'No name or password in request!', {});
  }
  const uuid = String(require('uuid').v4());
  const user_name = r.payload.name;
  const user_password = r.payload.password;
  Users[uuid] = {name: user_name, password: user_password, id: uuid};
  return output({ message: `Registrated! UUID - ${uuid}`, });
}

export async function loginUser(r) {
  if (r.payload.name == undefined || r.payload.password == undefined) {
    throw error(Errors.InvalidPayload, 'No name or password in request!', {});
  }
  const user_name = r.payload.name;
  const user_password = r.payload.password;
  const user_data = {name: user_name, password: user_password};
  var authed = false;
  let authed_key = null;

  for (var key in Users) {
    if (Users[key].name == user_data.name && Users[key].password == user_data.password) {
      authed = true;
      authed_key = key;
      break;
    }
  }

  if (authed == true) {
    Session[authed_key] = Users[authed_key];
    return output({ message: generateJwt( Session[authed_key], ) });
  } else {
    return error(401003, "Invalid credits!", null);
  }
}

export const getAvatar = async (r) => {
  try {
    const user: User = await User.findByPk(r.auth.credentials.id, {
      include: {
        model: UserAvatar,
        as: 'avatar',
      },
    });
    const avatarAsBase64 = `data:image/png;base64${user.avatar.image.toString('base64')}`;
    return output({ data: avatarAsBase64, userId: user.id, });
  }
  catch (err) {
    console.log(err);
    throw err;
  }
};

export const addAvatar = async (r) => {
  try {
    const user: User = r.auth.credentials;

    // this is basic example code, you may do with received file whatever you want
    const { avatarImage, } = r.payload;
    const previousAvatar = await UserAvatar.findOne({ where: { userId: user.id, }, });
    if (previousAvatar) {
      await previousAvatar.destroy();
    }

    await saveImage(user.id, avatarImage);

    return output({ message: 'Your avatar has been added!', });
  }
  catch (err) {
    if (err.message == 'This file type is now allowed') {
      return error(400000, 'This file type is now allowed', null);
    }

    console.log(err);
    throw err;
  }
};
