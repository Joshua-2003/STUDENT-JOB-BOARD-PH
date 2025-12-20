import { uuid, pgTable, varchar, timestamp, pgEnum } from "drizzle-orm/pg-core";


import { jobsTable } from "./jobTable";
import { studentTable } from "./studentsTable";

import { applicationStatusEnum } from "../enums/jobenums.js";

export const applicationTable = pgTable("application", {
    id: uuid('id').primaryKey().defaultRandom(),
    job_id: uuid('job_id').references(() => jobsTable.id).notNull(),
    student_id: uuid('student_id').references(() => studentTable.id).notNull(),
    status: applicationStatusEnum('status').notNull().default('PENDING'), // e.g., pending, accepted, rejected
    created_at: timestamp().defaultNow(),
});










