import express from 'express';
import ParcelController from '../controllers/parcelController';
import ValidationController from '../controllers/validationController';

const router = express.Router();
router.get('/parcels', ParcelController.getAllParcels);
router.get('/users/:userId/parcels', ParcelController.getParcelsByUserId);
router.get('/parcels/:parcelId', ParcelController.getParcelsByParcelId);
router.post('/parcels', ValidationController);
router.put('/parcels/:parcelId/cancel', ParcelController.cancelParcelOrderById);

export default router;
