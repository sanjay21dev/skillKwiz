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

import {
  Elements,
  PaymentElement,
  ExpressCheckoutElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";

import {
  loadStripe,
} from "@stripe/stripe-js";

const stripePromise =
  loadStripe(
    process.env
      .NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || ""
  );

  function CheckoutForm({
  selectedAssessment,
  candidateId,
  jobFamily,
  skillsFamily,
  costUnit,
  department,
  businessUnit,
  selectedSkills,
  amount,
  setShowThankYou,
  setShowAssessmentModal,
}: any) {

  const stripe = useStripe();

  const elements =
    useElements();

  const [
    loading,
    setLoading,
  ] = useState(false);

  const handleSubmit =
    async (
      e: React.FormEvent
    ) => {

      e.preventDefault();

      if (
        !stripe ||
        !elements
      ) {
        return;
      }

      setLoading(true);

      const result =
  await stripe.confirmPayment({
    elements,
    redirect: "if_required",
  });

if (result.error) {

  alert(
    result.error.message
  );

  setLoading(false);

  return;
}

      if (
        result.paymentIntent
          ?.status ===
        "succeeded"
      ) {

        try {

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
                    result.paymentIntent.id,

                  paymentStatus:
                    result.paymentIntent.status,

                  paymentMethod:
                    "STRIPE",

                  amount: amount,

                  testStatus:
                    "PENDING",

                  reportStatus:
                    "PENDING",

                  adminApprovalStatus:
                    "PENDING",
                }),
              }
            );

          const data =
            await response.json();

          if (data.success) {

            setShowThankYou(
              true
            );

            setShowAssessmentModal(
              false
            );
          }

        } catch (error) {

          console.log(
            error
          );

          alert(
            "Stripe payment failed"
          );
        }
      }

      setLoading(false);
    };

  return (

    <form
      onSubmit={
        handleSubmit
      }
      className="space-y-4"
    >

      <div className="space-y-4">

  {/* GOOGLE PAY / APPLE PAY */}
  <div className="bg-white rounded-xl p-4">

    <ExpressCheckoutElement

  onConfirm={async (event) => {

    if (!stripe || !elements) {
      return;
    }

    const { error } =
      await stripe.confirmPayment({
        elements,
        confirmParams: {},
        redirect: "if_required",
      });

    if (error) {

      alert(error.message);

    }
  }}
/>

  </div>

  {/* CARD FORM */}
  <div className="bg-white rounded-xl p-4">

    <PaymentElement />

  </div>

</div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-[#635BFF] text-white py-3 rounded-lg hover:opacity-90 transition"
      >
        {loading
          ? "Processing..."
          : "Pay With Stripe"}
      </button>

    </form>
  );
}

export default function EmployerAssessmentRequest() {

  const [
  clientSecret,
  setClientSecret,
] = useState("");

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

    //pricing state
  const costMapping: Record<string, number> = {
  HR: 20,
  Finance: 40,
  Operations: 60,
};

const assessmentAmount =
  costMapping[costUnit] || 0;

 
  // LOAD STRIPE PAYMENT INTENT
const loadStripeIntent =
  async () => {

    try {

      const response =
        await fetch(
          "/api/stripe/create-payment-intent",
          {
            method: "POST",

            headers: {
              "Content-Type":
                "application/json",
            },

            body: JSON.stringify({
              amount:
                assessmentAmount,
            }),
          }
        );

      const data =
        await response.json();

      setClientSecret(
        data.clientSecret
      );

    } catch (error) {

      console.log(error);
    }
  };

// RELOAD STRIPE WHEN COST CHANGES
useEffect(() => {

  if (assessmentAmount > 0) {

    loadStripeIntent();

  }

}, [assessmentAmount]);

 // LOAD SCHEDULED ASSESSMENTS
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

          <div className="h-[500px] overflow-y-auto overflow-x-auto rounded-xl border border-white/10 scrollbar-thin scrollbar-thumb-[#4ECDC4] scrollbar-track-[#1f1f1f]">

            <table className="w-full text-sm text-left">

              <thead className="bg-[#222] text-gray-300 sticky top-0 z-10">

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
<div className="space-y-6">

  {/* PAYPAL */}
  <div className="bg-[#2b2b2b] border border-white/10 p-5 rounded-2xl">

    <div className="flex items-center justify-between mb-4">

      <h3 className="text-base font-medium">
        Pay With PayPal
      </h3>

      <p className="text-2xl font-bold text-green-400">
        ${assessmentAmount}
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
                  value: assessmentAmount.toString(),
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

            const order =
              await actions.order?.capture();

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

                    paymentMethod:
                      "PAYPAL",

                    amount: assessmentAmount,

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

  {/* STRIPE */}
  <div className="bg-[#2b2b2b] border border-white/10 p-5 rounded-2xl">

    <div className="flex items-center justify-between mb-4">

      <h3 className="text-base font-medium">
        Pay With Stripe
      </h3>

      <p className="text-2xl font-bold text-[#635BFF]">
        ${assessmentAmount}
      </p>

    </div>

    {clientSecret && (

      <Elements
  stripe={stripePromise}
  options={{
    clientSecret,

    appearance: {
      theme: "stripe",
    },
    loader: "auto",
  }}
>

        <CheckoutForm
          selectedAssessment={
            selectedAssessment
          }

          candidateId={
            candidateId
          }

          jobFamily={
            jobFamily
          }

          skillsFamily={
            skillsFamily
          }

          costUnit={
            costUnit
          }

          department={
            department
          }

          businessUnit={
            businessUnit
          }

          selectedSkills={
            selectedSkills
          }

          amount={
            assessmentAmount
          }

          setShowThankYou={
            setShowThankYou
          }

          setShowAssessmentModal={
            setShowAssessmentModal
          }
        />

      </Elements>
    )}

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