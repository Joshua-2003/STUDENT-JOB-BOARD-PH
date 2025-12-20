import express from 'express';
import * as authController from '../controller/authController.js';

const router = express.Router();

router.post('/signup', authController.handleSignUp);

export default router;