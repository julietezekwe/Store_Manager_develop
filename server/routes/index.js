import express from 'express';
import UsersController from '../controllers/UsersController';
import ProductsController from '../controllers/ProductsController';
import SalesController from '../controllers/SalesController';
import productsSalesVerify from '../controllers/helpers/productsSalesVerify';
import productCategoryVerify from '../controllers/helpers/productCategoryVerify';
import productUpdate from '../controllers/helpers/productUpdate';
import uniqueProductChecker from '../controllers/helpers/salesproductCheck';
import CategoriesController from '../controllers/CategoriesController';
import ParamsChecker from '../middlewares/ParamsChecker';
import UserValidator from '../middlewares/UserValidator';
import ProductValidator from '../middlewares/ProductValidator';
import VerifyToken from '../middlewares/VerifyToken';
import VerifyAdmin from '../middlewares/VerifyAdmin';
import VerifyAttendant from '../middlewares/VerifyAttendant';
import SalesValidator from '../middlewares/SalesValidator';
import CategoryValidator from '../middlewares/CategoryValidation';

// destructure controllers
const {
  getAllUsers, createUser, loginUser, getUser, updateUser, deleteUser,
} = UsersController;

const {
  addProduct, getProduct, getAllProducts,
  updateProduct, updateProductCategory, deleteProduct, searchProduct,
} = ProductsController;

const {
  addSaleRecord, getAllSalesRecords, getSaleRecord, getAttendantSaleRecord,
} = SalesController;

const {
  getAllCategories, addCategory, getCategory, updateCategory, deleteCategory,
} = CategoriesController;

// deconstruct middlewares
const { idChecker } = ParamsChecker;
const { createUserChecker, userLoginChecker } = UserValidator;
const { authenticate } = VerifyToken;
const { isAdmin } = VerifyAdmin;
const { isAttendant } = VerifyAttendant;
const { addProductValidator, productCategoryValidator } = ProductValidator;
const { addSalesValidator } = SalesValidator;
const { addCategoryValidator } = CategoryValidator;

const router = express.Router();

// user endpoints
router.get('/users', authenticate, isAdmin, getAllUsers);
router.get('/users/:userId', authenticate, idChecker, getUser);
router.post('/auth/createUser', authenticate, isAdmin, createUserChecker, createUser);
router.put('/users/:userId', authenticate, isAdmin, idChecker, createUserChecker, updateUser);
router.post('/auth/login', userLoginChecker, loginUser);
router.delete('/users/:userId', idChecker, authenticate, isAdmin, deleteUser);

// products endpoints
router.post('/products', authenticate, isAdmin, addProductValidator, addProduct);
router.get('/products/:productId', idChecker, authenticate, getProduct);
router.get('/products', authenticate, getAllProducts);
router.put('/products/:productId/category', idChecker, authenticate, productCategoryValidator, productCategoryVerify, updateProductCategory);
router.put('/products/:productId', idChecker, authenticate, isAdmin, addProductValidator, updateProduct);
router.delete('/products/:productId', idChecker, authenticate, isAdmin, deleteProduct);
router.get('/products/:searchString/search', authenticate, searchProduct);

// sales record enpoints
router.post('/sales', authenticate, isAttendant, addSalesValidator, uniqueProductChecker, productsSalesVerify, productUpdate, addSaleRecord);
router.get('/sales', authenticate, isAdmin, getAllSalesRecords);
router.get('/sales/:salesId', idChecker, authenticate, getSaleRecord);
router.get('/user/sales', authenticate, getAttendantSaleRecord);

// category endpoints
router.get('/categories', authenticate, getAllCategories);
router.get('/categories/:categoryId', idChecker, authenticate, getCategory);
router.post('/categories', authenticate, isAdmin, addCategoryValidator, addCategory);
router.put('/categories/:categoryId', idChecker, authenticate, isAdmin, addCategoryValidator, updateCategory);
router.delete('/categories/:categoryId', idChecker, authenticate, isAdmin, deleteCategory);

export default router;
