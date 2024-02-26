import { getAuthSession } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { db } from "@/lib/db";
import { employee } from "@/lib/db/schema/roleBased/employees";
import { safeParse } from "valibot";
import { InsertEmployeeSchema } from "@/lib/validators/employee";

export async function POST(req: NextRequest) {
  const session = await getAuthSession();
  let token = req.headers.get("token");
  const user =
    token && (jwt.verify(token!, process.env["NEXTAUTH_SECRET"]!) as any);
  const id = user?.id || session?.user?.id;
  if (!id) {
    return NextResponse.redirect(new URL("/login", req.nextUrl));
  }

  const body = await req.json();
  const { companyId, department, phoneNumber, position } = body;
  console.log(body);
  const isValidData = safeParse(InsertEmployeeSchema, {
    companyId,
    department,
    phoneNumber,
    position,
    userId: id,
  });
  if (!isValidData.success) {
    return NextResponse.json(
      {
        error: isValidData.issues,
        success: false,
      },
      { status: 400 }
    );
  }

  try {
    await db
      .insert(employee)
      .values({
        userId: id,
        companyId,
        department,
        phoneNumber,
        position,
      })
      .onConflictDoUpdate({
        target: [employee.userId],
        set: {
          userId: id,
          companyId,
          department,
          phoneNumber,
          position,
        },
      });
    return NextResponse.json({
      message: "Employee added to verification list",
      success: true,
    });
  } catch (err) {
    return NextResponse.json(
      {
        error: err,
        success: false,
      },
      { status: 400 }
    );
  }
}
