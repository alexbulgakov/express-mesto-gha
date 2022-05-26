const User = require('../models/user');

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send(users))
    .catch((err) => res.status(500).send({ message: err.message }));
};

module.exports.getUser = (req, res) => {
  User.findById(req.params.userId)
    .then((user) => {
      if (!user) {
        return res.status(404).send({ message: 'Пользователь не найден' });
      }
      return res.send(user);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(400).send({
          message: 'Некорректный id пользователя',
        });
      }
      return res.status(500).send({ message: err.message });
    });
};

module.exports.createUser = (req, res) => {
  const {
    name, about, avatar, email, password,
  } = req.body;

  User.create({
    name, about, avatar, email, password,
  })
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(400).send({
          message: 'Переданы некорректные данные в метод создания пользователя',
        });
      }
      return res.status(500).send({ message: err.message });
    });
};

module.exports.updateProfile = (req, res) => {
  const { name, about } = req.body;

  User.findByIdAndUpdate(req.user._id, { name, about }, { runValidators: true })
    .then((user) => res.send({
      _id: user._id, avatar: user.avatar, name, about,
    }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(400).send({
          message: 'Переданы некорректные данные в метод обновления профиля',
        });
      }
      return res.status(500).send({ message: err.message });
    });
};

module.exports.updateAvatar = (req, res) => {
  const { avatar } = req.body;

  User.findByIdAndUpdate(req.user._id, { avatar }, { runValidators: true })
    .then((user) => res.send({
      _id: user._id, avatar, name: user.name, about: user.about,
    }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(400).send({
          message: 'Переданы некорректные данные в метод обновления аватара',
        });
      }
      return res.status(500).send({ message: err.message });
    });
};
