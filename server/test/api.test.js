import { assert } from 'chai';
import request from 'supertest';
import app from '../app';
import testorder from './testorders.test';

describe('API end point Tests.', () => {
  describe('#Get /', () => {
    it('Should return data with an array length of 5 and status of 200', (done) => {
      request(app)
        .get('/api/v1')
        .end((err, res) => {
          assert.isDefined(res.body);
          assert.equal(res.body.status, '200');
          assert.equal(res.statusCode, '200');
          assert.isArray(res.body.data);
          assert.equal(res.body.data.length, '5');
          done();
        });
    });
  });
  describe('#Get Parcels by a Particular User', () => {
    it('Should return data with an array length of 2 for user 11', (done) => {
      request(app)
        .get('/api/v1/users/11/parcels')
        .end((err, res) => {
          assert.isDefined(res.body);
          assert.equal(res.body.status, '200');
          assert.isArray(res.body.data);
          assert.equal(res.body.data.length, '2');
          assert.equal(res.statusCode, '200');
          done();
        });
    });
    it('Should return an array length of 1 for user 12', (done) => {
      request(app)
        .get('/api/v1/users/12/parcels')
        .end((err, res) => {
          assert.isDefined(res.body);
          assert.equal(res.body.status, '200');
          assert.equal(res.body.data.length, '1');
          assert.isDefined(res.body.data);
          done();
        });
    });
    it('Should return a status code of 404 for an unknown user', (done) => {
      request(app)
        .get('/api/v1/users/18/parcels')
        .end((err, res) => {
          assert.equal(res.statusCode, '404');
          assert.equal(res.body.error, 'The User has no Parcels');
          assert.equal(res.body.status, '404');
          done();
        });
    });
  });

  describe('# TEst for Get Parcel by Parcel Id', () => {
    it('Should return an array length of 1 for parcelID1', (done) => {
      request(app)
        .get('/api/v1/parcels/1')
        .end((err, res) => {
          assert.equal(res.body.status, '200');
          assert.isDefined(res.body.data);
          assert.isArray(res.body.data);
          assert.equal(res.body.data.length, '1');
          done();
        });
    });
    it('Should an array length of 1 for parcel ID 2', (done) => {
      request(app)
        .get('/api/v1/parcels/2')
        .end((err, res) => {
          assert.equal(res.body.status, '200');
          assert.isDefined(res.body.data);
          assert.isArray(res.body.data);
          assert.equal(res.body.data.length, '1');
          done();
        });
    });
    it('Should return a status code of 404 for an invalid parcel ID', (done) => {
      request(app)
        .get('/api/v1/parcels/9')
        .end((err, res) => {
          assert.equal(res.body.error, 'The Parcel cannot be found');
          assert.equal(res.statusCode, '404');
          assert.equal(res.body.status, '404');
          done();
        });
    });
  });
  describe('Test for Post Route ', () => {
    it('Should return a message order created for valid input credentials', (done) => {
      request(app)
        .post('/api/v1/parcels')
        .send(testorder.testOrder)
        .end((err, res) => {
          assert.equal(res.body.status, '201');
          assert.equal(res.body.message, 'order created');
          done();
        });
    });
    it('Should return error message with a status of 400 for invalid credentials', (done) => {
      request(app)
        .post('/api/v1/parcels')
        .end((err, res) => {
          assert.equal(res.statusCode, '400');
          assert.equal(res.body.error, 'Some credentials are blank');
          done();
        });
    });
  });
  describe('Test for PUT route to cancel an a parcel Order', () => {
    it('Should return a message order cancelled to the id', (done) => {
      request(app)
        .put('/api/v1/parcels/1/cancel')
        .end((err, res) => {
          assert.equal(res.body.status, '200');
          assert.isDefined(res.body);
          assert.equal(res.body.message, 'order cancelled');
          done();
        });
    });
    it('Should return an error message for incorrect Parcel Id', (done) => {
      request(app)
        .put('/api/v1/parcels/8/cancel')
        .end((err, res) => {
          assert.equal(res.statusCode, '404');
          assert.equal(res.body.error, 'Cannot find the Order');
          done();
        });
    });
  });
});
