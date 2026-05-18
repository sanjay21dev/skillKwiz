import { NextResponse } from "next/server";

import prisma from "@/lib/prisma";

export async function POST(req: Request) {

  try {

    const body =
      await req.json();

    const {

      assessmentId,

      employeeName,

      employeeEmail,

      employeePhone,

      company,

      candidateId,

      jobFamily,

      skillsFamily,

      costUnit,

      department,

      businessUnit,

      selectedSkills,

      paymentId,

      paymentStatus,

    } = body;

    const request =
      await prisma.employerAssessmentRequest.create({
        data: {

          assessmentId,

          employeeName,

          employeeEmail,

          employeePhone,

          company,

          candidateId,

          jobFamily,

          skillsFamily,

          costUnit,

          department,

          businessUnit,

          selectedSkills:
            JSON.stringify(
              selectedSkills
            ),

          paymentId,

          paymentStatus,

          status:
            "PAYMENT_COMPLETED",
        },
      });

    return NextResponse.json({
      success: true,
      request,
    });

  } catch (error) {

    console.log(error);

    return NextResponse.json(
      {
        success: false,
        message:
          "Failed to create request",
      },
      {
        status: 500,
      }
    );
  }
}