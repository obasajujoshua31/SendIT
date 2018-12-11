import express from 'express';
import UserController from '../controllers/userController';
import validator from '../helpers/validator';

const router = express.Router();
router.post(
  '/recovery',
  validator.accountVerificationFormValidator,
  UserController.postUserDetailsForVerification
);
router.put(
  '/recovery',
  validator.changePasswordVerificationFormValidator,
  UserController.changeUserPassword
);

export default router;
