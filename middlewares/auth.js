const jwt = require('jsonwebtoken');
require('dotenv').config();

const UnauthorizedError = require('../errors/UnauthorizedError');

const { JWT_SECRET = 'JWT_SECRET' } = process.env;

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    next(new UnauthorizedError('Требуется авторизация'));
  }
  const token = String(req.headers.authorization).replace('Bearer ', '');

  let payload;

  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    return next(new UnauthorizedError('Требуется авторизация'));
  }
  req.user = payload;
  return next();
};
