"use client";

import {
  useState,
  useEffect,
} from "react";

import { Upload } from "lucide-react";

import {
  PayPalScriptProvider,
  PayPalButtons,
} from "@paypal/react-paypal-js";

export default function EmployerAssessmentRequest() {

  const [
    scheduledAssessments,
    setScheduledAssessments,
  ] = useState<any[]>([]);

  const [
    selectedAssessment,
    setSelectedAssessment,
  ] = useState<any>(null);

  const [
    showAssessmentModal,
    setShowAssessmentModal,
  ] = useState(false);

  const [
    selectedSkills,
    setSelectedSkills,
  ] = useState<string[]>([
    "C++",
    "Python",
    "JavaScript",
    "React",
    "AWS",
    "Jenkins",
    "SQL",
    "Java",
    "Docker",
    "Nodejs",
  ]);

  const [
    showThankYou,
    setShowThankYou,
  ] = useState(false);

  // FORM STATES
  const [
    firstName,
    setFirstName,
  ] = useState("");

  const [
    lastName,
    setLastName,
  ] = useState("");

  const [email, setEmail] =
    useState("");

  const [phone, setPhone] =
    useState("");

  const [candidateId, setCandidateId] =
    useState("PAN Card");

  const [jobFamily, setJobFamily] =
    useState("");

  const [
    skillsFamily,
    setSkillsFamily,
  ] = useState("");

  const [costUnit, setCostUnit] =
    useState("");

  const [department, setDepartment] =
    useState("");

  const [businessUnit, setBusinessUnit] =
    useState("");

  const [creditCard, setCreditCard] =
    useState("");

  const [resume, setResume] =
    useState<File | null>(null);

  // LOAD SCHEDULED ASSESSMENTS
  useEffect(() => {

    const loadAssessments =
      async () => {

        try {

          const response =
            await fetch(
              "/api/schedule-assessment/list"
            );

          const data =
            await response.json();

          if (data.success) {

            setScheduledAssessments(
              data.assessments
            );
          }

        } catch (error) {

          console.log(error);
        }
      };

    loadAssessments();

  }, []);

  const toggleSkill = (
    skill: string
  ) => {

    if (
      selectedSkills.includes(
        skill
      )
    ) {

      setSelectedSkills(
        selectedSkills.filter(
          (s) => s !== skill
        )
      );

    } else {

      setSelectedSkills([
        ...selectedSkills,
        skill,
      ]);
    }
  };

  return (

    <PayPalScriptProvider
      options={{
        clientId:
          process.env
            .NEXT_PUBLIC_PAYPAL_CLIENT_ID || "",
        currency: "USD",
      }}
    >

      <div className="text-white">

        <h1 className="text-3xl font-semibold text-center mb-2">
          Employer Skill
        </h1>

        <h1 className="text-3xl font-semibold text-center mb-6">
          Assessment Request
        </h1>

        {/* TABLE */}
        <div>

          <div className="overflow-x-auto rounded-xl border border-white/10">

            <table className="w-full text-sm text-left">

              <thead className="bg-[#222] text-gray-300">

                <tr>

                  <th className="p-4">
                    Sl.No
                  </th>

                  <th className="p-4">
                    Employee
                  </th>

                  <th className="p-4">
                    Email
                  </th>

                  <th className="p-4">
                    Company
                  </th>

                  <th className="p-4">
                    Country
                  </th>

                  <th className="p-4">
                    Center
                  </th>

                  <th className="p-4">
                    Date
                  </th>

                  <th className="p-4">
                    Time
                  </th>

                  <th className="p-4">
                    Action
                  </th>

                </tr>

              </thead>

              <tbody>

                {scheduledAssessments.map(
                  (
                    assessment,
                    index
                  ) => (

                    <tr
                      key={assessment.id}
                      className="border-t border-white/10"
                    >

                      <td className="p-4">
                        {index + 1}
                      </td>

                      <td className="p-4">
                        {assessment.employeeName}
                      </td>

                      <td className="p-4">
                        {assessment.employeeEmail}
                      </td>

                      <td className="p-4 capitalize">
                        {assessment.company}
                      </td>

                      <td className="p-4">
                        {assessment.country}
                      </td>

                      <td className="p-4">
                        {assessment.testingCenter}
                      </td>

                      <td className="p-4">
                        {assessment.assessmentDate}
                      </td>

                      <td className="p-4">
                        {assessment.assessmentTime}
                      </td>

                      <td className="p-4">

                        <button
                          onClick={() => {

                            setSelectedAssessment(
                              assessment
                            );

                            setFirstName(
                              assessment.employeeName.split(
                                " "
                              )[0] || ""
                            );

                            setLastName(
                              assessment.employeeName.split(
                                " "
                              )[1] || ""
                            );

                            setEmail(
                              assessment.employeeEmail
                            );

                            setPhone(
                              assessment.phone || ""
                            );

                            setShowAssessmentModal(
                              true
                            );
                          }}
                          className="px-4 py-2 bg-[#4ECDC4] text-black rounded-lg hover:opacity-90"
                        >
                          Open Form
                        </button>

                      </td>

                    </tr>
                  )
                )}

              </tbody>

            </table>

          </div>

        </div>

        {/* MODAL */}
        {showAssessmentModal && (

          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 overflow-y-auto">

            <div className="bg-[#1f1f1f] rounded-2xl w-full max-w-xl max-h-[80vh] overflow-y-auto text-white shadow-2xl">

              {/* HEADER */}
              <div className="flex items-center justify-between border-b border-white/10 px-4 py-3 sticky top-0 bg-[#1f1f1f] z-10 rounded-t-2xl">

                <h2 className="text-xl font-semibold">
                  Employer Assessment Form
                </h2>

                <button
                  onClick={() =>
                    setShowAssessmentModal(
                      false
                    )
                  }
                  className="w-9 h-9 flex items-center justify-center rounded-full bg-[#333] hover:bg-[#444] text-white text-lg transition"
                >
                  ✕
                </button>

              </div>

              {/* BODY */}
              <div className="p-4 space-y-4">

                {/* Candidate Name */}
                <div>

                  <label className="block mb-2 text-sm text-gray-300">
                    Candidate Name
                  </label>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                    <input
                      type="text"
                      value={firstName}
                      readOnly
                      className="w-full bg-[#333333] rounded-lg px-4 py-3 text-gray-400 cursor-not-allowed focus:outline-none"
                    />

                    <input
                      type="text"
                      value={lastName}
                      readOnly
                      className="w-full bg-[#333333] rounded-lg px-4 py-3 text-gray-400 cursor-not-allowed focus:outline-none"
                    />

                  </div>

                </div>

                {/* Email */}
                <div>

                  <label className="block mb-2 text-sm text-gray-300">
                    Candidate Email
                  </label>

                  <input
                    type="email"
                    value={email}
                    readOnly
                    className="w-full bg-[#333333] rounded-lg px-4 py-3 text-gray-400 cursor-not-allowed focus:outline-none"
                  />

                </div>

                {/* Phone */}
                <div>

                  <label className="block mb-2 text-sm text-gray-300">
                    Candidate Phone
                  </label>

                  <input
                    type="text"
                    value={phone}
                    readOnly
                    className="w-full bg-[#333333] rounded-lg px-4 py-3 text-gray-400 cursor-not-allowed focus:outline-none"
                  />

                </div>

                {/* Candidate ID */}
                <div>

                  <label className="block mb-2 text-sm text-gray-300">
                    Candidate ID
                  </label>

                  <select
                    value={candidateId}
                    onChange={(e) =>
                      setCandidateId(
                        e.target.value
                      )
                    }
                    className="w-full bg-[#333333] rounded-lg px-4 py-3 text-white focus:outline-none"
                  >

                    <option>
                      PAN Card
                    </option>

                    <option>
                      Aadhar Card
                    </option>

                    <option>
                      Voter ID
                    </option>

                    <option>
                      Passport
                    </option>

                  </select>

                </div>

                {/* Resume */}
                <div>

                  <label className="block mb-2 text-sm text-gray-300">
                    Upload Resume
                  </label>

                  <label className="w-full bg-[#333333] rounded-lg px-4 py-3 flex items-center cursor-pointer hover:bg-[#444] transition">

                    <Upload className="w-5 h-5 mr-2" />

                    <span className="text-sm">
                      {resume
                        ? resume.name
                        : "Upload Resume"}
                    </span>

                    <input
                      type="file"
                      className="hidden"
                      accept=".pdf,.doc,.docx"
                      onChange={(e) =>
                        setResume(
                          e.target.files?.[0] ||
                            null
                        )
                      }
                    />

                  </label>

                </div>

                {/* Skills */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                  <select
                    value={jobFamily}
                    onChange={(e) =>
                      setJobFamily(
                        e.target.value
                      )
                    }
                    className="w-full bg-[#333333] rounded-lg px-4 py-3 text-white focus:outline-none"
                  >

                    <option value="">
                      Job Family
                    </option>

                    <option>
                      IT
                    </option>

                    <option>
                      Finance
                    </option>

                    <option>
                      Accounting
                    </option>

                  </select>

                  <select
                    value={skillsFamily}
                    onChange={(e) =>
                      setSkillsFamily(
                        e.target.value
                      )
                    }
                    className="w-full bg-[#333333] rounded-lg px-4 py-3 text-white focus:outline-none"
                  >

                    <option value="">
                      Skills Family
                    </option>

                    <option>
                      Programming Languages
                    </option>

                    <option>
                      Frameworks
                    </option>

                    <option>
                      Databases
                    </option>

                  </select>

                </div>

                {/* Selected Skills */}
                <div>

                  <label className="block mb-2 text-sm text-gray-300">
                    Selected Skills
                  </label>

                  <div className="flex flex-wrap gap-2 bg-[#333333] rounded-lg p-4">

                    {selectedSkills.map(
                      (skill) => (

                        <button
                          key={skill}
                          type="button"
                          onClick={() =>
                            toggleSkill(
                              skill
                            )
                          }
                          className="bg-white text-black px-3 py-1 rounded-full text-sm"
                        >
                          {skill}
                        </button>
                      )
                    )}

                  </div>

                </div>

                {/* Cost Unit */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                  <select
                    value={costUnit}
                    onChange={(e) =>
                      setCostUnit(
                        e.target.value
                      )
                    }
                    className="w-full bg-[#333333] rounded-lg px-4 py-3 text-white focus:outline-none"
                  >

                    <option value="">
                      Cost Unit
                    </option>

                    <option>
                      HR
                    </option>

                    <option>
                      Finance
                    </option>

                    <option>
                      Operations
                    </option>

                  </select>

                  <select
                    value={department}
                    onChange={(e) =>
                      setDepartment(
                        e.target.value
                      )
                    }
                    className="w-full bg-[#333333] rounded-lg px-4 py-3 text-white focus:outline-none"
                  >

                    <option value="">
                      Department
                    </option>

                    <option>
                      Talent Acquisition
                    </option>

                    <option>
                      Recruitment
                    </option>

                    <option>
                      Staffing
                    </option>

                  </select>

                </div>

                {/* Business Unit */}
                <div>

                  <label className="block mb-2 text-sm text-gray-300">
                    Business Unit
                  </label>

                  <select
                    value={businessUnit}
                    onChange={(e) =>
                      setBusinessUnit(
                        e.target.value
                      )
                    }
                    className="w-full bg-[#333333] rounded-lg px-4 py-3 text-white focus:outline-none"
                  >

                    <option value="">
                      Select Business Unit
                    </option>

                    <option>
                      TA-BU1
                    </option>

                    <option>
                      TA-BU2
                    </option>

                    <option>
                      TA-BU3
                    </option>

                  </select>

                </div>

                {/* Credit Card */}
                <div>

                  <label className="block mb-2 text-sm text-gray-300">
                    Credit Card
                  </label>

                  <select
                    value={creditCard}
                    onChange={(e) =>
                      setCreditCard(
                        e.target.value
                      )
                    }
                    className="w-full bg-[#333333] rounded-lg px-4 py-3 text-white focus:outline-none"
                  >

                    <option value="">
                      Select Card
                    </option>

                    <option>
                      ICICI Card
                    </option>

                    <option>
                      HDFC Card
                    </option>

                    <option>
                      SBI Card
                    </option>

                    <option>
                      Axis Card
                    </option>

                  </select>

                </div>

                {/* PAYMENT */}
                <div className="bg-[#2b2b2b] border border-white/10 p-5 rounded-2xl">

                  <div className="flex items-center justify-between mb-4">

                    <h3 className="text-base font-medium">
                      Assessment Fee
                    </h3>

                    <p className="text-2xl font-bold text-green-400">
                      $40
                    </p>

                  </div>

                  <div className="scale-[0.78] md:scale-[0.82] origin-top-left max-w-[260px]">

                    <PayPalButtons

                      style={{
                        layout: "vertical",
                        height: 35,
                        shape: "rect",
                        tagline: false,
                      }}

                      createOrder={(
                        data,
                        actions
                      ) => {

                        return actions.order.create({
                          intent: "CAPTURE",

                          purchase_units: [
                            {
                              amount: {
                                value: "40",
                                currency_code:
                                  "USD",
                              },
                            },
                          ],
                        });
                      }}

                      onApprove={async (
                        data,
                        actions
                      ) => {

                        try {

                          // CAPTURE PAYMENT
                          const order =
                            await actions.order?.capture();

                          // SAVE REQUEST
                          const response =
                            await fetch(
                              "/api/employer-assessment-request/create",
                              {
                                method: "POST",

                                headers: {
                                  "Content-Type":
                                    "application/json",
                                },

                                body: JSON.stringify({

                                  assessmentId:
                                    selectedAssessment.id,

                                  employeeName:
                                    selectedAssessment.employeeName,

                                  employeeEmail:
                                    selectedAssessment.employeeEmail,

                                  employeePhone:
                                    selectedAssessment.phone,

                                  company:
                                    selectedAssessment.company,

                                  country:
                                    selectedAssessment.country,

                                  testingCenter:
                                    selectedAssessment.testingCenter,

                                  assessmentDate:
                                    selectedAssessment.assessmentDate,

                                  assessmentTime:
                                    selectedAssessment.assessmentTime,

                                  candidateId,

                                  jobFamily,

                                  skillsFamily,

                                  costUnit,

                                  department,

                                  businessUnit,

                                  selectedSkills,

                                  paymentId:
                                    order?.id,

                                  paymentStatus:
                                    order?.status,

                                  amount: 40,

                                  testStatus:
                                    "PENDING",

                                  reportStatus:
                                    "PENDING",

                                  adminApprovalStatus:
                                    "PENDING",
                                }),
                              }
                            );

                          const result =
                            await response.json();

                          if (result.success) {

                            setShowThankYou(
                              true
                            );

                            setShowAssessmentModal(
                              false
                            );

                            // RESET FORM
                            setResume(
                              null
                            );

                            setJobFamily(
                              ""
                            );

                            setSkillsFamily(
                              ""
                            );

                            setCostUnit(
                              ""
                            );

                            setDepartment(
                              ""
                            );

                            setBusinessUnit(
                              ""
                            );

                            setCreditCard(
                              ""
                            );

                          } else {

                            alert(
                              result.message ||
                                "Failed to save assessment request"
                            );
                          }

                        } catch (error) {

                          console.log(
                            error
                          );

                          alert(
                            "Something went wrong"
                          );
                        }
                      }}

                      onError={(err) => {

                        console.log(
                          err
                        );

                        alert(
                          "Payment Failed"
                        );
                      }}
                    />

                  </div>

                </div>

              </div>

            </div>

          </div>
        )}

        {/* THANK YOU */}
        {showThankYou && (

          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">

            <div className="bg-white rounded-2xl p-8 w-[90%] max-w-md text-center text-[#00418d] shadow-2xl">

              <h2 className="text-2xl font-semibold mb-4">
                Thank You!
              </h2>

              <p className="text-gray-700 mb-6">
                Employer assessment request submitted successfully.
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

    </PayPalScriptProvider>
  );
}







