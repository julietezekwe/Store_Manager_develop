import salesModel from '../dummyModel/salesModel';
import pool from '../model/dbConfig';
import productsSales from './helpers/productsSales';

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
    console.log(productDetail);
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
    let saleDetail;
    const query = {
      text: 'INSERT INTO Sales(sellerId, productId, productName, prize, quantity, totalPrize) VALUES($1, $2, $3, $4, $5, $6) RETURNING *',
      values: [sellerId, productId, productName, prize, quantity, totalPrize],
    };
    pool.query(query).then((sale) => {
      saleDetail = sale.rows;
      return (
        res.status(201).json({
          saleDetail, message: 'Successfully added sale(s)',
        })
      );
    }).catch(/* istanbul ignore next */err => (res.status(500).json(err)));
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
        salesModel,
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
    let saleDetail;
    let query;
    /* istanbul ignore next */ if (role === 'admin') {
      query = {
        text: 'SELECT * FROM Sales WHERE id = $1',
        values: [salesId],
      };
    } else {
      query = {
        text: 'SELECT * FROM Sales WHERE id = $1 AND sellerId = $2',
        values: [salesId, id],
      };
    }
    pool.query(query).then((sale) => {
      if (sale.rowCount > 0) {
        saleDetail = sale.rows;
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
    }).catch(/* istanbul ignore next */ err => (res.status(500).json(err)));
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
    let saleDetail;
    const query = {
      text: 'SELECT * FROM Sales WHERE sellerId = $1',
      values: [id],
    };
    pool.query(query).then((attendantsSale) => {
      if (attendantsSale.rowCount > 0) {
        saleDetail = attendantsSale.rows;
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
    }).catch(/* istanbul ignore next */err => (res.status(500).json(err)));
  }
}

export default SalesController;
