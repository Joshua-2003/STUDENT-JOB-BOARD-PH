import db from '../index.js';
import bcrypt from "bcrypt";
import { eq } from 'drizzle-orm';

import { studentTable } from '../db/schemas/studentsTable.js';

export const signUp = async (userData) => {
    try {
        // Check if user exists
        const [existingUser] = await db
            .select()
            .from(studentTable)
            .where(eq(studentTable.email, userData.email))
            .limit(1);

        if (existingUser) {
            throw new Error("User already exists");
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(userData.password, 10);

        // Clean data
        const cleanData = {
            name: userData.name,
            age: userData.age,
            email: userData.email,
            course: userData.course,
            resume_url: userData.resume_url,
            password: hashedPassword,
        };

        // Insert new user
        const [result] = await db.insert(studentTable).values(cleanData).returning({ insertingName: studentTable.name, insertingEmail: studentTable.email });

        console.log("User signed up successfully:", result); // For debugging
        return result;
    } catch (error) {
        console.error("Error during sign-up:", error); // For debugging
        throw error; // Important for caller to know
    }
};