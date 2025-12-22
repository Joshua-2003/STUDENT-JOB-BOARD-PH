import { body, validationResult} from 'express-validator';

export const signUpValidator = [
  // Common fields
  body('name')
    .notEmpty().withMessage('Name is required')
    .isLength({ max: 255 }).withMessage('Name is too long'),

  body('email')
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Email is invalid'),

  body('password')
    .notEmpty().withMessage('Password is required')
    .isLength({ min: 8 }).withMessage('Password must be at least 8 characters'),

  body('confirmPassword')
    .notEmpty().withMessage('Confirm password is required')
    // Custom validator to match password
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error('Passwords do not match');
      }
      return true;
    }),

  body('type')
    .notEmpty().withMessage('User type is required')
    .isIn(['STUDENT', 'EMPLOYER']).withMessage('Invalid user type'),

  // Only required if student
  body('age')
    .if(body('type').equals('STUDENT'))
    .notEmpty().withMessage('Age is required for students')
    .isInt({ min: 18 }).withMessage('Age must be 18 or older'),

  body('course')
    .if(body('type').equals('STUDENT'))
    .notEmpty().withMessage('Course is required for students'),

  body('resume_url').custom((value, { req }) => {
    if (req.body.type === 'STUDENT' && !req.file) {
      throw new Error('Resume is required for students');
    }
    return true;
  }),

  // Only required if company
  body('description')
    .if(body('type').equals('EMPLOYER'))
    .notEmpty().withMessage('Description is required for companies'),

  body('location')
    .if(body('type').equals('EMPLOYER'))
    .notEmpty().withMessage('Location is required for companies'),
];

export const loginValidator = [
  body('email')
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Email is invalid'),

  body('password')
    .notEmpty().withMessage('Password is required'),
  
  body('type')
    .notEmpty().withMessage('User type is required')
    .isIn(['STUDENT', 'EMPLOYER', 'ADMIN']).withMessage('Invalid user type'),

];

export const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const formattedErrors = {};

    errors.array().forEach((error) => {
      // If field-level, map by field name
      if (error.param) {
        formattedErrors[error.param] = error.msg;
      } else {
        // Global errors can be added under a special key
        formattedErrors.global = error.msg;
      }
    });

    return res.status(400).json({
      success: false,
      error: {
        code: 'VALIDATION_ERROR',
        message: 'Validation failed',
        errors: formattedErrors,
      },
    });
  }

  next();
};