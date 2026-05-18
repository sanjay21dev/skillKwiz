import { NextResponse } from "next/server";

import prisma from "@/lib/prisma";

export async function GET() {

  try {

    const candidates =
      await prisma.employerAssessmentRequest.findMany({

        where: {

          reportStatus: "UPLOADED",
        },

        orderBy: {
          createdAt: "desc",
        },
      });

    return NextResponse.json({

      success: true,

      candidates,
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

//     const candidates =
//       await prisma.employerAssessmentRequest.findMany({

//         where: {

//           score: {
//             not: null,
//           },
//         },

//         orderBy: {
//           createdAt: "desc",
//         },
//       });

//     return NextResponse.json({

//       success: true,

//       candidates,
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