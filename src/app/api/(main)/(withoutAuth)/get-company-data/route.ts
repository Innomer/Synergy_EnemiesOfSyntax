import { db } from "@/lib/db";
import { company } from "@/lib/db/schema/company";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const companies = await db.select().from(company);
    return NextResponse.json({
      success: true,
      data: companies,
    });
  } catch (err) {
    console.log(err);
    return NextResponse.json({
      error: err,
      success: false,
    });
  }
}
