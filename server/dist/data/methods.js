'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.changePresentLocationByAdminById = exports.removeOrderByUser = exports.getAllUsers = exports.cancelOrderByAdminById = exports.cancelOrderByUser = exports.addNewOrderByUser = exports.getOrderById = exports.getOrderByUserId = exports.getAllOrders = exports.getAllOrdersByAdmin = undefined;

var _orders = require('./orders');

var _orders2 = _interopRequireDefault(_orders);

var _status = require('./status');

var _status2 = _interopRequireDefault(_status);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var getAllOrdersByAdmin = function getAllOrdersByAdmin() {
  return _orders2.default;
};

var getAllOrders = function getAllOrders() {
  var allOrders = [];
  for (var key in _orders2.default) {
    if ({}.hasOwnProperty.call(_orders2.default, key)) {
      allOrders.push(_orders2.default[key]);
    }
  }
  return allOrders;
};
var getOrderByUserId = function getOrderByUserId(userId) {
  var allOrders = void 0;
  for (var key in _orders2.default) {
    if ({}.hasOwnProperty.call(_orders2.default, key)) {
      if (key === userId) {
        allOrders = [].concat(_toConsumableArray(_orders2.default[key]));
      }
    }
  }
  return allOrders;
};
var getOrderById = function getOrderById(orderId) {
  var allOrders = void 0;
  for (var key in _orders2.default) {
    if ({}.hasOwnProperty.call(_orders2.default, key)) {
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = _orders2.default[key][Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var order = _step.value;

          if (order.id === orderId) {
            allOrders = order;
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
    }
  }
  return allOrders;
};
var addNewOrderByUser = function addNewOrderByUser(userId, order) {
  var pickUpLocation = order.pickUpLocation,
      destination = order.destination;

  var allOrders = getOrderByUserId(userId);
  var index = allOrders.length + 1;
  var newOrder = {
    id: userId + index,
    pickUpLocation: pickUpLocation,
    destination: destination,
    status: _status2.default.ONTRANSIT,
    orderDate: new Date()
  };
  return [].concat(_toConsumableArray(allOrders), [newOrder]);
};
var cancelOrderByUser = function cancelOrderByUser(userId, orderId) {
  var allOrders = getOrderByUserId(userId);
  if (!allOrders) {
    return null;
  }
  var _iteratorNormalCompletion2 = true;
  var _didIteratorError2 = false;
  var _iteratorError2 = undefined;

  try {
    for (var _iterator2 = allOrders[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
      var order = _step2.value;

      if (order.id === orderId) {
        order.status = _status2.default.CANCELLED;
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

var cancelOrderByAdminById = function cancelOrderByAdminById(orderId) {
  var allOrders = getOrderById(orderId);
  if (!allOrders) {
    return null;
  }
  allOrders.status = _status2.default.CANCELLED;
  return allOrders;
};

var getAllUsers = function getAllUsers() {
  var users = [];
  for (var key in _orders2.default) {
    if ({}.hasOwnProperty.call(_orders2.default, key)) {
      users.push(key);
    }
  }
  return users;
};

var removeOrderByUser = function removeOrderByUser(userId, orderId) {
  var allOrders = getOrderByUserId(userId);
  if (!allOrders) {
    return null;
  }
  return allOrders.filter(function (order) {
    return order.id !== orderId;
  });
};
var changePresentLocationByAdminById = function changePresentLocationByAdminById(orderId, presentLocation) {
  var allOrders = getOrderById(orderId);
  if (!allOrders) {
    return null;
  }
  allOrders.location = presentLocation;
  return allOrders;
};
exports.getAllOrdersByAdmin = getAllOrdersByAdmin;
exports.getAllOrders = getAllOrders;
exports.getOrderByUserId = getOrderByUserId;
exports.getOrderById = getOrderById;
exports.addNewOrderByUser = addNewOrderByUser;
exports.cancelOrderByUser = cancelOrderByUser;
exports.cancelOrderByAdminById = cancelOrderByAdminById;
exports.getAllUsers = getAllUsers;
exports.removeOrderByUser = removeOrderByUser;
exports.changePresentLocationByAdminById = changePresentLocationByAdminById;