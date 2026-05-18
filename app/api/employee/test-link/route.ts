import { NextResponse } from "next/server";

import prisma from "@/lib/prisma";

export async function GET(req: Request) {

  try {

    const { searchParams } =
      new URL(req.url);

    const email =
      searchParams.get("email");

    if (!email) {

      return NextResponse.json(
        {
          success: false,
          message: "Email required",
        },
        {
          status: 400,
        }
      );
    }

    // FIND LATEST TEST
    const request =
      await prisma.employerAssessmentRequest.findFirst({
        where: {
          employeeEmail: email,

          testLinkSent: true,
        },

        orderBy: {
          createdAt: "desc",
        },
      });

    if (!request) {

      return NextResponse.json({
        success: false,
      });
    }

    return NextResponse.json({
      success: true,

      testLink:
        request.testLink,
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