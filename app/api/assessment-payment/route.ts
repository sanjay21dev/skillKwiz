import { NextResponse } from "next/server";

import nodemailer from "nodemailer";

import prisma from "@/lib/prisma";

export async function POST(
  req: Request
) {

  try {

    const body =
      await req.json();

    // =========================
    // SAVE TO DATABASE
    // =========================
    const assessment =
      await prisma.assessmentSchedule.create({
        data: {

          employeeEmail:
            body.employeeEmail,

          employeeName:
            body.employeeName,

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

          paymentMethod:
            body.paymentMethod,

          amount:
            body.amount,

          paymentStatus:
            body.paymentStatus,

          paymentId:
            body.paymentId,

          employerStatus:
            "PENDING",
        },
      });

    // =========================
    // CREATE EMAIL TRANSPORTER
    // =========================
    const transporter =
      nodemailer.createTransport({

        service: "gmail",

        auth: {
          user:
            process.env.EMAIL_USER,

          pass:
            process.env.EMAIL_PASS,
        },
      });

    // =========================
    // SEND PAYMENT SUCCESS EMAIL
    // =========================
    await transporter.sendMail({

      from:
        process.env.EMAIL_USER,

      to:
        body.employeeEmail,

      subject:
        "Assessment Payment Successful",

      html: `
        <div style="font-family: Arial; padding:20px;">

          <h2>
            Payment Successful ✅
          </h2>

          <p>
            Your assessment has been successfully scheduled.
          </p>

          <hr/>

          <h3>
            Assessment Details
          </h3>

          <p>
            <strong>Company:</strong>
            ${body.company}
          </p>

          <p>
            <strong>Country:</strong>
            ${body.country}
          </p>

          <p>
            <strong>Testing Center:</strong>
            ${body.testingCenter}
          </p>

          <p>
            <strong>Date:</strong>
            ${body.assessmentDate}
          </p>

          <p>
            <strong>Time:</strong>
            ${body.assessmentTime}
          </p>

          <p>
            <strong>Payment Method:</strong>
            ${body.paymentMethod}
          </p>

          <p>
            <strong>Amount Paid:</strong>
            $${body.amount}
          </p>

          <p>
            <strong>Payment Status:</strong>
            ${body.paymentStatus}
          </p>

          <p>
            <strong>Transaction ID:</strong>
            ${body.paymentId}
          </p>

          <br/>

          <p>
            Thank you for choosing SkillKwiz.
          </p>

          <h3>
            SkillKwiz Team
          </h3>

        </div>
      `,
    });

    // =========================
    // RESPONSE
    // =========================
    return NextResponse.json({
      success: true,
      assessment,
    });

  } catch (error) {

    console.log(
      "PAYMENT ERROR:",
      error
    );

    return NextResponse.json({
      success: false,
      message:
        "Payment saving failed",
    });
  }
}