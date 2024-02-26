import { NextResponse, type NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  return NextResponse.json({
    message: "Submitted data",
    success: true,
  });
}
