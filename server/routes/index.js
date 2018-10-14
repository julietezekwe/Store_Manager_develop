import express from 'express';
import Users from '../controllers/userController';
import paramsChecker from '../middlewares/paramsChecker';
import userValidator from '../middlewares/userValidator';
import verifyToken from '../middlewares/verifyToken';

// destructure controllers
const {
  getAllUsers,
  createUser,
  loginUser,
  getUser,
} = Users;

// deconstruct middlewares
const { idChecker } = paramsChecker;
const { createUserChecker, userLoginChecker } = userValidator;
const { authenticate } = verifyToken;

const router = express.Router();

// user endpoints
router.get('/auth/users', getAllUsers);
router.get('/auth/:userId', idChecker, getUser);
router.post('/auth/createUser', authenticate, createUserChecker, createUser);
router.post('/auth/login', userLoginChecker, loginUser);

export default router;
