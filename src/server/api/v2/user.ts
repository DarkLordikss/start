//import { User, } from '../../models/User';
//import { UserAvatar, } from '../../models/UserAvatar';
import { sha256} from 'js-sha256';
import { error, output, saveImage, } from '../../utils';
import { addUser, checkUser } from './storage';
import { generateJwt } from '../../utils/auth';
import { Errors } from '../../utils/errors';

export async function helloUser(r) {
  return output({ message: `Hello!`, });
}

export async function regUser(r) {
  const uuid = String(require('uuid').v4());
  const user_data = r.payload;
  user_data.password = sha256(r.payload.password);
  user_data["id"] = uuid;
  try {
    await addUser(user_data);
  } catch (er) {
    throw error(Errors.RepeatUser, 'This user already exists!', {});
  };
  return output({ message: `Registrated! UUID - ${uuid}`, });
}

export async function loginUser(r) {
  try {
  const user_name = r.payload.username;
  const user_password = sha256(r.payload.password);
  const check = await checkUser(user_name, user_password);
  if (check !== null) {
    return output({ message: generateJwt({ id: check, username: user_name, }), });
  } else {
    throw error(Errors.SessionNotFound, 'InvalidCredits', {});
  }
} catch (e) {
  console.log(e)
}}


