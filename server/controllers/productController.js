import ProductsModel from '../dummyModel/ProductsModel';

class products {
  static addProduct(req, res) {
    const {
      productName,
      description,
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
}

export default products;
