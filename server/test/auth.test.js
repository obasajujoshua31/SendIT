import { assert } from 'chai';
import request from 'supertest';
import app from '../app';
import User from '../models/user';
import newuser from './newuser.test';

describe('Authentication end point Tests.', () => {
  before(async () => {
    await User.remove();
  });
  after(async () => {
    await User.remove();
  });
  describe('#  Signup', () => {
    it('Should return the data of the new user', done => {
      request(app)
        .post('/auth/signup')
        .send(newuser.newUser)
        .end((err, res) => {
          assert.isDefined(res.body);
          assert.equal(res.statusCode, '201');
          done();
        });
    });
    it('Should return as status code of 400 for an empty field', done => {
      request(app)
        .post('/auth/signup')
        .end((err, res) => {
          assert.equal(res.statusCode, '400');
          done();
        });
    });
    it('Should return as status code of 400 for an existing user', done => {
      request(app)
        .post('/auth/signup')
        .send(newuser.invalidUser)
        .end((err, res) => {
          assert.equal(res.statusCode, '400');
          done();
        });
    });
  });
  describe('#  Signin', () => {
    it('Should respond with a token for a registered user', done => {
      request(app)
        .post('/auth/signin')
        .send({
          email: 'obasajujoshua31@gmail.com',
          password: process.env.password,
        })
        .end((err, res) => {
          assert.isDefined(res.body);
          assert.equal(res.statusCode, '200');
          done();
        });
    });
    it('Should return as status code of 404 for an unregisted user', done => {
      request(app)
        .post('/auth/signin')
        .send({ email: 'me@example.com', password: '34558564' })
        .end((err, res) => {
          assert.equal(res.statusCode, '404');
          done();
        });
    });
    it('Should return as status code of 400 for incorrect password', done => {
      request(app)
        .post('/auth/signin')
        .send({ email: 'obasajujoshua31@gmail.com', password: 'wrongpassword' })
        .end((err, res) => {
          assert.equal(res.statusCode, '400');
          done();
        });
    });
  });
});
