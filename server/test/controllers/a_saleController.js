import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../app';
import { userDetails, saleDetails } from '../mocks/testData';

let authToken;
let authToken2;
let authToken3;
chai.use(chaiHttp);
const { expect } = chai;
const {
  admin, attendant, attendant2,
} = userDetails;
const {
  emptyField, validSale, invalidSale, invalidSale2,
} = saleDetails;
describe('Sales Endpoint API Test', () => {
  before((done) => {
    chai.request(app)
      .post('/api/v1/auth/login')
      .send(attendant)
      .end((err, res) => {
        authToken2 = res.body.token;
      });
    chai.request(app)
      .post('/api/v1/auth/login')
      .send(attendant2)
      .end((err, res) => {
        authToken3 = res.body.token;
      });
    chai.request(app)
      .post('/api/v1/auth/login')
      .send(admin)
      .end((err, res) => {
        authToken = res.body.token;
        done();
      });
  });
  it('it should get all sales if user is admin', (done) => {
    chai.request(app)
      .get('/api/v1/sales')
      .set('Authorization', authToken)
      .end((err, res) => {
        expect(res.body.message).to.eql('Success');
        expect(res.status).to.equal(200);
        done();
      });
  });
  it('it should not get all sales if user is not admin', (done) => {
    chai.request(app)
      .get('/api/v1/sales')
      .set('Authorization', authToken2)
      .end((err, res) => {
        expect(res.body.message).to.eql('You are not an Admin');
        expect(res.status).to.equal(401);
        done();
      });
  });
  it('it should get a sales if user is admin or sale owner', (done) => {
    chai.request(app)
      .get('/api/v1/sales/1')
      .set('Authorization', authToken2)
      .end((err, res) => {
        expect(res.body.message).to.eql('Success');
        expect(res.status).to.equal(200);
        done();
      });
  });
  it('it should not get a sales if user is neither admin nor sale owner', (done) => {
    chai.request(app)
      .get('/api/v1/sales/1')
      .set('Authorization', authToken3)
      .end((err, res) => {
        expect(res.body.message).to.eql('Unauthorized');
        expect(res.body.error).to.eql(true);
        expect(res.status).to.equal(401);
        done();
      });
  });
  it('it should get an individual sales record of attendant', (done) => {
    chai.request(app)
      .get('/api/v1/user/sales')
      .set('Authorization', authToken2)
      .end((err, res) => {
        expect(res.body.message).to.eql('Success');
        expect(res.status).to.equal(200);
        done();
      });
  });
  it('it should not get an individual sales record of attendant if he has none', (done) => {
    chai.request(app)
      .get('/api/v1/user/sales')
      .set('Authorization', authToken3)
      .end((err, res) => {
        expect(res.body.message).to.eql('No sales made yet');
        expect(res.status).to.equal(404);
        done();
      });
  });
  it('it should not post sales with empty field', (done) => {
    chai.request(app)
      .post('/api/v1/sales')
      .set('Authorization', authToken2)
      .send(emptyField)
      .end((err, res) => {
        expect(res.body.errors[0]).to.eql('Please provide products to sale');
        expect(res.status).to.equal(400);
        done();
      });
  });
  // it('it should not post sales with only spaces in the field', (done) => {
  //   chai.request(app)
  //     .post('/api/v1/sales')
  //     .set('Authorization', authToken2)
  //     .send(spacedField)
  //     .end((err, res) => {
  //       expect(res.body.message).to.eql('Please fill in all fields');
  //       expect(res.status).to.equal(400);
  //       done();
  //     });
  // });
  it('it should not post sales if user is not an attendant', (done) => {
    chai.request(app)
      .post('/api/v1/sales')
      .set('Authorization', authToken)
      .send(validSale)
      .end((err, res) => {
        expect(res.body.message).to.eql('You are not an Attendant');
        expect(res.status).to.equal(401);
        done();
      });
  });
  it('it should not post sales if product does not exist', (done) => {
    chai.request(app)
      .post('/api/v1/sales')
      .set('Authorization', authToken2)
      .send(invalidSale)
      .end((err, res) => {
        expect(res.body.message).to.eql('This product does not exist');
        expect(res.status).to.equal(404);
        done();
      });
  });
  it('it should not post sales the quantity being recorded is more than in stock', (done) => {
    chai.request(app)
      .post('/api/v1/sales')
      .set('Authorization', authToken2)
      .send(invalidSale2)
      .end((err, res) => {
        expect(res.body.message).to.eql('green shoe quantity provided is more than in stock');
        expect(res.status).to.equal(401);
        done();
      });
  });
  it('it should post sales if user is an attendant', (done) => {
    chai.request(app)
      .post('/api/v1/sales')
      .set('Authorization', authToken2)
      .send(validSale)
      .end((err, res) => {
        expect(res.body.message).to.eql('Successfully added sale(s)');
        expect(res.status).to.equal(201);
        done();
      });
  });
});
