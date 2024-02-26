import { getAuthSession } from "@/lib/auth";
import { type NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { boolean, number, object, safeParse } from "valibot";
import { db } from "@/lib/db";
import { employee } from "@/lib/db/schema/roleBased/employees";
import { eq } from "drizzle-orm";

export async function POST(req: NextRequest) {
  const session = await getAuthSession();
  let token = req.headers.get("token");
  const user =
    token && (jwt.verify(token!, process.env["NEXTAUTH_SECRET"]!) as any);
  const id = user?.id || session?.user?.id;
  if (!id) {
    return NextResponse.redirect(new URL("/login", req.nextUrl));
  }
  if (user?.role !== "companyAdmin" && session?.user.role !== "companyAdmin") {
    return NextResponse.json(
      {
        error: "You are not authorized to perform this action",
        success: false,
      },
      { status: 401 }
    );
  }

  try {
    const body = await req.json();
    const { EmployeeId, accept } = body;
    console.log(EmployeeId)
    const employeeConfirmationSchema = object({
      EmployeeId: number(),
      accept: boolean(),
    });
    const isValidData = safeParse(employeeConfirmationSchema, body);
    if (!isValidData.success) {
      return NextResponse.json(
        {
          error: "Invalid data",
          success: false,
        },
        { status: 400 }
      );
    }
    if (accept) {
      await db
        .update(employee)
        .set({ status: "approved" })
        .where(eq(employee.id, EmployeeId));
      return NextResponse.json({
        message: "Employee added successfully",
        success: true,
      });
    } else {
      await db.delete(employee).where(eq(employee.id, EmployeeId));
      return NextResponse.json({
        message: "Rejected successfully",
        success: true,
      });
    }
  } catch (err) {
    return NextResponse.json({
      error: "Something went wrong",
      success: false,
    });
  }
}
