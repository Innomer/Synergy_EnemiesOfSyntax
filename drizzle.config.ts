import type { Config } from "drizzle-kit";
import * as dotenv from 'dotenv';

dotenv.config({
  path: '.env.local',
});

export default {
  //make the schema accept all the files in the schema folder even those nested amongst other folders
  schema: "./src/lib/db/schema/**/*.ts",
  driver: "pg",
  dbCredentials: {
    connectionString: process.env["DATABASE_URL"]!,
  },
  out: "./dbMigrations",
} satisfies Config;
