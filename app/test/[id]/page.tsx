"use client";

import {
  useEffect,
  useState,
} from "react";

import {
  useParams,
  useRouter,
} from "next/navigation";

const questions = [
  {
    id: 1,
    question:
      "What is the output of 2 + '2' in JavaScript?",
    options: [
      "4",
      "22",
      "NaN",
      "undefined",
    ],
    answer: "22",
  },

  {
    id: 2,
    question:
      "Which language is primarily used for React?",
    options: [
      "Python",
      "Java",
      "JavaScript",
      "C++",
    ],
    answer: "JavaScript",
  },

  {
    id: 3,
    question:
      "Which SQL command is used to fetch data?",
    options: [
      "INSERT",
      "UPDATE",
      "SELECT",
      "DELETE",
    ],
    answer: "SELECT",
  },

  {
    id: 4,
    question:
      "Which company developed TypeScript?",
    options: [
      "Google",
      "Meta",
      "Microsoft",
      "Amazon",
    ],
    answer: "Microsoft",
  },

  {
    id: 5,
    question:
      "What does API stand for?",
    options: [
      "Application Programming Interface",
      "Applied Program Internet",
      "Advanced Programming Integration",
      "Application Process Integration",
    ],
    answer:
      "Application Programming Interface",
  },
];

