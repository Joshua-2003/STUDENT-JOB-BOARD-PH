import { resetDatabase } from "./resetSeeder.js";
import { seedStudents } from "./studentSeeder.js";
import { seedCompanies } from "./companySeeder.js";
import { seedJobs } from "./jobSeeder.js";
import { seedApplications } from "./applicationSeeder.js";
import { seedAdmin } from "./adminSeeder.js";

const runSeed = async () => {
    try {
        await resetDatabase();

        // await seedAdmin();
        await seedStudents();
        await seedCompanies();
        await seedJobs();
        await seedApplications();

        console.log("🌱 All seeders completed successfully");
        process.exit(0);
    } catch (error) {
        console.error("❌ Seeder failed:", error);
        process.exit(1);
    }
};

runSeed();
