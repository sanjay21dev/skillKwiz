"use client";

import {
  useEffect,
  useState,
} from "react";

export default function AdminPage() {

  const [
    requests,
    setRequests,
  ] = useState<any[]>([]);

  // LOAD REQUESTS
  useEffect(() => {

    const loadRequests =
      async () => {

        try {

          const response =
            await fetch(
              "/api/admin/assessment-requests"
            );

          const data =
            await response.json();

          if (data.success) {

            setRequests(
              data.requests
            );
          }

        } catch (error) {

          console.log(error);
        }
      };

    loadRequests();

  }, []);

  // SEND TEST
  const sendTest =
    async (id: number) => {

      try {

        const response =
          await fetch(
            "/api/admin/send-test",
            {
              method: "POST",

              headers: {
                "Content-Type":
                  "application/json",
              },

              body: JSON.stringify({
                id,
              }),
            }
          );

        const data =
          await response.json();

        if (data.success) {

          setRequests(
            requests.map(
              (request) =>

                request.id === id
                  ? {
                      ...request,
                      testStatus:
                        "SENT",
                    }
                  : request
            )
          );

          alert(
            "Test Sent Successfully"
          );
        }

      } catch (error) {

        console.log(error);
      }
    };

  return (

    <div className="min-h-screen bg-[#121212] text-white flex">

      {/* SIDEBAR */}
      <aside className="w-72 bg-[#1c1c1c] border-r border-white/10 p-6">

        <h2 className="text-3xl font-bold mb-10">
          Admin Panel
        </h2>

        <div className="space-y-3">

          <button className="w-full text-left px-4 py-3 rounded-xl bg-[#2b2b2b] hover:bg-[#343434] transition">
            Dashboard
          </button>

          <button className="w-full text-left px-4 py-3 rounded-xl hover:bg-[#343434] transition">
            Assessment Requests
          </button>

          <button className="w-full text-left px-4 py-3 rounded-xl hover:bg-[#343434] transition">
            Payments
          </button>

          <button className="w-full text-left px-4 py-3 rounded-xl hover:bg-[#343434] transition">
            Reports
          </button>

        </div>

      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 p-8 overflow-auto">

        {/* HEADER */}
        <div className="mb-8">

          <h1 className="text-4xl font-bold mb-2">
            Admin Dashboard
          </h1>

          <p className="text-gray-400">
            Manage assessments, payments and reports
          </p>

        </div>

        {/* STATS */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">

          <div className="bg-[#1c1c1c] rounded-2xl p-6 border border-white/10">

            <h3 className="text-gray-400 mb-2">
              Total Requests
            </h3>

            <p className="text-3xl font-bold">
              {requests.length}
            </p>

          </div>

          <div className="bg-[#1c1c1c] rounded-2xl p-6 border border-white/10">

            <h3 className="text-gray-400 mb-2">
              Payments Pending
            </h3>

            <p className="text-3xl font-bold text-yellow-400">
              {
                requests.filter(
                  (
                    request
                  ) =>
                    request.paymentStatus !==
                    "SUCCESS"
                ).length
              }
            </p>

          </div>

          <div className="bg-[#1c1c1c] rounded-2xl p-6 border border-white/10">

            <h3 className="text-gray-400 mb-2">
              Tests Sent
            </h3>

            <p className="text-3xl font-bold text-blue-400">
              {
                requests.filter(
                  (
                    request
                  ) =>
                    request.testStatus ===
                    "SENT"
                ).length
              }
            </p>

          </div>

          <div className="bg-[#1c1c1c] rounded-2xl p-6 border border-white/10">

            <h3 className="text-gray-400 mb-2">
              Reports Uploaded
            </h3>

            <p className="text-3xl font-bold text-green-400">
              {
                requests.filter(
                  (
                    request
                  ) =>
                    request.reportStatus ===
                    "UPLOADED"
                ).length
              }
            </p>

          </div>

        </div>

        {/* TABLE */}
        <div className="bg-[#1c1c1c] rounded-2xl border border-white/10 overflow-hidden">

          {/* TABLE HEADER */}
          <div className="p-6 border-b border-white/10">

            <h2 className="text-2xl font-semibold">
              Assessment Requests
            </h2>

          </div>

          {/* TABLE */}
          <div className="overflow-x-auto">

            <table className="w-full text-left">

              <thead className="bg-[#222] text-gray-300">

                <tr>

                  <th className="p-4">
                    Sl No
                  </th>

                  <th className="p-4">
                    Candidate
                  </th>

                  <th className="p-4">
                    Email
                  </th>

                  <th className="p-4">
                    Company
                  </th>

                  <th className="p-4">
                    Payment
                  </th>

                  <th className="p-4">
                    Test
                  </th>

                  <th className="p-4">
                    Report
                  </th>

                  <th className="p-4">
                    Actions
                  </th>

                </tr>

              </thead>

              <tbody>

                {requests.map(
                  (
                    request,
                    index
                  ) => (

                    <tr
                      key={request.id}
                      className="border-t border-white/10 hover:bg-[#232323]"
                    >

                      <td className="p-4">
                        {index + 1}
                      </td>

                      <td className="p-4">
                        {
                          request.employeeName
                        }
                      </td>

                      <td className="p-4">
                        {
                          request.employeeEmail
                        }
                      </td>

                      <td className="p-4 capitalize">
                        {
                          request.company
                        }
                      </td>

                      {/* PAYMENT */}
                      <td className="p-4">

                        <span className={`px-3 py-1 rounded-full text-sm
                        ${
                          request.paymentStatus ===
                          "SUCCESS"
                            ? "bg-green-500/20 text-green-400"
                            : "bg-yellow-500/20 text-yellow-400"
                        }`}>

                          {
                            request.paymentStatus
                          }

                        </span>

                      </td>

                      {/* TEST */}
                      <td className="p-4">

                        <span className={`px-3 py-1 rounded-full text-sm
                        ${
                          request.testStatus ===
                          "SENT"
                            ? "bg-blue-500/20 text-blue-400"
                            : "bg-gray-500/20 text-gray-300"
                        }`}>

                          {
                            request.testStatus
                          }

                        </span>

                      </td>

                      {/* REPORT */}
                      <td className="p-4">

                        <span className={`px-3 py-1 rounded-full text-sm
                        ${
                          request.reportStatus ===
                          "UPLOADED"
                            ? "bg-green-500/20 text-green-400"
                            : "bg-gray-500/20 text-gray-300"
                        }`}>

                          {
                            request.reportStatus
                          }

                        </span>

                      </td>

                      {/* ACTIONS */}
                      <td className="p-4">

                        <div className="flex gap-2">

                          <button
                            onClick={() =>
                              sendTest(
                                request.id
                              )
                            }
                            className="bg-[#00418d] hover:opacity-90 px-4 py-2 rounded-lg text-sm transition"
                          >
                            Send Test
                          </button>

                          <button className="bg-green-600 hover:opacity-90 px-4 py-2 rounded-lg text-sm transition">
                            Upload Report
                          </button>

                        </div>

                      </td>

                    </tr>
                  )
                )}

              </tbody>

            </table>

          </div>

        </div>

      </main>

    </div>
  );
}