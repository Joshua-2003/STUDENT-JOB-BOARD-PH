import { integer, uuid, pgTable, varchar, text, timestamp, pgEnum } from "drizzle-orm/pg-core";

import { companyTable } from "./companyTable.js";
import { jobTypeEnum } from "../enums/jobenums.js";

export const jobTable = pgTable("jobs", {
    id: uuid('id').primaryKey().defaultRandom(),
    company_id: uuid('company_id').references(() => companyTable.id).notNull(),
    title: varchar({ length: 255 }).notNull(),
    type: jobTypeEnum('type').notNull().default('FULL_TIME'),
    description: text().notNull(),
    location: varchar({ length: 255 }),
    salary: integer(),
    deadline: timestamp(),
    created_at: timestamp().defaultNow(),
    updated_at: timestamp().defaultNow().$onUpdateFn(() => new Date()),
});
