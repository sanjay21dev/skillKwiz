import { NextResponse } from "next/server";

import prisma from "@/lib/prisma";

export async function POST(
  req: Request
) {

  try {

    const body =
      await req.json();

    const {
      assessmentRequestId,
      answers,
      score,
    } = body;

    // SAVE TEST RESULT
    await prisma.employerAssessmentRequest.update({

      where: {
        id: Number(
          assessmentRequestId
        ),
      },

      data: {

        score,

        reportStatus:
          "UPLOADED",
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
      },
      {
        status: 500,
      }
    );
  }
}








// import { NextResponse } from "next/server";

// import prisma from "@/lib/prisma";

// export async function POST(req: Request) {

//   try {

//     const body =
//       await req.json();

//     const {
//       assessmentRequestId,
//       answers,
//       score,
//     } = body;

//     // SAVE TEST SUBMISSION
//     await prisma.employerAssessmentRequest.update({

//       where: {
//         id: Number(
//           assessmentRequestId
//         ),
//       },

//       data: {

//         testCompleted: true,

//         testScore: score,

//         submittedAnswers:
//           JSON.stringify(
//             answers
//           ),

//         status:
//           "TEST_COMPLETED",
//       },
//     });

//     return NextResponse.json({
//       success: true,
//     });

//   } catch (error) {

//     console.log(error);

//     return NextResponse.json(
//       {
//         success: false,
//       },
//       {
//         status: 500,
//       }
//     );
//   }
// }