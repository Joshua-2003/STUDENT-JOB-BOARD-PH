import db from '../index.js';
import bcrypt from "bcrypt";
import { eq } from 'drizzle-orm';

import { studentTable } from '../db/schemas/studentsTable.js';
import { companyTable } from '../db/schemas/companyTable.js';

export const signUp = async (userData) => {
    try {
        if (!['STUDENT', 'EMPLOYER'].includes(userData.type)) {
            throw new Error('Invalid user type');
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
        /**
         * Handle unique constraint error
         * 23505 is the Postgres error code for unique violation
        */          
        if (error.code === '23505') {
            throw new Error('Email already registered');
        }

        throw error;
    }
};
