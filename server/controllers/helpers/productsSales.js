import pool from '../../model/dbConfig';
/**
  *Product sales check
  *@description Checks for product availability
  *@param  {Object} productId - request
  *@param  {object} quantity - response
  *@return {object} - product detail
  */
const productsSales = (productId, quantity) => {
  let productDetail;
  let newQuantity;
  pool.query({
    text: 'SELECT * FROM Products WHERE id = $1',
    values: [productId],
  }).then((product) => {
    if (product.rowCount > 0) {
      if (product.rows[0].quantity >= Number(quantity)) {
        productDetail = product.rows[0];
        newQuantity = Number(product.rows[0].quantity) - Number(quantity);
        pool.query({
          text: 'UPDATE Products SET quantity = $1 WHERE id = $2',
          values: [newQuantity, productId],
        });
        return true;
      } productDetail = 'The quantity is more than in stock';
    }
  });
  return productDetail;
};

export default productsSales;
