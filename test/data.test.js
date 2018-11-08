import { assert } from 'chai';
import {
  getAllOrdersByAdmin,
  getAllOrders,
  getOrderByUserId,
  getOrderById,
  addNewOrderByUser,
  cancelOrderByUser,
  cancelOrderByAdminById,
  getAllUsers,
  removeOrderByUser,
  changePresentLocationByAdminById,
} from '../data/methods';
import testorders from './testorders.test';

describe('Send IT Application Methods for Routers', () => {
  describe('Test Get All Orders by Admin', () => {
    it('Should return an object', () => {
      assert.isObject(getAllOrdersByAdmin());
    });
    it('Should return three Users', () => {
      assert.equal(Object.keys(getAllOrdersByAdmin()).length, '3');
    });
  });
  describe('Test Get All Orders', () => {
    it('Should return an array', () => {
      assert.isArray(getAllOrders());
    });
    it('Should return a length of 7', () => {
      assert.equal(getAllOrders().length, '7');
    });
  });
  describe('Test Order by User ID', () => {
    it('Should return an array for a valid user', () => {
      assert.isArray(getOrderByUserId('userA'));
    });
    it('Should return a valid result for a valid user', () => {
      assert.isDefined(getOrderByUserId('userA'));
    });
    it('Should return undefined for an invalid user', () => {
      assert.isUndefined(getOrderByUserId('userD'));
    });
    it('Should return an array length of 3 for user A', () => {
      assert.equal(getOrderByUserId('userA').length, '3');
    });
    it('Should return an array length of 2 for user B', () => {
      assert.equal(getOrderByUserId('userB').length, '2');
    });
    it('Should returan an array length of 2 for user C', () => {
      assert.equal(getOrderByUserId('userC').length, '2');
    });
  });
  describe('Test Get Orders By Id', () => {
    it('Should return an object for a valid order ID', () => {
      assert.isDefined(getOrderById('userA1'));
    });
    it('Should return an object for a valid order ID', () => {
      assert.isObject(getOrderById('userA1'));
    });
    it('Should return null for an invalid order Id', () => {
      assert.isUndefined(getOrderById('unknown'));
    });
    it('Should have object properties of key id, pickupLocation, destination and orderDate', () => {
      assert.isTrue(Object.prototype.hasOwnProperty.call(getOrderById('userA1'), 'id'));
      assert.isTrue(Object.prototype.hasOwnProperty.call(getOrderById('userA1'), 'pickUpLocation'));
      assert.isTrue(Object.prototype.hasOwnProperty.call(getOrderById('userA1'), 'destination'));
      assert.isTrue(Object.prototype.hasOwnProperty.call(getOrderById('userA1'), 'orderDate'));
    });
  });
  describe('Test Get all User from Admin', () => {
    it('Should return defined for a get all users', () => {
      assert.isDefined(getAllUsers());
    });
    it('Should return an array for get all users', () => {
      assert.isArray(getAllUsers());
    });
    it('Should return an array length of 3 for get all users', () => {
      assert.equal(getAllUsers().length, '3');
    });
    it('Should return an array containing all the users ', () => {
      assert.includeMembers(getAllUsers(), ['userA', 'userB', 'userC']);
    });
  });
  describe('Test Add new Order by User', () => {
    it('Should return defined for a valid user', () => {
      assert.isDefined(addNewOrderByUser('userA', testorders.testOrder));
    });
    it('Should return an array length of 4 for a valid user A', () => {
      assert.equal(addNewOrderByUser('userA', testorders.testOrder).length, '4');
    });
    it('Should return null for an invalid user', () => {
      assert.isNull(addNewOrderByUser('unknown', testorders.testOrder));
    });
    describe('Test Cancel Order by User', () => {
      it('Should return defined for a valid user', () => {
        assert.isDefined(cancelOrderByUser('userA', 'userA1'));
      });
      it('Should change the status of the order that has been cancelled', () => {
        assert.equal(cancelOrderByUser('userA', 'userA1')[0].status, 'CANCELLED');
      });
      it('Should return null for an invalid user', () => {
        assert.isNull(cancelOrderByUser('unknown', 'userA1'));
      });
    });
    describe('Test Cancel Order by Admin by ID', () => {
      it('Should return defined for a valid order ID', () => {
        assert.isDefined(cancelOrderByAdminById('userA2'));
      });
      it('Should change the status of the order that has been cancelled', () => {
        assert.equal(cancelOrderByAdminById('userA2').status, 'CANCELLED');
      });
      it('Should return null for a non valid orderId', () => {
        assert.isNull(cancelOrderByAdminById('unknown'));
      });
    });
    describe('Test Remove Order by User', () => {
      it('Should return defined for a valid user', () => {
        assert.isDefined(removeOrderByUser('userA', 'userA2'));
      });
      it('Should return an array length of 2 after removing the order', () => {
        assert.equal(removeOrderByUser('userA', 'userA1').length, '2');
      });
    });
    describe('Test Change Present Location By Admin', () => {
      it('Should return defined for a valid user', () => {
        assert.isDefined(changePresentLocationByAdminById('userA1'));
      });
      it('Should add another property present location to the Order', () => {
        assert.isTrue(Object.prototype.hasOwnProperty.call(changePresentLocationByAdminById('userA1', 'badagry'), 'presentLocation'));
        assert.equal(changePresentLocationByAdminById('userA1', 'badagry').presentLocation, 'badagry');
      });
    });
  });
});
