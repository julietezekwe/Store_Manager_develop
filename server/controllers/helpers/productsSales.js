import pool from '../../model/dbConfig';
/**
  *Product sales check
  *@description Checks for product availability
  *@param  {Object} productId - request
  *@param  {object} quantity - response
  *@return {object} - product detail
  */
const productsSales = (req, res, next) => {
  const { productId, quantity } = req.body;
  let newQuantity;
  pool.query({
    text: 'SELECT * FROM Products WHERE id = $1',
    values: [productId],
  }).then((product) => {
    if (product.rowCount > 0) {
      if (product.rows[0].quantity >= Number(quantity)) {
        newQuantity = Number(product.rows[0].quantity) - Number(quantity);
        pool.query({
          text: 'UPDATE Products SET quantity = $1 WHERE id = $2',
          values: [newQuantity, productId],
        });
        return next();
      }
      return (
        res.status(401).json({ message: 'The quantity is more than in stock' })
      );
    }
    return (
      res.status(404).json({ message: 'This product does not exist' })
    );
  });
};

export default productsSales;
