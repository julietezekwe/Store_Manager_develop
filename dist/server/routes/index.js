'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _UsersController = require('../controllers/UsersController');

var _UsersController2 = _interopRequireDefault(_UsersController);

var _ProductsController = require('../controllers/ProductsController');

var _ProductsController2 = _interopRequireDefault(_ProductsController);

var _SalesController = require('../controllers/SalesController');

var _SalesController2 = _interopRequireDefault(_SalesController);

var _paramsChecker = require('../middlewares/paramsChecker');

var _paramsChecker2 = _interopRequireDefault(_paramsChecker);

var _userValidator = require('../middlewares/userValidator');

var _userValidator2 = _interopRequireDefault(_userValidator);

var _productValidator = require('../middlewares/productValidator');

var _productValidator2 = _interopRequireDefault(_productValidator);

var _verifyToken = require('../middlewares/verifyToken');

var _verifyToken2 = _interopRequireDefault(_verifyToken);

var _verifyAdmin = require('../middlewares/verifyAdmin');

var _verifyAdmin2 = _interopRequireDefault(_verifyAdmin);

var _verifyAttendant = require('../middlewares/verifyAttendant');

var _verifyAttendant2 = _interopRequireDefault(_verifyAttendant);

var _salesValidator = require('../middlewares/salesValidator');

var _salesValidator2 = _interopRequireDefault(_salesValidator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// destructure controllers
var getAllUsers = _UsersController2.default.getAllUsers,
    createUser = _UsersController2.default.createUser,
    loginUser = _UsersController2.default.loginUser,
    getUser = _UsersController2.default.getUser,
    updateUser = _UsersController2.default.updateUser,
    deleteUser = _UsersController2.default.deleteUser;
var addProduct = _ProductsController2.default.addProduct,
    getProduct = _ProductsController2.default.getProduct,
    getAllProducts = _ProductsController2.default.getAllProducts,
    updateProduct = _ProductsController2.default.updateProduct,
    updateProductCategory = _ProductsController2.default.updateProductCategory,
    deleteProduct = _ProductsController2.default.deleteProduct;
var addSaleRecord = _SalesController2.default.addSaleRecord,
    getAllSalesRecords = _SalesController2.default.getAllSalesRecords,
    getSaleRecord = _SalesController2.default.getSaleRecord,
    getAttendantSaleRecord = _SalesController2.default.getAttendantSaleRecord;
// deconstruct middlewares

var idChecker = _paramsChecker2.default.idChecker;
var createUserChecker = _userValidator2.default.createUserChecker,
    userLoginChecker = _userValidator2.default.userLoginChecker;
var authenticate = _verifyToken2.default.authenticate;
var isAdmin = _verifyAdmin2.default.isAdmin;
var isAttendant = _verifyAttendant2.default.isAttendant;
var addProductValidator = _productValidator2.default.addProductValidator;
var addSalesValidator = _salesValidator2.default.addSalesValidator;


var router = _express2.default.Router();

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

exports.default = router;