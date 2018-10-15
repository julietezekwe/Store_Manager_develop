import SalesModel from '../dummyModel/SalesModel';

class sales {
  static addSaleRecord(req, res) {
    const sellerId = req.authData.id;

    const {
      productId, productName, prize, quantity,
    } = req.body;
    const totalPrize = Number(prize) * Number(quantity);
    const id = SalesModel.length + 1;
    const saleDetail = {
      id, sellerId, productId, productName, prize, quantity, totalPrize, created: new Date(),
    };
    SalesModel.push(saleDetail);
    return (
      res.status(201).json({
        saleDetail, message: 'Successfully added sale(s)',
      })
    );
  }

  static getAllSalesRecords(req, res) {
    return (
      res.status(200).json({
        SalesModel,
        message: 'Success',
        error: false,
      })
    );
  }

  static getSaleRecord(req, res) {
    const { id, role } = req.authData;
    const { salesId } = req.params;
    let validUser = false;
    let saleDetail;
    SalesModel.map((sale) => {
      if (sale.id === Number(salesId) && (sale.sellerId === Number(id) || role === 'admin')) {
        saleDetail = sale;
        validUser = true;
      }
      return false;
    });

    if (validUser) {
      return (
        res.status(200).json({
          saleDetail, message: 'Success', error: false,
        })
      );
    }
    return (
      res.status(401).json({ message: 'Unauthorized', error: true,
      })
    );
  }

  static getAttendantSaleRecord(req, res) {
    const { id } = req.authData;
    const saleDetail = [];
    SalesModel.map((sale) => {
      if (sale.sellerId === Number(id)) {
        saleDetail.push(sale);
      }
      return false;
    });

    if (saleDetail.length > 1) {
      return (
        res.status(200).json({
          saleDetail,
          message: 'Success',
          error: false,
        })
      );
    }
    return (
      res.status(404).json({
        message: 'No sales made yet',
        error: true,
      })
    );
  }
}

export default sales;
