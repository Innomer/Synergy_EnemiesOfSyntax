import { db } from "@/lib/db";
import { users } from "@/lib/db/schema/roleBased";
import { LoginSchema } from "@/lib/validators/register";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import { safeParse } from "valibot";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, password } = body;
    const isFormDataValid = safeParse(LoginSchema, { email, password });
    if (!isFormDataValid.success) {
      return NextResponse.json({
        success: false,
        error: "Invalid data",
      });
    }

    const userExistsOrNot = await db
      .select()
      .from(users)
      .where(eq(users.email, email));

    if (userExistsOrNot && userExistsOrNot[0]?.password) {
      const passwordMatching = await bcrypt.compare(
        password,
        userExistsOrNot[0]?.password
      );
      if (passwordMatching) {
        const token = jwt.sign(
          {
            id: userExistsOrNot[0].id,
            email: userExistsOrNot[0].email,
            role: userExistsOrNot[0].role,
            name: userExistsOrNot[0].name,
            image: userExistsOrNot[0].image,
          },
          process.env["NEXTAUTH_SECRET"]!,
          {
            expiresIn: "1y",
          }
        );
        const resp = NextResponse.json({
          success: true,
          message: "User Logged In",
          token: token,
          name: userExistsOrNot[0].name,
          userId: userExistsOrNot[0].id,
        });
        // resp.cookies.set("next-auth.session-token", token);
        return resp;
      } else {
        return NextResponse.json({
          success: false,
          error: "Invalid Credentials",
        });
      }
    } else {
      return NextResponse.json({
        success: false,
        error: "User doesnt exist",
      });
    }
  } catch (err) {
    console.log(err);
    return NextResponse.json({
      success: false,
      error: "Something went wrong",
    });
  }
}
