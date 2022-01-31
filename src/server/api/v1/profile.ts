import { error, output, } from '../../utils';
import { addProfile, checkProfile} from './storage';
import { Errors } from '../../utils/errors';

export async function createStudent(r) {
    const user_data = r.payload;
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
    const user_data = r.payload;
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
