const jwt = require('jsonwebtoken');
require('dotenv').config();

const UnauthorizedError = require('../errors/UnauthorizedError');

const { JWT_SECRET } = process.env;

const handleAuthenticationError = (next) => {
  next(new UnauthorizedError('Требуется авторицация'));
};

const tokenVerification = (token) => {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (err) {
    return '';
  }
};

module.exports = (req, res, next) => {
  const token = req.cookies.jwt || req.headers.authorization.replace('Bearer ', '');

  if (!token) {
    return handleAuthenticationError(next);
  }

  const payload = tokenVerification(token);

  if (!payload) {
    handleAuthenticationError(next);
  }

  req.user = payload;
  return next();
};
