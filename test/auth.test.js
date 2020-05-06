const request = require('supertest');
const { expect } = require('chai');
const bcrypt = require('bcrypt');
const User = require('../models/User');
const app = require('../app');

/* 

  POST /api/auth/signup 

*/

describe('POST /api/auth/signup', function () {
  this.timeout(10000);

  const mockUser = {
    email: 'test@gmail.com',
    name: 'test',
    password: 'password123'
  };

  const deleteMockUser = async () => {
    await User.deleteOne({ email: mockUser.email });
  };

  after(deleteMockUser);

  it('User information should be stored in database after encrypting user\'s password', done => {
    request(app)
      .post('/api/auth/signup')
      .send(mockUser)
      .expect('Content-Type', /json/)
      .expect(201)
      .end((err, res) => {
        if (err) return done(err);

        const { result } = res.body;

        expect(result).to.eql('ok');

        done();
      });
  });

  it('When user who is already registered tries to register as a member, an error should occur', done => {
    request(app)
      .post('/api/auth/signup')
      .send(mockUser)
      .expect('Content-Type', /json/)
      .expect(400)
      .end((err, res) => {
        if (err) return done(err);

        const { result, message } = res.body;

        expect(result).to.eql('error');
        expect(message).to.eql('이미 존재하는 이메일입니다.');

        done();
      });
  });
});

/* 

  POST /api/auth/signin

*/

describe('POST /api/auth/signin', function () {
  this.timeout(10000);

  const mockUser = {
    email: 'test@gmail.com',
    password: 'password123'
  };

  describe('Login of registered user', function () {
    const fetchMockUser = async () => {
      const hash = await bcrypt.hash(mockUser.password, 10);

      await User.create({
        email: 'test@gmail.com',
        name: 'test',
        password: hash
      });
    };

    const deleteMockUser = async () => {
      await User.deleteOne({ email: mockUser.email });
    };

    beforeEach(fetchMockUser);
    afterEach(deleteMockUser);

    it('User information and tokens should be issued to registered user', done => {
      request(app)
        .post('/api/auth/signin')
        .send(mockUser)
        .expect('Content-Type', /json/)
        .expect(201)
        .end(async (err, res) => {
          if (err) return done(err);

          const { result, id, name } = res.body;
          const userData = await User.findById(id);

          expect(result).to.eql('ok');
          expect(id).to.eql(String(userData._id));
          expect(name).to.eql(userData.name);

          done();
        });
    });
  });

  describe('Login of unregistered user', function () {
    it('If unregistered user attempts to log in, an error should be generated', done => {
      request(app)
        .post('/api/auth/signin')
        .send(mockUser)
        .expect('Content-Type', /json/)
        .expect(400)
        .end((err, res) => {
          if (err) return done(err);

          const { result, message } = res.body;

          expect(result).to.eql('error');
          expect(message).to.eql('가입하지 않은 이메일이거나, 잘못된 비밀번호입니다.');

          done();
        });
    });
  });
});
