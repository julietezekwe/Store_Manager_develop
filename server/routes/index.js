import express from 'express';
import Users from '../controllers/userController';
import products from '../controllers/productController';
import paramsChecker from '../middlewares/paramsChecker';
import userValidator from '../middlewares/userValidator';
import productValidator from '../middlewares/productValidator';
import verifyToken from '../middlewares/verifyToken';
import verifyAdmin from '../middlewares/verifyAdmin';

// destructure controllers
const {
  getAllUsers,
  createUser,
  loginUser,
  getUser,
} = Users;

const {
  addProduct,
  getProduct,
} = products;

// deconstruct middlewares
const { idChecker } = paramsChecker;
const { createUserChecker, userLoginChecker } = userValidator;
const { authenticate } = verifyToken;
const { isAdmin } = verifyAdmin;
const { addProductValidator } = productValidator;

const router = express.Router();

// user endpoints
router.get('/auth/users', authenticate, isAdmin, getAllUsers);
router.get('/auth/:userId', authenticate, idChecker, getUser);
router.post('/auth/createUser', authenticate, isAdmin, createUserChecker, createUser);
router.post('/auth/login', userLoginChecker, loginUser);

// products endpoints
router.post('/products', authenticate, isAdmin, addProductValidator, addProduct);
router.get('/products/:productId', idChecker, authenticate, getProduct);

export default router;
