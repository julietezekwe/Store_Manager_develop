'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _userController = require('../controllers/userController');

var _userController2 = _interopRequireDefault(_userController);

var _productController = require('../controllers/productController');

var _productController2 = _interopRequireDefault(_productController);

var _salesController = require('../controllers/salesController');

var _salesController2 = _interopRequireDefault(_salesController);

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
var getAllUsers = _userController2.default.getAllUsers,
    createUser = _userController2.default.createUser,
    loginUser = _userController2.default.loginUser,
    getUser = _userController2.default.getUser;
var addProduct = _productController2.default.addProduct,
    getProduct = _productController2.default.getProduct,
    getAllProducts = _productController2.default.getAllProducts;
var addSaleRecord = _salesController2.default.addSaleRecord,
    getAllSalesRecords = _salesController2.default.getAllSalesRecords,
    getSaleRecord = _salesController2.default.getSaleRecord,
    getAttendantSaleRecord = _salesController2.default.getAttendantSaleRecord;
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
router.post('/auth/login', userLoginChecker, loginUser);

// products endpoints
router.post('/products', authenticate, isAdmin, addProductValidator, addProduct);
router.get('/products/:productId', idChecker, authenticate, getProduct);
router.get('/products', authenticate, getAllProducts);

// sales record enpoints
router.post('/sales', authenticate, isAttendant, addSalesValidator, addSaleRecord);
router.get('/sales', authenticate, isAdmin, getAllSalesRecords);
router.get('/sales/:salesId', idChecker, authenticate, getSaleRecord);
router.get('/user/sales', authenticate, getAttendantSaleRecord);

exports.default = router;