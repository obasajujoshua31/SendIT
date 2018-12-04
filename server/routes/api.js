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
router.put(
  '/parcels/:parcelId/cancel',
  JwtAuthenticate.isNotAdmin,
  ParcelController.cancelParcelOrderById
);
router.put(
  '/parcels/:parcelId/destination',
  validator.updateFormValidator,
  ParcelController.updateParcelOrderById
);
router.put(
  '/parcels/:parcelId/status',
  JwtAuthenticate.isAdmin,
  validator.statusFormValidator,
  ParcelController.changeParcelStatusByAdminById
);
router.put(
  '/parcels/:parcelId/presentLocation',
  validator.updatePresentLocationValidator,
  JwtAuthenticate.isAdmin,
  ParcelController.changeParcelPresentLocationByAdminById
);
export default router;
