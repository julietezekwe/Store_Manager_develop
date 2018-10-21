'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ProductsModel = require('../../dummyModel/ProductsModel');

var _ProductsModel2 = _interopRequireDefault(_ProductsModel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
  *Product sales check
  *@description Checks for product availability
  *@param  {Object} productId - request
  *@param  {object} quantity - response
  *@return {object} - product detail
  */
var productsSales = function productsSales(productId, quantity) {
  var productDetail = void 0;
  var newQuantity = void 0;
  _ProductsModel2.default.map(function (product, index) {
    if (Number(product.id) === Number(productId)) {
      if (Number(product.quantity) >= Number(quantity)) {
        productDetail = product;
        newQuantity = Number(product.quantity) - Number(quantity);
        _ProductsModel2.default[index].quantity = newQuantity;
        return true;
      }productDetail = 'The quantity is more than in stock';
    }
  });
  return productDetail;
};

exports.default = productsSales;