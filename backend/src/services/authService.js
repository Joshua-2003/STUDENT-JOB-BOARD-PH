import db from '../index.js';
import bcrypt from "bcrypt";
import { eq } from 'drizzle-orm';

import { studentTable } from '../db/schemas/studentsTable.js';
import { companyTable } from '../db/schemas/companyTable.js';

/**
 * Sign up a new user (student or employer)
 * @param {*} userData 
 * @returns {Promise<Object>} newly created user (student or employer)
 */
export const signUp = async (userData) => {
    try {
       
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

export const login = async (email, password) => {
    try {
        
    } catch (error) {
        throw error;
    }
}