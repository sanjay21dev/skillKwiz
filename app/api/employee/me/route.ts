import { cookies } from "next/headers";

import { NextResponse } from "next/server";

import { verifyToken } from "@/lib/jwt";

export async function GET() {

  try {

    const cookieStore =
      await cookies();

    const token =
  cookieStore.get(
    "employee_token"
  )?.value;

console.log(
  "ALL COOKIES:",
  cookieStore.getAll()
);

console.log(
  "TOKEN:",
  token
);

    if (!token) {

      return NextResponse.json(
        {
          success: false,
        },
        {
          status: 401,
        }
      );
    }

    const employee =
      verifyToken(token);
      console.log(
  "EMPLOYEE:",
  employee
);

    if (!employee) {

      return NextResponse.json(
        {
          success: false,
        },
        {
          status: 401,
        }
      );
    }

    return NextResponse.json({
      success: true,
      employee,
    });

  } catch (error) {

    console.log(error);

    return NextResponse.json(
      {
        success: false,
      },
      {
        status: 500,
      }
    );
  }
}