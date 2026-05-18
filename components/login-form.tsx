"use client";

import type React from "react";

import { useState } from "react";

import { useRouter } from "next/navigation";

import {
  Mail,
  Lock,
  Eye,
  EyeOff,
} from "lucide-react";

interface LoginFormProps {
  onLogin: (
    userType:
      | "employer"
      | "employee"
      | "admin",
    isSignup?: boolean
  ) => void;
}

export default function LoginForm({
  onLogin,
}: LoginFormProps) {

  const router = useRouter();

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [userType, setUserType] =
    useState<
      "employer" |
      "employee" |
      "admin"
    >("employee");

  const [
    showPassword,
    setShowPassword,
  ] = useState(false);

  const [
    forgotMode,
    setForgotMode,
  ] = useState(false);

  const [resetSent, setResetSent] =
    useState(false);

  const [resetEmail, setResetEmail] =
    useState("");

  const [loginError, setLoginError] =
    useState("");

  // =========================
  // LOGIN
  // =========================
  const handleSubmit = async (
    e: React.FormEvent
  ) => {

    e.preventDefault();

    setLoginError("");

    let api = "";

    // =========================
    // EMPLOYEE
    // =========================
    if (
      userType === "employee"
    ) {

      api =
        "/api/employee/login";
    }

    // =========================
    // EMPLOYER
    // =========================
    if (
      userType === "employer"
    ) {

      api =
        "/api/employer/login";
    }

    // =========================
    // ADMIN
    // =========================
    if (
      userType === "admin"
    ) {

      api =
        "/api/admin/login";
    }

    try {

      const response =
        await fetch(api, {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          credentials:
            "include",

          body: JSON.stringify({
            email,
            password,
          }),
        });

      const data =
        await response.json();

      // =========================
      // SUCCESS
      // =========================
      if (data.success) {

        await new Promise(
          (resolve) =>
            setTimeout(
              resolve,
              500
            )
        );

        // EMPLOYER
        if (
          userType ===
          "employer"
        ) {

          router.push(
            "/employer/assessment-request"
          );

          return;
        }

        // EMPLOYEE / ADMIN
        onLogin(
          userType,
          false
        );

        return;
      }

      // =========================
      // NEW USER
      // =========================
      if (data.newUser) {

        // NEW EMPLOYER
        if (
          userType ===
          "employer"
        ) {

          router.push(
            "/employer/register"
          );

          return;
        }

        // ADMIN
        if (
          userType ===
          "admin"
        ) {

          setLoginError(
            "Invalid admin credentials"
          );

        } else {

          setLoginError(
            `${userType} not registered. Please sign up first.`
          );
        }

        return;
      }

      // =========================
      // OTHER ERRORS
      // =========================
      setLoginError(
        data.message ||
          "Login failed"
      );

    } catch (error) {

      console.log(error);

      setLoginError(
        "Something went wrong."
      );
    }
  };

  // =========================
  // RESET PASSWORD
  // =========================
  const handleResetPassword = (
    e: React.FormEvent
  ) => {

    e.preventDefault();

    setResetSent(true);
  };

  return (

    <div className="text-gray-300">

      <h1 className="text-3xl font-semibold text-center mb-2">
        {forgotMode
          ? "Reset Password"
          : "Login"}
      </h1>

      <p className="text-center text-gray-300 mb-8">
        {forgotMode
          ? "Enter your registered email to receive a reset link"
          : "Sign in to access your account"}
      </p>

      {/* LOGIN FORM */}
      {!forgotMode && (

        <form
          onSubmit={
            handleSubmit
          }
          className="space-y-6"
        >

          {/* USER TYPE */}
          <div className="grid grid-cols-3 gap-4">

            {/* EMPLOYEE */}
            <button
              type="button"
              onClick={() =>
                setUserType(
                  "employee"
                )
              }
              className={`py-3 rounded transition ${
                userType ===
                "employee"
                  ? "bg-blue-600"
                  : "bg-gray-600 hover:bg-gray-500"
              }`}
            >
              👤 Employee
            </button>

            {/* EMPLOYER */}
            <button
              type="button"
              onClick={() =>
                setUserType(
                  "employer"
                )
              }
              className={`py-3 rounded transition ${
                userType ===
                "employer"
                  ? "bg-blue-600"
                  : "bg-gray-600 hover:bg-gray-500"
              }`}
            >
              🏢 Employer
            </button>

            {/* ADMIN */}
            <button
              type="button"
              onClick={() =>
                setUserType(
                  "admin"
                )
              }
              className={`py-3 rounded transition ${
                userType ===
                "admin"
                  ? "bg-blue-600"
                  : "bg-gray-600 hover:bg-gray-500"
              }`}
            >
              🛡️ Admin
            </button>

          </div>

          {/* EMAIL */}
          <div>

            <label className="block mb-2">
              Email
            </label>

            <div className="relative">

              <Mail className="absolute left-3 top-3 w-5 h-5 text-gray-400" />

              <input
                type="email"
                value={email}
                placeholder="Enter your Email Id"
                onChange={(e) =>
                  setEmail(
                    e.target.value
                  )
                }
                className="w-full bg-[#333333] pl-10 py-3 rounded focus:outline-none"
                required
              />

            </div>

          </div>

          {/* PASSWORD */}
          <div>

            <label className="block mb-2">
              Password
            </label>

            <div className="relative">

              <Lock className="absolute left-3 top-3 w-5 h-5 text-gray-400" />

              <input
                type={
                  showPassword
                    ? "text"
                    : "password"
                }
                value={password}
                placeholder="Enter Password"
                onChange={(e) =>
                  setPassword(
                    e.target.value
                  )
                }
                className="w-full bg-[#333333] pl-10 pr-10 py-3 rounded focus:outline-none"
                required
              />

              <button
                type="button"
                className="absolute right-3 top-3"
                onClick={() =>
                  setShowPassword(
                    !showPassword
                  )
                }
              >
                {showPassword ? (
                  <EyeOff />
                ) : (
                  <Eye />
                )}
              </button>

            </div>

          </div>

          {/* ERROR */}
          {loginError && (
            <p className="text-red-400 text-sm text-center">
              {loginError}
            </p>
          )}

          {/* FORGOT PASSWORD */}
          <div className="flex justify-center">

            <button
              type="button"
              onClick={() =>
                setForgotMode(
                  true
                )
              }
              className="text-sm text-blue-400 hover:underline"
            >
              Forgot password?{" "}

              <span className="text-gray-400">
                Reset via email
              </span>

            </button>

          </div>

          {/* LOGIN BUTTON */}
          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-[#4ECDC4] to-[#2d8a84] rounded hover:opacity-90 transition"
          >
            Login
          </button>

          {/* REGISTER */}
          {userType !==
            "admin" && (

            <div className="text-center">

              <p className="text-gray-300">

                New user?{" "}

                <button
                  type="button"
                  onClick={() =>
                    onLogin(
                      userType,
                      true
                    )
                  }
                  className="text-blue-400 hover:underline"
                >
                  Register here
                </button>

              </p>

            </div>
          )}

        </form>
      )}

      {/* RESET PASSWORD */}
      {forgotMode && (

        <form
          onSubmit={
            handleResetPassword
          }
          className="space-y-6"
        >

          {!resetSent ? (
            <>

              <input
                type="email"
                value={resetEmail}
                onChange={(e) =>
                  setResetEmail(
                    e.target.value
                  )
                }
                className="w-full bg-[#333333] px-4 py-3 rounded focus:outline-none"
                placeholder="Enter your email"
                required
              />

              <button
                type="submit"
                className="w-full py-3 bg-gradient-to-r from-[#4ECDC4] to-[#2d8a84] rounded hover:opacity-90 transition"
              >
                Send Reset Link
              </button>

            </>
          ) : (

            <p className="text-green-400 text-center">
              ✅ If an account
              exists, a reset link
              has been sent.
            </p>

          )}

          <div className="text-center">

            <button
              type="button"
              onClick={() => {

                setForgotMode(
                  false
                );

                setResetSent(
                  false
                );
              }}
              className="text-blue-400 text-sm hover:underline"
            >
              ← Back to Login
            </button>

          </div>

        </form>
      )}

    </div>
  );
}








// "use client";

// import type React from "react";

// import { useState } from "react";

// import { useRouter } from "next/navigation";

// import {
//   Mail,
//   Lock,
//   Eye,
//   EyeOff,
// } from "lucide-react";

// interface LoginFormProps {
//   onLogin: (
//     userType:
//       | "employer"
//       | "employee"
//       | "admin",
//     isSignup?: boolean
//   ) => void;
// }

// export default function LoginForm({
//   onLogin,
// }: LoginFormProps) {

//   const [email, setEmail] =
//     useState("");

//   const [password, setPassword] =
//     useState("");

//   const [userType, setUserType] =
//     useState<
//       "employer" |
//       "employee" |
//       "admin"
//     >("employee");

//   const [
//     showPassword,
//     setShowPassword,
//   ] = useState(false);

//   const [
//     forgotMode,
//     setForgotMode,
//   ] = useState(false);

//   const [resetSent, setResetSent] =
//     useState(false);

//   const [resetEmail, setResetEmail] =
//     useState("");

//   const [loginError, setLoginError] =
//     useState("");

//   // =========================
//   // LOGIN
//   // =========================
//   const handleSubmit = async (
//     e: React.FormEvent
//   ) => {

//     e.preventDefault();

//     setLoginError("");

//     let api = "";

//     // =========================
//     // EMPLOYEE
//     // =========================
//     if (
//       userType === "employee"
//     ) {

//       api =
//         "/api/employee/login";
//     }

//     // =========================
//     // EMPLOYER
//     // =========================
//     if (
//       userType === "employer"
//     ) {

//       api =
//         "/api/employer/login";
//     }

//     // =========================
//     // ADMIN
//     // =========================
//     if (
//       userType === "admin"
//     ) {

//       api =
//         "/api/admin/login";
//     }

//     try {

//       const response =
//         await fetch(api, {
//           method: "POST",

//           headers: {
//             "Content-Type":
//               "application/json",
//           },

//           credentials:
//             "include",

//           body: JSON.stringify({
//             email,
//             password,
//           }),
//         });

//       const data =
//         await response.json();

//       // SUCCESS
//       if (data.success) {

//         await new Promise(
//           (resolve) =>
//             setTimeout(
//               resolve,
//               500
//             )
//         );

//         onLogin(
//           userType,
//           false
//         );

//         return;
//       }

//       // NEW USER
//       if (data.newUser) {

//         if (
//           userType === "admin"
//         ) {

//           setLoginError(
//             "Invalid admin credentials"
//           );

//         } else {

//           setLoginError(
//             `${userType} not registered. Please sign up first.`
//           );
//         }

//         return;
//       }

//       setLoginError(
//         data.message ||
//           "Login failed"
//       );

//     } catch (error) {

//       console.log(error);

//       setLoginError(
//         "Something went wrong."
//       );
//     }
//   };

//   // =========================
//   // RESET PASSWORD
//   // =========================
//   const handleResetPassword = (
//     e: React.FormEvent
//   ) => {

//     e.preventDefault();

//     setResetSent(true);
//   };

//   return (

//     <div className="text-gray-300">

//       <h1 className="text-3xl font-semibold text-center mb-2">
//         {forgotMode
//           ? "Reset Password"
//           : "Login"}
//       </h1>

//       <p className="text-center text-gray-300 mb-8">
//         {forgotMode
//           ? "Enter your registered email to receive a reset link"
//           : "Sign in to access your account"}
//       </p>

//       {/* LOGIN FORM */}
//       {!forgotMode && (

//         <form
//           onSubmit={
//             handleSubmit
//           }
//           className="space-y-6"
//         >

//           {/* USER TYPE */}
//           <div className="grid grid-cols-3 gap-4">

//             {/* EMPLOYEE */}
//             <button
//               type="button"
//               onClick={() =>
//                 setUserType(
//                   "employee"
//                 )
//               }
//               className={`py-3 rounded transition ${
//                 userType ===
//                 "employee"
//                   ? "bg-blue-600"
//                   : "bg-gray-600 hover:bg-gray-500"
//               }`}
//             >
//               👤 Employee
//             </button>

//             {/* EMPLOYER */}
//             <button
//               type="button"
//               onClick={() =>
//                 setUserType(
//                   "employer"
//                 )
//               }
//               className={`py-3 rounded transition ${
//                 userType ===
//                 "employer"
//                   ? "bg-blue-600"
//                   : "bg-gray-600 hover:bg-gray-500"
//               }`}
//             >
//               🏢 Employer
//             </button>

//             {/* ADMIN */}
//             <button
//               type="button"
//               onClick={() =>
//                 setUserType(
//                   "admin"
//                 )
//               }
//               className={`py-3 rounded transition ${
//                 userType ===
//                 "admin"
//                   ? "bg-blue-600"
//                   : "bg-gray-600 hover:bg-gray-500"
//               }`}
//             >
//               🛡️ Admin
//             </button>

//           </div>

//           {/* EMAIL */}
//           <div>

//             <label className="block mb-2">
//               Email
//             </label>

//             <div className="relative">

//               <Mail className="absolute left-3 top-3 w-5 h-5 text-gray-400" />

//               <input
//                 type="email"
//                 value={email}
//                 placeholder="Enter your Email Id"
//                 onChange={(e) =>
//                   setEmail(
//                     e.target.value
//                   )
//                 }
//                 className="w-full bg-[#333333] pl-10 py-3 rounded focus:outline-none"
//                 required
//               />

//             </div>

//           </div>

//           {/* PASSWORD */}
//           <div>

//             <label className="block mb-2">
//               Password
//             </label>

//             <div className="relative">

//               <Lock className="absolute left-3 top-3 w-5 h-5 text-gray-400" />

//               <input
//                 type={
//                   showPassword
//                     ? "text"
//                     : "password"
//                 }
//                 value={password}
//                 placeholder="Enter Password"
//                 onChange={(e) =>
//                   setPassword(
//                     e.target.value
//                   )
//                 }
//                 className="w-full bg-[#333333] pl-10 pr-10 py-3 rounded focus:outline-none"
//                 required
//               />

//               <button
//                 type="button"
//                 className="absolute right-3 top-3"
//                 onClick={() =>
//                   setShowPassword(
//                     !showPassword
//                   )
//                 }
//               >
//                 {showPassword ? (
//                   <EyeOff />
//                 ) : (
//                   <Eye />
//                 )}
//               </button>

//             </div>

//           </div>

//           {/* ERROR */}
//           {loginError && (
//             <p className="text-red-400 text-sm text-center">
//               {loginError}
//             </p>
//           )}

//           {/* FORGOT PASSWORD */}
//           <div className="flex justify-center">

//             <button
//               type="button"
//               onClick={() =>
//                 setForgotMode(
//                   true
//                 )
//               }
//               className="text-sm text-blue-400 hover:underline"
//             >
//               Forgot password?{" "}

//               <span className="text-gray-400">
//                 Reset via email
//               </span>

//             </button>

//           </div>

//           {/* LOGIN BUTTON */}
//           <button
//             type="submit"
//             className="w-full py-3 bg-gradient-to-r from-[#4ECDC4] to-[#2d8a84] rounded hover:opacity-90 transition"
//           >
//             Login
//           </button>

//           {/* REGISTER */}
//           {userType !==
//             "admin" && (

//             <div className="text-center">

//               <p className="text-gray-300">

//                 New user?{" "}

//                 <button
//                   type="button"
//                   onClick={() =>
//                     onLogin(
//                       userType,
//                       true
//                     )
//                   }
//                   className="text-blue-400 hover:underline"
//                 >
//                   Register here
//                 </button>

//               </p>

//             </div>
//           )}

//         </form>
//       )}

//       {/* RESET PASSWORD */}
//       {forgotMode && (

//         <form
//           onSubmit={
//             handleResetPassword
//           }
//           className="space-y-6"
//         >

//           {!resetSent ? (
//             <>

//               <input
//                 type="email"
//                 value={resetEmail}
//                 onChange={(e) =>
//                   setResetEmail(
//                     e.target.value
//                   )
//                 }
//                 className="w-full bg-[#333333] px-4 py-3 rounded focus:outline-none"
//                 placeholder="Enter your email"
//                 required
//               />

//               <button
//                 type="submit"
//                 className="w-full py-3 bg-gradient-to-r from-[#4ECDC4] to-[#2d8a84] rounded hover:opacity-90 transition"
//               >
//                 Send Reset Link
//               </button>

//             </>
//           ) : (

//             <p className="text-green-400 text-center">
//               ✅ If an account
//               exists, a reset link
//               has been sent.
//             </p>

//           )}

//           <div className="text-center">

//             <button
//               type="button"
//               onClick={() => {

//                 setForgotMode(
//                   false
//                 );

//                 setResetSent(
//                   false
//                 );
//               }}
//               className="text-blue-400 text-sm hover:underline"
//             >
//               ← Back to Login
//             </button>

//           </div>

//         </form>
//       )}

//     </div>
//   );
// }
