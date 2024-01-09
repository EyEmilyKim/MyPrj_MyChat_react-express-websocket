const User = require('../Models/user');
const userController = {};

// 유저 등록
userController.registerUser = async (email, pw, un, sid) => {
  // 이미 있는 유저인지 확인
  let user = await User.findOne({ email: email });
  if (!user) {
    // -> 없으면 새로 저장
    user = new User({
      email: email,
      password: pw,
      name: un,
      token: sid,
      online: false,
    });
  } else {
    throw new Error('이미 사용중인 이메일입니다.');
  }
  await user.save();
  return user;
};

// 유저 로그인
userController.loginUser = async (email, pw, sid) => {
  // 이미 있는 유저인지 확인
  let user = await User.findOne({ email: email });
  // -> 있다면 비밀번호 조회 후
  if (user) {
    if (user.password === pw) {
      // -> 일치하면 token값 바꾸고 로그인
      user.token = sid;
      user.online = true;
      await user.save();
      return user;
    } else {
      throw new Error('이메일 또는 비밀번호가 유효하지 않습니다.');
    }
  } else {
    throw new Error('이메일 또는 비밀번호가 유효하지 않습니다.');
  }
};

userController.checkUser = async (sid) => {
  // console.log("checkUser called");
  const user = await User.findOne({ token: sid });
  if (!user) throw new Error('user not found');
  return user;
};

module.exports = userController;
