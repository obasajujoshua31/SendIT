import { check, validationResult } from 'express-validator/check';

export default [
check('placedBy').isLength({ min: 1 }).withMessage('Placeby cannot be empty'),
check('weight').isLength({ min: 1 }).withMessage('Weight field cannot be empty'),
check('weightMetric').isLength({ min: 1 }).withMessage('Please fill out weight metrics'),
check('from').isLength({ min: 1 }).withMessage('Your pick up location cannot be empty'),
check('to').isLength({ min: 1 }).withMessage('Your destination is required'),

 (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({
            success: false,
            error: 'Some credentials are blank',
            errors: errors.array(),
        });
    }
    next();
},
];
