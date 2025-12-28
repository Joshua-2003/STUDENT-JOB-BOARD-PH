DROP TABLE "jobs" CASCADE;--> statement-breakpoint
ALTER TABLE "student" ADD COLUMN "is_deleted" boolean DEFAULT false;