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
      firstName,
      lastName,
      companyName,
      email,
      phone,
      department,
      password,
    } = body;

    // CHECK EXISTING EMPLOYER
    const existingEmployer =
      await prisma.employer.findUnique({
        where: {
          email,
        },
      });

    // IF ALREADY EXISTS
    if (existingEmployer) {

      return NextResponse.json({
        success: false,
        message:
          "Employer already registered",
      });
    }

    // HASH PASSWORD
    const hashedPassword =
      await bcrypt.hash(
        password,
        10
      );

    // SAVE EMPLOYER
    const employer =
      await prisma.employer.create({
        data: {

          firstName,

          lastName,

          companyName,

          email,

          phone,

          department,

          password:
            hashedPassword,
        },
      });

    return NextResponse.json({
      success: true,
      employer,
    });

  } catch (error) {

    console.log(error);

    return NextResponse.json({
      success: false,
      message:
        "Employer registration failed",
    });
  }
}