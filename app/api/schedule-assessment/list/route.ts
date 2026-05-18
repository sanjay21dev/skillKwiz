import { NextResponse } from "next/server";

import prisma from "@/lib/prisma";

export async function GET() {

  try {

    const assessments =
      await prisma.scheduledAssessment.findMany({
        orderBy: {
          createdAt: "desc",
        },
      });

    return NextResponse.json({
      success: true,
      assessments,
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