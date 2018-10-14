import SalesModel from '../dummyModel/SalesModel';

class sales {
  static addSaleRecord(req, res) {
    const sellerId = req.authData.id;

    const {
      productId,
      productName,
      prize,
      quantity,
    } = req.body;
    const totalPrize = Number(prize) * Number(quantity);
    const id = SalesModel.length + 1;
    const saleDetail = {
      id,
      sellerId,
      productId,
      productName,
      prize,
      quantity,
      totalPrize,
      created: new Date(),
    };
    SalesModel.push(saleDetail);
    return (
      res.status(201).json({
        saleDetail,
        message: 'Successfully added sale(s)',
      })
    );
  }
}

export default sales;
