import { NextResponse } from "next/server";

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

    // STATIC ADMIN LOGIN
    // CHANGE LATER WITH DATABASE

    if (
      email ===
        "admin@gmail.com" &&
      password ===
        "admin123"
    ) {

      return NextResponse.json({
        success: true,
      });
    }

    return NextResponse.json(
      {
        success: false,
        message:
          "Invalid admin credentials",
      },
      {
        status: 401,
      }
    );

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