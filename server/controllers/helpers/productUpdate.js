import pool from '../../model/dbConfig';
/**
  *Product update
  *@description Checks for product availability
  *@param  {Object} product details - request
  *@return {object} - next()
  */
const productUpdate = (req, res, next) => {
  const { productDetails } = req;

  let countProcess = 0;
  const count = productDetails.length;
  productDetails.map((productDetail) => {
    const { productId, newQuantity } = productDetail;
    pool.query({
      text: 'UPDATE Products SET quantity = $1 WHERE id = $2',
      values: [newQuantity, productId],
    });
    countProcess += 1;
    /* istanbul ignore next */ if (countProcess === count) {
      return next();
    }
  });
};

export default productUpdate;
