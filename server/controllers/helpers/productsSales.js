import pool from '../../model/dbConfig';
/**
  *Product sales check
  *@description Checks for product availability
  *@param  {Object} productId - request
  *@param  {object} quantity - response
  *@return {object} - product detail
  */
const productsSales = (req, res, next) => {
  const { sales } = req.body;
  let totalPrize = 0;
  let countSales = 0;
  const count = sales.length;
  sales.map((sale) => {
    const { productId, quantity, prize } = sale;
    let newQuantity;
    pool.query({
      text: 'SELECT * FROM Products WHERE id = $1',
      values: [productId],
    }).then((product) => {
      if (product.rowCount < 1) {
        return (
          res.status(404).json({ message: 'This product does not exist' })
        );
      }
      if (product.rows[0].quantity < Number(quantity)) {
        return (
          res.status(401).json({ message: `${product.rows[0].productname} quantity provided is more than in stock` })
        );
      }
      totalPrize += Number(prize) * Number(quantity);
      newQuantity = Number(product.rows[0].quantity) - Number(quantity);
      countSales += 1;
      pool.query({
        text: 'UPDATE Products SET quantity = $1 WHERE id = $2',
        values: [newQuantity, productId],
      });
      if (countSales === count) {
        req.totalPrize = totalPrize;
        return next();
      }
    });
  });
};

export default productsSales;
