import { check, validationResult } from 'express-validator/check';
import handleError from './errorHandler';

const parcelValidator = [
  check('weight')
    .isLength({ min: 1 })
    .trim()
    .escape()
    .withMessage('Weight field cannot be empty'),
  check('weightMetric')
    .isIn(['Kg', 'g'])
    .trim()
    .escape()
    .withMessage('Either "Kg" or "g"'),
  check('from')
    .isLength({ min: 1 })
    .trim()
    .escape()
    .withMessage('Your pick up location cannot be empty'),
  check('to')
    .isLength({ min: 1 })
    .trim()
    .escape()
    .withMessage('Your destination is required'),
  check('parcelName')
    .isLength({ min: 1 })
    .trim()
    .escape()
    .withMessage('What is your parcel Name?'),
  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return handleError(errors.array(), 400, next);
    }
    return next();
  },
];
const updatePresentLocationValidator = [
  check('presentLocation')
    .isLength({ min: 1 })
    .trim()
    .escape()
    .withMessage('New destination cannot be blank'),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return handleError(errors.array(), 400, next);
    }
    return next();
  },
];
const updateFormValidator = [
  check('destination')
    .isLength({ min: 1 })
    .withMessage('Your new destination cannot be blank')
    .trim()
    .escape(),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return handleError(errors.array(), 400, next);
    }
    return next();
  },
];
const signUpFormValidator = [
  check('firstName')
    .isLength({ min: 1 })
    .trim()
    .escape()
    .withMessage('First Name cannot be blank'),
  check('lastName')
    .isLength({ min: 1 })
    .trim()
    .escape()
    .withMessage('Last name cannot be blank'),
  check('email')
    .isLength({ min: 1 })
    .trim()
    .escape()
    .withMessage('Email cannot be blank')
    .isEmail()
    .withMessage('Email is not valid'),
  check('password')
    .isLength({ min: 5 })
    .trim()
    .withMessage('Password must be minimum 5 characters'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return handleError(errors.array(), 400, next);
    }
    return next();
  },
];
const adminSignUpFormValidator = [
  check('firstName')
    .isLength({ min: 1 })
    .trim()
    .escape()
    .withMessage('First Name cannot be blank'),
  check('lastName')
    .isLength({ min: 1 })
    .trim()
    .escape()
    .withMessage('Last name cannot be blank'),
  check('email')
    .isLength({ min: 1 })
    .trim()
    .escape()
    .withMessage('Email cannot be blank')
    .isEmail()
    .withMessage('Email is not valid'),
  check('password')
    .isLength({ min: 5 })
    .trim()
    .withMessage('Password must be minimum 5 characters'),
  check('isAdmin')
    .isBoolean()
    .trim()
    .withMessage('is Admin can either be true or false'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return handleError(errors.array(), 400, next);
    }
    return next();
  },
];

const statusFormValidator = [
  check('status')
    .isIn(['TRANSITING', 'DELIVERED'])
    .trim()
    .escape()
    .withMessage('Either Transiting or Delivered, No permission to Cancel'),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return handleError(errors.array(), 400, next);
    }
    return next();
  },
];
const accountVerificationFormValidator = [
  check('email')
    .isEmail()
    .trim()
    .escape()
    .withMessage('Email is not Valid'),
  check('firstName')
    .isLength({ min: 1 })
    .trim()
    .escape()
    .withMessage('First name is required'),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return handleError(errors.array(), 400, next);
    }

    return next();
  },
];
const changePasswordVerificationFormValidator = [
  check('email')
    .isEmail()
    .isLength({ min: 1 })
    .trim()
    .escape()
    .withMessage('Email cannot be blank'),
  check('password')
    .isLength({ min: 5 })
    .trim()
    .escape()
    .withMessage('Password must be minimum 5 characters'),
  check('passwordConfirmation')
    .isLength({ min: 5 })
    .trim()
    .escape()
    .withMessage('Password must  be minimum 5 characters'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return handleError(errors.array(), 400, next);
    }
    return next();
  },
];

export default {
  parcelValidator,
  updatePresentLocationValidator,
  updateFormValidator,
  signUpFormValidator,
  statusFormValidator,
  accountVerificationFormValidator,
  changePasswordVerificationFormValidator,
  adminSignUpFormValidator,
};
