import { pgEnum } from "drizzle-orm/pg-core";

export const jobTypeEnum = pgEnum("job_type", [
    "FULL_TIME",
    "PART_TIME",
    "INTERNSHIP",
]);

export const applicationStatusEnum = pgEnum("application_status", [
    "PENDING",
    "ACCEPTED",
    "REJECTED",
]);