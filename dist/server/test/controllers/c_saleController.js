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
var authToken3 = void 0;
_chai2.default.use(_chaiHttp2.default);
var expect = _chai2.default.expect;
var admin = _testData.userDetails.admin,
    attendant = _testData.userDetails.attendant,
    attendant2 = _testData.userDetails.attendant2;
var emptyField = _testData.saleDetails.emptyField,
    validSale = _testData.saleDetails.validSale,
    spacedField = _testData.saleDetails.spacedField,
    invalidSale = _testData.saleDetails.invalidSale,
    invalidSale2 = _testData.saleDetails.invalidSale2;

describe('Sales', function () {
  before(function (done) {
    _chai2.default.request(_app2.default).post('/api/v1/auth/login').send(attendant).end(function (err, res) {
      authToken2 = res.body.token;
    });
    _chai2.default.request(_app2.default).post('/api/v1/auth/login').send(attendant2).end(function (err, res) {
      authToken3 = res.body.token;
    });
    _chai2.default.request(_app2.default).post('/api/v1/auth/login').send(admin).end(function (err, res) {
      authToken = res.body.token;
      done();
    });
  });
  it('it should get all sales if user is admin', function (done) {
    _chai2.default.request(_app2.default).get('/api/v1/sales').set('Authorization', authToken).end(function (err, res) {
      expect(res.body.message).to.eql('Success');
      expect(res.status).to.equal(200);
      done();
    });
  });
  it('it should not get all sales if user is not admin', function (done) {
    _chai2.default.request(_app2.default).get('/api/v1/sales').set('Authorization', authToken2).end(function (err, res) {
      expect(res.body.message).to.eql('You are not an Admin');
      expect(res.status).to.equal(401);
      done();
    });
  });
  it('it should get a sales if user is admin or sale owner', function (done) {
    _chai2.default.request(_app2.default).get('/api/v1/sales/1').set('Authorization', authToken2).end(function (err, res) {
      expect(res.body.message).to.eql('Success');
      expect(res.status).to.equal(200);
      done();
    });
  });
  it('it should not get a sales if user is neither admin nor sale owner', function (done) {
    _chai2.default.request(_app2.default).get('/api/v1/sales/1').set('Authorization', authToken3).end(function (err, res) {
      expect(res.body.message).to.eql('Unauthorized');
      expect(res.body.error).to.eql(true);
      expect(res.status).to.equal(401);
      done();
    });
  });
  it('it should get an individual sales record of attendant', function (done) {
    _chai2.default.request(_app2.default).get('/api/v1/user/sales').set('Authorization', authToken2).end(function (err, res) {
      expect(res.body.message).to.eql('Success');
      expect(res.status).to.equal(200);
      done();
    });
  });
  it('it should not get an individual sales record of attendant if he has none', function (done) {
    _chai2.default.request(_app2.default).get('/api/v1/user/sales').set('Authorization', authToken3).end(function (err, res) {
      expect(res.body.message).to.eql('No sales made yet');
      expect(res.status).to.equal(404);
      done();
    });
  });
  it('it should not post sales with empty field', function (done) {
    _chai2.default.request(_app2.default).post('/api/v1/sales').set('Authorization', authToken2).send(emptyField).end(function (err, res) {
      expect(res.body.errors[0]).to.eql('Product ID is required');
      expect(res.status).to.equal(400);
      done();
    });
  });
  it('it should not post sales with only spaces in the field', function (done) {
    _chai2.default.request(_app2.default).post('/api/v1/sales').set('Authorization', authToken2).send(spacedField).end(function (err, res) {
      expect(res.body.message).to.eql('Please fill in all fields');
      expect(res.status).to.equal(400);
      done();
    });
  });
  it('it should not post sales if user is not an attendant', function (done) {
    _chai2.default.request(_app2.default).post('/api/v1/sales').set('Authorization', authToken).send(validSale).end(function (err, res) {
      expect(res.body.message).to.eql('You are not an Attendant');
      expect(res.status).to.equal(401);
      done();
    });
  });
  it('it should not post sales if product does not exist', function (done) {
    _chai2.default.request(_app2.default).post('/api/v1/sales').set('Authorization', authToken2).send(invalidSale).end(function (err, res) {
      expect(res.body.message).to.eql('This product does not exist');
      expect(res.status).to.equal(404);
      done();
    });
  });
  it('it should not post sales the quantity being recorded is more than in stock', function (done) {
    _chai2.default.request(_app2.default).post('/api/v1/sales').set('Authorization', authToken2).send(invalidSale2).end(function (err, res) {
      expect(res.body.message).to.eql('The quantity is more than in stock');
      expect(res.status).to.equal(401);
      done();
    });
  });
  it('it should post sales if user is an attendant', function (done) {
    _chai2.default.request(_app2.default).post('/api/v1/sales').set('Authorization', authToken2).send(validSale).end(function (err, res) {
      expect(res.body.message).to.eql('Successfully added sale(s)');
      expect(res.status).to.equal(201);
      done();
    });
  });
});