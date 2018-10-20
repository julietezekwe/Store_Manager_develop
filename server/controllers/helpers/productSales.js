import ProductsModel from '../../dummyModel/ProductsModel';

/**
  *Product sales check
  *@description Checks for product availability
  *@param   productId - request
  *@param   quantity - response
  *@return {object} - product detail
  */
const productsSales = (productId, quantity) => {
  let productDetail;
  let newQuantity;
  ProductsModel.map((product, index) => {
    if (Number(product.id) === Number(productId)) {
      if (Number(product.quantity) >= Number(quantity)) {
        productDetail = product;
        newQuantity = Number(product.quantity) - Number(quantity);
        ProductsModel[index].quantity = newQuantity;
        return true;
      } productDetail = 'The quantity is more than in stock';
    }
  });
  return productDetail;
};

export default productsSales;
