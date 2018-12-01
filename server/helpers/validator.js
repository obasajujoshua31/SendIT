import { check, validationResult } from 'express-validator/check';

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

  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      for (const error of errors.array()) {
        return res.status(400).json({
          success: false,
          error: error.msg,
        });
      }
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
      return res.status(400).json({
        success: false,
        error: errors.array()[0].msg,
      });
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
      return res.status(400).json({
        success: false,
        error: errors.array()[0].msg,
      });
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
    .withMessage('Password must be minimum 5 characters'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      for (const error of errors.array()) {
        return res.status(400).json({
          success: false,
          error: error.msg,
        });
      }
    }
    return next();
  },
];

const statusFormValidator = [
  check('status')
    .isLength({ min: 1 })
    .trim()
    .escape()
    .withMessage('Status cannot be blank'),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        error: errors.array()[0].msg,
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
  statusFormValidator,
};
