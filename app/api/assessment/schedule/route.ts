import { NextResponse } from "next/server";

import prisma from "@/lib/prisma";

export async function POST(req: Request) {

  try {

    const body =
      await req.json();

    const {
      company,
      country,
      zipCode,
      testingCenter,
      assessmentDate,
      assessmentTime,

      paymentMethod,

      cardName,
      cardNumber,
      expiryDate,
      cvv,

      upiId,

      amount,

      paymentStatus,
      paymentId,
    } = body;

    const assessment =
      await prisma.assessmentSchedule.create({
        data: {
          company,
          country,
          zipCode,
          testingCenter,
          assessmentDate,
          assessmentTime,

          paymentMethod,

          cardName,
          cardNumber,
          expiryDate,
          cvv,

          upiId,

          amount,

          paymentStatus,
          paymentId,
        },
      });

    return NextResponse.json({
      success: true,
      assessment,
    });

  } catch (error) {

    console.log(error);

    return NextResponse.json({
      success: false,
      message:
        "Failed to save assessment",
    });
  }
}