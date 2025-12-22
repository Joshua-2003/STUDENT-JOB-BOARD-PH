import express from 'express';
import * as adminController from "../controller/adminController.js";

import { requireAuth, authorize } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/getStudents', requireAuth, authorize('ADMIN'), adminController.handleGetAllStudents);

export default router;