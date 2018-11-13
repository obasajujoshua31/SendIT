'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.cancelOrderById = exports.addNewOrder = exports.getOrderById = exports.getOrderByUserId = exports.getAllOrders = undefined;

var _orders = require('./orders');

var _orders2 = _interopRequireDefault(_orders);

var _status = require('./status');

var _status2 = _interopRequireDefault(_status);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var getAllOrders = function getAllOrders() {
  return _orders2.default;
};
var getOrderByUserId = function getOrderByUserId(userId) {
  var allOrders = [];
  var allTheOrders = [].concat(_toConsumableArray(_orders2.default));
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = allTheOrders[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var order = _step.value;

      if (order.placedBy === userId) {
        allOrders.push(order);
      }
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  return allOrders;
};
var getOrderById = function getOrderById(orderId) {
  var allOrders = [];
  var _iteratorNormalCompletion2 = true;
  var _didIteratorError2 = false;
  var _iteratorError2 = undefined;

  try {
    for (var _iterator2 = _orders2.default[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
      var order = _step2.value;

      if (order.id === orderId) {
        allOrders.push(order);
      }
    }
  } catch (err) {
    _didIteratorError2 = true;
    _iteratorError2 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion2 && _iterator2.return) {
        _iterator2.return();
      }
    } finally {
      if (_didIteratorError2) {
        throw _iteratorError2;
      }
    }
  }

  return allOrders;
};
var addNewOrder = function addNewOrder(order) {
  var placedBy = order.placedBy,
      weight = order.weight,
      weightMetric = order.weightMetric,
      from = order.from,
      to = order.to;

  var lastIndex = getAllOrders.length;
  var newOrder = {
    id: lastIndex + 1,
    from: from,
    placedBy: placedBy,
    weight: weight,
    weightMetric: weightMetric,
    sentOn: new Date().toLocaleString(),
    deliveredOn: '',
    to: to,
    status: _status2.default.PLACED,
    currentLocation: ''
  };
  _orders2.default.push(newOrder);
  return [{
    id: lastIndex + 1,
    message: 'order created'
  }];
};
var cancelOrderById = function cancelOrderById(orderId) {
  var _iteratorNormalCompletion3 = true;
  var _didIteratorError3 = false;
  var _iteratorError3 = undefined;

  try {
    for (var _iterator3 = _orders2.default[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
      var order = _step3.value;

      if (order.id === orderId) {
        order.status = 'CANCELLED';
        return [{
          id: order.id,
          message: 'order cancelled'
        }];
      }
    }
  } catch (err) {
    _didIteratorError3 = true;
    _iteratorError3 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion3 && _iterator3.return) {
        _iterator3.return();
      }
    } finally {
      if (_didIteratorError3) {
        throw _iteratorError3;
      }
    }
  }

  return [];
};
exports.getAllOrders = getAllOrders;
exports.getOrderByUserId = getOrderByUserId;
exports.getOrderById = getOrderById;
exports.addNewOrder = addNewOrder;
exports.cancelOrderById = cancelOrderById;