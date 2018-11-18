import { check, validationResult } from 'express-validator/check';

export default [
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
