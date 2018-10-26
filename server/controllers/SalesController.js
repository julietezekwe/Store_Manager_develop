import pool from '../model/dbConfig';

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
    const { sales } = req.body;
    const { totalPrize } = req;
    let saleDetail;
    const query = {
      text: 'INSERT INTO Sales(sellerId, sales, totalPrize) VALUES($1, $2, $3) RETURNING *',
      values: [sellerId, JSON.stringify(sales), totalPrize],
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
    let SalesModel;
    const query = { text: 'SELECT * FROM Sales' };
    pool.query(query).then((Sales) => {
      SalesModel = Sales.rows;
      return (
        res.status(200).json({
          SalesModel,
          message: 'Success',
          error: false,
        })
      );
    }).catch(/* istanbul ignore next */err => (res.status(500).json(err)));
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
