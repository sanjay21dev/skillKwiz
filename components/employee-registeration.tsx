"use client";

import { useState } from "react";

import { Upload } from "lucide-react";

interface EmployeeRegistrationProps {
  onNext: () => void;
}

export default function EmployeeRegistration({
  onNext,
}: EmployeeRegistrationProps) {

  // =========================
  // FORM STATES
  // =========================

  const [firstName, setFirstName] =
    useState("");

  const [lastName, setLastName] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [phone, setPhone] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [selectedFile,
    setSelectedFile] =
    useState<File | null>(null);

  // =========================
  // OTP STATES
  // =========================

  const [emailOtpSent,
    setEmailOtpSent] =
    useState(false);

  const [emailOtp,
    setEmailOtp] =
    useState("");

  const [emailVerified,
    setEmailVerified] =
    useState(false);

  // =========================
  // SEND OTP
  // =========================

  const handleSendOtp =
    async () => {

      if (!email) {

        alert(
          "Please enter email"
        );

        return;
      }

      try {

        const response =
          await fetch(
            "/api/employee/send-otp",
            {
              method: "POST",

              headers: {
                "Content-Type":
                  "application/json",
              },

              body: JSON.stringify({
                email,
              }),
            }
          );

        const data =
          await response.json();

        if (data.success) {

          setEmailOtpSent(
            true
          );

          alert(
            "OTP sent successfully"
          );

        } else {

          alert(
            data.message ||
            "Failed to send OTP"
          );
        }

      } catch (error) {

        console.log(error);

        alert(
          "Something went wrong"
        );
      }
    };

  // =========================
  // VERIFY OTP
  // =========================

  const handleVerifyOtp =
    async () => {

      try {

        const response =
          await fetch(
            "/api/employee/verify-otp",
            {
              method: "POST",

              headers: {
                "Content-Type":
                  "application/json",
              },

              body: JSON.stringify({
                email,
                otp: emailOtp,
              }),
            }
          );

        const data =
          await response.json();

        if (data.success) {

          setEmailVerified(
            true
          );

          alert(
            "Email verified successfully"
          );

        } else {

          alert(
            "Invalid OTP"
          );
        }

      } catch (error) {

        console.log(error);

        alert(
          "Verification failed"
        );
      }
    };

  // =========================
  // SUBMIT
  // =========================

  const handleSubmit =
    async () => {

      if (!firstName ||
          !lastName ||
          !email ||
          !phone ||
          !password
      ) {

        alert(
          "Please fill all fields"
        );

        return;
      }

      if (!emailVerified) {

        alert(
          "Please verify email first"
        );

        return;
      }

      if (!selectedFile) {

        alert(
          "Please upload resume"
        );

        return;
      }

      try {

        const formData =
          new FormData();

        formData.append(
          "firstName",
          firstName
        );

        formData.append(
          "lastName",
          lastName
        );

        formData.append(
          "email",
          email
        );

        formData.append(
          "phone",
          phone
        );

        formData.append(
          "password",
          password
        );

        formData.append(
          "resume",
          selectedFile
        );

        const response =
          await fetch(
            "/api/employee/register",
            {
              method: "POST",

              body: formData,
            }
          );

        const data =
          await response.json();

        console.log(data);

        if (data.success) {

          alert(
            "Registration successful"
          );

          onNext();

        } else {

          alert(
            data.message ||
            "Registration failed"
          );
        }

      } catch (error) {

        console.log(error);

        alert(
          "Registration failed"
        );
      }
    };

  // =========================
  // RESET
  // =========================

  const handleReset = () => {

    setFirstName("");
    setLastName("");
    setEmail("");
    setPhone("");
    setPassword("");

    setSelectedFile(null);

    setEmailOtp("");
    setEmailOtpSent(false);

    setEmailVerified(false);
  };

  return (

    <div className="text-white">

      <h1 className="text-3xl font-semibold text-center mb-8">
        Employee Registration
      </h1>

      <div className="space-y-6">

        {/* NAME */}

        <div>

          <label className="block mb-2">
            Name
          </label>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            <input
              type="text"
              placeholder="First Name"
              value={firstName}
              onChange={(e) =>
                setFirstName(
                  e.target.value
                )
              }
              className="w-full bg-[#333333] rounded px-4 py-3 text-white placeholder-gray-400 focus:outline-none"
            />

            <input
              type="text"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) =>
                setLastName(
                  e.target.value
                )
              }
              className="w-full bg-[#333333] rounded px-4 py-3 text-white placeholder-gray-400 focus:outline-none"
            />

          </div>

        </div>

        {/* EMAIL */}

        <div>

          <label className="block mb-2">
            Email
          </label>

          <div className="flex">

            <input
              type="email"
              placeholder="Enter Email"
              value={email}
              onChange={(e) =>
                setEmail(
                  e.target.value
                )
              }
              className="flex-1 bg-[#333333] rounded-l px-4 py-3 text-white placeholder-gray-400 focus:outline-none"
            />

            <button
              type="button"
              className="bg-[#333333] rounded-r px-4 py-3 text-white hover:bg-[#444444]"
              onClick={
                handleSendOtp
              }
            >
              Get OTP
            </button>

          </div>

          {/* OTP */}

          {emailOtpSent && (

            <div className="mt-3 flex gap-2">

              <input
                type="text"
                placeholder="Enter OTP"
                value={emailOtp}
                onChange={(e) =>
                  setEmailOtp(
                    e.target.value
                  )
                }
                className="w-40 bg-[#333333] rounded px-4 py-3 text-white placeholder-gray-400 focus:outline-none"
              />

              <button
                type="button"
                className="bg-blue-600 px-4 rounded hover:bg-blue-700"
                onClick={
                  handleVerifyOtp
                }
              >
                Verify
              </button>

            </div>
          )}

          {emailVerified && (

            <p className="text-green-400 mt-2">
              ✅ Email verified
            </p>

          )}

        </div>

        {/* PHONE */}

        <div>

          <label className="block mb-2">
            Phone
          </label>

          <input
            type="tel"
            placeholder="Enter Phone No."
            value={phone}
            onChange={(e) =>
              setPhone(
                e.target.value
              )
            }
            className="w-full bg-[#333333] rounded px-4 py-3 text-white placeholder-gray-400 focus:outline-none"
          />

        </div>

        {/* PASSWORD */}

        <div>

          <label className="block mb-2">
            Password
          </label>

          <input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) =>
              setPassword(
                e.target.value
              )
            }
            className="w-full bg-[#333333] rounded px-4 py-3 text-white placeholder-gray-400 focus:outline-none"
          />

        </div>

        {/* RESUME */}

        <div>

          <label className="block mb-2">
            Upload Resume
          </label>

          <label className="w-full bg-[#333333] rounded px-4 py-3 text-white hover:bg-[#444444] flex items-center cursor-pointer">

            <Upload className="w-5 h-5 mr-2" />

            <span>

              {selectedFile
                ? selectedFile.name
                : "Upload your Resume"}

            </span>

            <input
              type="file"
              className="hidden"
              accept=".pdf,.doc,.docx"
              onChange={(e) => {

                const file =
                  e.target.files?.[0];

                if (file) {

                  setSelectedFile(
                    file
                  );
                }
              }}
            />

          </label>

        </div>

        {/* BUTTONS */}

        <div className="flex justify-center gap-4 mt-8">

          <button
            onClick={
              handleSubmit
            }
            className="px-10 py-2 rounded bg-gradient-to-r from-[#4ECDC4] to-[#2d8a84] text-white hover:opacity-90"
          >
            Submit
          </button>

          <button
            onClick={
              handleReset
            }
            className="px-10 py-2 rounded bg-[#333333] text-white hover:bg-[#444444]"
          >
            Reset
          </button>

        </div>

      </div>

    </div>
  );
}
