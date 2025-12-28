import express from 'express';
import * as adminController from "../controller/adminController.js";

import { requireAuth, authorize } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/getStudents', requireAuth, authorize('ADMIN'), adminController.handleGetAllStudents);
router.put('/updateStudent/:id', requireAuth, authorize('ADMIN'), adminController.handleUpdateStudent);

export default router;