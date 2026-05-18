"use client";

import Image from "next/image";
import { useState } from "react";

export default function BlogPage() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const indicatorClasses = (index: number) =>
    `h-1.5 rounded-full transition-all duration-300 ${
      hoveredIndex === index ? "w-64 bg-[#00418d]" : "w-24 bg-[#c3dfff]"
    }`;

  // ✅ Dummy file download function (unchanged)
  const downloadDummyFile = () => {
    const link = document.createElement("a");
    link.href = "/downloads/skillKwiz.pdf";
    link.download = "SkillKwiz-Blog-Preview.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const blogPosts = [
    {
      img: "/images/blogpage/1.png",
      title: "The Importance of Upskilling in Today's Job Market",
      subtitle: "Why Upskilling Matters in 2025",
    },
    {
      img: "/images/blogpage/2.png",
      title: "How Gamified Learning Enhances Skill Retention",
      subtitle: "The Psychology Behind Gamification",
    },
    {
      img: "/images/blogpage/3.png",
      title: "Soft Skills vs. Hard Skills: What Matters More?",
      subtitle: "The Difference Between Soft and Hard Skills",
    },
  ];

  return (
    <>
      <section className="w-full py-24 min-h-screen bg-gradient-to-br from-[#1e5bbf] via-[#60a5fa] to-[#93c5fd]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-4">
              Mastering Knowledge & Growth
            </h2>
            <p className="text-center max-w-3xl mx-auto mb-8">
              In a world of constant change, continuous learning is the key to
              success...
            </p>

            {/* Indicators */}
            <div className="flex justify-center gap-2 mb-10">
              {blogPosts.map((_, index) => (
                <div key={index} className={indicatorClasses(index)} />
              ))}
            </div>

            {/* Featured Blog Posts */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {blogPosts.map((post, index) => (
                <div
                  key={index}
                  className="flex flex-col group cursor-pointer"
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  {/* ✅ Hover zoom image */}
                  <div className="relative mb-4 overflow-hidden rounded-md">
                    <Image
                      src={post.img}
                      alt={post.title}
                      width={380}
                      height={240}
                      className="
                        w-full h-auto object-cover
                        transition-transform duration-500 ease-out
                        group-hover:scale-110
                      "
                    />
                  </div>

                  <h3 className="text-lg font-bold mb-1">
                    {post.title}
                  </h3>

                  {/* Click subtitle → download dummy file */}
                  <p
                    onClick={downloadDummyFile}
                    className="text-sm text-[#00418d] font-medium"
                  >
                    {post.subtitle}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* ================= SECOND ROW BLOGS ================= */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            <div className="flex flex-col h-full group">
              <div className="relative h-60 mb-4 overflow-hidden rounded-md">
                <Image
                  src="/images/blogpage/4.png"
                  alt="Tech skills"
                  width={580}
                  height={240}
                  className="
                    w-full h-full object-cover
                    transition-transform duration-500 ease-out
                    group-hover:scale-110
                  "
                />
              </div>
              <h3 className="text-xl font-bold mb-2">
                Top 10 Tech Skills That Can Land You a High-Paying Job
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                Why Tech Skills Are Essential in 2025
              </p>
            </div>

            <div className="flex flex-col h-full group">
              <div className="relative h-60 mb-4 overflow-hidden rounded-md">
                <Image
                  src="/images/blogpage/5.png"
                  alt="Learning motivation"
                  width={580}
                  height={240}
                  className="
                    w-full h-full object-cover
                    transition-transform duration-500 ease-out
                    group-hover:scale-110
                  "
                />
              </div>
              <h3 className="text-xl font-bold mb-2">
                How to Stay Motivated While Learning New Skills
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                Why Motivation Is Key to Skill Development
              </p>
            </div>
          </div>

          
        </div>
      </section>
    </>
  );
}