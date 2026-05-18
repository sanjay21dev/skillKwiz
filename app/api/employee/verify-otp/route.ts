import { NextResponse } from "next/server";

import nodemailer from "nodemailer";

import { otpStore } from "../send-otp/route";

export async function POST(
  req: Request
) {
  try {

    const {
      email,
      otp,
    } = await req.json();

    const storedOtp =
      otpStore.get(email);

    // VERIFY OTP
    if (storedOtp === otp) {

      // REMOVE OTP AFTER SUCCESS
      otpStore.delete(email);

      // CREATE MAIL TRANSPORTER
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

      // SEND WELCOME EMAIL
      await transporter.sendMail({
        from:
          process.env.EMAIL_USER,

        to: email,

        subject:
          "SkillKwiz Email Verification Successful",

        html: `
          <div style="font-family: Arial; padding:20px;">

            <h2>
              Welcome to SkillKwiz 🎉
            </h2>

            <p>
              Your email has been successfully verified.
            </p>

            <p>
              You can now continue your assessment registration and payment process.
            </p>

            <br/>

            <p>
              Thank you,
            </p>

            <h3>
              SkillKwiz Team
            </h3>

          </div>
        `,
      });

      return NextResponse.json({
        success: true,
      });
    }

    return NextResponse.json({
      success: false,

      message:
        "Invalid OTP",
    });

  } catch (error) {

    console.log(
      "VERIFY OTP ERROR:",
      error
    );

    return NextResponse.json({
      success: false,

      message:
        "OTP verification failed",
    });
  }
}




// import { NextResponse } from "next/server";
// import nodemailer from "nodemailer";
// import { otpStore } from "../send-otp/route";

// export async function POST(
//   req: Request
// ) {
//   try {
//     const {
//       email,
//       otp,
//     } = await req.json();

//     const storedOtp =
//       otpStore.get(email);

//     // VERIFY
//     if (storedOtp === otp) {
//       return NextResponse.json({
//         success: true,
//       });
//     }

//     return NextResponse.json({
//       success: false,
//       message:
//         "Invalid OTP",
//     });
//   } catch (error) {
//     return NextResponse.json({
//       success: false,
//       message:
//         "OTP verification failed",
//     });
//   }
// }