const uniqueProductChecker = (req, res, next) => {
  const { sales } = req.body;
  const isIdUnique = sales.map(sale => sale.productId)
    .every((value, index, array) => array.lastIndexOf(value) === index);

  if (isIdUnique === false) {
    return res.status(400).json({
      message: 'Product can oly appear once, please increase the quantity',
      error: true,
    });
  }
  return next();
};

export default uniqueProductChecker;
