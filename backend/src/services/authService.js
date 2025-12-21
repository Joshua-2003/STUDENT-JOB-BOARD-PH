import db from '../index.js';
import bcrypt from "bcrypt";
import { eq } from 'drizzle-orm';

import { studentTable } from '../db/schemas/studentsTable.js';
import { companyTable } from '../db/schemas/companyTable.js';
import { adminTable } from '../db/schemas/adminTable.js';

import jwt from 'jsonwebtoken';
import { AppError } from '../utils/error.js';

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

/**
 * @param {*} email 
 * @param {*} password 
 * @param {*} type 
 * @returns {Promise<Object>} token and user data
 */
export const login = async (email, password, type) => {
    try {
        // Map user type to table
        const tableMap = {
            EMPLOYER: companyTable,
            STUDENT: studentTable,
            ADMIN: adminTable,
        };

        const table = tableMap[type];

        // Fetch user
        const [user] = await db
            .select()
            .from(table)
            .where(eq(table.email, email));

        if (!user) {
            throw new AppError("User not found", 404);
        }

        // Check password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            throw new AppError("Invalid credentials", 401);
        }

        // Generate token
        const token = jwt.sign(
            { id: user.id, email: user.email, type: user.type },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRES_IN }
        );

        return { token, user };

    } catch (error) {
        throw error;
    }
};
