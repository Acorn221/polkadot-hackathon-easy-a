DO $$ BEGIN
 CREATE TYPE "public"."reaction_type" AS ENUM('none', 'poop');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "linkedout_post" (
	"id" serial PRIMARY KEY NOT NULL,
	"linkedin_post_id" varchar(42) NOT NULL,
	"created_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp with time zone,
	CONSTRAINT "linkedout_post_linkedin_post_id_unique" UNIQUE("linkedin_post_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "linkedout_reaction" (
	"user_id" integer NOT NULL,
	"post_id" integer NOT NULL,
	"reaction" "reaction_type" DEFAULT 'none' NOT NULL,
	"created_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp with time zone,
	CONSTRAINT "id" PRIMARY KEY("user_id","post_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "linkedout_user" (
	"id" serial PRIMARY KEY NOT NULL,
	"client_id" uuid DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp with time zone
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "linkedout_user_info" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" serial NOT NULL,
	"email" varchar(255),
	"name" varchar(255),
	"image" text,
	"created_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp with time zone
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "linkedout_reaction" ADD CONSTRAINT "linkedout_reaction_user_id_linkedout_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."linkedout_user"("id") ON DELETE set null ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "linkedout_reaction" ADD CONSTRAINT "linkedout_reaction_post_id_linkedout_post_id_fk" FOREIGN KEY ("post_id") REFERENCES "public"."linkedout_post"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "linkedout_user_info" ADD CONSTRAINT "linkedout_user_info_user_id_linkedout_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."linkedout_user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "post_id_idx" ON "linkedout_post" ("id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "post_linkedin_post_id_idx" ON "linkedout_post" ("linkedin_post_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "reaction_user_id_idx" ON "linkedout_reaction" ("user_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "reaction_post_id_idx" ON "linkedout_reaction" ("post_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "user_id_idx" ON "linkedout_user" ("id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "user_client_id_idx" ON "linkedout_user" ("client_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "user_info_id_idx" ON "linkedout_user_info" ("id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "user_info_user_id_idx" ON "linkedout_user_info" ("user_id");