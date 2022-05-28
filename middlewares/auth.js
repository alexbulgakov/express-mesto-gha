const jwt = require('jsonwebtoken');
require('dotenv').config();

const { JWT_SECRET } = process.env;

const handleAuthenticationError = (res) => {
  res.status(401).send({ messsage: 'Требуется авторицация' });
};

module.exports = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return handleAuthenticationError(res);
  }

  let payload;

  try {
    payload = await jwt.verify(authorization, JWT_SECRET);
  } catch (err) {
    return handleAuthenticationError(res);
  }

  req.user = payload;
  return next();
};
