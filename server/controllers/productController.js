import ProductsModel from '../dummyModel/ProductsModel';

class products {
  static getAllProducts(req, res) {
    return (
      res.status(200).json({
        ProductsModel,
        message: 'Success',
        error: false,
      })
    );
  }

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
        productDetail, message: 'Successfully added product(s)',
      })
    );
  }

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
}

export default products;
