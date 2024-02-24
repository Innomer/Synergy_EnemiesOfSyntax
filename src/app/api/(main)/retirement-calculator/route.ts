import { NextRequest, NextResponse } from "next/server";
import { CalculatorSchema } from "@/lib/validators/calculator";
import { safeParse } from "valibot";
import { getAuthSession } from "@/lib/auth";
import jwt from "jsonwebtoken";
import { db } from "@/lib/db";
import { profile } from "@/lib/db/schema/roleBased";

export async function POST(req: NextRequest) {
  const session = await getAuthSession();
  let token = req.headers.get("token");
  const user =
    token && (jwt.verify(token!, process.env["NEXTAUTH_SECRET"]!) as any);
  const id = user?.id || session?.user?.id;
  if (!id) {
    return NextResponse.redirect(new URL("/login", req.nextUrl));
  }

  try {
    const body = await req.json();
    const {
      salary,
      workExperience,
      age,
      goalRetirementAge,
      safetyInRetirement,
      typeOfRetirement,
      numberOfDependantPeople,
      totalValuationOfCurrentAssets,
    } = body;
    const isFormDataValid = safeParse(CalculatorSchema, {
      salary,
      workExperience,
      age,
      goalRetirementAge,
      safetyInRetirement,
      typeOfRetirement,
      numberOfDependantPeople,
      totalValuationOfCurrentAssets,
    });
    if (!isFormDataValid.success) {
      console.log(isFormDataValid.issues);
      return NextResponse.json({
        success: false,
        error: "Invalid data",
      });
    }
    const dbResponse = await db
      .insert(profile)
      .values({
        age,
        goalRetirementAge,
        safetyInRetirement,
        salary,
        typeOfRetirement,
        userId: id,
        workExperience,
        numberOfDependantPeople,
        totalValuationOfCurrentAssets,
      })
      .onConflictDoUpdate({
        target: profile.userId,
        set: {
          age,
          goalRetirementAge,
          safetyInRetirement,
          salary,
          typeOfRetirement,
          workExperience,
          numberOfDependantPeople,
          totalValuationOfCurrentAssets,
        },
      });
    return NextResponse.json({
      success: true,
      message: `Profile Created`,
      savedToDb: dbResponse,
    });
  } catch (err) {
    // console.log(err);
    return NextResponse.json({
      success: false,
      error: err,
    });
  }
}
