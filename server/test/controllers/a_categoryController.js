import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../app';
import { userDetails, categoryDetails } from '../mocks/testData';

let authToken;

chai.use(chaiHttp);
const { expect } = chai;
const { admin } = userDetails;
const {
  emptyField, validCategory, spacedField,
} = categoryDetails;
describe('Categories Endpoint API Test', () => {
  before((done) => {
    chai.request(app)
      .post('/api/v1/auth/login')
      .send(admin)
      .end((err, res) => {
        authToken = res.body.token;
        done();
      });
  });
  it('it should get all categories', (done) => {
    chai.request(app)
      .get('/api/v1/categories')
      .set('Authorization', authToken)
      .end((err, res) => {
        expect(res.body.message).to.eql('Success');
        expect(res.status).to.equal(200);
        done();
      });
  });
  it('it should get a category', (done) => {
    chai.request(app)
      .get('/api/v1/categories/1')
      .set('Authorization', authToken)
      .end((err, res) => {
        expect(res.body.message).to.eql('Success');
        expect(res.status).to.equal(200);
        done();
      });
  });
  it('it should not get a category if it does not exist', (done) => {
    chai.request(app)
      .get('/api/v1/categories/50')
      .set('Authorization', authToken)
      .end((err, res) => {
        expect(res.body.message).to.eql('No category found');
        expect(res.status).to.equal(404);
        done();
      });
  });
  it('it should not post category with empty field', (done) => {
    chai.request(app)
      .post('/api/v1/categories')
      .set('Authorization', authToken)
      .send(emptyField)
      .end((err, res) => {
        expect(res.body.errors[0]).to.eql('Category Name is required');
        expect(res.status).to.equal(400);
        done();
      });
  });
  it('it should post category if user is an admin', (done) => {
    chai.request(app)
      .post('/api/v1/categories')
      .set('Authorization', authToken)
      .send(validCategory)
      .end((err, res) => {
        expect(res.body.message).to.eql('Category created successfully');
        expect(res.status).to.equal(201);
        done();
      });
  });
  it('it should not post category with only spaces in the field', (done) => {
    chai.request(app)
      .post('/api/v1/categories')
      .set('Authorization', authToken)
      .send(spacedField)
      .end((err, res) => {
        expect(res.body.message).to.eql('Please fill in all fields');
        expect(res.status).to.equal(400);
        done();
      });
  });
  it('it should not post category if it already exist the quantity being recorded is more than in stock', (done) => {
    chai.request(app)
      .post('/api/v1/categories')
      .set('Authorization', authToken)
      .send(validCategory)
      .end((err, res) => {
        expect(res.body.message).to.eql('This category already exist');
        expect(res.status).to.equal(409);
        done();
      });
  });
  it('it should update product category ', (done) => {
    chai.request(app)
      .put('/api/v1/categories/2')
      .set('Authorization', authToken)
      .send(validCategory)
      .end((err, res) => {
        expect(res.body.message).to.eql('Category updated successfully');
        expect(res.status).to.equal(201);
        done();
      });
  });
  it('it should not update category if product does not exist', (done) => {
    chai.request(app)
      .put('/api/v1/categories/51')
      .set('Authorization', authToken)
      .send(validCategory)
      .end((err, res) => {
        expect(res.body.message).to.eql('Category does not exist');
        expect(res.status).to.equal(404);
        done();
      });
  });
  it('it should delete category that exist', (done) => {
    chai.request(app)
      .delete('/api/v1/categories/3')
      .set('Authorization', authToken)
      .end((err, res) => {
        expect(res.body.message).to.eql('Successfully deleted category');
        expect(res.status).to.equal(200);
        done();
      });
  });
  it('it should not delete category that does not exist', (done) => {
    chai.request(app)
      .delete('/api/v1/categories/40')
      .set('Authorization', authToken)
      .end((err, res) => {
        expect(res.body.message).to.eql('Category does not exist');
        expect(res.status).to.equal(404);
        done();
      });
  });
});
