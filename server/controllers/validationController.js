import { check, validationResult } from 'express-validator/check';

export default [

  check('placedBy').isLength({ min: 1 }).withMessage('Placeby cannot be empty'),
  check('weight').isLength({ min: 1 }).withMessage('Weight field cannot be empty'),
  check('weightMetric').isLength({ min: 1 }).withMessage('Please fill out weight metrics'),
  check('from').isLength({ min: 1 }).withMessage('Your pick up location cannot be empty'),
  check('to').isLength({ min: 1 }).withMessage('Your destination is required'),
  (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.status(400).send({
        status: 400,
        error: 'Some credentials are blank',
      });
      return;
    }
    res.send({
      status: 201,
      message: 'order created',
    });
  },
];
