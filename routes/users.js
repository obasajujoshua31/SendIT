import express from 'express';
import { check, validationResult } from 'express-validator/check';
import {
  getOrderByUserId,
  getOrderById,
  cancelOrderByUser,
  addNewOrderByUser,
  removeOrderByUser,
  getAllOrders,
} from '../data/methods';

const router = express.Router();
router.get('/', (req, res) => {
  const message = getAllOrders();
  if (!message) {
    res.status(404).send({
      error: 'There are no orders',
    });
    return;
  }
  res.json(message);
});
router.get('/:userId/parcels', (req, res) => {
  const message = getOrderByUserId(req.params.userId);
  if (!message) {
    res.status(404).send({
      error: 'The user has no orders',
    });
    return;
  }
  res.json(message);
});
router.get('/:userId/parcels/:orderId', (req, res) => {
  const message = getOrderById(req.params.orderId);
  if (!message) {
    res.status(404).send({
      error: 'the Order is not found',
    });
    return;
  }
  res.json(message);
});
router.post('/:userId/parcels', [
  check('pickUpLocation').isLength({ min: 1 }).withMessage('Pick up location cannot be empty'),
  check('destination').isLength({ min: 1 }).withMessage('Destination field cannot be empty'),
],
(req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).send({
      error: errors.array(),
    });
  } else {
    const { pickUpLocation, destination } = req.body;
    const order = {
      pickUpLocation, destination,
    };
    const message = addNewOrderByUser(req.params.userId, order);
    if (!message) {
      res.status(404).send({
        error: 'Something went wrong',
      });
      return;
    }
    res.json(message);
  }
});
router.delete('/:userId/parcels/:orderId/remove', (req, res) => {
  const { userId, orderId } = req.params;
  const message = removeOrderByUser(userId, orderId);
  if (!message) {
    res.status(404).send({
      error: 'The order is not found',
    });
    return;
  }
  res.json(message);
});
router.put('/:userId/parcels/:orderId/cancel', (req, res) => {
  const { userId, orderId } = req.params;
  const message = cancelOrderByUser(userId, orderId);
  if (!message) {
    res.status(404).send({
      error: 'The order is not found',
    });
    return;
  }
  res.json(message);
});
export default router;
