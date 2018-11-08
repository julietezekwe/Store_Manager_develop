import pool from '../../model/dbConfig';
/**
  *Product sales check
  *@description Checks for product availability
  *@param  {Object} productId - request
  *@param  {object} quantity - request
  *@return {object} - productdetail totalprice next()
  */
const productsSalesVerify = (req, res, next) => {
  const { sales } = req.body;
  let totalprice = 0;
  let countSales = 0;
  const productDetails = [];
  const count = sales.length;
  sales.map((sale) => {
    const { productId, quantity } = sale;
    let newQuantity;
    pool.query({
      text: 'SELECT * FROM Products WHERE id = $1',
      values: [productId],
    }).then((product) => {
      if (product.rowCount < 1) {
        return (
          res.status(404).json({ message: 'This product does not exist', error: true })
        );
      }
      if (product.rows[0].quantity < Number(quantity)) {
        return (
          res.status(403).json({ message: `${product.rows[0].productname} quantity provided is more than in stock`, error: true })
        );
      }
      totalprice += Number(product.rows[0].price) * Number(quantity);
      newQuantity = Number(product.rows[0].quantity) - Number(quantity);
      productDetails.push({ productId, newQuantity });

      countSales += 1;
      /* istanbul ignore next */if (countSales === count) {
        req.totalprice = totalprice;
        req.productDetails = productDetails;
        return next();
      }
    });
  });
};

export default productsSalesVerify;
