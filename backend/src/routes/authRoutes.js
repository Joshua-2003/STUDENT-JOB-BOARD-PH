import express from 'express';
import * as authController from '../controller/authController.js';

import { signUpValidator, handleValidationErrors } from '../validator/authValidator.js';

const router = express.Router();

router.post('/signup', signUpValidator, handleValidationErrors, authController.handleSignUp);

export default router;