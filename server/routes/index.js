import express from 'express';
import Users from '../controllers/userController';

// destructure controllers
const {
  getAllUsers,
  createUser,
  loginUser,
  getUser,
} = Users;

const router = express.Router();

// user endpoints
router.get('/auth/users', getAllUsers);
router.get('/auth/:userId', getUser);
router.post('/auth/createUser', createUser);
router.post('/auth/login', loginUser);

export default router;
