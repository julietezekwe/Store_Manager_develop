import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../app';
import { userDetails, productDetails } from '../mocks/testData';

let authToken;
let authToken2;
chai.use(chaiHttp);
const { expect } = chai;
const {
  admin, attendant,
} = userDetails;
const {
  emptyField, validProduct, spacedField,
} = productDetails;
describe('Products Endpoint API Test', () => {
  before((done) => {
    chai.request(app)
      .post('/api/v1/auth/login')
      .send(attendant)
      .end((err, res) => {
        authToken2 = res.body.token;
      });
    chai.request(app)
      .post('/api/v1/auth/login')
      .send(admin)
      .end((err, res) => {
        authToken = res.body.token;
        done();
      });
  });
  it('it should get all product for authenticated user', (done) => {
    chai.request(app)
      .get('/api/v1/products')
      .set('Authorization', authToken2)
      .end((err, res) => {
        expect(res.body.message).to.eql('Success');
        expect(res.status).to.equal(200);
        done();
      });
  });
  it('it should not get product with ID of NaN', (done) => {
    chai.request(app)
      .get('/api/v1/products/uu')
      .set('Authorization', authToken2)
      .end((err, res) => {
        expect(res.body.message).to.eql('ID can only be a number');
        expect(res.status).to.equal(400);
        done();
      });
  });
  it('it should not get product that does not exist', (done) => {
    chai.request(app)
      .get('/api/v1/products/50')
      .set('Authorization', authToken2)
      .end((err, res) => {
        expect(res.body.message).to.eql('This product does not exist');
        expect(res.status).to.equal(404);
        done();
      });
  });
  it('it should get product that exist', (done) => {
    chai.request(app)
      .get('/api/v1/products/1')
      .set('Authorization', authToken2)
      .end((err, res) => {
        expect(res.body.message).to.eql('Success');
        expect(res.status).to.equal(200);
        done();
      });
  });
  it('it should not post product if user is not Admin', (done) => {
    chai.request(app)
      .post('/api/v1/products')
      .set('Authorization', authToken2)
      .send(validProduct)
      .end((err, res) => {
        expect(res.body.message).to.eql('You are not an Admin');
        expect(res.status).to.equal(401);
        done();
      });
  });
  it('it should post product if user is Admin', (done) => {
    chai.request(app)
      .post('/api/v1/products')
      .set('Authorization', authToken)
      .send(validProduct)
      .end((err, res) => {
        expect(res.body.message).to.eql('Successfully added product(s)');
        expect(res.status).to.equal(201);
        done();
      });
  });
  it('it should not post product with empty field', (done) => {
    chai.request(app)
      .post('/api/v1/products')
      .set('Authorization', authToken)
      .send(emptyField)
      .end((err, res) => {
        expect(res.body.errors[0]).to.eql('Description is required');
        expect(res.body.errors[1]).to.eql('Description should be more than 5 words');
        expect(res.body.errors[2]).to.eql('Category is required');
        expect(res.status).to.equal(400);
        done();
      });
  });
  it('it should not post product with only spaces in the field', (done) => {
    chai.request(app)
      .post('/api/v1/products')
      .set('Authorization', authToken)
      .send(spacedField)
      .end((err, res) => {
        expect(res.body.message).to.eql('Please fill in all fields');
        expect(res.status).to.equal(400);
        done();
      });
  });
  it('it should update product if user is Admin', (done) => {
    chai.request(app)
      .put('/api/v1/products/5')
      .set('Authorization', authToken)
      .send(validProduct)
      .end((err, res) => {
        expect(res.body.message).to.eql('Successfully updated product');
        expect(res.status).to.equal(201);
        done();
      });
  });
  it('it should update product if user is Admin', (done) => {
    chai.request(app)
      .put('/api/v1/products/40')
      .set('Authorization', authToken)
      .send(validProduct)
      .end((err, res) => {
        expect(res.body.message).to.eql('Product does not exist');
        expect(res.status).to.equal(404);
        done();
      });
  });
  it('it should delete product that exist', (done) => {
    chai.request(app)
      .delete('/api/v1/products/5')
      .set('Authorization', authToken)
      .end((err, res) => {
        expect(res.body.message).to.eql('Successfully deletes product');
        expect(res.status).to.equal(200);
        done();
      });
  });
  it('it should not delete product that does not exist', (done) => {
    chai.request(app)
      .delete('/api/v1/products/40')
      .set('Authorization', authToken)
      .end((err, res) => {
        expect(res.body.message).to.eql('This product does not exist');
        expect(res.status).to.equal(404);
        done();
      });
  });
});
