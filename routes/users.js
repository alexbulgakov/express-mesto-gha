const router = require('express').Router();
const {
  getUsers,
  createUser,
  getUser,
  updateAvatar,
  updateProfile,
  getMe,
} = require('../controllers/users');

router.get('/', getUsers);
router.get('/me', getMe);
router.get('/:userId', getUser);
router.post('/', createUser);
router.patch('/me', updateProfile);
router.patch('/me/avatar', updateAvatar);

module.exports = router;
