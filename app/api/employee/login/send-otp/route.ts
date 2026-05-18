import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { sendEmail } from "@/lib/email";

export async function POST(req: Request) {
  const { email } = await req.json();

  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  const expiry = new Date(Date.now() + 10 * 60 * 1000);

  await db.query(
    "INSERT INTO email_otps (email, otp, expires_at) VALUES (?, ?, ?)",
    [email, otp, expiry]
  );

  await sendEmail({
    to: email,
    subject: "Your SkillKwiz OTP",
    html: `<h2>${otp}</h2><p>Valid for 10 minutes</p>`,
  });

  return NextResponse.json({ success: true });
}
