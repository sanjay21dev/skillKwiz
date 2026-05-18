import { NextResponse } from "next/server";

import prisma from "@/lib/prisma";

export async function POST(
  req: Request
) {

  try {

    const body =
      await req.json();

    const updatedRequest =
      await prisma.assessmentSchedule.update({
        where: {
          id: body.id,
        },

        data: {
          testStatus:
            "SENT",
        },
      });

    return NextResponse.json({
      success: true,
      updatedRequest,
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