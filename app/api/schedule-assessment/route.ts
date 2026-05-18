import { NextResponse } from "next/server";

import prisma from "@/lib/prisma";

export async function POST(
  req: Request
) {

  try {

    const body =
      await req.json();

    const assessment =
      await prisma.scheduledAssessment.create({
        data: {

          employeeName:
            body.employeeName,

          employeeEmail:
            body.employeeEmail,

          phone:
            body.phone,

          company:
            body.company,

          country:
            body.country,

          zipCode:
            body.zipCode,

          testingCenter:
            body.testingCenter,

          assessmentDate:
            body.assessmentDate,

          assessmentTime:
            body.assessmentTime,
        },
      });

    return NextResponse.json({
      success: true,
      assessment,
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