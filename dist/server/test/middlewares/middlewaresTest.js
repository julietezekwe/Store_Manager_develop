'use strict';

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _chaiHttp = require('chai-http');

var _chaiHttp2 = _interopRequireDefault(_chaiHttp);

var _verifyAdmin = require('../../middlewares/verifyAdmin');

var _verifyAdmin2 = _interopRequireDefault(_verifyAdmin);

var _verifyAttendant = require('../../middlewares/verifyAttendant');

var _verifyAttendant2 = _interopRequireDefault(_verifyAttendant);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_chai2.default.use(_chaiHttp2.default);
var expect = _chai2.default.expect;
var isAttendant = _verifyAttendant2.default.isAttendant;
var isAdmin = _verifyAdmin2.default.isAdmin;

/*
  * Test Middlewares
  */

describe('VERIFY ADMIN AND ATTENDANTS', function () {
  it('should return a function()', function () {
    expect(isAdmin).to.be.a('function');
  });
  it('should return a function()', function () {
    expect(isAdmin).to.be.a('function');
  });

  it('should accept three arguments', function () {
    expect(isAdmin.length).to.equal(3);
  });

  it('should return a function()', function () {
    expect(isAttendant).to.be.a('function');
  });

  it('should accept three arguments', function () {
    expect(isAttendant.length).to.equal(3);
  });
});