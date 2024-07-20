import { sql } from "drizzle-orm";
import {
  index,
  serial,
  timestamp,
  uuid,
  pgTableCreator,
} from "drizzle-orm/pg-core";


export const pgTable = pgTableCreator((name) => `linkedout_${name}`);

const timestampFields = () => ({
  createdAt: timestamp("created_at", {
    mode: "date",
    withTimezone: true,
  })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: timestamp("updated_at", 
  {
    mode: "date",
    withTimezone: true,
  })
    .$onUpdate(() => sql`CURRENT_TIMESTAMP`),
});

export const user = pgTable(
  "user",
  {
    id: serial("id").primaryKey(),
    client_id: uuid("client_id").notNull().default(sql`gen_random_uuid()`),
    ...timestampFields(),
  },
  (user) => ({
    idIdx: index("user_id_idx").on(user.id),
    clientIdIdx: index("user_client_id_idx").on(user.client_id),
  }),
);

export type User = typeof user.$inferSelect;
export type UserInsert = typeof user.$inferInsert;
