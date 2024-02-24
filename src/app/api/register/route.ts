import { db } from "@/lib/db";
import { users } from "@/lib/db/schema/roleBased";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import bcrypt, { genSaltSync } from "bcrypt";
import { v4 as uuidv4 } from "uuid";
import { LoginSchema } from "@/lib/validators/register";
import { safeParse } from "valibot";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, password, name, role } = body;
    const isFormDataValid = safeParse(LoginSchema, { email, password });
    if (!isFormDataValid.success) {
      return NextResponse.json({
        success: false,
        error: isFormDataValid.issues,
      });
    }
    const userExistsOrNot = await db
      .select()
      .from(users)
      .where(eq(users.email, email));
    if (userExistsOrNot && userExistsOrNot[0]?.password) {
      return NextResponse.json({
        success: false,
        error: "User already exists",
      });
    } else if (userExistsOrNot && userExistsOrNot[0]?.password === null) {
      const hashedPass = await bcrypt.hash(password, genSaltSync());
      await db.update(users).set({ password: hashedPass });
      return NextResponse.json({
        success: false,
        error: "User already exists",
      });
    } else {
      const hashedPass = await bcrypt.hash(password, genSaltSync());
      const newUser = await db
        .insert(users)
        .values({
          email: email,
          id: uuidv4(),
          password: hashedPass,
          role: role,
          name: name,
        })
        .returning();
      newUser[0]!.password = null;
      return NextResponse.json({
        success: true,
        message: "User Registered",
        user: newUser[0],
      });
    }
  } catch (err) {}
}
