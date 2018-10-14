import express from 'express';
import Users from '../controllers/userController';
import products from '../controllers/productController';
import sales from '../controllers/salesController';
import paramsChecker from '../middlewares/paramsChecker';
import userValidator from '../middlewares/userValidator';
import productValidator from '../middlewares/productValidator';
import verifyToken from '../middlewares/verifyToken';
import verifyAdmin from '../middlewares/verifyAdmin';
import verifyAttendant from '../middlewares/verifyAttendant';
import salesValidator from '../middlewares/salesValidator';

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
  getAllProducts,
} = products;

const { addSaleRecord, getAllSalesRecords, getSaleRecord } = sales;
// deconstruct middlewares
const { idChecker } = paramsChecker;
const { createUserChecker, userLoginChecker } = userValidator;
const { authenticate } = verifyToken;
const { isAdmin } = verifyAdmin;
const { isAttendant } = verifyAttendant;
const { addProductValidator } = productValidator;
const { addSalesValidator } = salesValidator;

const router = express.Router();

// user endpoints
router.get('/auth/users', authenticate, isAdmin, getAllUsers);
router.get('/auth/:userId', authenticate, idChecker, getUser);
router.post('/auth/createUser', authenticate, isAdmin, createUserChecker, createUser);
router.post('/auth/login', userLoginChecker, loginUser);

// products endpoints
router.post('/products', authenticate, isAdmin, addProductValidator, addProduct);
router.get('/products/:productId', idChecker, authenticate, getProduct);
router.get('/products', authenticate, getAllProducts);

// sales record enpoints
router.post('/sales', authenticate, isAttendant, addSalesValidator, addSaleRecord);
router.get('/sales', authenticate, isAdmin, getAllSalesRecords);
router.get('/sales/:salesId', idChecker, authenticate, getSaleRecord);

export default router;
