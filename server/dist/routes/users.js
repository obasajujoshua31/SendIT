'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _check = require('express-validator/check');

var _methods = require('../data/methods');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();
router.get('/', function (req, res) {
  var message = (0, _methods.getAllOrders)();
  if (!message) {
    res.status(404).send({
      error: 'There are no orders'
    });
  }
  res.json(message);
});
router.get('/:userId/parcels', function (req, res) {
  var message = (0, _methods.getOrderByUserId)(req.params.userId);
  if (!message) {
    res.status(404).send({
      error: 'The user has no orders'
    });
  }
  res.status(200).json(message);
});
router.get('/:userId', function (req, res) {
  var userId = req.params.userId;

  res.redirect('/api/v1/users/' + userId + '/parcels');
});
router.get('/:userId/parcels/:orderId', function (req, res) {
  var message = (0, _methods.getOrderById)(req.params.orderId);
  if (!message) {
    res.status(404).send({
      error: 'the Order is not found'
    });
  }
  res.json(message);
});
router.put('/:userId/parcels/:orderId/cancel', function (req, res) {
  var _req$params = req.params,
      userId = _req$params.userId,
      orderId = _req$params.orderId;

  var message = (0, _methods.cancelOrderByUser)(userId, orderId);
  if (message === null) {
    res.status(404).send({
      error: 'The order is not found'
    });
  }
  res.json(message);
});

router.post('/:userId/parcels', [(0, _check.check)('pickUpLocation').isLength({ min: 1 }).withMessage('Pick up location cannot be empty'), (0, _check.check)('destination').isLength({ min: 1 }).withMessage('Destination field cannot be empty')], function (req, res) {
  var errors = (0, _check.validationResult)(req);
  if (!errors.isEmpty()) {
    res.status(400).send({
      error: errors.array()
    });
  }
  var _req$body = req.body,
      pickUpLocation = _req$body.pickUpLocation,
      destination = _req$body.destination;

  var order = {
    pickUpLocation: pickUpLocation, destination: destination
  };
  var message = (0, _methods.addNewOrderByUser)(req.params.userId, order);
  if (!message) {
    res.status(404).send({
      error: 'Something went wrong'
    });
  }
  res.status(200).json(message);
});
router.delete('/:userId/parcels/:orderId/remove', function (req, res) {
  var _req$params2 = req.params,
      userId = _req$params2.userId,
      orderId = _req$params2.orderId;

  var message = (0, _methods.removeOrderByUser)(userId, orderId);
  if (message === null) {
    res.status(404).send({
      error: 'The order is not found'
    });
  }
  res.status(200).json(message);
});
exports.default = router;