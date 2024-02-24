import nodemailer, { type SendMailOptions } from "nodemailer";
import { type NextRequest, NextResponse } from "next/server";
import { getAuthSession } from "@/lib/auth";
import jwt from "jsonwebtoken";
import { render } from "@react-email/render";
import { InviteTemplateEmail } from "@/lib/emails/InviteTemplate";
import { db } from "@/lib/db";
import { users } from "@/lib/db/schema/roleBased";
import { eq } from "drizzle-orm";

export async function POST(req: NextRequest) {
  try {
    const session = await getAuthSession();
    let token = req.headers.get("token");
    const decryptedUserData = jwt.verify(
      token!,
      process.env["NEXTAUTH_SECRET"]!
    ) as any;
    const id = decryptedUserData.id || session?.user?.id;
    if (!id) {
      return NextResponse.redirect(new URL("/login", req.nextUrl));
    }

    const userSendingTheEmailInvite = (
      await db.select().from(users).where(eq(users.id, id))
    )[0];
    const body = await req.json();

    const { emails, subject, message } = body;

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env["NODEMAILER_EMAIL"],
        pass: process.env["NODEMAILER_PW"],
      },
      port: 465,
    });

    const mailOptions: SendMailOptions = {
      from: process.env["NODEMAILER_EMAIL"],
      to: emails,
      subject: subject || "",
      text: message || "",
      html: render(
        InviteTemplateEmail({
          authorName: userSendingTheEmailInvite?.email,
          authorImage: userSendingTheEmailInvite?.image as string | undefined,
          reviewText: `“${message}”`,
        })
      ),
    };

    const resp = await transporter.sendMail(mailOptions);
    console.log(resp);
    return NextResponse.json({
      message: "Emails sent successfully",
      success: true,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      error: "Failed to send emails",
      sucess: false,
      reason: error,
    });
  }
}
