import ProductsModel from '../dummyModel/ProductsModel';
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
    return (
      res.status(200).json({
        ProductsModel,
        message: 'Success',
        error: false,
      })
    );
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
    const id = ProductsModel.length + 1;
    const productDetail = {
      id,
      productName,
      description,
      image,
      prize,
      quantity,
      min,
      category,
      created: new Date(),
    };
    ProductsModel.push(productDetail);
    return (
      res.status(201).json({
        productDetail,
        message: 'Successfully added product(s)',
      })
    );
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
    let found = false;
    let productDetail;
    ProductsModel.map((product) => {
      if (product.id === Number(productId)) {
        productDetail = product;
        found = true;
        return true;
      }
      return false;
    });
    if (found) {
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
    ProductsModel.map((product, index) => {
      if (product.id === Number(productId)) {
        productIndex = index;
        found = true;
      }
      return false;
    });
    if (found) {
      const { id } = ProductsModel[productIndex];
      const productDetail = {
        id, productName, description, image, prize, quantity, min, category, created: new Date(),
      };
      ProductsModel[productDetail] = productDetail;
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
    ProductsModel.map((product, index) => {
      if (product.id === Number(productId)) {
        productIndex = index;
        found = true;
        return true;
      }
      return false;
    });
    if (found) {
      ProductsModel.splice(productIndex, 1);
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
