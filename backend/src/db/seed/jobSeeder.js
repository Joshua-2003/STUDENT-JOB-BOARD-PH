import db from "../../index.js";
import { jobTable } from "../schemas/jobTable.js";
import { companyTable } from "../schemas/companyTable.js";

export const seedJobs = async () => {
    console.log("💼 Seeding jobs...");

    const companies = await db.select().from(companyTable);

    const jobs = companies.slice(0, 10).map((company, index) => ({
        company_id: company.id,
        title: `Job Title ${index + 1}`,
        description: `Job description ${index + 1}`,
        location: "Remote",
        salary: 20000 + index * 1000,
    }));

    await db.insert(jobTable).values(jobs);

    console.log("✅ Jobs seeded");
};
