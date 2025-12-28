import { eq, sql, desc } from 'drizzle-orm';

import { studentTable } from '../db/schemas/studentsTable.js';
import { companyTable } from '../db/schemas/companyTable.js';
import { adminTable } from '../db/schemas/adminTable.js';
import { jobTable } from '../db/schemas/jobTable.js';
import { applicationTable } from '../db/schemas/applicationTable.js';

import db from '../index.js';

export const getAllStudents = async (options = {}) => {
    
    try {
        const { page, limit, search, sortBy, sortOrder } = options;
        // Define how many data to skip based on the current page and limit
        const offset = (page - 1) * limit;

        // Build where clause for search functionality
        const whereClause = search
            ? sql`${studentTable.name} ILIKE ${'%' + search + '%'}`
            : undefined;

        // Build order by clause for sorting functionality
        const orderBy =
            sortOrder === 'asc'
                ? studentTable[sortBy]
                : desc(studentTable[sortBy]);

        // Get total count for pagination
        const [{ count }] = await db
            .select({ count: sql`count(*)` })
            .from(studentTable)
            .where(whereClause);


        // const [countResult] = await db.select({ count: sql`count(*)` }).from(studentTable);
        // const totalCount = Number(countResult.count);

        const studentsList = await db
            .select()
            .from(studentTable)
            .where(whereClause)
            .orderBy(orderBy)
            .limit(limit)
            .offset(offset);


        return {
            data: studentsList,
            pagination: {
                page,
                limit,
                totalCount: Number(count),
                totalPages: Math.ceil(count / limit),
            },
        };

    } catch (error) {
        throw error;
    }

}

/**
 * Update material details
 * @param {string} studentId - Material ID
 * @param {Object} updateData - Update data
 * @returns {Promise<Object>} Updated student
 */
export const updateStudent = async (studentId, updateData) => {
    try {
        const updateFields = {};

        if (updateData.name !== undefined) updateFields.name = updateData.name;
        if (updateData.email !== undefined) updateFields.email = updateData.email;
        if (updateData.course !== undefined) updateFields.course = updateData.course;

        updateFields.updated_at = new Date();

        console.log("Update fields", updateFields)

        const [updatedStudent] = await db
            .update(studentTable)
            .set(updateFields)
            .where(eq(studentTable.id, studentId))
            .returning();

        console.log("Updated Student", updatedStudent)

        return updatedStudent;

    } catch (error) {
        throw(error)
    }
};