"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

type Testimonial = {
  id: number;
  name: string;
  title: string;
  quote: string;
  image: string;
};

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "David Chen",
    title: "CTO, FutureTech Solutions",
    quote:
      "The technical assessments from SkillKwiz have been spot‑on. We're able to quickly identify candidates with the right skills.",
    image: "/images/homepage/5.png",
  },
  {
    id: 2,
    name: "Emily Rodriguez",
    title: "Recruiting Manager, Innovate Inc",
    quote:
      "SkillKwiz has become an essential part of our hiring toolkit. The platform is intuitive and the assessments are comprehensive.",
    image: "/images/homepage/6.png",
  },
  {
    id: 3,
    name: "Jennifer Cooper",
    title: "Startup Founder, TechFlow",
    quote:
      "SkillKwiz has transformed our hiring process. We've reduced our time‑to‑hire by 40% and improved candidate quality significantly.",
    image: "/images/homepage/5.png",
  },
  {
    id: 4,
    name: "Michael Donovan",
    title: "HR Director, Global Systems",
    quote:
      "The detailed skill reports give us confidence while making final hiring decisions. Highly recommended.",
    image: "/images/homepage/6.png",
  },
  {
    id: 5,
    name: "Sarah Johnson",
    title: "Talent Acquisition, InnovateTech",
    quote:
      "The flexibility and accuracy of SkillKwiz assessments help us hire better and faster.",
    image: "/images/homepage/5.png",
  },
];

export default function TestimonialsSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const total = testimonials.length;

  const getIndex = (offset: number) =>
    (activeIndex + offset + total) % total;

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % total);
    }, 5000);
    return () => clearInterval(interval);
  }, [total]);

  return (
    <section className="py-24 bg-gradient-to-b from-[#e0ecff] to-[#c7dcff] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-semibold mb-16 text-[#00418d]">
          What Our Clients Say
        </h2>

        {/* CARDS */}
        <div className="relative flex items-center justify-center gap-10">
          {[-1, 0, 1].map((pos) => {
            const testimonial = testimonials[getIndex(pos)];
            const isCenter = pos === 0;

            return (
              <div
                key={testimonial.id}
                className={`
                  rounded-xl px-8 py-10 text-white transition-all duration-500 ease-out
                  ${
                    isCenter
                      ? "bg-gradient-to-br from-[#00418d] to-[#002a5c] scale-110 opacity-100 z-20 shadow-2xl"
                      : "bg-[#5b81b5]/80 backdrop-blur scale-90 opacity-50 z-10"
                  }
                `}
                style={{ width: "360px" }}
              >
                {/* IMAGE */}
                <div className="flex justify-center mb-5">
                  <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-white">
                    <Image
                      src={testimonial.image}
                      alt={testimonial.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>

                {/* NAME */}
                <h3 className="font-semibold text-lg">
                  {testimonial.name}
                </h3>
                <p className="text-sm opacity-90 mb-3">
                  {testimonial.title}
                </p>

                {/* STARS */}
                <div className="flex justify-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>

                {/* QUOTE */}
                <p className="text-sm leading-relaxed opacity-95">
                  “{testimonial.quote}”
                </p>
              </div>
            );
          })}

          {/* ARROWS */}
          <button
            onClick={() =>
              setActiveIndex((activeIndex - 1 + total) % total)
            }
            className="absolute left-0 bg-white p-2 rounded-full shadow"
          >
            <ChevronLeft className="text-[#00418d]" />
          </button>

          <button
            onClick={() =>
              setActiveIndex((activeIndex + 1) % total)
            }
            className="absolute right-0 bg-white p-2 rounded-full shadow"
          >
            <ChevronRight className="text-[#00418d]" />
          </button>
        </div>

        {/* INDICATORS */}
        <div className="flex justify-center gap-2 mt-10">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`h-2.5 rounded-full transition-all duration-300 ${
                index === activeIndex
                  ? "w-6 bg-gradient-to-br from-[#00418d] to-[#002a5c]"
                  : "w-2.5 bg-gray-300"
              }`}
            />
          ))}
        </div>
      </div>
      {/* ✅ CTA AFTER TRUST */}
        <div className="flex justify-center mt-16 ">
          <Link
            href="/services"
            className="
              bg-[#f73e5d] text-white
              px-8 py-3 rounded-full
              font-medium
              hover:bg-opacity-90
            "
          >
            Start Your Assessment
          </Link>
        </div>
    </section>
  );
}