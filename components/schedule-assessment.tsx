"use client";

import {
  useState,
  useEffect,
} from "react";

import {
  Info,
  Calendar,
  Clock,
} from "lucide-react";

export default function ScheduleAssessment() {

  const [
    selectedCompany,
    setSelectedCompany,
  ] = useState<string>(
    "microsoft"
  );

  const [
    showThankYou,
    setShowThankYou,
  ] = useState(false);

  // EMPLOYEE DETAILS
  const [
    employeeName,
    setEmployeeName,
  ] = useState("");

  const [
    employeeEmail,
    setEmployeeEmail,
  ] = useState("");

  const [
    employeePhone,
    setEmployeePhone,
  ] = useState("");

  const [
    loadingEmployee,
    setLoadingEmployee,
  ] = useState(true);

  // LOCATION STATES
  const [country, setCountry] =
    useState("");

  const [zipCode, setZipCode] =
    useState("");

  const [
    testingCenter,
    setTestingCenter,
  ] = useState("");

  // DATE & TIME STATES
  const [
    assessmentDate,
    setAssessmentDate,
  ] = useState("");

  const [
    assessmentTime,
    setAssessmentTime,
  ] = useState("");

  // LOAD LOGGED-IN EMPLOYEE
  useEffect(() => {

    const loadEmployee =
      async () => {

        try {

          const response =
            await fetch(
              "/api/employee/me",
              {
                method: "GET",
                credentials: "include",
              }
            );

          if (!response.ok) {

            console.log(
              "Employee not authenticated"
            );

            setLoadingEmployee(
              false
            );

            return;
          }

          const data =
            await response.json();

          console.log(
            "EMPLOYEE DATA:",
            data
          );

          if (
            data.success &&
            data.employee
          ) {

            const employee =
              data.employee;

            setEmployeeName(
              `${employee.firstName} ${employee.lastName}`
            );

            setEmployeeEmail(
              employee.email
            );

            setEmployeePhone(
              employee.phone
            );
          }

        } catch (error) {

          console.log(
            "EMPLOYEE LOAD ERROR:",
            error
          );

        } finally {

          setLoadingEmployee(
            false
          );
        }
      };

    loadEmployee();

  }, []);

  useEffect(() => {

    if (showThankYou) {

      window.scrollTo({
        top: 100,
        behavior: "smooth",
      });
    }

  }, [showThankYou]);

  // SUBMIT FORM
  const handleSubmit = async () => {

    if (
      !employeeName ||
      !employeeEmail ||
      !employeePhone ||
      !country ||
      !zipCode ||
      !testingCenter ||
      !assessmentDate ||
      !assessmentTime
    ) {

      alert(
        "Please fill all fields"
      );

      return;
    }

    try {

      const response =
        await fetch(
          "/api/schedule-assessment",
          {
            method: "POST",

            headers: {
              "Content-Type":
                "application/json",
            },

            body: JSON.stringify({
              employeeName,
              employeeEmail,

              phone:
                employeePhone,

              company:
                selectedCompany,

              country,
              zipCode,
              testingCenter,

              assessmentDate,
              assessmentTime,
            }),
          }
        );

      const result =
        await response.json();

      if (result.success) {

        setShowThankYou(true);

      } else {

        alert(
          "Failed to save assessment"
        );
      }

    } catch (error) {

      console.log(error);

      alert(
        "Something went wrong"
      );
    }
  };

  return (

    <div className="text-white max-w-5xl mx-auto">

      <h1 className="text-3xl font-semibold text-center mb-2">
        Schedule Assessment
      </h1>

      <p className="text-center text-gray-300 mb-10">
        Register for your preferred skill assessment slot
      </p>

      <div className="space-y-12">

        {/* SECTION 1 */}
        <section>

          <h2 className="text-xl font-medium mb-4 text-center">
            Authorized Employers
          </h2>

          <p className="text-center text-lg text-gray-300 mb-6">
            Multiple employers have authorised you to take an assessment.
            Select one to continue.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

            {[
              "microsoft",
              "google",
              "amazon",
            ].map((company) => (

              <button
                key={company}
                onClick={() =>
                  setSelectedCompany(
                    company
                  )
                }
                className={`flex items-center justify-center gap-3 rounded-xl px-4 py-4 transition-all duration-200
                ${
                  selectedCompany ===
                  company
                    ? "bg-green-500/20 border border-green-500"
                    : "bg-[#2b2b2b] border border-white/10 hover:bg-[#343434]"
                }`}
              >

                <span
                  className={`w-4 h-4 rounded-full ${
                    selectedCompany ===
                    company
                      ? "bg-green-500"
                      : "bg-gray-500"
                  }`}
                />

                <span className="capitalize text-base font-medium">
                  {company}
                </span>

              </button>
            ))}

          </div>

          <div className="bg-[#2d5184]/70 border border-blue-500/20 rounded-xl p-5 flex items-start gap-4 mt-6">

            <Info className="w-6 h-6 mt-1 text-blue-300" />

            <p className="text-gray-200 leading-relaxed">
              Microsoft has authorized you to take an assessment for
              C#, SQL Server, Web2.0, and React.
            </p>

          </div>

        </section>

        <div className="border-t border-white/10" />

        {/* EMPLOYEE DETAILS */}
        <section>

          <h2 className="text-xl font-medium mb-6">
            Employee Details
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            {/* NAME */}
            <div>

              <label className="block mb-2 text-sm text-gray-300">
                Employee Name
              </label>

              <input
                type="text"
                value={
                  loadingEmployee
                    ? "Loading..."
                    : employeeName
                }
                readOnly
                className="w-full bg-[#2b2b2b] border border-white/10 rounded-xl px-4 py-3 text-gray-300 cursor-not-allowed focus:outline-none"
              />

            </div>

            {/* EMAIL */}
            <div>

              <label className="block mb-2 text-sm text-gray-300">
                Employee Email
              </label>

              <input
                type="email"
                value={
                  loadingEmployee
                    ? "Loading..."
                    : employeeEmail
                }
                readOnly
                className="w-full bg-[#2b2b2b] border border-white/10 rounded-xl px-4 py-3 text-gray-300 cursor-not-allowed focus:outline-none"
              />

            </div>

            {/* PHONE */}
            <div>

              <label className="block mb-2 text-sm text-gray-300">
                Employee Phone
              </label>

              <input
                type="text"
                value={
                  loadingEmployee
                    ? "Loading..."
                    : employeePhone
                }
                readOnly
                className="w-full bg-[#2b2b2b] border border-white/10 rounded-xl px-4 py-3 text-gray-300 cursor-not-allowed focus:outline-none"
              />

            </div>

          </div>

        </section>

        <div className="border-t border-white/10" />

        {/* LOCATION */}
        <section>

          <h2 className="text-xl font-medium mb-6">
            Assessment Location
          </h2>

          <div className="space-y-4">

            {/* COUNTRY */}
            <div>

              <label className="block mb-2">
                Country
              </label>

              <select
                value={country}
                onChange={(e) =>
                  setCountry(
                    e.target.value
                  )
                }
                className="w-full bg-[#2b2b2b] border border-white/10 rounded-xl px-4 py-3"
              >

                <option value="">
                  Select Country
                </option>

                <option value="India">
                  India
                </option>

                <option value="USA">
                  USA
                </option>

              </select>

            </div>

            {/* ZIP */}
            <div>

              <label className="block mb-2">
                Zip Code
              </label>

              <input
                type="text"
                value={zipCode}
                onChange={(e) =>
                  setZipCode(
                    e.target.value
                  )
                }
                placeholder="Enter Zip Code"
                className="w-full bg-[#2b2b2b] border border-white/10 rounded-xl px-4 py-3"
              />

            </div>

            {/* CENTER */}
            <div>

              <label className="block mb-2">
                Testing Centre
              </label>

              <select
                value={testingCenter}
                onChange={(e) =>
                  setTestingCenter(
                    e.target.value
                  )
                }
                className="w-full bg-[#2b2b2b] border border-white/10 rounded-xl px-4 py-3"
              >

                <option value="">
                  Select Testing Centre
                </option>

                <option value="Bangalore">
                  Bangalore
                </option>

                <option value="Hyderabad">
                  Hyderabad
                </option>

              </select>

            </div>

          </div>

        </section>

        <div className="border-t border-white/10" />

        {/* DATE & TIME */}
        <section>

          <h2 className="text-xl font-medium mb-6">
            Schedule Date & Time
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {/* DATE */}
            <div>

              <label className="block mb-2">
                Select Date
              </label>

              <div className="flex items-center bg-[#2b2b2b] border border-white/10 rounded-xl px-4 py-3">

                <input
                  type="date"
                  value={assessmentDate}
                  onChange={(e) =>
                    setAssessmentDate(
                      e.target.value
                    )
                  }
                  className="bg-transparent w-full outline-none"
                />

                <Calendar className="ml-auto w-5 h-5 text-gray-400" />

              </div>

            </div>

            {/* TIME */}
            <div>

              <label className="block mb-2">
                Select Time
              </label>

              <div className="flex items-center bg-[#2b2b2b] border border-white/10 rounded-xl px-4 py-3">

                <input
                  type="time"
                  value={assessmentTime}
                  onChange={(e) =>
                    setAssessmentTime(
                      e.target.value
                    )
                  }
                  className="bg-transparent w-full outline-none"
                />

                <Clock className="ml-auto w-5 h-5 text-gray-400" />

              </div>

            </div>

          </div>

        </section>

        <div className="border-t border-white/10" />

        {/* SUBMIT BUTTON */}
        {/* ACTION BUTTONS */}
{/* ACTION BUTTONS */}
<section>

  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

    {/* SUBMIT */}
    <button
      onClick={handleSubmit}
      className="w-full md:w-auto px-10 py-3 bg-gradient-to-r from-[#4ECDC4] to-[#2d8a84] rounded-xl hover:opacity-90 transition font-medium"
    >
      Submit
    </button>

    {/* START TEST */}
    <button
      onClick={async () => {

        try {

          // CHECK IF TEST LINK EXISTS
          const response =
            await fetch(
              `/api/employee/test-link?email=${employeeEmail}`
            );

          const data =
            await response.json();

          if (
            data.success &&
            data.testLink
          ) {

            // OPEN TEST PAGE
            window.location.href =
              data.testLink;

          } else {

            alert(
              "Test link not sent by admin yet"
            );
          }

        } catch (error) {

          console.log(error);

          alert(
            "Something went wrong"
          );
        }
      }}
      className="w-full md:w-auto px-10 py-3 bg-gradient-to-r from-[#00418d] to-[#0066cc] rounded-xl hover:opacity-90 transition font-medium"
    >
      Start Test
    </button>

  </div>

</section>

      </div>

      {/* THANK YOU MODAL */}
      {showThankYou && (

        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">

          <div className="bg-white rounded-2xl p-8 w-[90%] max-w-md text-center text-[#00418d] shadow-2xl">

            <h2 className="text-2xl font-semibold mb-4">
              Thank You!
            </h2>

            <p className="text-gray-700 mb-6">
              Your assessment has been successfully submitted.
            </p>

            <button
              onClick={() =>
                setShowThankYou(
                  false
                )
              }
              className="bg-[#00418d] text-white px-6 py-2 rounded-lg hover:opacity-90"
            >
              Close
            </button>

          </div>

        </div>
      )}

    </div>
  );
}