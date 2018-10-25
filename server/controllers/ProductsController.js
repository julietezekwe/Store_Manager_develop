import productsModel from '../dummyModel/productsModel';
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
      productName,
      description,
      image,
      prize,
      quantity,
      min,
      category,
    } = req.body;
    let productDetail;
    const query = {
      text: 'INSERT INTO Products(productName, description, image, prize, quantity, min, category) VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING *',
      values: [productName, description, image, prize, quantity, min, category],
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
    const { productId } = req.params;
    const {
      productName, description, image, prize, quantity, min, category,
    } = req.body;
    let productIndex;
    let found = false;
    productsModel.map((product, index) => {
      if (product.id === Number(productId)) {
        productIndex = index;
        found = true;
      }
      return false;
    });
    if (found) {
      const { id } = productsModel[productIndex];
      const productDetail = {
        id, productName, description, image, prize, quantity, min, category, created: new Date(),
      };
      productsModel[productIndex] = productDetail;
      return (
        res.status(201).json({
          productDetail,
          message: 'Successfully updated product',
        })
      );
    }
    return (
      res.status(404).json({
        message: 'Product does not exist',
      })
    );
  }

  /**
  *Updates Product Category
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
    const { productId } = req.params;
    const { category } = req.body;
    let productIndex;
    let found = false;
    productsModel.map((product, index) => {
      if (product.id === Number(productId)) {
        productIndex = index;
        found = true;
      }
      return false;
    });
    if (found) {
      productsModel[productIndex].category = category;
      return (
        res.status(201).json({
          message: 'Successfully updated product category',
        })
      );
    }
    return (
      res.status(404).json({
        message: 'Product does not exist',
      })
    );
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
    let found = false;
    let productIndex;
    productsModel.map((product, index) => {
      if (product.id === Number(productId)) {
        productIndex = index;
        found = true;
        return true;
      }
      return false;
    });
    if (found) {
      productsModel.splice(productIndex, 1);
      return (res.status(200).json({
        message: 'Successfully deletes product',
        error: false,
      }));
    }
    return (res.status(404).json({
      message: 'This product does not exist',
      error: true,
    }));
  }
}

export default ProductsController;
