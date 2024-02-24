import { db } from "@/lib/db";
import { users } from "@/lib/db/schema/roleBased";

import { getServerSession, type NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import "dotenv/config";
import { eq } from "drizzle-orm";
import bcrypt, { genSaltSync } from "bcrypt";

export const authOptions: NextAuthOptions = {
  adapter: DrizzleAdapter(db),
  debug: process.env.NODE_ENV !== "production",
  secret: process.env["NEXTAUTH_SECRET"]!,
  session: {
    strategy: "jwt",
  },
  providers: [
    GoogleProvider({
      clientId: process.env["GOOGLE_CLIENT_ID"]!,
      clientSecret: process.env["GOOGLE_CLIENT_SECRET"]!,
      allowDangerousEmailAccountLinking: true,
    }),
    CredentialsProvider({
      credentials: {
        email: { label: "Email", type: "email", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("No credentials sent");
        }
        const user = (
          await db
            .select()
            .from(users)
            .where(eq(users.email, credentials.email))
        )[0];
        if (!user) {
          throw new Error("User not found");
        }
        const match = await bcrypt.compare(
          credentials.password,
          user.password || ""
        );
        if (user.password && !match) {
          throw new Error("Invalid credentials");
        }
        if (user.password && match) {
          return {
            id: user.id,
            name: user.name,
            email: user.email,
            image: user.image,
            role: user.role,
          };
        }
        if (!user.password) {
          const hashedPassword = await bcrypt.hash(
            credentials.password,
            genSaltSync(10)
          );
          await db
            .update(users)
            .set({ password: hashedPassword })
            .where(eq(users.email, credentials.email));
          return {
            id: user.id,
            name: user.name,
            email: user.email,
            image: user.image,
            role: user.role,
          };
        }

        return {
          id: user.id,
          name: user.name,
          email: user.email,
          image: user.image,
          role: user.role,
        };
      },
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.user.name = token.name as string;
        session.user.email = token.email;
        session.user.image = token["image"] as string;
        session.user.role = token.role;
      }
      return session;
    },
    async jwt({ token, user, trigger }) {
      const dbUser = (
        await db
          .select()
          .from(users)
          .where(eq(users.email, token.email as string))
      )[0];
      if (!dbUser) {
        token.id = user.id;
        return token;
      }

      return {
        id: dbUser.id,
        name: dbUser.name,
        email: dbUser.email,
        image: dbUser.image,
        role: dbUser.role,
      };
    },
    redirect() {
      return "https://retiral.vercel.app/dashboard";
    },
  },
};

export const getAuthSession = () => getServerSession(authOptions);
