import { NextResponse } from "next/server";

import bcrypt from "bcryptjs";

import prisma from "@/lib/prisma";

export async function POST(
  req: Request
) {
  try {

    const body =
      await req.json();

    const {
      email,
      password,
    } = body;

    // FIND EMPLOYER
    const employer =
      await prisma.employer.findUnique({
        where: {
          email,
        },
      });

    // NEW USER
    if (!employer) {

      return NextResponse.json({
        success: false,
        newUser: true,
        message:
          "Employer not found",
      });
    }

    // CHECK PASSWORD
    const isPasswordValid =
      await bcrypt.compare(
        password,
        employer.password
      );

    if (!isPasswordValid) {

      return NextResponse.json({
        success: false,
        message:
          "Invalid password",
      });
    }

    return NextResponse.json({
      success: true,
      employer,
    });

  } catch (error) {

    console.log(error);

    return NextResponse.json({
      success: false,
      message:
        "Login failed",
    });
  }
}