import chai from 'chai';
import chaiHttp from 'chai-http';
import verifyAdmin from '../../middlewares/VerifyAdmin';
import verifyAttendant from '../../middlewares/VerifyAttendant';

chai.use(chaiHttp);
const { expect } = chai;
const { isAttendant } = verifyAttendant;
const { isAdmin } = verifyAdmin;

/*
  * Test Middlewares
  */
describe('VERIFY ADMIN AND ATTENDANTS MIDDLEWARE TEST', () => {
  it('should return a function()', () => {
    expect(isAdmin).to.be.a('function');
  });
  it('should return a function()', () => {
    expect(isAdmin).to.be.a('function');
  });

  it('should accept three arguments', () => {
    expect(isAdmin.length).to.equal(3);
  });

  it('should return a function()', () => {
    expect(isAttendant).to.be.a('function');
  });

  it('should accept three arguments', () => {
    expect(isAttendant.length).to.equal(3);
  });
});
