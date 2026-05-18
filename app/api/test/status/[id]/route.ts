import { NextResponse } from "next/server";

import prisma from "@/lib/prisma";

export async function GET(
  req: Request,
  context: {
    params: {
      id: string;
    };
  }
) {

  try {

    const assessmentId =
      context.params.id;

    const request =
      await prisma.employerAssessmentRequest.findUnique({

        where: {
          id: Number(
            assessmentId
          ),
        },

        select: {
          score: true,
        },
      });

    // TEST ALREADY COMPLETED
    if (
      request?.score
    ) {

      return NextResponse.json({

        success: true,

        completed: true,
      });
    }

    // TEST NOT COMPLETED
    return NextResponse.json({

      success: true,

      completed: false,
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