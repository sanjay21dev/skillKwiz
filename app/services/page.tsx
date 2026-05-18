"use client";

import {
  useState,
  useEffect,
} from "react";

import Image from "next/image";

import LoginForm from "@/components/login-form";

import EmployeeRegistration from "@/components/employee-registeration";

import ScheduleAssessment from "@/components/schedule-assessment";

import EmployerRegistration from "@/components/employer-registeration";

import EmployerProfile from "@/components/employer-profile";

import EmployerAssessmentRequest from "@/components/employer-assessment-request";

import EmployerCandidateList from "@/components/employer-candidate-list";

import SuccessMessage from "@/components/success-message";

import AdminPage from "@/components/admin-page";

export default function ServicesPage() {

  const [
    isLoggedIn,
    setIsLoggedIn,
  ] = useState(false);

  const [
    userType,
    setUserType,
  ] = useState<
    | "employer"
    | "employee"
    | "admin"
    | null
  >(null);

  const [
    employeeRegistrationSuccess,
    setEmployeeRegistrationSuccess,
  ] = useState(false);

  const [
    employerRegistrationSuccess,
    setEmployerRegistrationSuccess,
  ] = useState(false);

  const [
    employeeScreen,
    setEmployeeScreen,
  ] = useState<
    "registration" | "assessment"
  >("registration");

  const [
    employerScreen,
    setEmployerScreen,
  ] = useState<
    | "registration"
    | "profile"
    | "assessment"
    | "candidates"
  >("registration");

  const [
    employerData,
    setEmployerData,
  ] = useState<any>(null);

  // LOAD EMPLOYER DATA
  useEffect(() => {

    const stored =
      localStorage.getItem(
        "employerData"
      );

    if (stored) {

      setEmployerData(
        JSON.parse(stored)
      );
    }

  }, []);

  // =========================
  // LOGIN HANDLER
  // =========================
  const handleLogin = (
    type:
      | "employer"
      | "employee"
      | "admin",
    isSignup?: boolean
  ) => {

    setIsLoggedIn(true);

    setUserType(type);

    // =========================
    // ADMIN FLOW
    // =========================
    if (type === "admin") {

      return;
    }

    // =========================
    // EMPLOYER FLOW
    // =========================
    if (type === "employer") {

      // NEW EMPLOYER
      if (isSignup) {

        setEmployerScreen(
          "registration"
        );

      }

      // EXISTING EMPLOYER
      else {

        const stored =
          localStorage.getItem(
            "employerData"
          );

        if (stored) {

          setEmployerData(
            JSON.parse(stored)
          );

          setEmployerScreen(
            "assessment"
          );

        } else {

          setEmployerScreen(
            "registration"
          );
        }
      }
    }

    // =========================
    // EMPLOYEE FLOW
    // =========================
    else {

      // NEW EMPLOYEE
      if (isSignup) {

        setEmployeeScreen(
          "registration"
        );
      }

      // EXISTING EMPLOYEE
      else {

        setEmployeeScreen(
          "assessment"
        );
      }
    }
  };

  // =========================
  // EMPLOYER REGISTER COMPLETE
  // =========================
  const handleEmployerRegistrationComplete =
    (data: any) => {

      setEmployerData(data);

      localStorage.setItem(
        "employerData",
        JSON.stringify(data)
      );

      setEmployerRegistrationSuccess(
        true
      );
    };

  // =========================
  // EMPLOYER SUCCESS CONTINUE
  // =========================
  const continueToEmployerProfile =
    () => {

      setEmployerRegistrationSuccess(
        false
      );

      setEmployerScreen(
        "assessment"
      );
    };

  // =========================
  // EMPLOYEE SUCCESS CONTINUE
  // =========================
  const continueToEmployeeAssessment =
    () => {

      setEmployeeRegistrationSuccess(
        false
      );

      setEmployeeScreen(
        "assessment"
      );
    };

  return (

    <div className="min-h-screen bg-gradient-to-br from-[#002b5c] via-[#004aad] to-[#3b82f6] relative overflow-x-hidden">

      {/* GLOBE IMAGE */}
      <div className="hidden lg:block absolute right-0 top-1/2 -translate-y-1/2 animate-float-slow pointer-events-none z-0 opacity-80">

        <Image
          src="/images/homepage/home_globe.gif"
          alt="Global skill assessment platform"
          width={520}
          height={420}
        />

      </div>

      {/* MAIN */}
      <div className="relative z-15 pt-16">

        <div
    className={`mx-auto px-4 ${
      userType === "admin"
        ? "w-full max-w-[1900px]"
        : "max-w-5xl"
    }`}
  >

          {/* LOGIN PAGE */}
          {!isLoggedIn ? (

            <div className="bg-gradient-to-r from-[#3a4a7b]/90 to-[#9ba3b9]/90 rounded-lg p-8 max-w-md mx-auto">

              <LoginForm
                onLogin={
                  handleLogin
                }
              />

            </div>

          ) : userType ===
            "admin" ? (

            // =========================
            // ADMIN PAGE
            // =========================
            <AdminPage />

          ) : userType ===
            "employee" ? (

            // =========================
            // EMPLOYEE FLOW
            // =========================
            <div className="bg-gradient-to-r from-[#3a4a7b]/90 to-[#9ba3b9]/90 rounded-lg p-8">

              {employeeRegistrationSuccess ? (

                <SuccessMessage
                  title="Registration Successful!"
                  message="Your employee account has been created successfully."
                  buttonText="Continue"
                  onContinue={
                    continueToEmployeeAssessment
                  }
                />

              ) : employeeScreen ===
                "registration" ? (

                <EmployeeRegistration
                  onNext={() =>
                    setEmployeeRegistrationSuccess(
                      true
                    )
                  }
                />

              ) : (

                <ScheduleAssessment />

              )}

            </div>

          ) : employerRegistrationSuccess ? (

            // =========================
            // EMPLOYER SUCCESS
            // =========================
            <div className="bg-gradient-to-r from-[#3a4a7b]/90 to-[#9ba3b9]/90 rounded-lg p-8">

              <SuccessMessage
                title="Registration Successful!"
                message="Your employer account has been created successfully."
                buttonText="Continue"
                onContinue={
                  continueToEmployerProfile
                }
              />

            </div>

          ) : employerScreen ===
            "registration" ? (

            // =========================
            // EMPLOYER REGISTRATION
            // =========================
            <EmployerRegistration
              onSubmit={
                handleEmployerRegistrationComplete
              }
            />

          ) : (

            <>
              {/* EMPLOYER NAVIGATION */}
              <div className="bg-[#b8bdc7] rounded-lg mb-4">

                <div className="grid grid-cols-3 gap-1">

                  <button
                    onClick={() =>
                      setEmployerScreen(
                        "profile"
                      )
                    }
                    className={`py-3 px-4 text-white ${
                      employerScreen ===
                      "profile"
                        ? "bg-[#2d5184] rounded-lg"
                        : ""
                    }`}
                  >
                    Profile
                  </button>

                  <button
                    onClick={() =>
                      setEmployerScreen(
                        "assessment"
                      )
                    }
                    className={`py-3 px-4 text-white ${
                      employerScreen ===
                      "assessment"
                        ? "bg-[#2d5184] rounded-lg"
                        : ""
                    }`}
                  >
                    Assessment Request
                  </button>

                  <button
                    onClick={() =>
                      setEmployerScreen(
                        "candidates"
                      )
                    }
                    className={`py-3 px-4 text-white ${
                      employerScreen ===
                      "candidates"
                        ? "bg-[#2d5184] rounded-lg"
                        : ""
                    }`}
                  >
                    Candidate List
                  </button>

                </div>

              </div>

              {/* EMPLOYER CONTENT */}
              <div className="bg-gradient-to-r from-[#3a4a7b]/90 to-[#9ba3b9]/90 rounded-lg p-8">

                {employerScreen ===
                  "profile" && (

                  <EmployerProfile
                    data={
                      employerData
                    }
                    onUpdate={(
                      updated
                    ) => {

                      setEmployerData(
                        updated
                      );

                      localStorage.setItem(
                        "employerData",
                        JSON.stringify(
                          updated
                        )
                      );
                    }}
                  />

                )}

                {employerScreen ===
                  "assessment" && (

                  <EmployerAssessmentRequest />

                )}

                {employerScreen ===
                  "candidates" && (

                  <EmployerCandidateList />

                )}

              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}