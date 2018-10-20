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
  *@description Update product
  *@static
  *@param  {Object} req - request
  *@param  {object} res - response
  *@return {object} - product detail
  *@memberof ProductsController
  */
}

export default ProductsController;
