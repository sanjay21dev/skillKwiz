import { NextResponse } from "next/server";

import Stripe from "stripe";

const stripe = new Stripe(
  process.env.STRIPE_SECRET_KEY!
);

export async function POST(
  request: Request
) {

  try {

    // GET AMOUNT FROM FRONTEND
    const { amount } =
      await request.json();

    const paymentIntent =
  await stripe.paymentIntents.create({

    amount:
      amount * 100,

    currency: "usd",

    payment_method_types: [
      "card",
    ],
  });

    return NextResponse.json({
      clientSecret:
        paymentIntent.client_secret,
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

// import Stripe from "stripe";

// const stripe = new Stripe(
//   process.env.STRIPE_SECRET_KEY!,
// );

// export async function POST() {

//   try {

//     const paymentIntent =
//       await stripe.paymentIntents.create({

//         amount: 4000,

//         currency: "usd",

//         payment_method_types: [
//           "card",
//         ],
//       });

//     return NextResponse.json({
//       clientSecret:
//         paymentIntent.client_secret,
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
// import Stripe from "stripe";

// const stripe = new Stripe(
//   process.env.STRIPE_SECRET_KEY!,
//   {
//     // apiVersion: "2025-04-30.basil",
//   }
// );

// export async function POST() {

//   try {

//     const paymentIntent =
//       await stripe.paymentIntents.create({
//         amount: 4000,
//         currency: "usd",

//         automatic_payment_methods: {
//           enabled: true,
//         },
//       });

//     return NextResponse.json({
//       clientSecret:
//         paymentIntent.client_secret,
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