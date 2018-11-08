import pool from '../model/dbConfig';
/**
 *
 * @description Defines the actions to for the products endpoints
 * @class ProductsController
 */
class ProductsController {
  /**
    *Get all products
    *@description Retrieves all the products from the data source
    *@static
    *@param  {Object} req - request
    *@param  {object} res - response
    *@return {object} - status code, message and all existing products
    *@memberof ProductsController
    */
  static getAllProducts(req, res) {
    if (req.params.categoryName !== 'All') {
      const { categoryName } = req.params;
      let ProductsModel;
      const query = { text: 'SELECT * FROM Products WHERE LOWER(category) = LOWER($1)', values: [categoryName] };
      pool.query(query).then((Products) => {
        ProductsModel = Products.rows;
        return (
          res.status(200).json({
            ProductsModel,
            message: 'Success',
            error: false,
          })
        );
      }).catch(/* istanbul ignore next */err => (res.status(500).json(err)));
    } else {
      let ProductsModel;
      const query = { text: 'SELECT * FROM Products' };
      pool.query(query).then((Products) => {
        ProductsModel = Products.rows;
        return (
          res.status(200).json({
            ProductsModel,
            message: 'Success',
            error: false,
          })
        );
      }).catch(/* istanbul ignore next */err => (res.status(500).json(err)));
    }
  }
  /**
  *Add product
  *@description Adds a new product
  *@static
  *@param  {Object} req - request
  *@param  {object} res - response
  *@return {object} - status code, message and the added products detail
  *@memberof ProductsController
  */

  static addProduct(req, res) {
    const {
      productName, description, image, price, quantity, min,
    } = req.body;
    let productDetail;
    pool.query({
      text: 'SELECT productName FROM Products WHERE LOWER(productName) = LOWER($1)',
      values: [productName],
    }).then((found) => {
      if (found.rowCount) {
        return res.status(409).json({ message: 'This product already exist, kindly update', error: true });
      }
      const query = {
        text: 'INSERT INTO Products(productName, description, image, price, quantity, min) VALUES($1, $2, $3, $4, $5, $6) RETURNING *',
        values: [productName, description, image, price, quantity, min],
      };
      pool.query(query).then((product) => {
        productDetail = product.rows;
        return (
          res.status(201).json({
            productDetail,
            message: 'Successfully added product(s)',
          })
        );
      }).catch(/* istanbul ignore next */err => (
        res.status(500).json({
          err,
        })
      ));
    }).catch(/* istanbul ignore next */err => (
      res.status(500).json({
        err,
      })
    ));
  }
  /**
  *Get product
  *@description Retrieves a product by id
  *@static
  *@param  {Object} req - request
  *@param  {object} res - response
  *@return {object} - status code, message and the retrieved products detail
  *@memberof ProductsController
  */

  static getProduct(req, res) {
    const { productId } = req.params;
    const query = {
      text: 'SELECT * FROM Products WHERE id = $1',
      values: [productId],
    };
    let productDetail;
    pool.query(query).then((product) => {
      if (product.rowCount > 0) {
        productDetail = product.rows;
        return (res.status(200).json({
          productDetail,
          message: 'Success',
          error: false,
        }));
      }
      return (res.status(404).json({
        message: 'This product does not exist',
        error: true,
      }));
    }).catch(/* istanbul ignore next */err => (res.status(500).json(err)));
  }
  /**
  *Updates Product
  *@description Update product by ID
  *@static
  *@param  {Object} req - request
  *@param  {object} res - response
  *@return {object} - product detail
  *@memberof ProductsController
  */

  static updateProduct(req, res) {
    const { productName, description, image, price, quantity, min } = req.body;
    const { productId } = req.params;
    let productDetail;

    pool.query({ text: 'SELECT id from Products where id = $1', values: [productId] })
      .then((found) => {
        if (found.rowCount) {
          pool.query({
            text: 'SELECT productName FROM Products WHERE LOWER(productName) = LOWER($1)',
            values: [productName],
          }).then((foundOne) => {
            if (foundOne.rowCount) {
              return res.status(409).json({ message: 'This product already exist, kindly update', error: true });
            }
            const query = {
              text: 'UPDATE Products SET productName = $1, description = $2, image = $3, price = $4, quantity = $5, min = $6 WHERE id = $7 RETURNING *',
              values: [productName, description, image, price, quantity, min, productId],
            };
            pool.query(query).then((product) => {
              productDetail = product.rows[0];
              return res.status(200).json({ productDetail, message: 'Successfully updated product', error: false });
            });
          });
        } else {
          return res.status(404).json({ message: 'Product does not exist', error: true });
        }
      }).catch(/* istanbul ignore next */err => (
        res.status(500).json(err)
      ));
  }

  /**
  *Search Product
  *@description Search product category by string
  *@static
  *@param  {Object} req - request
  *@param  {object} res - response
  *@return {object} - message and status code
  *@memberof ProductsController
  */
  static searchProduct(req, res) {
    const { searchString } = req.params;
    const query = {
      text: 'SELECT * FROM Products WHERE productName ILIKE $1',
      values: [`%${searchString}%`],
    };
    pool.query(query)
      .then((product) => {
        if (product.rowCount > 0) {
          return (
            res.status(200).json({
              product: product.rows,
              message: 'Success',
            })
          );
        }
        return res.status(404).json({
          error: true,
          message: 'no products found',
        });
      }).catch(/* istanbul ignore next */err => res.status(500).json(err));
  }

  /**
  *Updates Product Category
  *@description Update product category by ID
  *@static
  *@param  {Object} req - request
  *@param  {object} res - response
  *@return {object} - message and status code
  *@memberof ProductsController
  */
  static updateProductCategory(req, res) {
    const { categoryName } = req.body;
    const { productId } = req.params;
    let productDetail;
    pool.query({ text: 'SELECT id from Products where id = $1', values: [productId] })
      .then((found) => {
        if (found.rowCount === 1) {
          const query = {
            text: 'UPDATE Products SET category = $1 WHERE id = $2 RETURNING *',
            values: [categoryName, productId],
          };
          pool.query(query).then((product) => {
            productDetail = product.rows[0];
            return res.status(200).json({ productDetail, message: 'Successfully updated product category' });
          });
        } else {
          return res.status(404).json({ message: 'Product does not exist', error: true });
        }
      }).catch(/* istanbul ignore next */err => (
        res.status(500).json(err)
      ));
  }
  /**
*Delete product
*@description Delete a product by id
*@static
*@param  {Object} req - request
*@param  {object} res - response
*@return {object} - status code and message
*@memberof ProductsController
*/

  static deleteProduct(req, res) {
    const { productId } = req.params;
    const query = {
      text: 'DELETE FROM Products Where id = $1',
      values: [productId],
    };
    pool.query(query).then((product) => {
      const { rowCount } = product;
      if (rowCount > 0) {
        return (
          res.status(200).json({
            message: 'Successfully deletes product',
            error: false,
          })
        );
      }
      return (
        res.status(404).json({
          message: 'This product does not exist',
          error: true,
        })
      );
    }).catch(/* istanbul ignore next */err => (res.status(500).json(err)));
  }
}

export default ProductsController;
