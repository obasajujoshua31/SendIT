import { assert } from 'chai';
import request from 'supertest';
import app from '../app';

describe('Admin Test for Send IT application', () => {
  describe('Get Users', () => {
    it('Should return an array', (done) => {
      request(app)
        .get('/v1/admin/')
        .end((err, res) => {
          assert.equal(res.statusCode, '200');
          assert.isArray(res.body);
          assert.equal(res.body.length, 3);
          assert.isDefined(res.body);
          done();
        });
    });
  });
  describe('Get Admin Get all parcel', () => {
    it('Should return all Users with their parcels', (done) => {
      request(app)
        .get('/v1/admin/parcels')
        .end((err, res) => {
          assert.equal(res.statusCode, '200');
          assert.isObject(res.body);
          assert.isTrue(Object.prototype.hasOwnProperty.call(res.body, 'userA'));
          assert.isTrue(Object.prototype.hasOwnProperty.call(res.body, 'userB'));
          assert.isTrue(Object.prototype.hasOwnProperty.call(res.body, 'userC'));
          assert.equal(Object.keys(res.body).length, '3');
          done();
        });
    });
    describe('Get Orders By UserId', () => {
      it('Should return an array of length 3 for userA', (done) => {
        request(app)
          .get('/v1/admin/parcels/userA')
          .end((err, res) => {
            assert.equal(res.statusCode, '200');
            assert.isArray(res.body);
            assert.equal(res.body.length, '3');
            done();
          });
      });
      it('Should return an array of length 2 for userB', (done) => {
        request(app)
          .get('/v1/admin/parcels/userB')
          .end((err, res) => {
            assert.equal(res.statusCode, '200');
            assert.isArray(res.body);
            assert.equal(res.body.length, '2');
            done();
          });
      });
      it('Should return an array of length 2 for userC', (done) => {
        request(app)
          .get('/v1/admin/parcels/userC')
          .end((err, res) => {
            assert.equal(res.statusCode, '200');
            assert.isArray(res.body);
            assert.equal(res.body.length, '2');
            done();
          });
      });
    });
    describe('Cancel Order by Admin ', () => {
      it('Should return an object with the status cancelled', (done) => {
        request(app)
          .put('/v1/admin/parcels/userA/userA1/cancel')
          .end((err, res) => {
            assert.equal(res.statusCode, '200');
            assert.isObject(res.body);
            assert.isDefined(res.body);
            assert.isTrue(Object.prototype.hasOwnProperty.call(res.body, 'id'));
            assert.isTrue(Object.prototype.hasOwnProperty.call(res.body, 'pickUpLocation'));
            assert.isTrue(Object.prototype.hasOwnProperty.call(res.body, 'destination'));
            assert.isTrue(Object.prototype.hasOwnProperty.call(res.body, 'orderDate'));
            assert.equal(Object.keys(res.body).length, '5');
            assert.equal(res.body.status, 'CANCELLED');
            done();
          });
      });
    });
    describe('TEst for invalid Order', () => {
      it('Should return error message for a wrong order', (done) => {
        request(app)
          .put('/v1/admin/parcels/userA/userA6/cancel')
          .end((err, res) => {
            assert.equal(res.statusCode, '404');
            assert.isDefined(res.body.error);
            done();
          });
      });
    });

    describe('Admin changing the present Location of an order', () => {
      const location = {
        presentLocation: 'badagry',
      };
      it('Should return a new Object with a new key present Location', (done) => {
        request(app)
          .put('/v1/admin/parcels/userA/userA1/location')
          .send(location)
          .end((err, res) => {
            assert.equal(res.statusCode, '200');
            assert.isObject(res.body);
            assert.isTrue(Object.prototype.hasOwnProperty.call(res.body, 'presentLocation'));
            assert.equal(Object.keys(res.body).length, '6');
            assert.equal(res.body.presentLocation, 'badagry');
            done();
          });
      });
      it('Should return an error for an empty location field', (done) => {
        request(app)
          .put('/v1/admin/parcels/userA/userA1/location')
          .end((err, res) => {
            assert.equal(res.statusCode, '400');
            assert.isDefined(res.body.error);
            done();
          });
      });
      it('Should return an error for an invalid order Id', (done) => {
        request(app)
          .put('/v1/admin/parcels/userA/unknown/location')
          .send(location)
          .end((err, res) => {
            assert.equal(res.statusCode, '404');
            assert.isDefined(res.body.error);
            done();
          });
      });
    });
  });
});
