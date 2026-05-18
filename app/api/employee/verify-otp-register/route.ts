import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { db } from "@/lib/db";
import { sendEmail } from "@/lib/email";

export async function POST(req: Request) {
  const {
    firstName,
    lastName,
    email,
    phone,
    password,
    otp,
  } = await req.json();

  const [rows]: any = await db.query(
    `SELECT * FROM email_otps
     WHERE email = ? AND otp = ? AND verified = false
     AND expires_at > NOW()`,
    [email, otp]
  );

  if (rows.length === 0) {
    return NextResponse.json(
      { message: "Invalid OTP" },
      { status: 400 }
    );
  }

  await db.query(
    "UPDATE email_otps SET verified = true WHERE id = ?",
    [rows[0].id]
  );

  const passwordHash = await bcrypt.hash(password, 10);

  await db.query(
    `INSERT INTO employees
     (first_name, last_name, email, phone, password_hash, email_verified)
     VALUES (?, ?, ?, ?, ?, true)`,
    [firstName, lastName, email, phone, passwordHash]
  );

  await sendEmail({
    to: email,
    subject: "Welcome to SkillKwiz 🎉",
    html: `<h3>Welcome ${firstName}!</h3><p>Your account is ready.</p>`,
  });

  return NextResponse.json({ success: true });
}