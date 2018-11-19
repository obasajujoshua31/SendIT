import express from 'express';
import AuthController from '../controllers/authController';
import validateUserSignUp from '../helpers/validateUserSignUp';

const router = express.Router();

router.post('/signup', validateUserSignUp, AuthController.signUpUser);
router.post('/signin', AuthController.signInUser);

export default router;
