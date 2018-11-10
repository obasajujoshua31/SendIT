import express from 'express';
import { check, validationResult } from 'express-validator/check';
import {
  getAllOrdersByAdmin,
  cancelOrderByAdminById,
  getOrderById,
  getAllUsers,
  getOrderByUserId,
  changePresentLocationByAdminById,
} from '../data/methods';

const router = express.Router();
router.get('/', (req, res) => {
  const message = getAllUsers();
  res.json(message);
});
router.get('/parcels', (req, res) => {
  const message = getAllOrdersByAdmin();
  res.status(200).json(message);
});
router.get('/parcels/:userId', (req, res) => {
  const message = getOrderByUserId(req.params.userId);
  if (!message) {
    res.status(404).send({
      error: 'The User cannot be found',
    });
    return;
  }
  res.status(200).json(message);
});
router.get('/parcels/:userId/:orderId', (req, res) => {
  const { orderId } = req.params;
  const message = getOrderById(orderId);
  if (!message) {
    res.status(404).send({
      error: 'The order cannot be found',
    });
    return;
  }
  res.status(200).json(message);
});
router.get('/:userId/parcels', (req, res) => {
  const { userId } = req.params;
  res.redirect(`/v1/admin/parcels/${userId}`);
});
router.put('/parcels/:userId/:orderId/location', [
  check('presentLocation').isLength({ min: 1 }).withMessage('Location cannot be empty'),
],

(req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).send({
      error: errors.array(),
    });
    return;
  }
  const { orderId } = req.params;
  const { presentLocation } = req.body;
  const message = changePresentLocationByAdminById(orderId, presentLocation);
  if (message === null) {
    res.status(404).send({
      error: 'The order is not found',
    });
    return;
  }
  res.status(200).json(message);
});
router.put('/parcels/:userId/:orderId/cancel', (req, res) => {
  const message = cancelOrderByAdminById(req.params.orderId);
  if (message === null) {
    res.status(404).send({
      error: 'The Order is not found',
    });
    return;
  }
  res.json(message);
});
export default router;
