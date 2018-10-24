import express from 'express';
import UsersController from '../controllers/UsersController';
import ProductsController from '../controllers/ProductsController';
import SalesController from '../controllers/SalesController';
import ParamsChecker from '../middlewares/ParamsChecker';
import UserValidator from '../middlewares/UserValidator';
import ProductValidator from '../middlewares/ProductValidator';
import verifyToken from '../middlewares/VerifyToken';
import VerifyAdmin from '../middlewares/VerifyAdmin';
import VerifyAttendant from '../middlewares/VerifyAttendant';
import SalesValidator from '../middlewares/SalesValidator';

// destructure controllers
const {
  getAllUsers, createUser, loginUser, getUser, updateUser, deleteUser,
} = UsersController;

const {
  addProduct, getProduct, getAllProducts, updateProduct, updateProductCategory, deleteProduct,
} = ProductsController;

const {
  addSaleRecord, getAllSalesRecords, getSaleRecord, getAttendantSaleRecord,
} = SalesController;
// deconstruct middlewares
const { idChecker } = ParamsChecker;
const { createUserChecker, userLoginChecker } = UserValidator;
const { authenticate } = verifyToken;
const { isAdmin } = VerifyAdmin;
const { isAttendant } = VerifyAttendant;
const { addProductValidator } = ProductValidator;
const { addSalesValidator } = SalesValidator;

const router = express.Router();

// user endpoints
router.get('/auth/users', authenticate, isAdmin, getAllUsers);
router.get('/auth/:userId', authenticate, idChecker, getUser);
router.post('/auth/createUser', authenticate, isAdmin, createUserChecker, createUser);
router.put('/auth/:userId', authenticate, isAdmin, idChecker, createUserChecker, updateUser);
router.post('/auth/login', userLoginChecker, loginUser);
router.delete('/auth/:userId', idChecker, authenticate, isAdmin, deleteUser);

// products endpoints
router.post('/products', authenticate, isAdmin, addProductValidator, addProduct);
router.get('/products/:productId', idChecker, authenticate, getProduct);
router.get('/products', authenticate, getAllProducts);
router.put('/products/:productId', idChecker, authenticate, isAdmin, addProductValidator, updateProduct);
router.put('/products/:productId/category', idChecker, authenticate, updateProductCategory);
router.delete('/products/:productId', idChecker, authenticate, isAdmin, deleteProduct);

// sales record enpoints
router.post('/sales', authenticate, isAttendant, addSalesValidator, addSaleRecord);
router.get('/sales', authenticate, isAdmin, getAllSalesRecords);
router.get('/sales/:salesId', idChecker, authenticate, getSaleRecord);
router.get('/user/sales', authenticate, getAttendantSaleRecord);

export default router;
