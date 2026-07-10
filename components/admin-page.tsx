"use client";

import {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  LayoutDashboard,
  FileText,
  CreditCard,
  BarChart3,
  Users,
  Upload,
  Bell,
  Search,
  CheckCircle,
  Clock3,
  DollarSign,
  Activity,
} from "lucide-react";

import {
  AreaChart,
  Area,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { PieChart, Pie, Cell } from "recharts";

export default function AdminPage() {

  const [requests, setRequests] = useState<any[]>([]);

  const [loading, setLoading] = useState(false);

  const [selectedReport, setSelectedReport] = useState<any>(null);

  const [showReportDialog, setShowReportDialog] = useState(false);
  const [activeSection, setActiveSection] = useState<
    | "dashboard"
    | "leads"
    | "requests"
    | "payments"
    | "reports"
    | "candidates"
  >("dashboard");
  const [leads, setLeads] = useState<any[]>([]);

  useEffect(() => {
    const storedLeads = typeof window !== "undefined"
      ? window.localStorage.getItem("skillkwizLeads")
      : null;

    if (storedLeads) {
      try {
        setLeads(JSON.parse(storedLeads));
      } catch {
        setLeads([]);
      }
    }

    const loadRequests = async () => {

      try {

        const response = await fetch(
          "/api/admin/assessment-requests"
        );

        const data = await response.json();

        if (data.success) {

          setRequests(data.requests);
        }

      } catch (error) {

        console.log(error);
      }
    };

    loadRequests();

  }, []);

  const sendTest = async (request: any) => {

    try {

      setLoading(true);

      const testLink =
        `${window.location.origin}/test/${request.id}`;

      const response = await fetch(
        "/api/admin/send-test-link",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            requestId: request.id,
            employeeEmail: request.employeeEmail,
            employeeName: request.employeeName,
            testLink,
          }),
        }
      );

      const data = await response.json();

      if (data.success) {

        setRequests(
          requests.map((item) =>
            item.id === request.id
              ? {
                  ...item,
                  testStatus: "SENT",
                  status: "TEST_LINK_SENT",
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

  const requestStats = useMemo(() => {
    let pending = 0;
    let completed = 0;
    let revenue = 0;

    requests.forEach((request) => {
      if (request.testStatus !== "SENT") {
        pending += 1;
      }

      if (request.reportStatus === "UPLOADED") {
        completed += 1;
      }

      revenue += 40;
    });

    return {
      total: requests.length,
      pending,
      completed,
      revenue,
    };
  }, [requests]);

  const statusCounts = useMemo(() => {
    const completed = requests.filter(
      (r) => r.reportStatus === "UPLOADED"
    ).length;

    const pending = Math.max(0, requests.length - completed);

    return [
      { name: "Completed", value: completed, color: "#10B981" },
      { name: "Pending", value: pending, color: "#F59E0B" },
    ];
  }, [requests]);

  const totalRequests = requests.length;
  const completedCount = statusCounts[0]?.value ?? 0;
  const pendingCount = statusCounts[1]?.value ?? 0;
  const completedPct = totalRequests ? Math.round((completedCount / totalRequests) * 100) : 0;
  const pendingPct = totalRequests ? Math.round((pendingCount / totalRequests) * 100) : 0;

  const visibleRequests = useMemo(
    () => requests.slice(0, 4),
    [requests]
  );

  const monthlyChartData = useMemo(() => {
    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    const today = new Date();

    const buckets = Array.from({ length: 6 }, (_, index) => {
      const date = new Date(
        today.getFullYear(),
        today.getMonth() - (5 - index),
        1
      );

      return {
        key: `${date.getFullYear()}-${date.getMonth()}`,
        label: monthNames[date.getMonth()],
      };
    });

    const counts = Object.fromEntries(
      buckets.map((bucket) => [bucket.key, { requests: 0, completed: 0 }])
    );

    requests.forEach((request) => {
      const createdAt = request.createdAt
        ? new Date(request.createdAt)
        : null;

      if (!createdAt || Number.isNaN(createdAt.getTime())) {
        return;
      }

      const key = `${createdAt.getFullYear()}-${createdAt.getMonth()}`;

      if (!counts[key]) {
        return;
      }

      counts[key].requests += 1;

      if (request.reportStatus === "UPLOADED") {
        counts[key].completed += 1;
      }
    });

    return buckets.map((bucket) => ({
      month: bucket.label,
      requests: counts[bucket.key].requests,
    }));
  }, [requests]);

  const latestRequest = useMemo(
    () => requests[0] ?? null,
    [requests]
  );

  const latestCompletedRequest = useMemo(
    () =>
      requests.find(
        (request) => request.reportStatus === "UPLOADED"
      ) ?? null,
    [requests]
  );

  const latestPaidRequest = useMemo(
    () =>
      requests.find(
        (request) =>
          request.paymentStatus === "SUCCESS" ||
          request.paymentStatus === "PAID" ||
          request.paymentStatus === "COMPLETED"
      ) ?? null,
    [requests]
  );

  const latestRegisteredCandidate = useMemo(
    () => requests[0] ?? null,
    [requests]
  );

  const formatRelativeTime = (dateString: string | null | undefined) => {
    if (!dateString) return "just now";

    const diff = Date.now() - new Date(dateString).getTime();

    if (Number.isNaN(diff) || diff < 0) {
      return "recently";
    }

    if (diff < 60000) {
      return `${Math.max(1, Math.floor(diff / 1000))} sec ago`;
    }

    if (diff < 3600000) {
      return `${Math.max(1, Math.floor(diff / 60000))} min ago`;
    }

    if (diff < 86400000) {
      return `${Math.max(1, Math.floor(diff / 3600000))} hr ago`;
    }

    return `${Math.max(1, Math.floor(diff / 86400000))} day${
      Math.floor(diff / 86400000) > 1 ? "s" : ""
    } ago`;
  };

  const formatDate = (dateString: string | null | undefined) => {
    if (!dateString) return "-";

    const date = new Date(dateString);
    return Number.isNaN(date.getTime()) ? "-" : date.toLocaleDateString();
  };

  const formatTime = (dateString: string | null | undefined) => {
    if (!dateString) return "-";

    const date = new Date(dateString);
    return Number.isNaN(date.getTime())
      ? "-"
      : date.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        });
  };

  const sectionMeta = {
    dashboard: {
      eyebrow: "Dashboard Overview",
      title: "Welcome back, Admin!",
      description: "Here's what's happening with your assessments today.",
    },
    leads: {
      eyebrow: "Lead Submissions",
      title: "Leads",
      description: "Data collected from login-section submissions.",
    },
    requests: {
      eyebrow: "Assessment Requests",
      title: "Assessment Requests",
      description: "Review candidate requests and send test links.",
    },
    payments: {
      eyebrow: "Payments",
      title: "Payments",
      description: "Track payment status for assessment requests.",
    },
    reports: {
      eyebrow: "Reports",
      title: "Reports",
      description: "Open uploaded reports and review test results.",
    },
    candidates: {
      eyebrow: "Candidates",
      title: "Candidates",
      description: "View candidate details and assessment progress.",
    },
  }[activeSection];

  return (
    <div className="min-h-screen bg-[#07141E] text-slate-100">
      <div className="relative min-h-screen overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(129,140,248,0.24),_transparent_26%),radial-gradient(circle_at_top_right,_rgba(139,92,246,0.18),_transparent_30%)]" />

        <div className="relative z-10 flex">
          {/* SIDEBAR */}
          <aside className="hidden xl:flex flex-col w-80 bg-[#09172d] border-r border-white/10 px-7 py-8 text-slate-200">
            <div>
              <div className="mb-12">
                <h1 className="text-3xl font-semibold tracking-tight">SkillKwiz</h1>
                <p className="mt-2 text-sm text-slate-400">Admin Dashboard</p>
              </div>

              <div className="space-y-3">
                <button
                  onClick={() => setActiveSection("dashboard")}
                  className={`w-full flex items-center gap-3 rounded-3xl px-5 py-4 text-sm transition ${
                    activeSection === "dashboard"
                      ? "bg-gradient-to-r from-sky-500 via-indigo-500 to-violet-500 shadow-[0_20px_60px_-30px_rgba(59,130,246,0.8)]"
                      : "hover:bg-white/5"
                  }`}
                >
                  <LayoutDashboard className="h-5 w-5" />
                  Dashboard
                </button>

                <button
                  onClick={() => setActiveSection("requests")}
                  className={`w-full flex items-center gap-3 rounded-3xl px-5 py-4 text-sm transition ${
                    activeSection === "requests" ? "bg-white/5" : "hover:bg-white/5"
                  }`}
                >
                  <FileText className="h-5 w-5" />
                  Assessment Requests
                </button>

                <button
                  onClick={() => setActiveSection("leads")}
                  className={`w-full flex items-center gap-3 rounded-3xl px-5 py-4 text-sm transition ${
                    activeSection === "leads" ? "bg-white/5" : "hover:bg-white/5"
                  }`}
                >
                  <Activity className="h-5 w-5" />
                  Leads
                </button>

                <button
                  onClick={() => setActiveSection("payments")}
                  className={`w-full flex items-center gap-3 rounded-3xl px-5 py-4 text-sm transition ${
                    activeSection === "payments" ? "bg-white/5" : "hover:bg-white/5"
                  }`}
                >
                  <CreditCard className="h-5 w-5" />
                  Payments
                </button>

                <button
                  onClick={() => setActiveSection("reports")}
                  className={`w-full flex items-center gap-3 rounded-3xl px-5 py-4 text-sm transition ${
                    activeSection === "reports" ? "bg-white/5" : "hover:bg-white/5"
                  }`}
                >
                  <BarChart3 className="h-5 w-5" />
                  Reports
                </button>

                <button
                  onClick={() => setActiveSection("candidates")}
                  className={`w-full flex items-center gap-3 rounded-3xl px-5 py-4 text-sm transition ${
                    activeSection === "candidates" ? "bg-white/5" : "hover:bg-white/5"
                  }`}
                >
                  <Users className="h-5 w-5" />
                  Candidates
                </button>
              </div>
            </div>

            <div className="mt-auto rounded-3xl border border-white/10 bg-white/5 p-5 shadow-[0_20px_60px_-35px_rgba(15,23,42,0.7)]">
              <p className="text-sm font-semibold">Admin User</p>
              <p className="mt-1 text-xs text-slate-400">admin@skillkwiz.com</p>
            </div>
          </aside>

          {/* MAIN CONTENT */}
          <main className="flex-1 overflow-auto">
            <div className="sticky top-0 z-20 border-b border-white/10 bg-[#07141E]/95 backdrop-blur-xl px-8 py-6">
              <div className="flex flex-col gap-6 xl:flex-row xl:items-center xl:justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.35em] text-sky-300/70">{sectionMeta.eyebrow}</p>
                  <h2 className="mt-4 text-4xl font-semibold text-white">{sectionMeta.title}</h2>
                  <p className="mt-2 max-w-2xl text-sm text-slate-400">{sectionMeta.description}</p>
                </div>

                <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                  <div className="flex items-center gap-3 rounded-3xl border border-white/10 bg-slate-900/80 px-4 py-3">
                    <div className="grid h-11 w-11 place-items-center rounded-2xl bg-slate-800 text-slate-300">
                      <Search className="h-4 w-4" />
                    </div>
                    <input
                      type="text"
                      placeholder="Search"
                      className="h-11 w-72 rounded-2xl border border-transparent bg-slate-950/60 px-4 text-sm text-slate-100 outline-none placeholder:text-slate-500 focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20"
                    />
                  </div>
                  <button className="inline-flex h-11 min-w-[3rem] items-center justify-center rounded-3xl bg-slate-900/80 border border-white/10 text-slate-100 transition hover:bg-slate-800">
                    <Bell className="h-5 w-5" />
                    <span className="absolute -right-0.5 top-2 h-2.5 w-2.5 rounded-full bg-rose-500 ring-2 ring-slate-950" />
                  </button>
                  <div className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-sky-500 to-violet-500 text-sm font-semibold text-white shadow-lg shadow-slate-950/30">
                    AD
                  </div>
                </div>
              </div>
            </div>

            <div className="px-8 py-8 space-y-8">
              {activeSection === "leads" && (
                <div className="space-y-8">
                  <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6 shadow-[0_40px_80px_-55px_rgba(15,23,42,0.7)] backdrop-blur-xl">
                    <div className="flex items-center justify-between gap-4 mb-6">
                      <div>
                        <h2 className="text-2xl font-semibold text-white">Leads</h2>
                        <p className="mt-1 text-sm text-slate-400">Data collected from login-section submissions.</p>
                      </div>
                    </div>
                    <div className="overflow-x-auto">
                      <table className="w-full min-w-[640px] text-left">
                        <thead className="bg-slate-900/90 text-xs uppercase tracking-[0.25em] text-slate-500">
                          <tr>
                            <th className="px-6 py-4">#</th>
                            <th className="px-6 py-4">Name</th>
                            <th className="px-6 py-4">Email</th>
                            <th className="px-6 py-4">Phone</th>
                            <th className="px-6 py-4">Company</th>
                            <th className="px-6 py-4">Submitted</th>
                          </tr>
                        </thead>
                        <tbody>
                          {leads.length > 0 ? (
                            leads.map((lead, index) => (
                              <tr
                                key={`${lead.email}-${index}`}
                                className="border-t border-white/10 hover:bg-slate-900/90 transition"
                              >
                                <td className="px-6 py-4 text-sm text-slate-300">{index + 1}</td>
                                <td className="px-6 py-4 text-sm text-white">{lead.fullName}</td>
                                <td className="px-6 py-4 text-sm text-slate-300">{lead.email}</td>
                                <td className="px-6 py-4 text-sm text-slate-300">{lead.phone || "—"}</td>
                                <td className="px-6 py-4 text-sm text-slate-300">{lead.company || "—"}</td>
                                <td className="px-6 py-4 text-sm text-slate-300">{new Date(lead.createdAt).toLocaleString()}</td>
                              </tr>
                            ))
                          ) : (
                            <tr>
                              <td className="px-6 py-6 text-sm text-slate-400" colSpan={6}>
                                No leads found yet. Submit details from the login section to populate this table.
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}

              {activeSection === "requests" && (
                <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6 shadow-[0_40px_80px_-55px_rgba(15,23,42,0.7)] backdrop-blur-xl">
                  <div className="flex items-center justify-between gap-4 mb-6">
                    <div>
                      <h2 className="text-2xl font-semibold text-white">Assessment Requests</h2>
                      <p className="mt-1 text-sm text-slate-400">All requests submitted by candidates and employers.</p>
                    </div>
                  </div>
                  <div className="overflow-x-auto rounded-[1.75rem] border border-white/10 bg-slate-950/80">
                    <table className="w-full min-w-[900px] text-left">
                      <thead className="bg-slate-900/90 text-xs uppercase tracking-[0.25em] text-slate-500">
                        <tr>
                          <th className="px-6 py-4">#</th>
                          <th className="px-6 py-4">Candidate</th>
                          <th className="px-6 py-4">Company</th>
                          <th className="px-6 py-4">Submitted</th>
                          <th className="px-6 py-4">Test Status</th>
                          <th className="px-6 py-4">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {requests.length > 0 ? (
                          requests.map((request, index) => (
                            <tr key={request.id} className="border-t border-white/10 hover:bg-slate-900/90 transition">
                              <td className="px-6 py-4 text-sm text-slate-300">{index + 1}</td>
                              <td className="px-6 py-4">
                                <p className="font-medium text-white">{request.employeeName || "-"}</p>
                                <p className="text-sm text-slate-500">{request.employeeEmail || "-"}</p>
                              </td>
                              <td className="px-6 py-4 text-sm text-slate-300">{request.company || "-"}</td>
                              <td className="px-6 py-4 text-sm text-slate-300">
                                {formatDate(request.createdAt)} {formatTime(request.createdAt)}
                              </td>
                              <td className="px-6 py-4">
                                <span className="rounded-full bg-slate-800 px-3 py-1 text-xs font-semibold text-slate-300">{request.testStatus || "Pending"}</span>
                              </td>
                              <td className="px-6 py-4">
                                <button
                                  onClick={() => sendTest(request)}
                                  disabled={loading || request.testStatus === "SENT"}
                                  className="rounded-2xl bg-sky-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-sky-400 disabled:cursor-not-allowed disabled:bg-slate-700 disabled:text-slate-400"
                                >
                                  {request.testStatus === "SENT" ? "Sent" : "Send Test"}
                                </button>
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td className="px-6 py-6 text-sm text-slate-400" colSpan={6}>
                              No assessment requests found yet.
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {activeSection === "payments" && (
                <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6 shadow-[0_40px_80px_-55px_rgba(15,23,42,0.7)] backdrop-blur-xl">
                  <div className="flex items-center justify-between gap-4 mb-6">
                    <div>
                      <h2 className="text-2xl font-semibold text-white">Payments</h2>
                      <p className="mt-1 text-sm text-slate-400">Payment records for each assessment request.</p>
                    </div>
                  </div>
                  <div className="overflow-x-auto rounded-[1.75rem] border border-white/10 bg-slate-950/80">
                    <table className="w-full min-w-[800px] text-left">
                      <thead className="bg-slate-900/90 text-xs uppercase tracking-[0.25em] text-slate-500">
                        <tr>
                          <th className="px-6 py-4">#</th>
                          <th className="px-6 py-4">Candidate</th>
                          <th className="px-6 py-4">Company</th>
                          <th className="px-6 py-4">Amount</th>
                          <th className="px-6 py-4">Status</th>
                          <th className="px-6 py-4">Date</th>
                        </tr>
                      </thead>
                      <tbody>
                        {requests.length > 0 ? (
                          requests.map((request, index) => (
                            <tr key={request.id} className="border-t border-white/10 hover:bg-slate-900/90 transition">
                              <td className="px-6 py-4 text-sm text-slate-300">{index + 1}</td>
                              <td className="px-6 py-4">
                                <p className="font-medium text-white">{request.employeeName || "-"}</p>
                                <p className="text-sm text-slate-500">{request.employeeEmail || "-"}</p>
                              </td>
                              <td className="px-6 py-4 text-sm text-slate-300">{request.company || "-"}</td>
                              <td className="px-6 py-4 text-sm font-semibold text-white">${request.amount ?? 40}</td>
                              <td className="px-6 py-4">
                                <span className="rounded-full bg-slate-800 px-3 py-1 text-xs font-semibold text-slate-300">{request.paymentStatus || "Pending"}</span>
                              </td>
                              <td className="px-6 py-4 text-sm text-slate-300">{formatDate(request.createdAt)}</td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td className="px-6 py-6 text-sm text-slate-400" colSpan={6}>
                              No payment records found yet.
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {activeSection === "reports" && (
                <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6 shadow-[0_40px_80px_-55px_rgba(15,23,42,0.7)] backdrop-blur-xl">
                  <div className="flex items-center justify-between gap-4 mb-6">
                    <div>
                      <h2 className="text-2xl font-semibold text-white">Reports</h2>
                      <p className="mt-1 text-sm text-slate-400">Uploaded reports and candidate test scores.</p>
                    </div>
                  </div>
                  <div className="overflow-x-auto rounded-[1.75rem] border border-white/10 bg-slate-950/80">
                    <table className="w-full min-w-[850px] text-left">
                      <thead className="bg-slate-900/90 text-xs uppercase tracking-[0.25em] text-slate-500">
                        <tr>
                          <th className="px-6 py-4">#</th>
                          <th className="px-6 py-4">Candidate</th>
                          <th className="px-6 py-4">Company</th>
                          <th className="px-6 py-4">Score</th>
                          <th className="px-6 py-4">Report Status</th>
                          <th className="px-6 py-4">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {requests.length > 0 ? (
                          requests.map((request, index) => (
                            <tr key={request.id} className="border-t border-white/10 hover:bg-slate-900/90 transition">
                              <td className="px-6 py-4 text-sm text-slate-300">{index + 1}</td>
                              <td className="px-6 py-4">
                                <p className="font-medium text-white">{request.employeeName || "-"}</p>
                                <p className="text-sm text-slate-500">{request.employeeEmail || "-"}</p>
                              </td>
                              <td className="px-6 py-4 text-sm text-slate-300">{request.company || "-"}</td>
                              <td className="px-6 py-4 text-sm font-semibold text-white">
                                {(request.score ?? request.testScore) != null ? `${request.score ?? request.testScore}%` : "-"}
                              </td>
                              <td className="px-6 py-4">
                                <span className="rounded-full bg-slate-800 px-3 py-1 text-xs font-semibold text-slate-300">{request.reportStatus || "Pending"}</span>
                              </td>
                              <td className="px-6 py-4">
                                <button
                                  onClick={() => {
                                    setSelectedReport(request);
                                    setShowReportDialog(true);
                                  }}
                                  className="rounded-2xl bg-sky-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-sky-400"
                                >
                                  View Report
                                </button>
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td className="px-6 py-6 text-sm text-slate-400" colSpan={6}>
                              No reports found yet.
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {activeSection === "candidates" && (
                <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6 shadow-[0_40px_80px_-55px_rgba(15,23,42,0.7)] backdrop-blur-xl">
                  <div className="flex items-center justify-between gap-4 mb-6">
                    <div>
                      <h2 className="text-2xl font-semibold text-white">Candidates</h2>
                      <p className="mt-1 text-sm text-slate-400">Candidate profiles connected to assessment requests.</p>
                    </div>
                  </div>
                  <div className="overflow-x-auto rounded-[1.75rem] border border-white/10 bg-slate-950/80">
                    <table className="w-full min-w-[850px] text-left">
                      <thead className="bg-slate-900/90 text-xs uppercase tracking-[0.25em] text-slate-500">
                        <tr>
                          <th className="px-6 py-4">#</th>
                          <th className="px-6 py-4">Name</th>
                          <th className="px-6 py-4">Email</th>
                          <th className="px-6 py-4">Company</th>
                          <th className="px-6 py-4">Test Status</th>
                          <th className="px-6 py-4">Registered</th>
                        </tr>
                      </thead>
                      <tbody>
                        {requests.length > 0 ? (
                          requests.map((request, index) => (
                            <tr key={request.id} className="border-t border-white/10 hover:bg-slate-900/90 transition">
                              <td className="px-6 py-4 text-sm text-slate-300">{index + 1}</td>
                              <td className="px-6 py-4 text-sm font-medium text-white">{request.employeeName || "-"}</td>
                              <td className="px-6 py-4 text-sm text-slate-300">{request.employeeEmail || "-"}</td>
                              <td className="px-6 py-4 text-sm text-slate-300">{request.company || "-"}</td>
                              <td className="px-6 py-4">
                                <span className="rounded-full bg-slate-800 px-3 py-1 text-xs font-semibold text-slate-300">{request.testStatus || "Pending"}</span>
                              </td>
                              <td className="px-6 py-4 text-sm text-slate-300">{formatDate(request.createdAt)}</td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td className="px-6 py-6 text-sm text-slate-400" colSpan={6}>
                              No candidates found yet.
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {activeSection === "dashboard" && (
                <>
              <div className="grid gap-6 xl:grid-cols-4">
                <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6 shadow-[0_30px_80px_-50px_rgba(15,23,42,0.6)] backdrop-blur-xl">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-sm text-slate-400">Total Assessments</p>
                      <h3 className="mt-4 text-4xl font-semibold text-white">{requestStats.total}</h3>
                    </div>
                    <div className="flex h-14 w-14 items-center justify-center rounded-3xl bg-sky-500/15 text-sky-300">
                      <FileText className="h-6 w-6" />
                    </div>
                  </div>
                  <p className="mt-6 text-sm text-emerald-300">+12.5% from last month</p>
                </div>

                <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6 shadow-[0_30px_80px_-50px_rgba(15,23,42,0.6)] backdrop-blur-xl">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-sm text-slate-400">Pending Requests</p>
                      <h3 className="mt-4 text-4xl font-semibold text-white">{requestStats.pending}</h3>
                    </div>
                    <div className="flex h-14 w-14 items-center justify-center rounded-3xl bg-yellow-500/15 text-yellow-300">
                      <Clock3 className="h-6 w-6" />
                    </div>
                  </div>
                  <p className="mt-6 text-amber-300">+8.1% from last month</p>
                </div>

                <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6 shadow-[0_30px_80px_-50px_rgba(15,23,42,0.6)] backdrop-blur-xl">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-sm text-slate-400">Completed Tests</p>
                      <h3 className="mt-4 text-4xl font-semibold text-white">{requestStats.completed}</h3>
                    </div>
                    <div className="flex h-14 w-14 items-center justify-center rounded-3xl bg-emerald-500/15 text-emerald-300">
                      <CheckCircle className="h-6 w-6" />
                    </div>
                  </div>
                  <p className="mt-6 text-emerald-300">+15.3% from last month</p>
                </div>

                <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6 shadow-[0_30px_80px_-50px_rgba(15,23,42,0.6)] backdrop-blur-xl">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-sm text-slate-400">Total Revenue</p>
                      <h3 className="mt-4 text-4xl font-semibold text-white">${requestStats.revenue}</h3>
                    </div>
                    <div className="flex h-14 w-14 items-center justify-center rounded-3xl bg-violet-500/15 text-violet-300">
                      <DollarSign className="h-6 w-6" />
                    </div>
                  </div>
                  <p className="mt-6 text-pink-300">+18.6% from last month</p>
                </div>
              </div>

              <div className="grid gap-6 xl:grid-cols-[1.6fr_1fr]">
                <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6 shadow-[0_40px_80px_-55px_rgba(15,23,42,0.65)] backdrop-blur-xl h-[320px] overflow-hidden flex flex-col justify-between">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <h3 className="text-2xl font-semibold text-white">Assessments Over Time</h3>
                      <p className="mt-1 text-sm text-slate-400">Monthly performance and request trends.</p>
                    </div>
                    <div className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-slate-900/60 px-4 py-2 text-sm text-slate-200">
                      Monthly
                    </div>
                  </div>

                  <div className="mt-4 h-[220px] rounded-[2rem] bg-gradient-to-br from-slate-900 to-slate-950 p-6 shadow-inner shadow-slate-950/20">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart
                        data={monthlyChartData}
                        margin={{ top: 8, right: 16, left: -10, bottom: 0 }}
                      >
                        <defs>
                          <linearGradient id="requestsGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#8b5cf6" stopOpacity={0.8} />
                            <stop offset="70%" stopColor="#8b5cf6" stopOpacity={0.12} />
                            <stop offset="100%" stopColor="#8b5cf6" stopOpacity={0} />
                          </linearGradient>
                        </defs>
                        <CartesianGrid stroke="#334155" strokeDasharray="4 4" vertical={false} />
                        <XAxis
                          dataKey="month"
                          tick={{ fill: "#94a3b8", fontSize: 12 }}
                          axisLine={false}
                          tickLine={false}
                          padding={{ left: 8, right: 8 }}
                        />
                        <YAxis
                          tick={{ fill: "#94a3b8", fontSize: 12 }}
                          axisLine={false}
                          tickLine={false}
                          width={32}
                        />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "#0f172a",
                            border: "1px solid rgba(148,163,184,0.2)",
                            borderRadius: 16,
                          }}
                          labelStyle={{ color: "#e2e8f0" }}
                          itemStyle={{ color: "#fff" }}
                        />
                        <Area
                          type="monotone"
                          dataKey="requests"
                          stroke="#c084fc"
                          strokeWidth={3}
                          fill="url(#requestsGradient)"
                          dot={{ r: 4, fill: "#c084fc" }}
                          activeDot={{ r: 6, fill: "#a855f7" }}
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6 shadow-[0_40px_80px_-55px_rgba(15,23,42,0.65)] backdrop-blur-xl flex items-center">
                  <div className="w-full">
                    <div className="flex items-center gap-3">
                      <Activity className="h-6 w-6 text-sky-300" />
                      <h3 className="text-2xl font-semibold text-white">Assessments by Status</h3>
                    </div>

                    <div className="mt-6 flex items-center justify-center">
                      <div className="w-40 h-40">
                        <ResponsiveContainer width="100%" height="100%">
                          <PieChart>
                            <Pie
                              data={statusCounts}
                              dataKey="value"
                              nameKey="name"
                              innerRadius={40}
                              outerRadius={60}
                              paddingAngle={4}
                            >
                              {statusCounts.map((entry) => (
                                <Cell key={entry.name} fill={entry.color} />
                              ))}
                            </Pie>
                          </PieChart>
                        </ResponsiveContainer>
                      </div>
                    </div>

                    <div className="mt-4 grid gap-2">
                      <div className="flex items-center gap-3">
                        <span className="inline-block h-3 w-3 rounded-full" style={{ backgroundColor: '#10B981' }} />
                        <div className="text-sm text-slate-300">Completed</div>
                        <div className="ml-auto text-sm font-semibold text-white">{completedCount} ({completedPct}%)</div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="inline-block h-3 w-3 rounded-full" style={{ backgroundColor: '#F59E0B' }} />
                        <div className="text-sm text-slate-300">Pending</div>
                        <div className="ml-auto text-sm font-semibold text-white">{pendingCount} ({pendingPct}%)</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6 shadow-[0_40px_80px_-55px_rgba(15,23,42,0.65)] backdrop-blur-xl">
                  <div className="flex items-center gap-3">
                    <Activity className="h-6 w-6 text-sky-300" />
                    <h3 className="text-2xl font-semibold text-white">Recent Activity</h3>
                  </div>

                  <div className="mt-6 grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
                    <div className="rounded-[1.75rem] border border-white/10 bg-slate-900/80 p-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-12 w-12 items-center justify-center rounded-3xl bg-emerald-500/15 text-emerald-300">
                          <CheckCircle className="h-5 w-5" />
                        </div>
                        <div>
                          <p className="font-semibold text-white">New assessment request</p>
                          <p className="text-sm text-slate-400">No new assessment requests yet.</p>
                        </div>
                      </div>
                    </div>
                    <div className="rounded-[1.75rem] border border-white/10 bg-slate-900/80 p-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-12 w-12 items-center justify-center rounded-3xl bg-blue-500/15 text-blue-300">
                          <Upload className="h-5 w-5" />
                        </div>
                        <div>
                          <p className="font-semibold text-white">Assessment completed</p>
                          <p className="text-sm text-slate-400">No completed assessments yet.</p>
                        </div>
                      </div>
                    </div>
                    <div className="rounded-[1.75rem] border border-white/10 bg-slate-900/80 p-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-12 w-12 items-center justify-center rounded-3xl bg-amber-500/15 text-amber-300">
                          <DollarSign className="h-5 w-5" />
                        </div>
                        <div>
                          <p className="font-semibold text-white">Payment received</p>
                          <p className="text-sm text-slate-400">No recent payments received.</p>
                        </div>
                      </div>
                    </div>
                    <div className="rounded-[1.75rem] border border-white/10 bg-slate-900/80 p-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-12 w-12 items-center justify-center rounded-3xl bg-violet-500/15 text-violet-300">
                          <Users className="h-5 w-5" />
                        </div>
                        <div>
                          <p className="font-semibold text-white">New candidate registered</p>
                          <p className="text-sm text-slate-400">No new candidate registrations yet.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6 shadow-[0_40px_80px_-55px_rgba(15,23,42,0.7)] backdrop-blur-xl">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h3 className="text-2xl font-semibold text-white">Recent Assessment Requests</h3>
                    <p className="mt-1 text-sm text-slate-400">Latest requests from candidates and employers.</p>
                  </div>
                  <button className="inline-flex items-center justify-center rounded-3xl bg-sky-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-sky-400">
                    View All
                  </button>
                </div>

                <div className="mt-6 overflow-y-auto max-h-[26rem] rounded-[1.75rem] border border-white/10 bg-slate-950/80">
                  <table className="w-full min-w-0 table-auto border-separate border-spacing-0">
                    <thead className="bg-slate-900/90 text-left text-xs uppercase tracking-[0.25em] text-slate-500 sticky top-0">
                      <tr>
                        <th className="px-6 py-4">ID</th>
                        <th className="px-6 py-4">Candidate</th>
                        <th className="px-6 py-4">Company</th>
                        <th className="px-6 py-4">Date</th>
                        <th className="px-6 py-4">Time</th>
                        <th className="px-6 py-4">Status</th>
                        <th className="px-6 py-4">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {visibleRequests.map((request, index) => (
                        <tr key={request.id} className="border-t border-white/10 hover:bg-slate-900/90 transition">
                          <td className="px-6 py-4 text-sm text-slate-300">{index + 1}</td>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-sky-500 to-blue-500 text-white">{request.employeeName?.charAt(0)}</div>
                              <div>
                                <p className="font-medium text-white">{request.employeeName}</p>
                                <p className="text-sm text-slate-500">{request.employeeEmail}</p>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-sm text-slate-300">{request.company}</td>
                          <td className="px-6 py-4 text-sm text-slate-300">{formatDate(request.createdAt)}</td>
                          <td className="px-6 py-4 text-sm text-slate-300">{formatTime(request.createdAt)}</td>
                          <td className="px-6 py-4">
                            <span className="rounded-full bg-slate-800 px-3 py-1 text-xs font-semibold text-slate-300">{request.testStatus || "Pending"}</span>
                          </td>
                          <td className="px-6 py-4">
                            <button
                              onClick={() => {
                                setSelectedReport(request);
                                setShowReportDialog(true);
                              }}
                              className="rounded-2xl bg-sky-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-sky-400"
                            >
                              View Report
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
                </>
              )}
            </div>
          </main>
        </div>
      </div>

      {showReportDialog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
          <div className="w-full max-w-2xl rounded-[2rem] bg-slate-950 border border-white/10 shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/10 px-6 py-5">
              <div>
                <h2 className="text-2xl font-semibold text-white">Candidate Report</h2>
                <p className="text-sm text-slate-400">Quick summary for the selected assessment.</p>
              </div>
              <button
                onClick={() => {
                  setShowReportDialog(false);
                  setSelectedReport(null);
                }}
                className="h-11 w-11 rounded-2xl bg-slate-900 text-slate-300 hover:bg-slate-800"
              >
                ×
              </button>
            </div>
            <div className="space-y-5 px-6 py-6">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="rounded-3xl border border-white/10 bg-slate-900/80 p-5">
                  <p className="text-sm text-slate-400">Candidate Name</p>
                  <p className="mt-2 text-lg font-semibold text-white">{selectedReport?.employeeName}</p>
                </div>
                <div className="rounded-3xl border border-white/10 bg-slate-900/80 p-5">
                  <p className="text-sm text-slate-400">Email Address</p>
                  <p className="mt-2 text-lg text-slate-200 break-all">{selectedReport?.employeeEmail}</p>
                </div>
              </div>
              <div className="grid gap-4 md:grid-cols-3">
                <div className="rounded-3xl border border-white/10 bg-slate-900/80 p-5 text-center">
                  <p className="text-sm text-slate-400">Report Status</p>
                  <p className="mt-2 text-lg font-semibold text-white">{selectedReport?.reportStatus || "Pending"}</p>
                </div>
                <div className="rounded-3xl border border-white/10 bg-slate-900/80 p-5 text-center">
                  <p className="text-sm text-slate-400">Test Status</p>
                  <p className="mt-2 text-lg font-semibold text-white">{selectedReport?.testStatus || "Pending"}</p>
                </div>
                <div className="rounded-3xl border border-white/10 bg-slate-900/80 p-5 text-center">
                  <p className="text-sm text-slate-400">Payment</p>
                  <p className="mt-2 text-lg font-semibold text-white">{selectedReport?.paymentStatus || "N/A"}</p>
                </div>
              </div>
              <div className="rounded-[2rem] bg-gradient-to-r from-sky-500/10 to-violet-500/10 p-6 text-center">
                <p className="text-sm uppercase tracking-[0.25em] text-sky-300/80">Test Score</p>
                <p className="mt-3 text-5xl font-semibold text-white">{selectedReport?.score ?? selectedReport?.testScore ?? "—"}%</p>
              </div>
              {selectedReport?.reportUrl ? (
                <div className="rounded-[2rem] border border-white/10 bg-slate-900/80 p-5 text-center">
                  <p className="text-sm text-slate-400">Report Link</p>
                  <a
                    href={selectedReport.reportUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-2 inline-block text-sm font-semibold text-sky-300 hover:text-sky-200"
                  >
                    Open report
                  </a>
                </div>
              ) : (
                <div className="rounded-[2rem] border border-white/10 bg-slate-900/80 p-5 text-center text-slate-400">
                  No report file has been uploaded yet.
                </div>
              )}
            </div>
            <div className="flex justify-end gap-3 border-t border-white/10 px-6 py-5">
              <button
                onClick={() => {
                  setShowReportDialog(false);
                  setSelectedReport(null);
                }}
                className="rounded-3xl bg-sky-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-sky-400"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
