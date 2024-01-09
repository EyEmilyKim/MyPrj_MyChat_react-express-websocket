const bcrypt = require('bcrypt');

module.exports = function hash(pw) {
  console.log('hashing :', pw);
  const password = pw;
  const saltRounds = 10;

  bcrypt.hash(password, saltRounds, async (err, hash) => {
    try {
      const hashedPassword = hash;
      console.log('hashed :', hashedPassword);
      return hashedPassword;
    } catch (error) {
      console.log('해싱 저장 중 에러 발생');
      return;
    }
  });
};
