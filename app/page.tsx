"use client";

import { useRef } from "react";

import AuthenticateSkillsSection from "@/components/authenticate-skills-section";
import WhyChooseSection from "@/components/why-choose-section";
import LoginSection from "@/components/login-section";
import TestimonialsSection from "@/components/testimonials-section";
import LetterCarousel from "@/components/letter-carousel";

export default function HomePage() {
  const heroRef = useRef<HTMLElement>(null);

  return (
    <div className="min-h-screen bg-white">

      {/* HERO SECTION */}
      <section
        ref={heroRef}
        className="
          relative pt-[72px] text-white overflow-hidden
          bg-gradient-to-br from-[#002b5c] via-[#004aad] to-[#3b82f6]
        "
      >
        {/* Glow */}
        <div className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-[#f73e5d]/20 rounded-full blur-3xl" />

        {/* HERO CONTENT */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 pt-[70px] pb-14">
          <LetterCarousel />
        </div>
      </section>

      {/* Authenticate Skills */}
      <div className="mt-2 w-full">
        <AuthenticateSkillsSection />
      </div>

      {/* WHY CHOOSE */}
      <WhyChooseSection />

      {/* TESTIMONIALS */}
      <TestimonialsSection />

      {/* LOGIN / CTA */}
      <LoginSection />
    </div>
  );
}