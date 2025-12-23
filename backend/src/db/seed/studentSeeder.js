import db from "../../index.js";
import { studentTable } from "../schemas/studentsTable.js";
import bcrypt from "bcrypt";

export const seedStudents = async () => {
    console.log("👨‍🎓 Seeding students...");

    const students = [];

    for (let i = 1; i <= 10; i++) {
        students.push({
            name: `Student ${i}`,
            age: 18 + i,
            email: `student${i}@gmail.com`,
            password: await bcrypt.hash("password123", 10),
            course: "BSIT",
            resume_url: `/uploads/resume${i}.pdf`,
        });
    }

    await db.insert(studentTable).values(students);

    console.log("✅ Students seeded");
};
