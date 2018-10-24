'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _ProductsModel = require('../dummyModel/ProductsModel');

var _ProductsModel2 = _interopRequireDefault(_ProductsModel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 *
 * @description Defines the actions to for the products endpoints
 * @class ProductsController
 */
var ProductsController = function () {
  function ProductsController() {
    _classCallCheck(this, ProductsController);
  }

  _createClass(ProductsController, null, [{
    key: 'getAllProducts',

    /**
      *Get all products
      *@description Retrieves all the products from the data source
      *@static
      *@param  {Object} req - request
      *@param  {object} res - response
      *@return {object} - status code, message and all existing products
      *@memberof ProductsController
      */
    value: function getAllProducts(req, res) {
      return res.status(200).json({
        ProductsModel: _ProductsModel2.default,
        message: 'Success',
        error: false
      });
    }
    /**
    *Add product
    *@description Adds a new product
    *@static
    *@param  {Object} req - request
    *@param  {object} res - response
    *@return {object} - status code, message and the added products detail
    *@memberof ProductsController
    */

  }, {
    key: 'addProduct',
    value: function addProduct(req, res) {
      var _req$body = req.body,
          productName = _req$body.productName,
          description = _req$body.description,
          image = _req$body.image,
          prize = _req$body.prize,
          quantity = _req$body.quantity,
          min = _req$body.min,
          category = _req$body.category;

      var id = _ProductsModel2.default.length + 1;
      var productDetail = {
        id: id,
        productName: productName,
        description: description,
        image: image,
        prize: prize,
        quantity: quantity,
        min: min,
        category: category,
        created: new Date()
      };
      _ProductsModel2.default.push(productDetail);
      return res.status(201).json({
        productDetail: productDetail,
        message: 'Successfully added product(s)'
      });
    }
    /**
    *Get product
    *@description Retrieves a product by id
    *@static
    *@param  {Object} req - request
    *@param  {object} res - response
    *@return {object} - status code, message and the retrieved products detail
    *@memberof ProductsController
    */

  }, {
    key: 'getProduct',
    value: function getProduct(req, res) {
      var productId = req.params.productId;

      var found = false;
      var productDetail = void 0;
      _ProductsModel2.default.map(function (product) {
        if (product.id === Number(productId)) {
          productDetail = product;
          found = true;
          return true;
        }
        return false;
      });
      if (found) {
        return res.status(200).json({
          productDetail: productDetail,
          message: 'Success',
          error: false
        });
      }
      return res.status(404).json({
        message: 'This product does not exist',
        error: true
      });
    }

    /**
    *Updates Product
    *@description Update product by ID
    *@static
    *@param  {Object} req - request
    *@param  {object} res - response
    *@return {object} - product detail
    *@memberof ProductsController
    */

  }, {
    key: 'updateProduct',
    value: function updateProduct(req, res) {
      var productId = req.params.productId;
      var _req$body2 = req.body,
          productName = _req$body2.productName,
          description = _req$body2.description,
          image = _req$body2.image,
          prize = _req$body2.prize,
          quantity = _req$body2.quantity,
          min = _req$body2.min,
          category = _req$body2.category;

      var productIndex = void 0;
      var found = false;
      _ProductsModel2.default.map(function (product, index) {
        if (product.id === Number(productId)) {
          productIndex = index;
          found = true;
        }
        return false;
      });
      if (found) {
        var id = _ProductsModel2.default[productIndex].id;

        var productDetail = {
          id: id, productName: productName, description: description, image: image, prize: prize, quantity: quantity, min: min, category: category, created: new Date()
        };
        _ProductsModel2.default[productIndex] = productDetail;
        return res.status(201).json({
          productDetail: productDetail,
          message: 'Successfully updated product'
        });
      }
      return res.status(404).json({
        message: 'Product does not exist'
      });
    }
    /**
    *Updates Product Category
    *@description Update product category by ID
    *@static
    *@param  {Object} req - request
    *@param  {object} res - response
    *@return {object} - message and status code
    *@memberof ProductsController
    */

  }, {
    key: 'updateProductCategory',
    value: function updateProductCategory(req, res) {
      var productId = req.params.productId;
      var category = req.body.category;

      var productIndex = void 0;
      var found = false;
      _ProductsModel2.default.map(function (product, index) {
        if (product.id === Number(productId)) {
          productIndex = index;
          found = true;
        }
        return false;
      });
      if (found) {
        _ProductsModel2.default[productIndex].category = category;
        return res.status(201).json({
          message: 'Successfully updated product category'
        });
      }
      return res.status(404).json({
        message: 'Product does not exist'
      });
    }
    /**
    *Delete product
    *@description Delete a product by id
    *@static
    *@param  {Object} req - request
    *@param  {object} res - response
    *@return {object} - status code and message
    *@memberof ProductsController
    */

  }, {
    key: 'deleteProduct',
    value: function deleteProduct(req, res) {
      var productId = req.params.productId;

      var found = false;
      var productIndex = void 0;
      _ProductsModel2.default.map(function (product, index) {
        if (product.id === Number(productId)) {
          productIndex = index;
          found = true;
          return true;
        }
        return false;
      });
      if (found) {
        _ProductsModel2.default.splice(productIndex, 1);
        return res.status(200).json({
          message: 'Successfully deletes product',
          error: false
        });
      }
      return res.status(404).json({
        message: 'This product does not exist',
        error: true
      });
    }
  }]);

  return ProductsController;
}();

exports.default = ProductsController;