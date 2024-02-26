import type { Session, User } from "next-auth";
import type { JWT } from "next-auth/jwt";
import { roleLiteral } from "@/lib/db/schema/roleBased";

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    role: roleLiteral;
  }
}

declare module "next-auth" {
  interface Session {
    user: User & {
      id: string;
      name: string;
      image: string;
      role: roleLiteral;
    };
  }
}
