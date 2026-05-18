import { NextResponse }
from "next/server";

import bcrypt from "bcryptjs";

import jwt from "jsonwebtoken";

import  prisma 
from "@/lib/prisma";

const JWT_SECRET =
  process.env.JWT_SECRET!;

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

    // FIND EMPLOYEE
    const employee =
      await prisma.employee.findUnique({
        where: {
          email,
        },
      });

    if (!employee) {

      return NextResponse.json({
        success: false,
        message:
          "Employee not found",
      });
    }

    // VERIFY PASSWORD
    const isPasswordValid =
      await bcrypt.compare(
        password,
        employee.password
      );

    if (!isPasswordValid) {

      return NextResponse.json({
        success: false,
        message:
          "Invalid password",
      });
    }

    // CREATE JWT
    const token =
      jwt.sign(
        {
          id: employee.id,
          firstName:
            employee.firstName,
          lastName:
            employee.lastName,
          email:
            employee.email,
          phone: 
            employee.phone,
        },
        JWT_SECRET,
        {
          expiresIn: "7d",
        }
      );

    // RESPONSE
    const response =
      NextResponse.json({
        success: true,
        employee: {
          firstName:
            employee.firstName,
          lastName:
            employee.lastName,
          email:
            employee.email,
        },
      });

    // SAVE COOKIE
    response.cookies.set(
      "employee_token",
      token,
      {
        httpOnly: true,
        secure:
          process.env.NODE_ENV ===
          "production",
        sameSite: "lax",
        path: "/",
        maxAge:
          60 *
          60 *
          24 *
          7,
      }
    );

    return response;

  } catch (error) {

    console.log(error);

    return NextResponse.json({
      success: false,
      message:
        "Login failed",
    });
  }
}