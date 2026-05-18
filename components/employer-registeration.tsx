"use client";

import { useState } from "react";

interface EmployerRegistrationProps {
  onSubmit: (data: any) => void;
}

export default function EmployerRegistration({
  onSubmit,
}: EmployerRegistrationProps) {

  // FORM STATES
  const [firstName, setFirstName] =
    useState("");

  const [lastName, setLastName] =
    useState("");

  const [company, setCompany] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [phone, setPhone] =
    useState("");

  const [department, setDepartment] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [
    confirmPassword,
    setConfirmPassword,
  ] = useState("");

  const [loading, setLoading] =
    useState(false);

  // STEP COMPLETION
  const step1Complete =
    firstName.trim() !== "" &&
    lastName.trim() !== "" &&
    company.trim() !== "";

  const step2Complete =
    step1Complete &&
    email.trim() !== "" &&
    phone.trim() !== "";

  const step3Complete =
    step2Complete &&
    department.trim() !== "";

  const stepClass = (
    completed: boolean
  ) =>
    completed
      ? "bg-[#4ECDC4] text-black font-medium"
      : "border border-white/50 text-white/70";

  // REGISTER EMPLOYER
  const handleRegister =
    async () => {

      if (
        !firstName ||
        !lastName ||
        !company ||
        !email ||
        !phone ||
        !department ||
        !password ||
        !confirmPassword
      ) {

        alert(
          "Please fill all fields"
        );

        return;
      }

      if (
        password !==
        confirmPassword
      ) {

        alert(
          "Passwords do not match"
        );

        return;
      }

      try {

        setLoading(true);

        const response =
          await fetch(
            "/api/employer/register",
            {
              method: "POST",

              headers: {
                "Content-Type":
                  "application/json",
              },

              body: JSON.stringify({
                firstName,
                lastName,

                companyName:
                  company,

                email,

                phone,

                department,

                password,
              }),
            }
          );

        const data =
          await response.json();

        if (data.success) {

          alert(
            "Employer Registered Successfully"
          );

          window.location.href =
            "/employer-assessment-request";

        } else {

          alert(
            data.message
          );
        }

      } catch (error) {

        alert(
          "Registration Failed"
        );

      } finally {

        setLoading(false);
      }
    };

  return (

    <div className="text-white">

      <h1 className="text-3xl font-semibold text-center mb-6">
        Employer Registration
      </h1>

      {/* PROGRESS */}
      <div className="flex justify-center mb-10">

        <div className="flex items-center gap-6 text-sm">

          {/* STEP 1 */}
          <div className="flex items-center gap-2">

            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center ${stepClass(
                step1Complete
              )}`}
            >
              1
            </div>

            Details

          </div>

          <div className="w-10 h-px bg-white/30" />

          {/* STEP 2 */}
          <div className="flex items-center gap-2">

            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center ${stepClass(
                step2Complete
              )}`}
            >
              2
            </div>

            Contact

          </div>

          <div className="w-10 h-px bg-white/30" />

          {/* STEP 3 */}
          <div className="flex items-center gap-2">

            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center ${stepClass(
                step3Complete
              )}`}
            >
              3
            </div>

            Department

          </div>

        </div>

      </div>

      <div className="space-y-12">

        {/* STEP 1 */}
        <section>

          <h2 className="text-xl font-medium mb-6">
            Step 1: Personal & Company Details
          </h2>

          <div className="space-y-6">

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
                className="bg-[#333333] rounded px-4 py-3"
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
                className="bg-[#333333] rounded px-4 py-3"
              />

            </div>

            <input
              type="text"
              placeholder="Company Name"
              value={company}
              onChange={(e) =>
                setCompany(
                  e.target.value
                )
              }
              className="bg-[#333333] rounded px-4 py-3 w-full"
            />

          </div>

        </section>

        <div className="border-t border-white/20" />

        {/* STEP 2 */}
        <section>

          <h2 className="text-xl font-medium mb-6">
            Step 2: Contact Information
          </h2>

          <div className="space-y-6">

            {/* EMAIL */}
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) =>
                setEmail(
                  e.target.value
                )
              }
              className="w-full bg-[#333333] rounded px-4 py-3"
            />

            {/* PHONE */}
            <input
              type="tel"
              placeholder="Phone"
              value={phone}
              onChange={(e) =>
                setPhone(
                  e.target.value
                )
              }
              className="w-full bg-[#333333] rounded px-4 py-3"
            />

            {/* PASSWORD */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) =>
                  setPassword(
                    e.target.value
                  )
                }
                className="bg-[#333333] rounded px-4 py-3"
              />

              <input
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) =>
                  setConfirmPassword(
                    e.target.value
                  )
                }
                className="bg-[#333333] rounded px-4 py-3"
              />

            </div>

          </div>

        </section>

        <div className="border-t border-white/20" />

        {/* STEP 3 */}
        <section>

          <h2 className="text-xl font-medium mb-6">
            Step 3: Department
          </h2>

          <select
            value={department}
            onChange={(e) =>
              setDepartment(
                e.target.value
              )
            }
            className="w-full bg-[#333333] rounded px-4 py-3"
          >

            <option value="">
              Select Department
            </option>

            <option>
              Human Resources
            </option>

            <option>
              Engineering
            </option>

            <option>
              Marketing
            </option>

            <option>
              Sales
            </option>

            <option>
              Finance
            </option>

          </select>

        </section>

        {/* SUBMIT */}
        <div className="flex justify-center gap-4 pt-4">

          <button
            onClick={handleRegister}
            disabled={loading}
            className="px-10 py-3 rounded bg-gradient-to-r from-[#4ECDC4] to-[#2d8a84] hover:opacity-90"
          >
            {loading
              ? "Registering..."
              : "Submit"}
          </button>

        </div>

      </div>

    </div>
  );
}