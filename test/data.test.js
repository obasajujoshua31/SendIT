import { assert } from 'chai';
import {
  getAllOrders,
  getOrderByUserId,
  getOrderById,
  addNewOrder,
  cancelOrderById,
} from '../data/methods';
import testOrder from './testorders.test';

describe('Test For All methods', () => {
  describe('Test for Get All Orders', () => {
    it('Should return an array of length of 6', () => {
      assert.equal(getAllOrders().length, '6');
      assert.isArray(getAllOrders());
    });
  });
  describe('Test for Order By User Id', () => {
    it('Should return an array of parcels orders by a user', () => {
      assert.equal(getOrderByUserId(13).length, '1');
    });
    it('Should return an array of two for user 11', () => {
      assert.equal(getOrderByUserId(11).length, '2');
      assert.isArray(getOrderByUserId(11));
    });
    it('Should return an undefined for an unknown user', () => {
      assert.isEmpty(getOrderByUserId(23));
    });
  });
  describe('Test for Get Orders By Id', () => {
    it('Should return an array for a known parcel', () => {
      assert.isDefined(getOrderById(1));
      assert.equal(getOrderById(1).length, '2');
    });
    it('Should return an error for an unknown parcel', () => {
      assert.isEmpty(getOrderById(9));
    });
  });
  describe('Test for Add new Order', () => {
    it('Should return a message order created', () => {
      assert.isDefined(addNewOrder(testOrder));
      assert.equal(addNewOrder(testOrder.testOrder)[0].message, 'order created');
    });
  });
  describe('Test for Cancel Order By ID', () => {
    it('Should return a message order cancelled', () => {
      assert.isDefined(cancelOrderById(1));
      assert.equal(cancelOrderById(1)[0].message, 'order cancelled');
    });
    it('Should return undefined for an invalid order Id', () => {
      assert.isEmpty(cancelOrderById(34));
    });
  });
});
