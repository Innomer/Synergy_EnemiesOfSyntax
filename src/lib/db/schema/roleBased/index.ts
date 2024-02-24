import { decimal, integer, pgEnum, serial } from "drizzle-orm/pg-core";
import { timestamp, pgTable, text } from "drizzle-orm/pg-core";
import {
  type InferSelectModel,
  type InferInsertModel,
  relations,
} from "drizzle-orm";
export const rolesEnum = pgEnum("roles", ["admin", "user"]);
export type roleLiteral = Pick<SelectUser, "role">["role"];

export const users = pgTable("user", {
  id: text("id").notNull().primaryKey(),
  name: text("name"),
  email: text("email").notNull().unique(),
  password: text("password"),
  emailVerified: timestamp("emailVerified", { mode: "date" }),
  image: text("image"),
  createdAt: timestamp("created_at", { mode: "date", withTimezone: true })
    .notNull()
    .defaultNow(),
  role: rolesEnum("role").notNull().default("user"),
});
export type SelectUser = InferSelectModel<typeof users>;
export type InsertUser = InferInsertModel<typeof users>;

export const usersRelations = relations(users, ({ one, many }) => ({
  userToProfile: one(profile, {
    fields: [users.id],
    references: [profile.userId],
  }),
}));

export const profile = pgTable("profile", {
  id: serial("id").notNull().primaryKey(),
  userId: text("user_id")
    .notNull()
    .unique()
    .references(() => users.id, { onDelete: "cascade" }),
  phone: text("phone"),
  age: integer("age"),
  createdAt: timestamp("created_at", { mode: "date", withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp("updated_at", { mode: "date", withTimezone: true })
    .defaultNow()
    .notNull(),
});
