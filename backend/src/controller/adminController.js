import * as adminService from "../services/adminService.js";

export const handleGetAllStudents = async (req, res, next) => {
    try {
        const { page, limit } = req.query;
        const options = { page: parseInt(page) || 1, limit: parseInt(limit) || 10 };
        const result = await adminService.getAllStudents(options);
        res.status(200).json({ success: true, data: result, pagination: result.pagination });
    } catch (error) {
        next(error);
    }
};

