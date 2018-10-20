'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _SalesModel = require('../dummyModel/SalesModel');

var _SalesModel2 = _interopRequireDefault(_SalesModel);

var _productsSales = require('./helpers/productsSales');

var _productsSales2 = _interopRequireDefault(_productsSales);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 *
 * @description Defines the actions to for the sales records endpoints
 * @class SalesController
 */
var SalesController = function () {
  function SalesController() {
    _classCallCheck(this, SalesController);
  }

  _createClass(SalesController, null, [{
    key: 'addSaleRecord',

    /**
    *Add sales record
    *@description Adds a new sale order
    *@static
    *@param  {Object} req - request
    *@param  {object} res - response
    *@return {object} - status code, message and the added sale record detail
    *@memberof SalesController
    */

    value: function addSaleRecord(req, res) {
      var sellerId = req.authData.id;
      var _req$body = req.body,
          productId = _req$body.productId,
          productName = _req$body.productName,
          prize = _req$body.prize,
          quantity = _req$body.quantity;

      var productDetail = (0, _productsSales2.default)(productId, quantity);
      if (productDetail === undefined) {
        return res.status(404).json({ message: 'This product does not exist' });
      }
      if (productDetail === 'The quantity is more than in stock') {
        return res.status(401).json({ message: productDetail });
      }
      var totalPrize = Number(prize) * Number(quantity);
      var id = _SalesModel2.default.length + 1;
      var saleDetail = {
        id: id, sellerId: sellerId, productId: productId, productName: productName, prize: prize, quantity: quantity, totalPrize: totalPrize, created: new Date()
      };
      _SalesModel2.default.push(saleDetail);
      return res.status(201).json({
        saleDetail: saleDetail, message: 'Successfully added sale(s)'
      });
    }
    /**
      *Get all sales records
      *@description Retrieves all the sales from the data source
      *@static
      *@param  {Object} req - request
      *@param  {object} res - response
      *@return {object} - status code, message and all existing sale orders
      *@memberof SalesController
      */

  }, {
    key: 'getAllSalesRecords',
    value: function getAllSalesRecords(req, res) {
      return res.status(200).json({
        SalesModel: _SalesModel2.default,
        message: 'Success',
        error: false
      });
    }
    /**
    *Get a sale record
    *@description Retrieves a sale record by id
    *@static
    *@param  {Object} req - request
    *@param  {object} res - response
    *@return {object} - status code, message and the retrieved sales record detail
    *@memberof SalesController
    */

  }, {
    key: 'getSaleRecord',
    value: function getSaleRecord(req, res) {
      var _req$authData = req.authData,
          id = _req$authData.id,
          role = _req$authData.role;
      var salesId = req.params.salesId;

      var validUser = false;
      var saleDetail = void 0;
      _SalesModel2.default.map(function (sale) {
        if (sale.id === Number(salesId) && (sale.sellerId === Number(id) || role === 'admin')) {
          saleDetail = sale;
          validUser = true;
        }
        return false;
      });

      if (validUser) {
        return res.status(200).json({
          saleDetail: saleDetail, message: 'Success', error: false
        });
      }
      return res.status(401).json({ message: 'Unauthorized', error: true
      });
    }
    /**
    *Get all attendants sales records
    *@description Retrieves sales records
    *@static
    *@param  {Object} req - request
    *@param  {object} res - response
    *@return {object} - status code, message and the retrieved sales records array
    *@memberof SalesController
    */

  }, {
    key: 'getAttendantSaleRecord',
    value: function getAttendantSaleRecord(req, res) {
      var id = req.authData.id;

      var saleDetail = [];
      _SalesModel2.default.map(function (sale) {
        if (sale.sellerId === Number(id)) {
          saleDetail.push(sale);
        }
        return false;
      });

      if (saleDetail.length > 1) {
        return res.status(200).json({
          saleDetail: saleDetail,
          message: 'Success',
          error: false
        });
      }
      return res.status(404).json({
        message: 'No sales made yet',
        error: true
      });
    }
  }]);

  return SalesController;
}();

exports.default = SalesController;