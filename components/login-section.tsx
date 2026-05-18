"use client";

import { Play } from "lucide-react";
import { useRouter } from "next/navigation";

export default function LoginSection() {
  const router = useRouter();

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    router.push("/services");
  };

  return (
    <section className="py-14 bg-[#000c2a]">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-xl overflow-hidden shadow-2xl flex flex-col md:flex-row">

          {/* ✅ LEFT SIDE — UNCHANGED */}
          <div className="w-full md:w-1/2 p-6 relative">
            <div className="flex flex-col h-full">

              {/* Welcome */}
              <div className="mb-5 text-center">
                <h2 className="text-xl font-semibold text-[#00418d] mb-2">
                  Welcome to SkillKwiz
                </h2>

                <p className="text-gray-600 text-sm leading-relaxed max-w-sm mx-auto">
                  SkillKwiz is a next‑generation skill assessment platform designed to
                  simplify and improve the hiring process.
                </p>

                <p className="mt-2 text-gray-600 text-sm leading-relaxed max-w-sm mx-auto">
                  With secure testing centers, verified authentication, and access
                  to 3000+ skills, SkillKwiz enables confident hiring.
                </p>
              </div>

              {/* ICON GRID – TOP */}
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="flex justify-center">
                  <div className="w-12 h-12 relative">
                    <div className="w-12 h-12 rounded-full border-2 border-[#f73e5d] flex items-center justify-center">
                      <div className="w-9 h-9 rounded-full border-2 border-[#f73e5d] flex items-center justify-center">
                        <div className="w-6 h-6 rounded-full border-2 border-[#f73e5d] flex items-center justify-center">
                          <div className="w-2 h-2 bg-[#00a8e8] rounded-full" />
                        </div>
                      </div>
                    </div>
                    <div className="absolute top-2 right-0 w-3 h-1 bg-[#00a8e8] rotate-45" />
                  </div>
                </div>

                <div className="flex justify-center">
                  <svg width="42" height="42" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M18 20V10M12 20V4M6 20V14"
                      stroke="#00a8e8"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>

                <div className="flex justify-center">
                  <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center hover:bg-gray-300 transition">
                    <Play className="w-6 h-6 text-gray-700 ml-0.5" />
                  </div>
                </div>
              </div>

              {/* ICON GRID – BOTTOM */}
              <div className="grid grid-cols-3 gap-4 mt-auto">
                <div className="flex justify-center">
                  <svg width="42" height="42" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M11 19C15.4183 19 19 15.4183 19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19Z"
                      stroke="#00a8e8"
                      strokeWidth="2"
                    />
                    <path
                      d="M21 21L16.65 16.65"
                      stroke="#00a8e8"
                      strokeWidth="2"
                    />
                  </svg>
                </div>

                <div className="flex justify-center">
                  <svg width="42" height="42" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M17 21V19C17 17 15 15 13 15H5C3 15 1 17 1 19V21"
                      stroke="#00a8e8"
                      strokeWidth="2"
                    />
                    <path
                      d="M9 11C11.2 11 13 9.2 13 7C13 4.8 11.2 3 9 3"
                      stroke="#00a8e8"
                      strokeWidth="2"
                    />
                    <path
                      d="M23 21V19C23 17.5 21.9 16.1 20 15.4"
                      stroke="#00a8e8"
                      strokeWidth="2"
                    />
                  </svg>
                </div>

                <div className="flex justify-center">
                  <svg width="42" height="42" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M14 2H6C5 2 4 3 4 4V20C4 21 5 22 6 22H18C19 22 20 21 20 20V8L14 2Z"
                      stroke="#f6c648"
                      strokeWidth="2"
                    />
                    <path
                      d="M14 2V8H20M16 13H8M16 17H8"
                      stroke="#f6c648"
                      strokeWidth="2"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* ✅ RIGHT SIDE — ENHANCED LOGIN */}
          <div className="w-full md:w-1/2 bg-gradient-to-br from-[#00418d] to-[#002c66] p-8 flex items-center">
            <div className="w-full max-w-sm mx-auto bg-white/10 backdrop-blur-md rounded-xl p-6 shadow-lg">

              <h2 className="text-xl font-bold text-white mb-2 text-center">
                Sign in to SkillKwiz
              </h2>
              <p className="text-xs text-white/70 text-center mb-6">
                Access your dashboard and manage assessments
              </p>

              <form className="space-y-4" onSubmit={handleSignIn}>
                <div>
                  <label className="text-xs text-white/80 mb-1 block">
                    Email
                  </label>
                  <input
                    type="email"
                    placeholder="Enter your Email Id"
                    className="w-full bg-white px-3 py-2 text-sm rounded-md focus:ring-2 focus:ring-[#00a8e8] outline-none"
                  />
                </div>

                <div>
                  <label className="text-xs text-white/80 mb-1 block">
                    Password
                  </label>
                  <input
                    type="password"
                    placeholder="••••••••"
                    className="w-full bg-white px-3 py-2 text-sm rounded-md focus:ring-2 focus:ring-[#00a8e8] outline-none"
                  />
                </div>

                <div className="flex items-center justify-between text-xs text-white/80">
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    Remember me
                  </label>
                  <a href="#" className="hover:underline">
                    Forgot password?
                  </a>
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#f73e5d] py-2.5 text-sm text-white rounded-md font-medium hover:bg-opacity-90 transition"
                >
                  Sign up
                </button>
              </form>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}