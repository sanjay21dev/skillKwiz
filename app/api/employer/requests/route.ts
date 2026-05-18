import { NextResponse } from "next/server";

import prisma from "@/lib/prisma";

export async function GET() {

  try {

    const requests =
      await prisma.assessmentSchedule.findMany({
        orderBy: {
          createdAt: "desc",
        },
      });

    return NextResponse.json({
      success: true,
      requests,
    });

  } catch (error) {

    return NextResponse.json({
      success: false,
    });
  }
}