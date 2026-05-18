// import jwt from "jsonwebtoken";

// const JWT_SECRET =
//   process.env.JWT_SECRET!;

// // GENERATE TOKEN
// export function generateToken(
//   payload: any
// ) {

//   return jwt.sign(
//     payload,
//     JWT_SECRET,
//     {
//       expiresIn: "7d",
//     }
//   );
// }

// // VERIFY TOKEN
// export function verifyToken(
//   token: string
// ) {

//   try {

//     const decoded =
//       jwt.verify(
//         token,
//         JWT_SECRET
//       );

//     return decoded as {
//       id: number;
//       firstName: string;
//       lastName: string;
//       email: string;
//     };

//   } catch (error) {

//     return null;
//   }
// }




import jwt from "jsonwebtoken";

const JWT_SECRET =
  process.env.JWT_SECRET!;

export interface EmployeeToken {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
}

export function generateToken(
  payload: EmployeeToken
) {
  return jwt.sign(
    payload,
    JWT_SECRET,
    {
      expiresIn: "7d",
    }
  );
}

export function verifyToken(
  token: string
): EmployeeToken {
  return jwt.verify(
    token,
    JWT_SECRET
  ) as EmployeeToken;
}