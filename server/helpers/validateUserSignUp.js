import { check, validationResult } from 'express-validator/check';

export default [
  check('firstName')
    .isLength({ min: 1 })
    .withMessage('First Name cannot be blank'),
  check('lastName')
    .isLength({ min: 1 })
    .withMessage('Last name cannot be blank'),
  check('email')
    .isLength({ min: 1 })
    .withMessage('Email cannot be blank'),
  check('email')
    .isEmail()
    .withMessage('Email is invalid'),
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
