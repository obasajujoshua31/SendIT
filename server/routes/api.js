import express from 'express';
import ParcelController from '../controllers/parcelController';
import validator from '../helpers/validator';

const router = express.Router();
router.get('/parcels', ParcelController.getAllParcels);
router.get('/users/:userId/parcels', ParcelController.getParcelsByUserId);
router.get('/parcels/:parcelId', ParcelController.getParcelsByParcelId);
router.post('/parcels', validator, ParcelController.postNewParcelOrder);
router.put('/parcels/:parcelId/cancel', ParcelController.cancelParcelOrderById);
router.delete('/parcels/:parcelId/remove', ParcelController.removeParcelOrderById);

export default router;
