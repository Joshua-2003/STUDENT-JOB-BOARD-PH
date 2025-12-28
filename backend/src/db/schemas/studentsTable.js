import { integer, uuid, pgTable, varchar, text, timestamp } from "drizzle-orm/pg-core";

import { userTypeEnum } from "../enums/userEnums.js";
import { boolean } from "drizzle-orm/gel-core";

export const studentTable = pgTable("student", {
    id: uuid('id').primaryKey().defaultRandom(),
    name: varchar({ length: 255 }).notNull(),
    age: integer().notNull(),
    type: userTypeEnum('type').notNull().default('STUDENT'),
    email: varchar({ length: 255 }).notNull().unique(),
    password: varchar({ length: 255 }).notNull(), // Hashed password
    course: varchar({ length: 255 }).notNull(),
    resume_url: text().notNull(),
    created_at: timestamp().defaultNow(),
    updated_at: timestamp().defaultNow().$onUpdateFn(() => new Date()),
    is_deleted: boolean("is_deleted").default(false)
});
