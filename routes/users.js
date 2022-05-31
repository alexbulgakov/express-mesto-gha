const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const auth = require('../middlewares/auth');

const regExp = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/;

const {
  getUser,
  getUserId,
  updateAvatar,
  updateProfile,
  getMe,
} = require('../controllers/users');

router.get('/', auth, getUser);
router.get('/me', auth, getMe);
router.get(
  '/:userId',
  auth,
  celebrate({
    params: Joi.object().keys({
      userId: Joi.string().required().length(24).hex(),
    }),
  }),
  getUserId,
);
router.patch(
  '/me',
  auth,
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().min(2).max(30),
      about: Joi.string().min(2).max(30),
    }),
  }),
  updateProfile,
);
router.patch(
  '/me/avatar',
  celebrate({
    body: Joi.object().keys({
      avatar: Joi.string().required().pattern(regExp),
    }),
  }),
  updateAvatar,
);

module.exports = router;
