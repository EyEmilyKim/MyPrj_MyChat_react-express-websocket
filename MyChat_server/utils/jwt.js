const jwt = require('jsonwebtoken');

const generateToken = async (user, type) => {
  let secretKey = '';
  let expiresIn = '';
  if (type === 'AT') {
    secretKey = process.env.ACCESS_SECRET_KEY;
    expiresIn = '1h';
  } else if (type === 'RT') {
    secretKey = process.env.REFRESH_SECRET_KEY;
    expiresIn = '24h';
  }

  const token = jwt.sign(
    {
      id: user._id,
      email: user.email,
    },
    secretKey,
    {
      expiresIn: expiresIn,
      issuer: 'MyChat',
    }
  );
  return token;
};

function verifyToken(token, type) {
  let secretKey = '';
  if (type === 'AT') secretKey = process.env.ACCESS_SECRET_KEY;
  else if (type === 'RT') secretKey = process.env.REFRESH_SECRET_KEY;
  try {
    return jwt.verify(token, secretKey);
  } catch (error) {
    throw new Error('토큰 인증 실패 : ' + error.message);
  }
}

module.exports = {
  generateToken,
  verifyToken,
};
