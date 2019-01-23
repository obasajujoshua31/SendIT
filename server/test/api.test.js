import { assert } from 'chai';
import request from 'supertest';
import app from '../app';
import testorder from './testorders.test';
import Parcel from '../models/parcel';

describe('API end point Tests.', () => {
  before(async () => {
    const parcel = await Parcel.remove();
  });
  beforeEach(async () => {
    const parcel = await Parcel.changeToPlaced();
  });
  after(async () => {
    const parcel = await Parcel.remove();
  });
  after(async () => {
    const parcel = await Parcel.changeToPlaced();
  });
  describe('#Get /', () => {
    it('Should return a status of 200 for an authorized user', done => {
      request(app)
        .get('/api/v1/parcels')
        .set({ Authorization: process.env.jwtadmin })
        .end((err, res) => {
          assert.isDefined(res.body);
          assert.equal(res.statusCode, '200');
          assert.isArray(res.body.data);
          done();
        });
    });
    it('Should return as status code of 401 for an unauthorized user', done => {
      request(app)
        .get('/api/v1/parcels')
        .end((err, res) => {
          assert.equal(res.statusCode, '401');
          done();
        });
    });
    it('Should return as status code of 401 for an user with a fake or expired token', done => {
      request(app)
        .get('/api/v1/parcels')
        .set({ Authorization: 'Bearer oikffrjufjfurjhrhfkloj' })
        .end((err, res) => {
          assert.equal(res.statusCode, '401');
          done();
        });
    });
  });

  describe('#Get Parcels by a Particular User', () => {
    it('Should return data with an array for user 1', done => {
      request(app)
        .get('/api/v1/users/1/parcels')
        .set({ Authorization: process.env.jwttoken })
        .end((err, res) => {
          assert.isDefined(res.body);
          assert.isArray(res.body.data);
          assert.equal(res.statusCode, '200');
          done();
        });
    });
    it('Should return an array for user 2', done => {
      request(app)
        .get('/api/v1/users/2/parcels')
        .set({ Authorization: process.env.jwttoken })
        .end((err, res) => {
          assert.isDefined(res.body);
          assert.isDefined(res.body.data);
          done();
        });
    });
    it('Should return a status code of 404 for a user with no parcels', done => {
      request(app)
        .get('/api/v1/users/18/parcels')
        .set({ Authorization: process.env.jwttoken })
        .end((err, res) => {
          assert.equal(res.statusCode, '404');
          assert.equal(res.body.error, 'The User has no Parcels');
          done();
        });
    });
    it('Should return a status code of 401 for an unauthorized user', done => {
      request(app)
        .get('/api/v1/users/6/parcels')
        .end((err, res) => {
          assert.equal(res.statusCode, '401');
          done();
        });
    });
  });
  describe('# TEst for Get Parcel by Parcel Id', () => {
    it('Should return an array length of 1 for parcelID of 1', done => {
      request(app)
        .get('/api/v1/parcels/2')
        .set({ Authorization: process.env.jwttoken })
        .end((err, res) => {
          assert.equal(res.statusCode, '200');
          assert.isDefined(res.body.data);
          assert.isArray(res.body.data);
          done();
        });
    });
    it('Should return a status code of 404 for an invalid parcel ID', done => {
      request(app)
        .get('/api/v1/parcels/99')
        .set({ Authorization: process.env.jwttoken })
        .end((err, res) => {
          assert.equal(res.statusCode, '404');
          done();
        });
    });
    it('Should return a status code of 401 for an unauthorized user', done => {
      request(app)
        .get('/api/v1/parcels/1')
        .end((err, res) => {
          assert.equal(res.statusCode, '401');
          done();
        });
    });
  });

  describe('Test for Post Route ', () => {
    it('Should return a message order created for valid input credentials', done => {
      request(app)
        .post('/api/v1/parcels')
        .send(testorder.testOrder)
        .set({ Authorization: process.env.jwttoken })
        .end((err, res) => {
          assert.equal(res.statusCode, '201');
          assert.equal(res.body.message, 'order created');
          done();
        });
    });
    it('Should return error message with a status of 400 for invalid credentials', done => {
      request(app)
        .post('/api/v1/parcels')
        .set({ Authorization: process.env.jwttoken })
        .end((err, res) => {
          assert.equal(res.statusCode, '400');
          done();
        });
    });
    it('Should return a status of 401 for an unauthorized user', done => {
      request(app)
        .post('/api/v1/parcels')
        .send(testorder.testOrder)
        .end((err, res) => {
          assert.equal(res.statusCode, '401');
          done();
        });
    });
  });
  describe('Test for PUT route to cancel an a parcel Order', () => {
    it('Should return a message order cancelled to the id', done => {
      request(app)
        .put('/api/v1/parcels/1/cancel')
        .set({ Authorization: process.env.jwttoken })
        .end((err, res) => {
          assert.equal(res.statusCode, '200');
          assert.isDefined(res.body);
          assert.equal(res.body.message, 'order cancelled');
          done();
        });
    });
    it('Should return an error message for incorrect Parcel Id', done => {
      request(app)
        .put('/api/v1/parcels/99/cancel')
        .set({ Authorization: process.env.jwttoken })
        .end((err, res) => {
          assert.equal(res.statusCode, '404');
          done();
        });
    });
    it('Should return an error message for an unauthorized user', done => {
      request(app)
        .put('/api/v1/parcels/4/cancel')
        .end((err, res) => {
          assert.equal(res.statusCode, '401');
          done();
        });
    });
  });
  describe('Test for PUT route to update Parcel', () => {
    it('Should return the parcel order updated', done => {
      request(app)
        .put('/api/v1/parcels/1/destination')
        .set({ Authorization: process.env.jwttoken })
        .send({ destination: '22, Jos Road, Kaduna' })
        .end((err, res) => {
          assert.equal(res.statusCode, '200');
          assert.isDefined(res.body);
          done();
        });
    });
    it('Should return an error message for empty field', done => {
      request(app)
        .put('/api/v1/parcels/12/destination')
        .set({ Authorization: process.env.jwttoken })
        .end((err, res) => {
          assert.equal(res.statusCode, '400');
          done();
        });
    });
    it('Should return an error message for an unauthorized user', done => {
      request(app)
        .put('/api/v1/parcels/1/destination')
        .end((err, res) => {
          assert.equal(res.statusCode, '401');
          done();
        });
    });
    it('Should return an error message for incorrect parcel', done => {
      request(app)
        .put('/api/v1/parcels/89/destination')
        .set({ Authorization: process.env.jwttoken })
        .send({ destination: '22, Jos Road, Kaduna' })
        .end((err, res) => {
          assert.equal(res.statusCode, '404');
          done();
        });
    });
  });
  describe('Test for PUT route to change Present Location by Admin', () => {
    it('Should return Present Location changed for a valid Admin', async () => {
      const res = await request(app)
        .put('/api/v1/parcels/1/presentLocation')
        .set({ Authorization: process.env.jwtadmin })
        .send({ presentLocation: '22, Jos Road, Kaduna' });
      assert.equal(res.statusCode, '200');
      assert.isDefined(res.body);
    });
    it('Should return an error message for empty field', done => {
      request(app)
        .put('/api/v1/parcels/1/presentLocation')
        .set({ Authorization: process.env.jwtadmin })
        .end((err, res) => {
          assert.equal(res.statusCode, '400');
          done();
        });
    });
    it('Should return an error message for an unauthorized Admin', done => {
      request(app)
        .put('/api/v1/parcels/1/presentLocation')
        .end((err, res) => {
          assert.equal(res.statusCode, '401');
          done();
        });
    });
    it('Should return an error message for incorrect parcel', done => {
      request(app)
        .put('/api/v1/parcels/89/presentLocation')
        .set({ Authorization: process.env.jwtadmin })
        .send({ presentLocation: '22, Jos Road, Kaduna' })
        .end((err, res) => {
          assert.equal(res.statusCode, '404');
          done();
        });
    });
    it('Should return an error message for a user that is not an Admin', done => {
      request(app)
        .put('/api/v1/parcels/1/presentLocation')
        .set({ Authorization: process.env.jwttoken })
        .send({ presentLocation: '22, Jos Road, Kaduna' })
        .end((err, res) => {
          assert.equal(res.statusCode, '401');
          done();
        });
    });
    it('Should return as status code of 401 for an user with a fake or expired token', done => {
      request(app)
        .get('/api/v1/parcels/4/presentLocation')
        .send({ presentLocation: '22, Lagos-Ibadan Expressway' })
        .set({ Authorization: 'Bearer oikffrjufjfurjhrhfkloj' })
        .end((err, res) => {
          assert.equal(res.statusCode, '401');
          done();
        });
    });
  });
});
