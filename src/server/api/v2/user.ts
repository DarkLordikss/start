import { User, } from '../../models/User';
import { UserAvatar, } from '../../models/UserAvatar';
import { error, output, saveImage, } from '../../utils';

export async function getUser(r) {
  return output({ firstName: 'John', });
}

export async function helloUser(r) {
  const users = {
    c42021e3122c43f6a0a4212d7b02e9d1: "John",
    dg3268gd328g326dg23: "Alex",
    jf298fh298d328: "Anon",
  };
  const uid = r.payload.id;
  return output({ message: `Hello, ${users[uid]}!`, });
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
