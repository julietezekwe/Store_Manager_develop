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
    const { totalprice } = req;
    let saleId;
    const productCount = sales.length;
    let count = 0;
    const query = {
      text: 'INSERT INTO Sales(sellerId, totalprice) VALUES($1, $2) RETURNING *',
      values: [sellerId, totalprice],
    };
    pool.query(query).then((sale) => {
      saleId = sale.rows[0].id;
      sales.map((product) => {
        pool.query({
          text: 'INSERT INTO product_sales(productId, salesId, quantity) VALUES($1, $2, $3)',
          values: [product.productId, saleId, product.quantity],
        });
        count += 1;
        if (count === productCount) {
          return (
            res.status(201).json({
              message: 'Successfully added sale(s)',
            })
          );
        }
      });
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
    const query = { text: 'SELECT ps.productId, p.productName, p.description,  ps.quantity, p.price, u.name, s.created_at FROM product_sales AS ps JOIN Sales AS s ON s.id = ps.salesId JOIN Users AS u ON u.id = s.sellerId JOIN Products AS p ON ps.productId = p.id' };
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
    pool.query({ text: 'SELECT * FROM Sales WHERE id = $1', values: [salesId] }).then((saleId) => {
      if (!saleId.rowCount) {
        return res.status(404).json({ message: 'This sale does not exist', error: true });
      }
      /* istanbul ignore next */ if (role === 'admin') {
        query = {
          text: 'SELECT ps.productId, p.productName, p.description, ps.quantity, p.price FROM product_sales as ps JOIN Products as p ON ps.productId = p.id WHERE ps.salesId = $1',
          values: [salesId],
        };
      } else {
        query = {
          text: 'SELECT * FROM Sales as s JOIN product_sales as ps ON s.id = ps.salesId WHERE s.id = $1 AND s.sellerId = $2',
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
          res.status(403).json({ message: 'You dont have access to this sale', error: true,
          })
        );
      }).catch(/* istanbul ignore next */ err => (res.status(500).json(err)));
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

  static getAttendantSaleRecord(req, res) {
    const { id } = req.authData;
    let saleDetail;
    const query = {
      text: 'SELECT ps.productId, ps.quantity, p.productName, p.price, s.created_at, ps.salesId FROM product_sales AS ps JOIN Sales as s ON ps.salesId = s.id JOIN Products as p ON p.id = ps.productId WHERE s.sellerId = $1',
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
