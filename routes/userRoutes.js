const express = require('express')

const {
  authUser,
  registerUser,
  getUsers,
  updateUser,
  deleteUser,
  createUser,
  updatePermission
} = require('../controllers/userController')
const { protect, authorize } = require('../middleware/authMiddleware')

const router = express.Router()

router.route('/login').post(authUser)
router.route('/register').post(registerUser)

router.route('/')
  .get(protect, authorize('super_admin'), getUsers)
  .post(protect, authorize('super_admin'), createUser)

router
  .route('/:id')
  .put(protect, authorize('super_admin'), updateUser)
  .delete(protect, authorize('super_admin'), deleteUser)

router.put(
  '/:id/permission',
  protect,
  authorize('super_admin'),
  updatePermission
);
module.exports = router