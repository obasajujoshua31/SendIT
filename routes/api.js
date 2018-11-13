import express from 'express';
import { check, validationResult } from 'express-validator/check';
import {
  getOrderByUserId,
  getOrderById,
  cancelOrderById,
  addNewOrder,
  getAllOrders,
} from '../data/methods';

const router = express.Router();
router.get('/', (req, res) => {
  const message = getAllOrders();
  if (message.length === 0) {
    res.send({
      status: 404,
      error: 'No parcels are found',
    });
    return;
  }
  res.send({
    status: 200,
    data: message,
  });
});
router.get('/users/:userId/parcels', (req, res) => {
  const message = getOrderByUserId(+req.params.userId);
  if (message.length === 0) {
    res.status(404).send({
      status: 404,
      error: 'The User has no Parcels',
    });
    return;
  }
  res.send({
    status: 200,
    data: message,
  });
});
router.get('/parcels/:parcelId', (req, res) => {
  const message = getOrderById(+req.params.parcelId);
  if (message.length === 0) {
    res.status(404).send({
      status: 404,
      error: 'The Parcel cannot be found',
    });
    return;
  }
  res.send({
    status: 200,
    data: message,
  });
});
router.post('/parcels', [
  check('placedBy').isLength({ min: 1 }).withMessage('Placeby cannot be empty'),
  check('weight').isLength({ min: 1 }).withMessage('Weight field cannot be empty'),
  check('weightMetric').isLength({ min: 1 }).withMessage('Please fill out weight metrics'),
  check('from').isLength({ min: 1 }).withMessage('Your pick up location cannot be empty'),
  check('to').isLength({ min: 1 }).withMessage('Your destination is required'),
],
(req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).send({
      status: 400,
      error: 'All fields must be filled',
      errors: errors.array(),
    });
  } else {
    const {
      placeBy, weight, weightMetric, from, to,
    } = req.body;
    const newOrder = {
      placeBy, weight, weightMetric, from, to,
    };
    const message = addNewOrder(newOrder);
    if (message.length === 0) {
      res.status(599).send({
        status: 599,
        error: 'Was unable to connect to the internet',
      });
      return;
    }
    res.send({
      status: 201,
      data: message,
    });
  }
});
router.put('/parcels/:orderId/cancel', (req, res) => {
  const { orderId } = req.params;
  const message = cancelOrderById(+orderId);
  if (message.length === 0) {
    res.status(404).send({
      status: 404,
      error: 'Cannot find the Order ',
    });
    return;
  }
  res.send({
    status: 200,
    data: message,
  });
});

export default router;
