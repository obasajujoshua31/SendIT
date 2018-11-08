import { assert } from 'chai';
import request from 'supertest';
import app from '../app';
import testorder from './testorders.test';

describe('Test User Routes ', () => {
  describe('Get All Users', () => {
    it('Get all Orders', (done) => {
      request(app)
        .get('/api/v1/users')
        .end((err, res) => {
          assert.equal(res.statusCode, '200');
          assert.isArray(res.body);
          assert.equal(res.body.length, '7');
        });
      done();
    });
  });

  describe('# Get Users/Parcels', () => {
    it('# GET Users/Parcel Valid Test', (done) => {
      request(app)
        .get('/api/v1/users/userA/parcels')
        .end((err, res) => {
          assert.equal(res.statusCode, '200');
          assert.isArray(res.body);
          assert.isDefined(res.body);
          assert.equal(res.body.length, '3');
        });
      done();
    });
    it('#Get Users/Parcel for Invalid', (done) => {
      request('app')
        .get('/api/v1/users/unknown/parcels')
        .end((err, res) => {
          assert.equal(res.statusCode, '404');
          assert.isUndefined(res.body);
        });
      done();
    });
  });
  describe('Test Get Order by ID for a particular User', () => {
    it('Get Request for a Valid Order', (done) => {
      request(app)
        .get('/api/v1/users/userA/parcels/userA1')
        .end((err, res) => {
          assert.equal(res.statusCode, '200');
          assert.isObject(res.body);
          assert.isTrue(Object.prototype.hasOwnProperty.call(res.body, 'id'));
          assert.isTrue(Object.prototype.hasOwnProperty.call(res.body, 'pickUpLocation'));
          assert.isTrue(Object.prototype.hasOwnProperty.call(res.body, 'destination'));
          assert.isTrue(Object.prototype.hasOwnProperty.call(res.body, 'orderDate'));
        });
      done();
    });
    it('Get Request Test for an Invalid Order', (done) => {
      request(app)
        .get('/api/v1/users/userA/parcels/unknown')
        .end((err, res) => {
          assert.equal(res.statusCode, '404');
          assert.isDefined(res.body.error);
        });
      done();
    });
  });
});
// describe('Put Request for Cancelling Order by a user', () => {
//   const userId = 'userA';
//   const orderId = 'userA1';
//   const unknown = 'unknown';
//   it('Test for a valid order', (done) => {
//     request(app)
//       .put(`/api/v1/users/${userId}/parcels/${orderId}/cancel`)
//       .end((err, res) => {
//         assert.equal(res.statusCode, '200');
//         assert.isArray(res.body);
//         assert.equal(res.body.length, '3');
//         assert.equal(res.body[0].status, 'CANCELLED');
//       });
//     done();
//   });
//   it('Test for a non Valid Order', (done) => {
//     request(app)
//       .put(`/api/v1/users/${userId}/parcels/${unknown}/cancel`)
//       .end((err, res) => {
//         assert.equal(res.statusCode, '404');
//         assert.isDefined(res.body.error);
//       });
//     done();
//   });
// });
describe('Test Post Route to create new Orders', () => {
  const userId = 'userA';
  it('Should Post for a valid user', (done) => {
    request(app)
      .post(`/api/v1/users/${userId}/parcels/?pickUpLocation=${testorder.testOrder.pickUpLocation}&destination=${testorder.testOrder.destination}`)
      .end((err, res) => {
        assert.equal(res.statusCode, '200');
        assert.isArray(res.body);
        assert.equal(res.body.length, '4');
        assert.isDefined(res.body);
      });
    done();
  });
  it('Should return an error for error in Posting', (done) => {
    request(app)
      .post('/api/v1/users/userA/parcels/')
      .end((err, res) => {
        assert.equal(res.statusCode, '400');
        assert.isDefined(res.body.error);
      });
    done();
  });
});

describe('Request to remove order', () => {
  const userId = 'userA';
  const orderId = 'userA1';
  const unknown = 'unknown';
  it('Should return array length of 2 succesfully', (done) => {
    request(app)
      .delete(`/api/v1/users/${userId}/parcels/${orderId}/remove`)
      .end((err, res) => {
        assert.equal(res.statusCode, '200');
        assert.equal(res.body.length, '2');
        assert.isArray(res.body);
        assert.isDefined(res.body);
      });
    done();
  });
  it('Should return invalid for an invalid order', (done) => {
    request(app)
      .delete(`/api/v1/users/${userId}/parcels/${unknown}/remove`)
      .end((err, res) => {
        assert.equal(res.statusCode, '404');
        assert.isDefined(res.body.error);
      });
    done();
  });
});
