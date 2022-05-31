const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = statusCode === 500 ? 'Ошибка на сервере' : err.messsage;
  res.status(statusCode).send({ message });
  next();
};

module.exports = errorHandler;
