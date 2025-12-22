import { eq, sql, desc } from 'drizzle-orm';

import { studentTable } from '../db/schemas/studentsTable.js';
import { companyTable } from '../db/schemas/companyTable.js';
import { adminTable } from '../db/schemas/adminTable.js';
import { jobTable } from '../db/schemas/jobTable.js';
import { applicationTable } from '../db/schemas/applicationTable.js';

import db from '../index.js';

export const getAllStudents = async (options = {}) => {
    
    try {
        const { page, limit } = options;
        const offset = (page - 1) * limit;

        const [countResult] = await db.select({ count: sql`count(*)` }).from(studentTable);
        const totalCount = Number(countResult.count);

        const studentsList = await db
            .select()
            .from(studentTable)
            .orderBy(desc(studentTable.created_at))
            .limit(limit)
            .offset(offset);

        return { 
            studentsList, 
            pagination: {
                page, 
                limit,
                totalCount,
                totalPages: Math.ceil(totalCount / limit)
            } 
        };
    } catch (error) {
        throw error;
    }

}