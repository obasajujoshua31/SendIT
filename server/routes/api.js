import express from 'express';
import ParcelController from '../controllers/parcelController';
import UserController from '../controllers/userController';
import validator from '../helpers/validator';
import JwtAuthenticate from '../helpers/jwtAuthenticate';

const router = express.Router();
router.get('/parcels', JwtAuthenticate.isAdmin, ParcelController.getAllParcels);
router.get('/users', JwtAuthenticate.isAdmin, UserController.getAllUsers);
router.get(
  '/users/parcels',
  JwtAuthenticate.isNotAdmin,
  ParcelController.getParcelsByUserId
);
router.get('/parcels/:parcelId', ParcelController.getParcelsByParcelId);
router.post(
  '/parcels',
  validator.parcelValidator,
  ParcelController.postNewParcelOrder
);
router.put('/parcels/:parcelId/cancel', ParcelController.cancelParcelOrderById);
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
  JwtAuthenticate.isAdmin,
  validator.updatePresentLocationValidator,
  ParcelController.changeParcelPresentLocationByAdminById
);
export default router;
