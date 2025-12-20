import { integer, uuid, pgTable, varchar, text, timestamp } from "drizzle-orm/pg-core";

import { userTypeEnum } from "../enums/userEnums.js";

export const companyTable = pgTable("company", {
    id: uuid('id').primaryKey().defaultRandom(),
    name: varchar({ length: 255 }).notNull(),
    type: userTypeEnum('type').notNull().default('EMPLOYER'),
    description: text().notNull(),
    location: varchar({ length: 255 }).notNull(),
    email: varchar({ length: 255 }).notNull().unique(),
    password: varchar({ length: 255 }).notNull(), // Hashed password
    created_at: timestamp().defaultNow(),
    updated_at: timestamp().defaultNow().$onUpdateFn(() => new Date()),
});
