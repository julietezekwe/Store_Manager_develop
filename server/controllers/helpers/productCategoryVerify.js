import pool from '../../model/dbConfig';
/**
  *Product update
  *@description Checks for product availability
  *@param  {Object} product details - request
  *@return {object} - next()
  */
const productCategoryVerify = (req, res, next) => {
  const { categoryName } = req.body;

  pool.query({
    text: 'SELECT * FROM Categories WHERE LOWER(categoryName) = LOWER($1)',
    values: [categoryName],
  }).then((category) => {
    if (category.rowCount) {
      return next();
    }
    return res.status(404).json({ message: 'This category does not exist', error: true });
  }).catch(/* istanbul ignore next */err => (
    res.status(500).json(err)
  ));
};

export default productCategoryVerify;
