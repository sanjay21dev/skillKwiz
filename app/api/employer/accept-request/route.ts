import { NextResponse } from "next/server";

import nodemailer from "nodemailer";

import prisma from "@/lib/prisma";

export async function POST(
  req: Request
) {

  try {

    const {
      id,
    } = await req.json();

    // =========================
    // UPDATE STATUS
    // =========================
    const updatedRequest =
      await prisma.assessmentSchedule.update({

        where: {
          id,
        },

        data: {
          employerStatus:
            "ACCEPTED",
        },

        // ✅ IMPORTANT
        select: {
          id: true,

          employeeEmail: true,

          company: true,

          testingCenter: true,

          assessmentDate: true,

          assessmentTime: true,

          employerStatus: true,
        },
      });

    // =========================
    // EMAIL TRANSPORTER
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
    // SEND ACCEPTANCE EMAIL
    // =========================
    await transporter.sendMail({

      from:
        process.env.EMAIL_USER,

      to:
        updatedRequest.employeeEmail,

      subject:
        "Assessment Request Approved",

      html: `
        <div style="font-family: Arial; padding:20px;">

          <h2>
            Assessment Request Accepted ✅
          </h2>

          <p>
            Your assessment request has been approved by the employer.
          </p>

          <hr />

          <h3>
            Assessment Details
          </h3>

          <p>
            <strong>Company:</strong>
            ${updatedRequest.company}
          </p>

          <p>
            <strong>Testing Center:</strong>
            ${updatedRequest.testingCenter}
          </p>

          <p>
            <strong>Date:</strong>
            ${updatedRequest.assessmentDate}
          </p>

          <p>
            <strong>Time:</strong>
            ${updatedRequest.assessmentTime}
          </p>

          <p>
            <strong>Status:</strong>
            ${updatedRequest.employerStatus}
          </p>

          <br />

          <p>
            Please attend the assessment on time.
          </p>

          <br />

          <h3>
            SkillKwiz Team
          </h3>

        </div>
      `,
    });

    return NextResponse.json({
      success: true,
    });

  } catch (error) {

    console.log(
      "ACCEPT REQUEST ERROR:",
      error
    );

    return NextResponse.json({
      success: false,
      message:
        "Something went wrong",
    });
  }
}