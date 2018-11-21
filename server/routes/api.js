import express from 'express';
import ParcelController from '../controllers/parcelController';
import validator from '../helpers/validator';
import JwtAuthenticate from '../helpers/jwtAuthenticate';

const router = express.Router();
router.get('/parcels', ParcelController.getAllParcels);
router.get('/users/:userId/parcels', ParcelController.getParcelsByUserId);
router.get('/parcels/:parcelId', ParcelController.getParcelsByParcelId);
router.post(
  '/parcels',
  validator.parcelValidator,
  ParcelController.postNewParcelOrder
);
router.put('/parcels/:parcelId/cancel', ParcelController.cancelParcelOrderById);
router.put(
  '/parcels/:parcelId/update',
  validator.updateFormValidator,
  ParcelController.updateParcelOrderById
);
router.put(
  '/parcels/:parcelId/changeLocation',
  validator.updatePresentLocationValidator,
  JwtAuthenticate.isAdmin,
  ParcelController.changeParcelPresentLocationByAdminById
);
export default router;
