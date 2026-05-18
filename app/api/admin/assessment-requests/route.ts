import { NextResponse } from "next/server";

import prisma from "@/lib/prisma";

export async function GET() {

  try {

    const requests =
      await prisma.employerAssessmentRequest.findMany({

        orderBy: {
          createdAt: "desc",
        },
      });

    return NextResponse.json({
      success: true,
      requests,
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

// export async function GET() {

//   try {

//     const requests =
//       await prisma.assessmentSchedule.findMany({

//         orderBy: {
//           createdAt: "desc",
//         },

//       });

//     return NextResponse.json({
//       success: true,
//       requests,
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








// import { NextResponse } from "next/server";

// import prisma from "@/lib/prisma";

// export async function GET() {

//   try {

//     const requests =
//       await prisma.assessmentSchedule.findMany({
//         orderBy: {
//           createdAt: "desc",
//         },
//       });

//     return NextResponse.json({
//       success: true,
//       requests,
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