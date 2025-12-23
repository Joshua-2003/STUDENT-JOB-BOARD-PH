import db from "../../index.js";
import { sql } from "drizzle-orm";

export const resetDatabase = async () => {
    console.log("🧹 Resetting database...");

    await db.execute(sql`TRUNCATE TABLE application RESTART IDENTITY CASCADE`);
    await db.execute(sql`TRUNCATE TABLE jobs RESTART IDENTITY CASCADE`);
    await db.execute(sql`TRUNCATE TABLE student RESTART IDENTITY CASCADE`);
    await db.execute(sql`TRUNCATE TABLE company RESTART IDENTITY CASCADE`);

    console.log("✅ Database reset complete");
};
