import { pgEnum } from "drizzle-orm/pg-core";

export const userTypeEnum = pgEnum("user_type", [
    "STUDENT",
    "EMPLOYER",
    "ADMIN",
]);