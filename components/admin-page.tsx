"use client";

import {
  useEffect,
  useState,
} from "react";

import {
  LayoutDashboard,
  FileText,
  CreditCard,
  BarChart3,
  Users,
  Upload,
} from "lucide-react";

export default function AdminPage() {

  const [
    requests,
    setRequests,
  ] = useState<any[]>([]);

  const [
    loading,
    setLoading,
  ] = useState(false);

  const [
    selectedReport,
    setSelectedReport,
  ] = useState<any>(null);

  const [
    showReportDialog,
    setShowReportDialog,
  ] = useState(false);

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

  // SEND TEST LINK
  const sendTest =
    async (request: any) => {

      try {

        setLoading(true);

        const testLink =
          `${window.location.origin}/test/${request.id}`;

        const response =
          await fetch(
            "/api/admin/send-test-link",
            {
              method: "POST",

              headers: {
                "Content-Type":
                  "application/json",
              },

              body: JSON.stringify({

                requestId:
                  request.id,

                employeeEmail:
                  request.employeeEmail,

                employeeName:
                  request.employeeName,

                testLink,
              }),
            }
          );

        const data =
          await response.json();

        if (data.success) {

          setRequests(
            requests.map(
              (item) =>

                item.id ===
                request.id
                  ? {
                      ...item,

                      testStatus:
                        "SENT",

                      status:
                        "TEST_LINK_SENT",

                      testLink,
                    }
                  : item
            )
          );

          alert(
            `Test Link Sent To ${request.employeeEmail}`
          );

        }

      } catch (error) {

        console.log(error);

      } finally {

        setLoading(false);
      }
    };

  return (

    <div className="min-h-screen bg-[#0f172a]/95 text-white flex rounded-3xl overflow-hidden">

      {/* SIDEBAR */}
      <aside className="hidden lg:flex flex-col w-72 bg-[#111827]/95 border-r border-white/10 p-6">

        <div className="mb-12">

          <h2 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            SkillKwiz
          </h2>

          <p className="text-gray-400 mt-2 text-sm">
            Admin Management Portal
          </p>

        </div>

        <div className="space-y-3">

          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-500/20">

            <LayoutDashboard className="w-5 h-5" />

            Dashboard

          </button>

          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/5 transition">

            <FileText className="w-5 h-5" />

            Assessment Requests

          </button>

          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/5 transition">

            <CreditCard className="w-5 h-5" />

            Payments

          </button>

          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/5 transition">

            <BarChart3 className="w-5 h-5" />

            Reports

          </button>

        </div>

      </aside>

      {/* MAIN */}
      <main className="flex-1 overflow-auto">

        {/* TOPBAR */}
        <div className="sticky top-0 z-20 backdrop-blur-xl bg-[#111827]/80 border-b border-white/10 px-8 py-5">

          <div className="flex items-center justify-between">

            <div>

              <h1 className="text-3xl font-bold">
                Admin Dashboard
              </h1>

              <p className="text-gray-400 mt-1">
                Manage assessments, payments and reports
              </p>

            </div>

            <div className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-sm">

              Total Candidates:
              {" "}

              <span className="font-semibold text-cyan-400">
                {requests.length}
              </span>

            </div>

          </div>

        </div>

        <div className="p-8">

          {/* TABLE */}
          <div className="bg-[#0f172a]/95 rounded-3xl border border-white/10 overflow-hidden shadow-2xl">

            <div className="p-6 border-b border-white/10">

              <h2 className="text-2xl font-bold">
                Assessment Requests
              </h2>

            </div>

            <div className="overflow-x-auto">

              <table className="w-full min-w-[1200px] text-left">

                <thead className="bg-[#172033] text-gray-300">

                  <tr>

                    <th className="p-5">
                      #
                    </th>

                    <th className="p-5">
                      Candidate
                    </th>

                    <th className="p-5">
                      Email
                    </th>

                    <th className="p-5">
                      Company
                    </th>

                    <th className="p-5">
                      Payment
                    </th>

                    <th className="p-5">
                      Test
                    </th>

                    <th className="p-5">
                      Report
                    </th>

                    <th className="p-5">
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
                        className="border-t border-white/5 hover:bg-white/[0.03]"
                      >

                        <td className="p-5">
                          {index + 1}
                        </td>

                        <td className="p-5">

                          <div className="flex items-center gap-3">

                            <div className="w-11 h-11 rounded-full bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center font-semibold">

                              {
                                request.employeeName?.charAt(
                                  0
                                )
                              }

                            </div>

                            <div>

                              <p className="font-semibold">
                                {
                                  request.employeeName
                                }
                              </p>

                            </div>

                          </div>

                        </td>

                        <td className="p-5">
                          {
                            request.employeeEmail
                          }
                        </td>

                        <td className="p-5">
                          {
                            request.company
                          }
                        </td>

                        <td className="p-5">

                          <span className="px-4 py-1.5 rounded-full text-xs font-semibold bg-green-500/15 text-green-400 border border-green-500/20">

                            {
                              request.paymentStatus
                            }

                          </span>

                        </td>

                        <td className="p-5">

                          <span className="px-4 py-1.5 rounded-full text-xs font-semibold bg-blue-500/15 text-blue-400 border border-blue-500/20">

                            {
                              request.testStatus ||
                              "PENDING"
                            }

                          </span>

                        </td>

                        <td className="p-5">

                          <span className="px-4 py-1.5 rounded-full text-xs font-semibold bg-yellow-500/15 text-yellow-400 border border-yellow-500/20">

                            {
                              request.reportStatus ||
                              "PENDING"
                            }

                          </span>

                        </td>

                        <td className="p-5">

                          <select
                            className="bg-[#172033] border border-white/10 rounded-xl px-4 py-3 text-sm outline-none w-full"
                            defaultValue=""
                            onChange={async (e) => {

                              const action =
                                e.target.value;

                              // SEND TEST
                              if (
                                action ===
                                "send-test"
                              ) {

                                sendTest(
                                  request
                                );
                              }

                              // VIEW REPORT
                              if (
                                action ===
                                "view-report"
                              ) {

                                setSelectedReport(
                                  request
                                );

                                setShowReportDialog(
                                  true
                                );
                              }

                              // UPLOAD REPORT
                              if (
                                action ===
                                "upload-report"
                              ) {

                                try {

                                  const response =
                                    await fetch(
                                      "/api/admin/upload-report",
                                      {
                                        method: "POST",

                                        headers: {
                                          "Content-Type":
                                            "application/json",
                                        },

                                        body: JSON.stringify({

                                          requestId:
                                            request.id,

                                          reportStatus:
                                            "UPLOADED",

                                          score:
                                            request.score ||
                                            "85",

                                          reportUrl:
                                            "/reports/sample-report.pdf",
                                        }),
                                      }
                                    );

                                  const data =
                                    await response.json();

                                  if (data.success) {

                                    setRequests(
                                      requests.map(
                                        (item) =>

                                          item.id ===
                                          request.id
                                            ? {
                                                ...item,

                                                reportStatus:
                                                  "UPLOADED",

                                                reportUrl:
                                                  "/reports/sample-report.pdf",

                                                score:
                                                  request.score ||
                                                  "85",
                                              }
                                            : item
                                      )
                                    );

                                    setSelectedReport({

                                      ...request,

                                      reportStatus:
                                        "UPLOADED",

                                      reportUrl:
                                        "/reports/sample-report.pdf",

                                      score:
                                        request.score ||
                                        "85",
                                    });

                                    setShowReportDialog(
                                      true
                                    );

                                    alert(
                                      "Report Uploaded Successfully"
                                    );
                                  }

                                } catch (error) {

                                  console.log(error);

                                  alert(
                                    "Something went wrong"
                                  );
                                }
                              }

                              e.target.value =
                                "";
                            }}
                          >

                            <option
                              value=""
                              disabled
                            >
                              Select Action
                            </option>

                            <option
                              value="send-test"
                              disabled={
                                request.testStatus ===
                                  "SENT" ||
                                loading
                              }
                            >

                              {
                                request.testStatus ===
                                "SENT"
                                  ? "Test Already Sent"
                                  : "Send Test"
                              }

                            </option>

                            <option value="view-report">
                              View Report
                            </option>

                            <option value="upload-report">
                              Upload Report
                            </option>

                          </select>

                        </td>

                      </tr>
                    )
                  )}

                </tbody>

              </table>

            </div>

          </div>

        </div>

      </main>

      {/* REPORT DIALOG */}
      {
        showReportDialog && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">

            <div className="w-full max-w-lg rounded-3xl bg-[#111827] border border-white/10 shadow-2xl overflow-hidden">

              {/* HEADER */}
              <div className="px-6 py-5 border-b border-white/10 flex items-center justify-between">

                <div>

                  <h2 className="text-2xl font-bold text-white">
                    Candidate Report
                  </h2>

                </div>

                <button
                  onClick={() => {

                    setShowReportDialog(
                      false
                    );

                    setSelectedReport(
                      null
                    );
                  }}
                  className="w-10 h-10 rounded-xl bg-white/5 hover:bg-red-500/20 transition flex items-center justify-center text-gray-300 hover:text-red-400 text-xl"
                >
                  ×
                </button>

              </div>

              {/* BODY */}
              <div className="p-6 space-y-5">

                <div className="bg-[#1e293b] rounded-2xl p-5 border border-white/5">

                  <p className="text-sm text-gray-400 mb-1">
                    Candidate Name
                  </p>

                  <h3 className="text-xl font-semibold text-white">
                    {
                      selectedReport?.employeeName
                    }
                  </h3>

                </div>

                <div className="bg-[#1e293b] rounded-2xl p-5 border border-white/5">

                  <p className="text-sm text-gray-400 mb-1">
                    Email Address
                  </p>

                  <h3 className="text-lg text-white break-all">
                    {
                      selectedReport?.employeeEmail
                    }
                  </h3>

                </div>

                <div className="bg-[#1e293b] rounded-2xl p-5 border border-white/5">

                  <p className="text-sm text-gray-400 mb-1">
                    Company
                  </p>

                  <h3 className="text-lg text-white">
                    {
                      selectedReport?.company
                    }
                  </h3>

                </div>

                <div className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-2xl p-6 border border-cyan-500/20">

                  <p className="text-sm text-cyan-300 mb-2">
                    Test Score
                  </p>

                  <h2 className="text-5xl font-bold text-cyan-400">
                    {
                      selectedReport?.score
                    }
                  </h2>

                </div>

              </div>

              {/* FOOTER */}
              <div className="px-6 py-5 border-t border-white/10 flex justify-end">

                <button
                  onClick={() => {

                    setShowReportDialog(
                      false
                    );

                    setSelectedReport(
                      null
                    );
                  }}
                  className="px-6 py-3 rounded-2xl bg-cyan-500 hover:bg-cyan-600 transition font-semibold"
                >
                  Close
                </button>

              </div>

            </div>

          </div>
        )
      }

    </div>
  );
}