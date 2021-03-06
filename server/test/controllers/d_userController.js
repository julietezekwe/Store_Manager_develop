import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../app';
import { userDetails } from '../mocks/testData';

let authToken;
let authToken2;
chai.use(chaiHttp);
const { expect } = chai;
const {
  admin, attendant, update, newAttendant, wrongPassword, emptyField, spacedField, newAttendant3,
} = userDetails;
describe('Users Endpoint API Test', () => {
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
  describe('GET REQUESTS', () => {
    it('invalid endpoint should respond with error', (done) => {
      chai.request(app)
        .get('/')
        .end((err, res) => {
          expect(res.body).to.be.a('object');
          expect(res.body.message).to.eql('Page not found');
          expect(res.status).to.equal(404);
          done();
        });
    });
    it('it should not get all users if user not admin', (done) => {
      chai.request(app)
        .get('/api/v1/users')
        .set('Authorization', authToken2)
        .end((err, res) => {
          expect(res.body.message).to.eql('You are not an Admin');
          expect(res.status).to.equal(403);
          done();
        });
    });
    it('should not get a user that does not exist', (done) => {
      chai.request(app)
        .get('/api/v1/users/50')
        .set('Authorization', authToken2)
        .end((err, res) => {
          expect(res.body.message).to.eql('No user found');
          expect(res.status).to.equal(404);
          done();
        });
    });
    it('should get a user that exist', (done) => {
      chai.request(app)
        .get('/api/v1/users/3')
        .set('Authorization', authToken2)
        .end((err, res) => {
          expect(res.body.message).to.eql('Success');
          expect(res.status).to.equal(200);
          done();
        });
    });
    it('should not get a user that does with wrong token', (done) => {
      const wrongToken = `${authToken}somthing wronh`;
      chai.request(app)
        .get('/api/v1/users/50')
        .set('Authorization', wrongToken)
        .end((err, res) => {
          expect(res.body.message).to.eql('Kindly sign in');
          expect(res.status).to.equal(401);
          done();
        });
    });
    it('should not get a user for non authenticated user', (done) => {
      chai.request(app)
        .get('/api/v1/users/1')
        .end((err, res) => {
          expect(res.body.message).to.eql('Kindly sign in');
          expect(res.status).to.equal(401);
          done();
        });
    });
    it('it should get all users if user is admin', (done) => {
      chai.request(app)
        .get('/api/v1/users')
        .set('Authorization', authToken)
        .end((err, res) => {
          expect(res.body.message).to.eql('Success');
          expect(res.status).to.equal(200);
          done();
        });
    });
  });
  describe('POST REQUESTS', () => {
    it('it should not login a user with wrong credential', (done) => {
      chai.request(app)
        .post('/api/v1/auth/login')
        .send(wrongPassword)
        .end((err, res) => {
          expect(res.body).to.be.a('object');
          expect(res.body.message).to.eql('Invalid Credentials');
          expect(res.status).to.equal(401);
          done();
        });
    });
    it('it should login a valid user', (done) => {
      chai.request(app)
        .post('/api/v1/auth/login')
        .send(admin)
        .end((err, res) => {
          expect(res.body).to.be.a('object');
          expect(res.body.message).eql('Successfully logged in');
          expect(res.body).to.have.property('token');
          expect(res.status).to.equal(200);
          done();
        });
    });
    it('not create a user if email is not unique', (done) => {
      chai.request(app)
        .post('/api/v1/auth/createUser')
        .set('Authorization', authToken)
        .send(admin)
        .end((err, res) => {
          expect(res.body.message).to.eql('email is taken');
          expect(res.status).to.equal(409);
          done();
        });
    });
    it('it should not post user with empty field', (done) => {
      chai.request(app)
        .post('/api/v1/auth/createUser')
        .set('Authorization', authToken)
        .send(emptyField)
        .end((err, res) => {
          expect(res.body.errors[0]).to.eql('Name is required');
          expect(res.body.errors[1]).to.eql('Password is required');
          expect(res.body.errors[2]).to.eql('Minimum password length is 5 characters');
          expect(res.status).to.equal(400);
          done();
        });
    });
    it('it should not login user with empty field', (done) => {
      chai.request(app)
        .post('/api/v1/auth/login')
        .send(emptyField)
        .end((err, res) => {
          expect(res.body.errors[0]).to.eql('Password is required');
          expect(res.status).to.equal(400);
          done();
        });
    });
    it('it should not login user that does not exist', (done) => {
      chai.request(app)
        .post('/api/v1/auth/login')
        .send({ email: 'add@gmail.com', password: 'ijeomaa' })
        .end((err, res) => {
          expect(res.body.message).to.eql('User does not exist');
          expect(res.status).to.equal(404);
          done();
        });
    });
    it('it should not create user with spaces in the field', (done) => {
      chai.request(app)
        .post('/api/v1/auth/createUser')
        .set('Authorization', authToken)
        .send(spacedField)
        .end((err, res) => {
          expect(res.body.message).to.eql('Please fill in all fields');
          expect(res.status).to.equal(400);
          done();
        });
    });
    it('should create a user successfully', (done) => {
      chai.request(app)
        .post('/api/v1/auth/createUser')
        .set('Authorization', authToken)
        .send(newAttendant)
        .end((err, res) => {
          expect(res.body.message).to.eql('User created successfully');
          expect(res.body).to.have.property('userDetail');
          expect(res.status).to.equal(201);
          done();
        });
    });
    it('should not create a user if role does not exist', (done) => {
      chai.request(app)
        .post('/api/v1/auth/createUser')
        .set('Authorization', authToken)
        .send(newAttendant3)
        .end((err, res) => {
          expect(res.body.message).to.eql('This role does not exist');
          expect(res.status).to.equal(404);
          done();
        });
    });
  });
  describe('PUT REQUESTS', () => {
    it('should update a user successfully', (done) => {
      chai.request(app)
        .put('/api/v1/users/4')
        .set('Authorization', authToken)
        .send(update)
        .end((err, res) => {
          expect(res.body.message).to.eql('User updated successfully');
          expect(res.body).to.have.property('userDetail');
          expect(res.status).to.equal(200);
          done();
        });
    });
    it('should not update a user if email is taken', (done) => {
      chai.request(app)
        .put('/api/v1/users/4')
        .set('Authorization', authToken)
        .send(update)
        .end((err, res) => {
          expect(res.body.message).to.eql('This email is taken');
          expect(res.status).to.equal(409);
          done();
        });
    });
    it('should not update a user that does not exist', (done) => {
      chai.request(app)
        .put('/api/v1/users/10')
        .set('Authorization', authToken)
        .send(update)
        .end((err, res) => {
          expect(res.body.message).to.eql('User does not exist');
          expect(res.status).to.equal(404);
          done();
        });
    });
  });
  describe('DELETE REQUESTS', () => {
    it('should delete a user', (done) => {
      chai.request(app)
        .delete('/api/v1/users/4')
        .set('Authorization', authToken)
        .send(update)
        .end((err, res) => {
          expect(res.body.message).to.eql('Successfully deleted user');
          expect(res.status).to.equal(200);
          done();
        });
    });
    it('should not delete a user that does not exist', (done) => {
      chai.request(app)
        .delete('/api/v1/users/10')
        .set('Authorization', authToken)
        .send(update)
        .end((err, res) => {
          expect(res.body.message).to.eql('User does not exist');
          expect(res.status).to.equal(404);
          done();
        });
    });
  });
});
