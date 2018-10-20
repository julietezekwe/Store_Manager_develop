import SalesModel from '../dummyModel/SalesModel';
import productsSales from './helpers/productSales';

/**
 *
 * @description Defines the actions to for the sales records endpoints
 * @class SalesController
 */
class SalesController {
  /**
  *Add sales record
  *@description Adds a new sale order
  *@static
  *@param  {Object} req - request
  *@param  {object} res - response
  *@return {object} - status code, message and the added sale record detail
  *@memberof SalesController
  */

  static addSaleRecord(req, res) {
    const sellerId = req.authData.id;
    const { productId, productName, prize, quantity } = req.body;
    const productDetail = productsSales(productId, quantity);
    if (productDetail === undefined) {
      return (
        res.status(404).json({ message: 'This product does not exist' })
      );
    }
    if (productDetail === 'The quantity is more than in stock') {
      return (
        res.status(401).json({ message: productDetail })
      );
    }
    const totalPrize = Number(prize) * Number(quantity);
    const id = SalesModel.length + 1;
    const saleDetail = {
      id, sellerId, productId, productName, prize, quantity, totalPrize, created: new Date(),
    };
    SalesModel.push(saleDetail);
    return (
      res.status(201).json({
        saleDetail, message: 'Successfully added sale(s)',
      })
    );
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

  static getAllSalesRecords(req, res) {
    return (
      res.status(200).json({
        SalesModel,
        message: 'Success',
        error: false,
      })
    );
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

  static getSaleRecord(req, res) {
    const { id, role } = req.authData;
    const { salesId } = req.params;
    let validUser = false;
    let saleDetail;
    SalesModel.map((sale) => {
      if (sale.id === Number(salesId) && (sale.sellerId === Number(id) || role === 'admin')) {
        saleDetail = sale;
        validUser = true;
      }
      return false;
    });

    if (validUser) {
      return (
        res.status(200).json({
          saleDetail, message: 'Success', error: false,
        })
      );
    }
    return (
      res.status(401).json({ message: 'Unauthorized', error: true,
      })
    );
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

  static getAttendantSaleRecord(req, res) {
    const { id } = req.authData;
    const saleDetail = [];
    SalesModel.map((sale) => {
      if (sale.sellerId === Number(id)) {
        saleDetail.push(sale);
      }
      return false;
    });

    if (saleDetail.length > 1) {
      return (
        res.status(200).json({
          saleDetail,
          message: 'Success',
          error: false,
        })
      );
    }
    return (
      res.status(404).json({
        message: 'No sales made yet',
        error: true,
      })
    );
  }
}

export default SalesController;
