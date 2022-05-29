const jwt = require('jsonwebtoken');
require('dotenv').config();

const { JWT_SECRET } = process.env;

const handleAuthenticationError = (res) => {
  res.status(401).send({ messsage: 'Требуется авторицация' });
};

module.exports = async (req, res, next) => {
  const cookieAuth = req.cookies.jwt;

  if (!cookieAuth) {
    return handleAuthenticationError(res);
  }

  let payload;

  try {
    payload = await jwt.verify(cookieAuth, JWT_SECRET);
  } catch (err) {
    return handleAuthenticationError(res);
  }

  req.user = payload;
  return next();
};
