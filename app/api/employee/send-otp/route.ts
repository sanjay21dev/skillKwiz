import { NextResponse } from "next/server";

import nodemailer from "nodemailer";

const otpStore = new Map();

export async function POST(req: Request) {

  try {

    const { email } =
      await req.json();

    if (!email) {

      return NextResponse.json({
        success: false,
        message: "Email required",
      });
    }

    // GENERATE OTP
    const otp = Math.floor(
      100000 +
      Math.random() * 900000
    ).toString();

    otpStore.set(email, otp);

    console.log(
      `OTP for ${email}: ${otp}`
    );

    // NODEMAILER
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

      to: email,

      subject:
        "SkillKwiz OTP Verification",

      html: `
        <div style="
          font-family:sans-serif;
          padding:20px;
        ">
          <h2>
            SkillKwiz OTP Verification
          </h2>

          <p>Your OTP is:</p>

          <h1 style="
            color:blue;
            letter-spacing:4px;
          ">
            ${otp}
          </h1>
        </div>
      `,
    });

    return NextResponse.json({
      success: true,
      message:
        "OTP sent successfully",
    });

  } catch (error) {

    console.log(
      "OTP ERROR:",
      error
    );

    return NextResponse.json({
      success: false,
      message:
        "OTP sending failed",
    });
  }
}

export { otpStore };




// import { NextResponse } from "next/server";
// import { Resend } from "resend";

// const resend = new Resend(
//   process.env.RESEND_API_KEY
// );

// const otpStore = new Map();

// export async function POST(
//   req: Request
// ) {
//   try {
//     const { email } =
//       await req.json();

//     // CHECK EMAIL
//     if (!email) {
//       return NextResponse.json({
//         success: false,
//         message:
//           "Email is required",
//       });
//     }

//     // GENERATE 6-DIGIT OTP
//     const otp = Math.floor(
//       100000 +
//         Math.random() * 900000
//     ).toString();

//     // SAVE OTP
//     otpStore.set(email, otp);

//     console.log(
//       `OTP for ${email}: ${otp}`
//     );

//     // SEND EMAIL
//     await resend.emails.send({
//       from:
//         "noreply@skillkwiz.com",

//       // IMPORTANT CHANGE
//       to: email,

//       subject:
//         "SkillKwiz OTP Code",

//       html: `
//         <div style="
//           font-family:sans-serif;
//           padding:20px;
//         ">
//           <h2>
//             SkillKwiz OTP Verification
//           </h2>

//           <p>
//             Your OTP code is:
//           </p>

//           <h1 style="
//             color:#2563eb;
//             letter-spacing:4px;
//           ">
//             ${otp}
//           </h1>

//           <p>
//             This OTP expires in 5 minutes.
//           </p>
//         </div>
//       `,
//     });

//     return NextResponse.json({
//       success: true,
//       message:
//         "OTP sent successfully",
//     });
//   } catch (error) {
//     console.log(
//       "SEND OTP ERROR:",
//       error
//     );

//     return NextResponse.json({
//       success: false,
//       message:
//         "OTP sending failed",
//     });
//   }
// }

// export { otpStore };