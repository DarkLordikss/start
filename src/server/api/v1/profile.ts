import { error, output, } from '../../utils';
import { addProfile, checkProfile, updateProfile } from './storage';
import { Errors } from '../../utils/errors';
import { decodeJwt } from '../../utils/auth';

export async function createStudent(r) {
    const token = await decodeJwt(r.headers.authorization.replace('Bearer ', ''), process.env.JWT_ACCESS_SECRET);
    const user_data = r.payload;
    user_data["user_id"] = token.id;
    const checkDupliccate = await checkProfile(user_data);
    if (checkDupliccate) {
        user_data["is_teacher"] = 0;
        addProfile(user_data);
        return output({ message: "Profile created!", });
    } else {
        throw error(Errors.RepeatProfile, 'You already have profile in this university!', {});
    }
}

export async function createTeacher(r) {
    const token = await decodeJwt(r.headers.authorization.replace('Bearer ', ''), process.env.JWT_ACCESS_SECRET);
    const user_data = r.payload;
    user_data["user_id"] = token.id;
    const checkDupliccate = await checkProfile(user_data);
    if (checkDupliccate) {
        user_data["is_teacher"] = 1;
        user_data["group"] = null;
        addProfile(user_data);
        return output({ message: "Profile created!", });
    } else {
        throw error(Errors.RepeatProfile, 'You already have profile in this university!', {});
    }
}

export async function editProfile(r) {
    const token = await decodeJwt(r.headers.authorization.replace('Bearer ', ''), process.env.JWT_ACCESS_SECRET);
    const upd_data = r.payload;
    const profile_check = await updateProfile(upd_data, token.id);
    if (profile_check !== false) {
        return output({ message: "Edited!", });
    } else {
        throw error(Errors.NotFound, 'You have no profile in this university!', {})
    }
}
