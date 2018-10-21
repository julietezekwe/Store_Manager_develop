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
    attendant = _testData.userDetails.attendant,
    newAttendant = _testData.userDetails.newAttendant,
    wrongPassword = _testData.userDetails.wrongPassword,
    emptyField = _testData.userDetails.emptyField,
    spacedField = _testData.userDetails.spacedField;

describe('User', function () {
  before(function (done) {
    _chai2.default.request(_app2.default).post('/api/v1/auth/login').send(attendant).end(function (err, res) {
      authToken2 = res.body.token;
      done();
    });
  });
  it('invalid endpoint should respond with error', function (done) {
    _chai2.default.request(_app2.default).get('/').end(function (err, res) {
      expect(res.body).to.be.a('object');
      expect(res.body.message).to.eql('Page not found');
      expect(res.status).to.equal(404);
      done();
    });
  });

  it('it should not get all users if user not admin', function (done) {
    _chai2.default.request(_app2.default).get('/api/v1/auth/users').set('Authorization', authToken2).end(function (err, res) {
      expect(res.body.message).to.eql('You are not an Admin');
      expect(res.status).to.equal(401);
      done();
    });
  });
  it('it should not login a user with wrong credential', function (done) {
    _chai2.default.request(_app2.default).post('/api/v1/auth/login').send(wrongPassword).end(function (err, res) {
      expect(res.body).to.be.a('object');
      expect(res.body.message).to.eql('Invalid Credentials');
      expect(res.status).to.equal(401);
      done();
    });
  });

  it('should not get a user that does not exist', function (done) {
    _chai2.default.request(_app2.default).get('/api/v1/auth/50').set('Authorization', authToken2).end(function (err, res) {
      expect(res.body.message).to.eql('No user found');
      expect(res.status).to.equal(404);
      done();
    });
  });
  it('should get a user that exist', function (done) {
    _chai2.default.request(_app2.default).get('/api/v1/auth/3').set('Authorization', authToken2).end(function (err, res) {
      expect(res.body.message).to.eql('Success');
      expect(res.status).to.equal(200);
      done();
    });
  });
  it('should not get a user that does with wrong token', function (done) {
    var wrongToken = authToken + 'somthing wronh';
    _chai2.default.request(_app2.default).get('/api/v1/auth/50').set('Authorization', wrongToken).end(function (err, res) {
      expect(res.body.message).to.eql('Kindly sign in');
      expect(res.status).to.equal(401);
      done();
    });
  });

  it('should not get a user for non authenticated user', function (done) {
    _chai2.default.request(_app2.default).get('/api/v1/auth/1').end(function (err, res) {
      expect(res.body.message).to.eql('Kindly sign in');
      expect(res.status).to.equal(401);
      done();
    });
  });
  it('it should login a valid user', function (done) {
    _chai2.default.request(_app2.default).post('/api/v1/auth/login').send(admin).end(function (err, res) {
      expect(res.body).to.be.a('object');
      expect(res.body.message).eql('Success');
      expect(res.body).to.have.property('token');
      expect(res.status).to.equal(200);
      authToken = res.body.token;
      done();
    });
  });
  it('it should get all users if user is admin', function (done) {
    _chai2.default.request(_app2.default).get('/api/v1/auth/users').set('Authorization', authToken).end(function (err, res) {
      expect(res.body.message).to.eql('Success');
      expect(res.status).to.equal(200);
      done();
    });
  });
  it('not create a user if username is not unique', function (done) {
    _chai2.default.request(_app2.default).post('/api/v1/auth/createUser').set('Authorization', authToken).send(admin).end(function (err, res) {
      expect(res.body.message).to.eql('Username is taken');
      expect(res.status).to.equal(403);
      done();
    });
  });
  it('it should not post user with empty field', function (done) {
    _chai2.default.request(_app2.default).post('/api/v1/auth/createUser').set('Authorization', authToken).send(emptyField).end(function (err, res) {
      expect(res.body.errors[0]).to.eql('Name is required');
      expect(res.body.errors[1]).to.eql('Password is required');
      expect(res.body.errors[2]).to.eql('Minimum password length is 5 characters');
      expect(res.status).to.equal(400);
      done();
    });
  });
  it('it should not login user with empty field', function (done) {
    _chai2.default.request(_app2.default).post('/api/v1/auth/login').send(emptyField).end(function (err, res) {
      expect(res.body.errors[0]).to.eql('Password is required');
      expect(res.status).to.equal(400);
      done();
    });
  });
  it('it should not create user with spaces in the field', function (done) {
    _chai2.default.request(_app2.default).post('/api/v1/auth/createUser').set('Authorization', authToken).send(spacedField).end(function (err, res) {
      expect(res.body.message).to.eql('Please fill in all fields');
      expect(res.status).to.equal(400);
      done();
    });
  });
  it('should create a user successfully', function (done) {
    _chai2.default.request(_app2.default).post('/api/v1/auth/createUser').set('Authorization', authToken).send(newAttendant).end(function (err, res) {
      expect(res.body.message).to.eql('User created successfully');
      expect(res.body).to.have.property('userDetail');
      expect(res.status).to.equal(201);
      done();
    });
  });
  it('should update a user successfully', function (done) {
    _chai2.default.request(_app2.default).put('/api/v1/auth/5').set('Authorization', authToken).send(newAttendant).end(function (err, res) {
      expect(res.body.message).to.eql('User updated successfully');
      expect(res.body).to.have.property('userDetail');
      expect(res.status).to.equal(201);
      done();
    });
  });
  it('should not update a user if user does not exist', function (done) {
    _chai2.default.request(_app2.default).put('/api/v1/auth/40').set('Authorization', authToken).send(newAttendant).end(function (err, res) {
      expect(res.body.message).to.eql('User does not exist');
      expect(res.status).to.equal(404);
      done();
    });
  });
  it('should update a user successfully', function (done) {
    _chai2.default.request(_app2.default).delete('/api/v1/auth/5').set('Authorization', authToken).end(function (err, res) {
      expect(res.body.message).to.eql('Successfully deleted user');
      expect(res.status).to.equal(200);
      done();
    });
  });
  it('should not update a user if user does not exist', function (done) {
    _chai2.default.request(_app2.default).delete('/api/v1/auth/40').set('Authorization', authToken).end(function (err, res) {
      expect(res.body.message).to.eql('User does not exist');
      expect(res.status).to.equal(404);
      done();
    });
  });
});