export default function TestPage() {

  const params =
    useParams();

  const router =
    useRouter();

  const assessmentId =
    params.id as string;

  const [
    answers,
    setAnswers,
  ] = useState<Record<number, string>>(
    {}
  );

  const [
    submitted,
    setSubmitted,
  ] = useState(false);

  const [
    score,
    setScore,
  ] = useState(0);

  const [
    checking,
    setChecking,
  ] = useState(true);

  const [
    alreadyCompleted,
    setAlreadyCompleted,
  ] = useState(false);

  // CHECK TEST STATUS
  useEffect(() => {

    const checkTestStatus =
      async () => {

        try {

          const response =
            await fetch(
              `/api/test/status/${assessmentId}`
            );

          const data =
            await response.json();

          if (
            data.success &&
            data.completed
          ) {

            setAlreadyCompleted(
              true
            );
          }

        } catch (error) {

          console.log(error);

        } finally {

          setChecking(false);
        }
      };

    checkTestStatus();

  }, [assessmentId]);

  const handleOptionChange = (
    questionId: number,
    option: string
  ) => {

    setAnswers({
      ...answers,
      [questionId]: option,
    });
  };

  const handleSubmit =
    async () => {

      let total = 0;

      questions.forEach(
        (question) => {

          if (
            answers[
              question.id
            ] ===
            question.answer
          ) {

            total++;
          }
        }
      );

      setScore(total);

      try {

        const response =
          await fetch(
            "/api/test/submit",
            {
              method: "POST",

              headers: {
                "Content-Type":
                  "application/json",
              },

              body: JSON.stringify({

                assessmentRequestId:
                  assessmentId,

                answers,

                score:
                  `${total}/${questions.length}`,
              }),
            }
          );

        const data =
          await response.json();

        if (
          data.success
        ) {

          setSubmitted(
            true
          );

        } else {

          alert(
            data.message ||
            "Failed to submit test"
          );
        }

      } catch (error) {

        console.log(error);

        alert(
          "Something went wrong"
        );
      }
    };

  // LOADING
  if (checking) {

    return (

      <div className="min-h-screen bg-[#121212] flex items-center justify-center text-white">

        <div className="text-center">

          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-6" />

          <h2 className="text-2xl font-semibold">
            Checking Test Status...
          </h2>

        </div>

      </div>
    );
  }

  // ALREADY COMPLETED
  if (alreadyCompleted) {

    return (

      <div className="min-h-screen bg-[#121212] flex items-center justify-center p-6">

        <div className="bg-[#1f1f1f] border border-white/10 rounded-3xl p-10 max-w-xl w-full text-center text-white">

          <h1 className="text-4xl font-bold mb-4 text-red-400">
            Test Already Completed
          </h1>

          <p className="text-lg text-gray-300 mb-6">
            You have already submitted this assessment.
          </p>

          <div className="bg-[#2b2b2b] border border-white/10 rounded-2xl p-6 mb-8">

            <p className="text-gray-400 text-sm mb-2">
              Assessment Status
            </p>

            <p className="text-2xl font-semibold text-green-400">
              Submitted Successfully
            </p>

          </div>

          <button
            onClick={() => {
              router.push(
                "/services"
              );
            }}
            className="bg-[#00418d] hover:opacity-90 transition px-8 py-3 rounded-2xl text-lg font-semibold"
          >
            Close
          </button>

        </div>

      </div>
    );
  }

  // SUCCESS SCREEN
  if (submitted) {

    return (

      <div className="min-h-screen bg-[#121212] flex items-center justify-center p-6">

        <div className="bg-[#1f1f1f] border border-white/10 rounded-3xl p-10 max-w-xl w-full text-center text-white">

          <h1 className="text-4xl font-bold mb-4 text-green-400">
            Test Submitted Successfully
          </h1>

          <p className="text-lg text-gray-300 mb-6">
            Thank you for completing the assessment.
          </p>

          <div className="bg-[#2b2b2b] border border-white/10 rounded-2xl p-6 mb-6">

            <p className="text-gray-400 text-sm mb-2">
              Assessment Status
            </p>

            <p className="text-2xl font-semibold text-green-400">
              Completed
            </p>

          </div>

          <div className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-2xl p-6 border border-cyan-500/20 mb-6">

            <p className="text-sm text-cyan-300 mb-2">
              Your Score
            </p>

            <h2 className="text-5xl font-bold text-cyan-400">
              {score}/
              {
                questions.length
              }
            </h2>

          </div>

          <p className="text-gray-400 mb-8">
            Your results have been submitted successfully.
            The employer/admin will review your assessment report.
          </p>

          <button
            onClick={() => {
              router.push(
                "/services"
              );
            }}
            className="bg-[#00418d] hover:opacity-90 transition px-8 py-3 rounded-2xl text-lg font-semibold"
          >
            Close
          </button>

        </div>

      </div>
    );
  }

  return (

    <div className="min-h-screen bg-[#121212] text-white p-6 md:p-10">

      <div className="max-w-4xl mx-auto">

        {/* HEADER */}
        <div className="mb-10">

          <h1 className="text-4xl font-bold mb-3">
            Skill Assessment Test
          </h1>

          <p className="text-gray-400">
            Assessment ID:
            {" "}
            {assessmentId}
          </p>

        </div>

        {/* QUESTIONS */}
        <div className="space-y-6">

          {questions.map(
            (
              question,
              index
            ) => (

              <div
                key={question.id}
                className="bg-[#1f1f1f] border border-white/10 rounded-2xl p-6"
              >

                <h2 className="text-xl font-semibold mb-6">

                  Q{index + 1}.
                  {" "}
                  {
                    question.question
                  }

                </h2>

                <div className="space-y-4">

                  {question.options.map(
                    (
                      option
                    ) => (

                      <label
                        key={option}
                        className={`flex items-center gap-3 p-4 rounded-xl border cursor-pointer transition
                        ${
                          answers[
                            question.id
                          ] === option
                            ? "border-blue-500 bg-blue-500/10"
                            : "border-white/10 bg-[#2b2b2b]"
                        }`}
                      >

                        <input
                          type="radio"
                          name={`question-${question.id}`}
                          value={option}
                          checked={
                            answers[
                              question.id
                            ] === option
                          }
                          onChange={() =>
                            handleOptionChange(
                              question.id,
                              option
                            )
                          }
                          className="w-4 h-4"
                        />

                        <span>
                          {option}
                        </span>

                      </label>
                    )
                  )}

                </div>

              </div>
            )
          )}

        </div>

        {/* SUBMIT */}
        <div className="mt-10 text-center">

          <button
            onClick={
              handleSubmit
            }
            className="bg-[#00418d] hover:opacity-90 transition px-10 py-4 rounded-2xl text-lg font-semibold"
          >
            Submit Test
          </button>

        </div>

      </div>

    </div>
  );
}