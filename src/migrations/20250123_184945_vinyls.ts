import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE IF NOT EXISTS "vinyls" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "vinyls_locales" (
  	"description" varchar,
  	"notes" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "vinyls_id" integer;
  DO $$ BEGIN
   ALTER TABLE "vinyls_locales" ADD CONSTRAINT "vinyls_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."vinyls"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "vinyls_updated_at_idx" ON "vinyls" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "vinyls_created_at_idx" ON "vinyls" USING btree ("created_at");
  CREATE UNIQUE INDEX IF NOT EXISTS "vinyls_locales_locale_parent_id_unique" ON "vinyls_locales" USING btree ("_locale","_parent_id");
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_vinyls_fk" FOREIGN KEY ("vinyls_id") REFERENCES "public"."vinyls"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_vinyls_id_idx" ON "payload_locked_documents_rels" USING btree ("vinyls_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "vinyls" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "vinyls_locales" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "vinyls" CASCADE;
  DROP TABLE "vinyls_locales" CASCADE;
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_vinyls_fk";
  
  DROP INDEX IF EXISTS "payload_locked_documents_rels_vinyls_id_idx";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN IF EXISTS "vinyls_id";`)
}
