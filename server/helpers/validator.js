import { check, validationResult } from 'express-validator/check';

const parcelValidator = [
  check('placedBy')
    .isLength({ min: 1 })
    .withMessage('Placeby cannot be empty'),
  check('weight')
    .isLength({ min: 1 })
    .withMessage('Weight field cannot be empty'),
  check('weightMetric')
    .isLength({ min: 1 })
    .withMessage('Please fill out weight metrics'),
  check('from')
    .isLength({ min: 1 })
    .withMessage('Your pick up location cannot be empty'),
  check('to')
    .isLength({ min: 1 })
    .withMessage('Your destination is required'),

  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        error: 'Some credentials are blank',
        errors: errors.array(),
      });
    }
    return next();
  },
];
const updatePresentLocationValidator = [
  check('presentLocation')
    .isLength({ min: 1 })
    .withMessage('New destination cannot be blank'),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        error: errors.array(),
      });
    }
    return next();
  },
];
const updateFormValidator = [
  check('destination')
    .isLength({ min: 1 })
    .withMessage('Your new destination cannot be blank'),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        error: errors.array(),
      });
    }
    return next();
  },
];
const signUpFormValidator = [
  check('firstName')
    .isLength({ min: 1 })
    .withMessage('First Name cannot be blank'),
  check('lastName')
    .isLength({ min: 1 })
    .withMessage('Last name cannot be blank'),
  check('email')
    .isLength({ min: 1 })
    .withMessage('Email cannot be blank'),
  check('password')
    .isLength({ min: 1 })
    .withMessage('Password is required'),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        error: errors.array(),
      });
    }
    return next();
  },
];

export default {
  parcelValidator,
  updatePresentLocationValidator,
  updateFormValidator,
  signUpFormValidator,
};
