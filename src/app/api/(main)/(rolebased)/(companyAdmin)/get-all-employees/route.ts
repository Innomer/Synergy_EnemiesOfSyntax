import { getAuthSession } from "@/lib/auth";
import { type NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { db } from "@/lib/db";
import { employee } from "@/lib/db/schema/roleBased/employees";
import { eq } from "drizzle-orm";
import { companyAdmin } from "@/lib/db/schema/roleBased/companyAdmin";

export async function GET(req: NextRequest) {
  const session = await getAuthSession();
  let token = req.headers.get("token");
  const user =
    token && (jwt.verify(token!, process.env["NEXTAUTH_SECRET"]!) as any);
  const id = user?.id || session?.user?.id;
  if (!id) {
    return NextResponse.redirect(new URL("/login", req.nextUrl));
  }
  const companyAdminDetails = (
    await db.select().from(companyAdmin).where(eq(companyAdmin.userId, id))
  )[0];
  if (!companyAdminDetails) {
    return NextResponse.json(
      {
        error: "You are not authorized to perform this action",
        success: false,
      },
      { status: 401 }
    );
  }

  try {
    const allEmployees = await db
      .select()
      .from(employee)
      .where(eq(employee.companyId, companyAdminDetails.companyId));
    return NextResponse.json({
      message: "Employees fetched successfully",
      success: true,
      data: allEmployees,
    });
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      {
        error: "Something went wrong",
        success: false,
      },
      { status: 500 }
    );
  }
}
