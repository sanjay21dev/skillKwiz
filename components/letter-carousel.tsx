"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

interface CarouselSlide {
  headline: string;
  description: string;
  backgroundImage: string;
  imageText: string;
}

export default function LetterCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides: CarouselSlide[] = [
    {
      headline: "Assessments in Secure Centers",
      description:
        "Conduct highly secure assessments in verified examination centers with advanced monitoring and fraud prevention systems.",
      backgroundImage: "/images/homepage/Carousel/Secure Center.jpg",
      imageText: "Assessment in Secure Center",
    },
    {
      headline: "Skill Assessment Library",
      description:
        "Access thousands of industry-focused assessments designed to evaluate technical and practical expertise accurately.",
      backgroundImage: "/images/homepage/Carousel/Drivers License.jpg",
      imageText: "Candidate Eliminating Authentication Fraud",
    },
    {
      headline: "Expert-Crafted Assessments",
      description:
        "Evaluate candidates through engaging quizzes crafted by domain experts for real-world skill measurement.",
      backgroundImage: "/images/homepage/Carousel/Pick - Laptop.jpg",
      imageText: "Say Goodbye to technical Interviews!!",
    },
    {
      headline: "Verified Skills That Simplify Hiring",
      description:
        "Reduce hiring risks with trusted skill verification and data-driven candidate performance insights.",
      backgroundImage: "/images/homepage/Carousel/Skill Library.jpg",
      imageText: "World’s Largest Skill Assessment Library",
    },
  ];

  const nextSlide = () =>
    setCurrentSlide((prev) => (prev + 1) % slides.length);

  const prevSlide = () =>
    setCurrentSlide((prev) =>
      prev === 0 ? slides.length - 1 : prev - 1
    );

  useEffect(() => {
    const interval = setInterval(nextSlide, 4500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full">
      <div className="grid lg:grid-cols-[0.8fr_1.5fr] gap-14 items-center">

        {/* LEFT SIDE - CONTENT */}
        <div className="text-left flex flex-col h-[460px] justify-between">

          {/* TOP CONTENT */}
          <div>
            <p className="text-blue-200 font-medium mb-4 tracking-[0.3em] uppercase">
              Smart Hiring Platform
            </p>

            {/* HEADLINE */}
            <div className="h-[180px]">
              <AnimatePresence mode="wait">
                <motion.h1
                  key={slides[currentSlide].headline}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4 }}
                  className="text-4xl md:text-6xl font-bold leading-tight mb-6"
                >
                  {slides[currentSlide].headline}
                </motion.h1>
              </AnimatePresence>
            </div>

            {/* DESCRIPTION */}
            <div className="h-[100px]">
              <AnimatePresence mode="wait">
                <motion.p
                  key={slides[currentSlide].description}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.4 }}
                  className="text-gray-200 text-lg leading-relaxed max-w-xl"
                >
                  {slides[currentSlide].description}
                </motion.p>
              </AnimatePresence>
            </div>
          </div>

          {/* STATIC BUTTONS */}
          <div className="pt-10 flex flex-col sm:flex-row gap-4">
            <Link
              href="/services"
              className="
                bg-[#f73e5d]
                px-8 py-4
                rounded-full
                font-medium
                hover:scale-[1.03]
                transition
                text-center
              "
            >
              Get Started
            </Link>

            <Link
              href="#how-it-works"
              className="
                bg-white text-[#004aad]
                px-8 py-4
                rounded-full
                font-medium
                hover:scale-[1.03]
                transition
                text-center
              "
            >
              Learn More
            </Link>
          </div>
        </div>

        {/* RIGHT SIDE - CAROUSEL */}
        <div className="relative">
          <div
            className="
              relative h-[360px] md:h-[460px]
              overflow-hidden bg-[#0b1f45]
              rounded-3xl
              shadow-[0_20px_60px_rgba(0,0,0,0.4)]
              border border-white/10
            "
          >

            <AnimatePresence initial={false}>

              {/* CURRENT SLIDE */}
              <motion.div
                key={currentSlide}
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "-100%" }}
                transition={{
                  duration: 0.55,
                  ease: "easeInOut",
                }}
                className="absolute inset-0"
              >
                {/* IMAGE */}
                <Image
                  src={slides[currentSlide].backgroundImage}
                  alt={slides[currentSlide].headline}
                  fill
                  className="object-cover"
                  priority
                />

                {/* OVERLAY */}
                <div className="absolute inset-0 bg-gradient-to-l from-black/40 via-transparent to-black/10" />

                {/* TEXT ON IMAGE */}
                <div className="absolute top-8 left-1/2 -translate-x-1/2 z-10 px-6">
  <h2
    className="
      text-lg md:text-2xl
      font-bold
      text-center
      bg-gradient-to-r
      from-[#2563eb]
      via-[#94a3b8]
      to-[#eab308]
      bg-clip-text
      text-transparent
      drop-shadow-lg
    "
  >
    {slides[currentSlide].imageText}
  </h2>
</div>

              </motion.div>

            </AnimatePresence>

            {/* LEFT BUTTON */}
            <button
              onClick={prevSlide}
              className="
                absolute left-4 top-1/2 -translate-y-1/2
                bg-white/70 hover:bg-white
                p-3 rounded-full shadow z-20 transition
              "
            >
              <ChevronLeft className="w-5 h-5 text-[#00418d]" />
            </button>

            {/* RIGHT BUTTON */}
            <button
              onClick={nextSlide}
              className="
                absolute right-4 top-1/2 -translate-y-1/2
                bg-white/70 hover:bg-white
                p-3 rounded-full shadow z-20 transition
              "
            >
              <ChevronRight className="w-5 h-5 text-[#00418d]" />
            </button>

            {/* INDICATORS */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    index === currentSlide
                      ? "w-8 bg-[#f73e5d]"
                      : "w-3 bg-[#f73e5d]/40 hover:bg-[#f73e5d]/70"
                  }`}
                />
              ))}
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}



// "use client";

// import { useState, useEffect } from "react";
// import { ChevronLeft, ChevronRight } from "lucide-react";
// import Image from "next/image";
// import { motion, AnimatePresence } from "framer-motion";

// interface CarouselSlide {
//   headline: string;
//   backgroundImage: string;
// }

// export default function LetterCarousel() {
//   const [currentSlide, setCurrentSlide] = useState(0);

//   const slides: CarouselSlide[] = [
//     {
//       headline: "Assessments in Secure Centers",
//       backgroundImage: "/images/homepage/Carousel/Secure Center.jpg",
//     },
//     {
//       headline: "World’s Largest Skill Assessment Library",
//       backgroundImage: "/images/homepage/Carousel/Drivers License.jpg",
//     },
//     {
//       headline: "Industry-Expert Designed Interactive Quizzes",
//       backgroundImage: "/images/homepage/Carousel/Pick - Laptop.jpg",
//     },
//     {
//       headline: "Verified Skills That Simplify Hiring",
//       backgroundImage: "/images/homepage/Carousel/Skill Library.jpg",
//     },
//   ];

//   const nextSlide = () =>
//     setCurrentSlide((prev) => (prev + 1) % slides.length);

//   const prevSlide = () =>
//     setCurrentSlide((prev) =>
//       prev === 0 ? slides.length - 1 : prev - 1
//     );

//   useEffect(() => {
//     const interval = setInterval(nextSlide, 4500);
//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <div className="w-full max-w-7xl mx-auto relative px-4">
//       <div
//         className="
//           relative
//           h-[620px] md:h-[520px]
//           overflow-hidden
//           rounded-[32px]
//           border border-white/10
//           bg-white
//           shadow-[0_20px_60px_rgba(0,0,0,0.35)]
//         "
//       >
//         <AnimatePresence mode="wait">
//           <motion.div
//             key={currentSlide}
//             initial={{ opacity: 0, x: 60 }}
//             animate={{ opacity: 1, x: 0 }}
//             exit={{ opacity: 0, x: -60 }}
//             transition={{
//               duration: 0.7,
//               ease: "easeInOut",
//             }}
//             className="
//               absolute inset-0
//               grid md:grid-cols-2
//             "
//           >
//             {/* LEFT CONTENT */}
//             <div className="flex items-center justify-center bg-gradient-to-br from-white to-blue-50 p-8 md:p-14">
//               <div className="w-full max-w-xl">
                
//                 {/* Top Line */}
//                 <div className="w-40 h-1 rounded-full bg-[#004aad] mb-8" />

//                 {/* Badge */}
//                 <div
//                   className="
//                     inline-flex items-center gap-2
//                     px-4 py-2
//                     rounded-full
//                     bg-blue-100
//                     text-[#004aad]
//                     text-sm
//                     font-medium
//                     mb-6
//                   "
//                 >
//                   AI Powered Skill Verification
//                 </div>

//                 {/* Headline */}
//                 <h2
//                   className="
//                     text-3xl md:text-5xl
//                     font-bold
//                     leading-tight
//                     text-[#002b5c]
//                   "
//                 >
//                   {slides[currentSlide].headline}
//                 </h2>

//                 {/* Description */}
//                 <p className="mt-6 text-gray-600 text-base md:text-lg leading-relaxed">
//                   Conduct secure and verified assessments with real-world
//                   evaluations that help companies hire smarter and faster.
//                 </p>

//                 {/* CTA */}
//                 <button
//                   className="
//                     mt-8
//                     px-8 py-4
//                     rounded-full
//                     bg-[#004aad]
//                     hover:bg-[#003580]
//                     text-white
//                     font-medium
//                     transition-all duration-300
//                     shadow-lg
//                     hover:scale-[1.03]
//                   "
//                 >
//                   Explore Assessments
//                 </button>
//               </div>
//             </div>

//             {/* RIGHT IMAGE */}
//             <div className="relative h-[280px] md:h-full overflow-hidden">
//               <Image
//                 src={slides[currentSlide].backgroundImage}
//                 alt={slides[currentSlide].headline}
//                 fill
//                 priority
//                 className="
//                   object-cover
//                   transition-transform duration-700
//                   hover:scale-105
//                 "
//               />

//               {/* Gradient Fade Effect */}
//               <div
//                 className="
//                   absolute inset-0
//                   bg-[linear-gradient(to_right,white_5%,rgba(255,255,255,0.92)_20%,rgba(255,255,255,0.55)_40%,transparent_75%)]
//                 "
//               />
//             </div>
//           </motion.div>
//         </AnimatePresence>

//         {/* LEFT NAVIGATION */}
//         <button
//           onClick={prevSlide}
//           className="
//             absolute left-4 md:left-6 top-1/2 -translate-y-1/2
//             w-12 h-12
//             rounded-full
//             bg-white/90
//             hover:bg-white
//             shadow-lg
//             flex items-center justify-center
//             transition-all duration-300
//             z-20
//           "
//         >
//           <ChevronLeft className="w-5 h-5 text-[#00418d]" />
//         </button>

//         {/* RIGHT NAVIGATION */}
//         <button
//           onClick={nextSlide}
//           className="
//             absolute right-4 md:right-6 top-1/2 -translate-y-1/2
//             w-12 h-12
//             rounded-full
//             bg-white/90
//             hover:bg-white
//             shadow-lg
//             flex items-center justify-center
//             transition-all duration-300
//             z-20
//           "
//         >
//           <ChevronRight className="w-5 h-5 text-[#00418d]" />
//         </button>

//         {/* INDICATORS */}
//         <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3 z-20">
//           {slides.map((_, index) => (
//             <button
//               key={index}
//               onClick={() => setCurrentSlide(index)}
//               className={`
//                 rounded-full transition-all duration-300
//                 ${
//                   index === currentSlide
//                     ? "w-10 h-3 bg-[#004aad]"
//                     : "w-3 h-3 bg-gray-300 hover:bg-gray-400"
//                 }
//               `}
//             />
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }