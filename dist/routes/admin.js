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
  var message = (0, _methods.getAllUsers)();
  res.json(message);
});
router.get('/parcels', function (req, res) {
  var message = (0, _methods.getAllOrdersByAdmin)();
  res.status(200).json(message);
});
router.get('/parcels/:userId', function (req, res) {
  var message = (0, _methods.getOrderByUserId)(req.params.userId);
  if (!message) {
    res.status(404).send({
      error: 'The User cannot be found'
    });
    return;
  }
  res.status(200).json(message);
});
router.get('/parcels/:userId/:orderId', function (req, res) {
  var orderId = req.params.orderId;

  var message = (0, _methods.getOrderById)(orderId);
  if (!message) {
    res.status(404).send({
      error: 'The order cannot be found'
    });
    return;
  }
  res.status(200).json(message);
});
router.get('/:userId/parcels', function (req, res) {
  var userId = req.params.userId;

  res.redirect('/v1/admin/parcels/' + userId);
});
router.put('/parcels/:userId/:orderId/location', [(0, _check.check)('presentLocation').isLength({ min: 1 }).withMessage('Location cannot be empty')], function (req, res) {
  var errors = (0, _check.validationResult)(req);
  if (!errors.isEmpty()) {
    res.status(400).send({
      error: errors.array()
    });
    return;
  }
  var orderId = req.params.orderId;
  var presentLocation = req.body.presentLocation;

  var message = (0, _methods.changePresentLocationByAdminById)(orderId, presentLocation);
  if (message === null) {
    res.status(404).send({
      error: 'The order is not found'
    });
    return;
  }
  res.status(200).json(message);
});
router.put('/parcels/:userId/:orderId/cancel', function (req, res) {
  var message = (0, _methods.cancelOrderByAdminById)(req.params.orderId);
  if (message === null) {
    res.status(404).send({
      error: 'The Order is not found'
    });
    return;
  }
  res.json(message);
});
exports.default = router;