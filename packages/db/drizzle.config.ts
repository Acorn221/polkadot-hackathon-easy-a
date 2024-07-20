import type { Config } from "drizzle-kit";

if (!process.env.DATABASE_URL_UNPOOLED) {
  throw new Error("Missing DATABASE_URL");
}

export default {
  schema: "./src/schema.ts",
  dialect: "postgresql",
  dbCredentials: { url: process.env.DATABASE_URL_UNPOOLED },
  tablesFilter: ["t3turbo_*"],
} satisfies Config;
