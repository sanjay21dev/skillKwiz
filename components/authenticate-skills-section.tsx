"use client";

import Image from "next/image";
import { useState, useEffect } from "react";

export default function AuthenticateSkillsSection() {
  const [activeLeft, setActiveLeft] = useState(1);
  const [activeRight, setActiveRight] = useState(1);

  /* ✅ AUTO SLIDE (THIS WAS MISSING) */
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveLeft((prev) => (prev === 1 ? 2 : 1));
      setActiveRight((prev) => (prev === 1 ? 2 : 1));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  /* ✅ HOVER TILT */
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = -(y - centerY) / 18;
    const rotateY = (x - centerX) / 18;

    card.style.transform = `
      perspective(900px)
      rotateX(${rotateX}deg)
      rotateY(${rotateY}deg)
      scale(1.05)
    `;
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    e.currentTarget.style.transform =
      "perspective(900px) rotateX(0deg) rotateY(0deg) scale(1)";
  };

  return (
    <section className="py-24 bg-gradient-to-b from-[#e0ecff] to-[#c7dcff]">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">

          {/* LEFT STACK */}
          <div className="relative w-full md:w-1/3 h-[400px] md:h-[500px]">
            <div
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              className={`absolute top-0 left-0 w-[80%] h-[80%]
                transition-all duration-700 ease-in-out
                will-change-transform rounded-xl
                ${
                  activeLeft === 1
                    ? "z-20 -rotate-6 scale-[1.04] shadow-2xl"
                    : "z-10 -rotate-12 scale-95"
                }
              `}
            >
              <Image
                src="/images/homepage/skills_1.png"
                alt="Professional working"
                fill
                className="object-cover rounded-xl"
              />
            </div>

            <div
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              className={`absolute bottom-0 left-[10%] w-[80%] h-[80%]
                transition-all duration-700 ease-in-out
                will-change-transform rounded-xl
                ${
                  activeLeft === 2
                    ? "z-20 rotate-0 scale-[1.04] shadow-2xl"
                    : "z-10 -rotate-6 scale-95"
                }
              `}
            >
              <Image
                src="/images/homepage/skills_2.png"
                alt="Professional tech"
                fill
                className="object-cover rounded-xl"
              />
            </div>
          </div>

          {/* CENTER CONTENT */}
          <div className="w-full md:w-1/3 text-center z-30">
            <h2 className="text-3xl font-bold text-[#00418d] mb-5 leading-tight">
              Authenticate Skills,
              <br />
              Simplify Hiring
            </h2>

            <p className="max-w-2xl text-gray-900 text-lg">
              SkillKwiz ensures professionals are evaluated accurately in their
              chosen fields. Our secure testing centers provide authenticated
              skill assessments, giving you instant access to verified reports—
              eliminating the need for lengthy technical interviews.
            </p>
          </div>

          {/* RIGHT STACK */}
          <div className="relative w-full md:w-1/3 h-[400px] md:h-[500px]">
            <div
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              className={`absolute top-0 right-0 w-[80%] h-[80%]
                transition-all duration-700 ease-in-out
                will-change-transform rounded-xl
                ${
                  activeRight === 1
                    ? "z-20 rotate-6 scale-[1.04] shadow-2xl"
                    : "z-10 rotate-9 scale-95"
                }
              `}
            >
              <Image
                src="/images/homepage/skills_3.png"
                alt="Professional workstation"
                fill
                className="object-cover rounded-xl"
              />
            </div>

            <div
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              className={`absolute bottom-0 right-[10%] w-[80%] h-[80%]
                transition-all duration-700 ease-in-out
                will-change-transform rounded-xl
                ${
                  activeRight === 2
                    ? "z-20 rotate-0 scale-[1.04] shadow-2xl"
                    : "z-10 rotate-6 scale-95"
                }
              `}
            >
              <Image
                src="/images/homepage/skills_4.png"
                alt="Business professional"
                fill
                className="object-cover rounded-xl"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}