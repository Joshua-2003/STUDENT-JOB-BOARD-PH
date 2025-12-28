import express from 'express';
import * as authController from '../controller/authController.js';

import { signUpValidator, loginValidator, handleValidationErrors } from '../validator/authValidator.js';

import upload from '../middleware/fileHandler.js';
import { requireAuth } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/signup', upload.single('resume_url'), signUpValidator, handleValidationErrors, authController.handleSignUp);
router.post('/login', loginValidator, handleValidationErrors, authController.handleLogin);
router.post('/logout', authController.handleLogout);
router.get("/me", requireAuth, authController.getMe);

export default router;