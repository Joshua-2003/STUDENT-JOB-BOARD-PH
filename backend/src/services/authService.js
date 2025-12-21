import db from '../index.js';
import bcrypt from "bcrypt";
import { eq } from 'drizzle-orm';

import { studentTable } from '../db/schemas/studentsTable.js';
import { companyTable } from '../db/schemas/companyTable.js';

import { AppError } from '../utils/error.js';

export const signUp = async (userData) => {
    try {
        if (!['STUDENT', 'EMPLOYER'].includes(userData.type)) {
            throw new AppError('Invalid user type', 400);
        }

        const hashedPassword = await bcrypt.hash(userData.password, 10);

        if (userData.type === 'EMPLOYER') {
            const cleanData = {
                name: userData.name,
                email: userData.email,
                description: userData.description,
                location: userData.location,
                type: userData.type,
                password: hashedPassword,
            };

            const [result] = await db
                .insert(companyTable)
                .values(cleanData)
                .returning({ name: companyTable.name, email: companyTable.email });

            return result;
        }

        // STUDENT
        const cleanData = {
            name: userData.name,
            age: userData.age,
            email: userData.email,
            course: userData.course,
            resume_url: userData.resume_url,
            type: userData.type,
            password: hashedPassword,
        };

        const [result] = await db
            .insert(studentTable)
            .values(cleanData)
            .returning({ name: studentTable.name, email: studentTable.email });

        return result;

    } catch (error) {
        throw error;
    }
};
