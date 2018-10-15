'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _ProductsModel = require('../dummyModel/ProductsModel');

var _ProductsModel2 = _interopRequireDefault(_ProductsModel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var products = function () {
  function products() {
    _classCallCheck(this, products);
  }

  _createClass(products, null, [{
    key: 'getAllProducts',
    value: function getAllProducts(req, res) {
      return res.status(200).json({
        ProductsModel: _ProductsModel2.default,
        message: 'Success',
        error: false
      });
    }
  }, {
    key: 'addProduct',
    value: function addProduct(req, res) {
      var _req$body = req.body,
          productName = _req$body.productName,
          description = _req$body.description,
          prize = _req$body.prize,
          quantity = _req$body.quantity,
          min = _req$body.min,
          category = _req$body.category;

      var id = _ProductsModel2.default.length + 1;
      var productDetail = {
        id: id,
        productName: productName,
        description: description,
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
  }]);

  return products;
}();

exports.default = products;