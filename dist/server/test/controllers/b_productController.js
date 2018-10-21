'use strict';

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _chaiHttp = require('chai-http');

var _chaiHttp2 = _interopRequireDefault(_chaiHttp);

var _app = require('../../../app');

var _app2 = _interopRequireDefault(_app);

var _testData = require('../mocks/testData');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var authToken = void 0;
var authToken2 = void 0;
_chai2.default.use(_chaiHttp2.default);
var expect = _chai2.default.expect;
var admin = _testData.userDetails.admin,
    attendant = _testData.userDetails.attendant;
var emptyField = _testData.productDetails.emptyField,
    validProduct = _testData.productDetails.validProduct,
    spacedField = _testData.productDetails.spacedField;

describe('Products', function () {
  before(function (done) {
    _chai2.default.request(_app2.default).post('/api/v1/auth/login').send(attendant).end(function (err, res) {
      authToken2 = res.body.token;
    });
    _chai2.default.request(_app2.default).post('/api/v1/auth/login').send(admin).end(function (err, res) {
      authToken = res.body.token;
      done();
    });
  });
  it('it should get all product for authenticated user', function (done) {
    _chai2.default.request(_app2.default).get('/api/v1/products').set('Authorization', authToken2).end(function (err, res) {
      expect(res.body.message).to.eql('Success');
      expect(res.status).to.equal(200);
      done();
    });
  });
  it('it should not get product with ID of NaN', function (done) {
    _chai2.default.request(_app2.default).get('/api/v1/products/uu').set('Authorization', authToken2).end(function (err, res) {
      expect(res.body.message).to.eql('ID can only be a number');
      expect(res.status).to.equal(400);
      done();
    });
  });
  it('it should not get product that does not exist', function (done) {
    _chai2.default.request(_app2.default).get('/api/v1/products/50').set('Authorization', authToken2).end(function (err, res) {
      expect(res.body.message).to.eql('This product does not exist');
      expect(res.status).to.equal(404);
      done();
    });
  });
  it('it should get product that exist', function (done) {
    _chai2.default.request(_app2.default).get('/api/v1/products/1').set('Authorization', authToken2).end(function (err, res) {
      expect(res.body.message).to.eql('Success');
      expect(res.status).to.equal(200);
      done();
    });
  });
  it('it should not post product if user is not Admin', function (done) {
    _chai2.default.request(_app2.default).post('/api/v1/products').set('Authorization', authToken2).send(validProduct).end(function (err, res) {
      expect(res.body.message).to.eql('You are not an Admin');
      expect(res.status).to.equal(401);
      done();
    });
  });
  it('it should post product if user is Admin', function (done) {
    _chai2.default.request(_app2.default).post('/api/v1/products').set('Authorization', authToken).send(validProduct).end(function (err, res) {
      expect(res.body.message).to.eql('Successfully added product(s)');
      expect(res.status).to.equal(201);
      done();
    });
  });
  it('it should not post product with empty field', function (done) {
    _chai2.default.request(_app2.default).post('/api/v1/products').set('Authorization', authToken).send(emptyField).end(function (err, res) {
      expect(res.body.errors[0]).to.eql('Description is required');
      expect(res.body.errors[1]).to.eql('Description should be more than 5 words');
      expect(res.body.errors[2]).to.eql('Category is required');
      expect(res.status).to.equal(400);
      done();
    });
  });
  it('it should not post product with only spaces in the field', function (done) {
    _chai2.default.request(_app2.default).post('/api/v1/products').set('Authorization', authToken).send(spacedField).end(function (err, res) {
      expect(res.body.message).to.eql('Please fill in all fields');
      expect(res.status).to.equal(400);
      done();
    });
  });
  it('it should update product if user is Admin', function (done) {
    _chai2.default.request(_app2.default).put('/api/v1/products/5').set('Authorization', authToken).send(validProduct).end(function (err, res) {
      expect(res.body.message).to.eql('Successfully updated product');
      expect(res.status).to.equal(201);
      done();
    });
  });
  it('it should update product if user is Admin', function (done) {
    _chai2.default.request(_app2.default).put('/api/v1/products/40').set('Authorization', authToken).send(validProduct).end(function (err, res) {
      expect(res.body.message).to.eql('Product does not exist');
      expect(res.status).to.equal(404);
      done();
    });
  });
  it('it should delete product that exist', function (done) {
    _chai2.default.request(_app2.default).delete('/api/v1/products/5').set('Authorization', authToken).end(function (err, res) {
      expect(res.body.message).to.eql('Successfully deletes product');
      expect(res.status).to.equal(200);
      done();
    });
  });
  it('it should not delete product that does not exist', function (done) {
    _chai2.default.request(_app2.default).delete('/api/v1/products/40').set('Authorization', authToken).end(function (err, res) {
      expect(res.body.message).to.eql('This product does not exist');
      expect(res.status).to.equal(404);
      done();
    });
  });
});