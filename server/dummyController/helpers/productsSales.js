import productsModel from '../../dummyModel/productsModel';

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
  productsModel.map((product, index) => {
    if (Number(product.id) === Number(productId)) {
      if (Number(product.quantity) >= Number(quantity)) {
        productDetail = product;
        newQuantity = Number(product.quantity) - Number(quantity);
        productsModel[index].quantity = newQuantity;
        return true;
      } productDetail = 'The quantity is more than in stock';
    }
  });
  return productDetail;
};

export default productsSales;
