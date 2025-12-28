import * as adminService from "../services/adminService.js";

export const handleGetAllStudents = async (req, res, next) => {
    try {
        const { page, limit, search, sortBy, sortOrder } = req.query;
        const options = { 
            page: parseInt(page) || 1, 
            limit: parseInt(limit) || 10, 
            search: search || '', 
            sortBy: sortBy || 'created_at', 
            sortOrder: sortOrder || 'desc' 
        };
        const result = await adminService.getAllStudents(options);
        res.status(200).json({ success: true, data: result });
    } catch (error) {
        next(error);
    }
};

/**
 * Update Student
 * 
 * PUT /api/admin/updateStudent
 */
export const handleUpdateStudent = async (req, res, next) => {
    try {
        const { id } = req.params;
        const updateData = req.body;
        
        const updatedStudent = await adminService.updateStudent(id, updateData);

        res.status(200).json({
            success: true,
            message: "Student updated successfully",
            data: updatedStudent,
        });
    } catch (error) {
        next(error)
    }
};

