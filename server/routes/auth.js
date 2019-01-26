import express from 'express';
import AuthController from '../controllers/authController';
import validator from '../helpers/validator';
import JwtAuthenticate from '../helpers/jwtAuthenticate';

const router = express.Router();

router.post(
  '/signup',
  validator.signUpFormValidator,
  AuthController.signUpUser
);
router.post(
  '/signup/admin',
  JwtAuthenticate.jwtVerifyToken,
  JwtAuthenticate.isAdmin,
  validator.adminSignUpFormValidator,
  AuthController.signUpUserByAdmin
);
router.post('/login', AuthController.signInUser);
export default router;
