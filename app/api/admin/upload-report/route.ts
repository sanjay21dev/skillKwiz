import { NextResponse } from "next/server";

import prisma from "@/lib/prisma";

export async function POST(
  req: Request
) {

  try {

    const body =
      await req.json();

    const {
      requestId,
      reportStatus,
      reportUrl,
      score,
    } = body;

    await prisma.scheduledAssessment.update({

      where: {
        id: requestId,
      },

      data: {

        reportStatus,

        reportUrl,

        score,
      },
    });

    return NextResponse.json({

      success: true,
    });

  } catch (error) {

    console.log(error);

    return NextResponse.json({

      success: false,

      message:
        "Failed to upload report",
    });
  }
}