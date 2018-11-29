import express from 'express';
import AuthController from '../controllers/authController';
import validator from '../helpers/validator';

const router = express.Router();

router.post(
  '/signup',
  validator.signUpFormValidator,
  AuthController.signUpUser
);
router.post('/login', AuthController.signInUser);

export default router;
