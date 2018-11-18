import express from 'express';
import ParcelController from '../controllers/parcelController';
import validator from '../helpers/validator';
import validatorForm from '../helpers/validateUpdateForm';

const router = express.Router();
router.get('/parcels', ParcelController.getAllParcels);
router.get('/users/:userId/parcels', ParcelController.getParcelsByUserId);
router.get('/parcels/:parcelId', ParcelController.getParcelsByParcelId);
router.post('/parcels', validator, ParcelController.postNewParcelOrder);
router.put('/parcels/:parcelId/cancel', ParcelController.cancelParcelOrderById);
router.put(
  '/parcels/:parcelId/update',
  validatorForm,
  ParcelController.updateParcelOrderById
);
export default router;
