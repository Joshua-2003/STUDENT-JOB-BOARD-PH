import db from "../../index.js";
import { companyTable } from "../schemas/companyTable.js";
import bcrypt from "bcrypt";

export const seedCompanies = async () => {
    console.log("🏢 Seeding companies...");

    const companies = [];

    for (let i = 1; i <= 10; i++) {
        companies.push({
            name: `Company ${i}`,
            email: `company${i}@gmail.com`,
            password: await bcrypt.hash("password123", 10),
            description: `Description for company ${i}`,
            location: "Manila",
        });
    }

    await db.insert(companyTable).values(companies);

    console.log("✅ Companies seeded");
};
