import express from 'express';
import UsersController from '../controllers/UsersController';
import ProductsController from '../controllers/ProductsController';
import SalesController from '../controllers/SalesController';
import paramsChecker from '../middlewares/paramsChecker';
import userValidator from '../middlewares/userValidator';
import productValidator from '../middlewares/productValidator';
import verifyToken from '../middlewares/verifyToken';
import verifyAdmin from '../middlewares/verifyAdmin';
import verifyAttendant from '../middlewares/verifyAttendant';
import salesValidator from '../middlewares/salesValidator';

// destructure controllers
const {
  getAllUsers, createUser, loginUser, getUser, updateUser, deleteUser,
} = UsersController;

const {
  addProduct, getProduct, getAllProducts, updateProduct, deleteProduct,
} = ProductsController;

const {
  addSaleRecord, getAllSalesRecords, getSaleRecord, getAttendantSaleRecord,
} = SalesController;
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
router.put('/auth/:userId', authenticate, isAdmin, idChecker, createUserChecker, updateUser);
router.post('/auth/login', userLoginChecker, loginUser);
router.delete('/auth/:userId', authenticate, isAdmin, idChecker, deleteUser);

// products endpoints
router.post('/products', authenticate, isAdmin, addProductValidator, addProduct);
router.get('/products/:productId', idChecker, authenticate, getProduct);
router.get('/products', authenticate, getAllProducts);
router.put('/products/:productId', authenticate, isAdmin, addProductValidator, updateProduct);
router.delete('/products/:productId', authenticate, isAdmin, idChecker, deleteProduct);

// sales record enpoints
router.post('/sales', authenticate, isAttendant, addSalesValidator, addSaleRecord);
router.get('/sales', authenticate, isAdmin, getAllSalesRecords);
router.get('/sales/:salesId', idChecker, authenticate, getSaleRecord);
router.get('/user/sales', authenticate, getAttendantSaleRecord);

export default router;
