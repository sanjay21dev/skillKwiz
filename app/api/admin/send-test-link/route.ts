import { NextResponse } from "next/server";

import nodemailer from "nodemailer";

import prisma from "@/lib/prisma";

export async function POST(
  req: Request
) {

  try {

    const body =
      await req.json();

    const {

      requestId,

      employeeEmail,

      employeeName,

      testLink,

    } = body;

    // EMAIL TRANSPORT
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

    // SEND EMAIL
    await transporter.sendMail({

      from:
        process.env.EMAIL_USER,

      to:
        employeeEmail,

      subject:
        "Skill Assessment Test Link",

      html: `
        <div style="font-family:sans-serif;padding:20px;">

          <h2>
            Hello ${employeeName},
          </h2>

          <p>
            Your skill assessment test is ready.
          </p>

          <p>
            Click the button below to start your test:
          </p>

          <a
            href="${testLink}"
            style="
              display:inline-block;
              padding:12px 24px;
              background:#2563eb;
              color:white;
              text-decoration:none;
              border-radius:8px;
              margin-top:10px;
            "
          >
            Start Test
          </a>

          <p style="margin-top:30px;color:gray;">
            Best Regards,
            <br/>
            Skill Assessment Team
          </p>

        </div>
      `,
    });

    // UPDATE DATABASE
    await prisma.employerAssessmentRequest.update({

      where: {
        id: requestId,
      },

      data: {

        testLink,

        testLinkSent: true,

        testStatus:
          "SENT",

        status:
          "TEST_LINK_SENT",
      },
    });

    return NextResponse.json({
      success: true,
    });

  } catch (error) {

    console.log(error);

    return NextResponse.json(
      {
        success: false,
        message:
          "Failed to send test link",
      },
      {
        status: 500,
      }
    );
  }
}