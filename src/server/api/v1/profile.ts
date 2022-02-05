import { error, output, } from '../../utils';
import { addProfile, checkProfile, updateProfile, addMark,
         checkStudentForTeacher, getStudentIdFromGrade, updateMark,
         checkStudent, getStudentMarks, checkTeacher, getFacultyIds,
         getStudentsMarksAvg, getGroupIds, getStudentId, getLessonMarks } from './storage';
import { Errors } from '../../utils/errors';
import { decodeJwt } from '../../utils/auth';
import { marksAvg, marksList } from '../../utils/avg';

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

export async function createMark(r) {
    const token = await decodeJwt(r.headers.authorization.replace('Bearer ', ''), process.env.JWT_ACCESS_SECRET);
    const data = r.payload;
    const teacher = await checkStudentForTeacher(token.id, data.student_id);
    if (teacher != null) {
        data["teacher_id"] = teacher;
        await addMark(data);
        return output({ message: "Rated!", });
    } else {
        throw error(Errors.AccessDenied, 'Access for this denied!', {})
    }
}

export async function editMark(r) {
    const token = await decodeJwt(r.headers.authorization.replace('Bearer ', ''), process.env.JWT_ACCESS_SECRET);
    const data = r.payload;
    const student_id = await getStudentIdFromGrade(data.grade_id);
    if (student_id != null) {
        const teacher_id = await checkStudentForTeacher(token.id, student_id);
        if (teacher_id != null) {
            const new_grade = await updateMark(data, teacher_id);
            if (new_grade != null) {
                return output({ message: "Edited!", });
            } else {
                throw error(Errors.AccessDenied, 'Access for this denied!', {});
            }
        } else {
            throw error(Errors.AccessDenied, 'Access for this denied!', {});
        }
    } else {
        throw error(Errors.NotFound, 'Grade not found!', {});
    }
}

export async function studentAvg(r) {
    const token = await decodeJwt(r.headers.authorization.replace('Bearer ', ''), process.env.JWT_ACCESS_SECRET);
    const data = r.payload;
    if (await checkStudent(token.id, data.student_id) || await checkStudentForTeacher(token.id, data.student_id) != null) {
        const marks = await getStudentMarks(data.student_id);
        if (marks != null) {
            const avg = await marksAvg(marks);
            return output({ message: `Avg - ${avg.toFixed(2)}`, });
        } else {
            throw error(Errors.NotFound, 'Marks not found!', {});
        }
    } else {
        throw error(Errors.AccessDenied, 'Access for this denied!', {});
    }
}

export async function facultyAvg(r) {
    const token = await decodeJwt(r.headers.authorization.replace('Bearer ', ''), process.env.JWT_ACCESS_SECRET);
    const data = r.payload;
    data["is_teacher"] = true;
    data["user_id"] = token.id;
    if (await checkTeacher(data)) {
        const student_ids = await getFacultyIds(data);
        if (student_ids != null) {
            const avg = await getStudentsMarksAvg(student_ids);
            return output({ message: `Avg - ${avg.toFixed(2)}`, });
        } else {
            throw error(Errors.NotFound, 'Students not found!', {});
        }
    } else {
        throw error(Errors.AccessDenied, 'Access for this denied!', {});
    }
}

export async function groupAvg(r) {
    const token = await decodeJwt(r.headers.authorization.replace('Bearer ', ''), process.env.JWT_ACCESS_SECRET);
    const data = r.payload;
    data["is_teacher"] = true;
    data["user_id"] = token.id;
    if (await checkTeacher(data)) {
        const student_ids = await getFacultyIds(data);
        if (student_ids != null) {
            const avg = await getStudentsMarksAvg(student_ids);
            return output({ message: `Avg - ${avg.toFixed(2)}`, });
        } else {
            throw error(Errors.NotFound, 'Students not found!', {});
        }
    } else {
        throw error(Errors.AccessDenied, 'Access for this denied!', {});
    }
}

export async function lessonAvg(r) {
    const token = await decodeJwt(r.headers.authorization.replace('Bearer ', ''), process.env.JWT_ACCESS_SECRET);
    const data = r.payload;
    data["user_id"] = token.id;
    const student_id = await getStudentId(data);
    if (student_id != null) {
        data["student_id"] = student_id;
        const marks = await getLessonMarks(data);
        if (marks.length != 0) {
            const avg = await marksAvg(marks);
            return output({ message: `Avg - ${avg.toFixed(2)}`, });
        } else {
            throw error(Errors.NotFound, 'Marks not found!', {});
        }
    } else {
        throw error(Errors.NotFound, 'Student not found!', {});
    }
}

export async function lessonMarks(r) {
    const token = await decodeJwt(r.headers.authorization.replace('Bearer ', ''), process.env.JWT_ACCESS_SECRET);
    const data = r.payload;
    data["user_id"] = token.id;
    const student_id = await getStudentId(data);
    if (student_id != null) {
        data["student_id"] = student_id;
        const marks = await getLessonMarks(data);
        if (marks.length != 0) {
            return output({ message: await marksList(marks), });
        } else {
            throw error(Errors.NotFound, 'Marks not found!', {});
        }
    } else {
        throw error(Errors.NotFound, 'Student not found!', {});
    }
}
