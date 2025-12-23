import db from "../../index.js";
import { applicationTable } from "../schemas/applicationTable.js";
import { studentTable } from "../schemas/studentsTable.js";
import { jobTable } from "../schemas/jobTable.js";

export const seedApplications = async () => {
    console.log("📨 Seeding applications...");

    const students = await db.select().from(studentTable);
    const jobs = await db.select().from(jobTable);

    const applications = [];

    for (let i = 0; i < 10; i++) {
        applications.push({
            student_id: students[i].id,
            job_id: jobs[i].id,
        });
    }

    await db.insert(applicationTable).values(applications);

    console.log("✅ Applications seeded");
};
