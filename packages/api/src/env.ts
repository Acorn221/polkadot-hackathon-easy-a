import { z } from "zod";

const envSchema = z.object({
  NODE_ENV: z
		.enum(["development", "production", "test"])
		.default("development"),
  DATABASE_URL: z.string(),
	SUBSCAN_API_KEY: z.string(),
});

// Validate `process.env` against our schema
// and return the result
export const env = envSchema.parse(process.env);

// Export the result so we can use it in the project
