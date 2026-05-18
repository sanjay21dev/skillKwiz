import Link from "next/link";

export default function WhyChooseSection() {
  return (
    <section className="relative overflow-hidden py-24 text-white bg-gradient-to-b from-[#e0ecff] to-[#c7dcff]">
      {/* Background */}
      {/* <div className="absolute inset-0">
        <img
          src="/images/homepage/why_choose_banner_2.png"
          alt=""
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 flex justify-center items-center opacity-50">
          <img
            src="/images/homepage/home_globe.gif"
            alt=""
            className="max-w-3xl"
          />
        </div>
      </div> */}

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        {/* Headline */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-20 items-center">
          <h2 className="text-4xl font-bold leading-tight text-[#00418d]">
            Why Choose{" "}
            <span className="text-white">
              Skill<span className="text-[#f73e5d]">Kwiz</span>
            </span>
            ?
          </h2>

          <p className="text-gray-700 text-base leading-relaxed">
            Discover our unique value propositions designed to enhance your
            recruitment strategy. Experience the difference SkillKwiz can make
            for your organization.
          </p>
        </div>

        {/* ✅ Cards with professional motion */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-24">
          
          {/* Card */}
          <div className="bg-white rounded-xl p-8 text-black shadow-lg
                          hover:-translate-y-2 hover:shadow-2xl
                          transition-all duration-300 ease-out">
            <div className="flex justify-center mb-6">
              <img src="/images/homepage/books.gif" alt="" className="w-16 h-16" />
            </div>
            <h3 className="text-[#00418d] text-lg font-semibold text-center mb-3">
              Skill Library
            </h3>
            <p className="text-gray-700 text-sm leading-relaxed text-center">
              Our huge skill library of over 3000 skills allows you to measure
              candidates across a wide variety of domains with ease.
            </p>
          </div>

          {/* Card */}
          <div className="bg-white rounded-xl p-8 text-black shadow-lg
                          hover:-translate-y-2 hover:shadow-2xl
                          transition-all duration-300 ease-out">
            <div className="flex justify-center mb-6">
              <img src="/images/homepage/guard.gif" alt="" className="w-16 h-16" />
            </div>
            <h3 className="text-[#00418d] text-lg font-semibold text-center mb-3">
              Secure Testing
            </h3>
            <p className="text-gray-700 text-sm leading-relaxed text-center">
              Testing is conducted in secure centers with government-approved
              identity verification displayed directly on reports.
            </p>
          </div>

          {/* Card */}
          <div className="bg-white rounded-xl p-8 text-black shadow-lg
                          hover:-translate-y-2 hover:shadow-2xl
                          transition-all duration-300 ease-out">
            <div className="flex justify-center mb-6">
              <img src="/images/homepage/dollar.gif" alt="" className="w-16 h-16" />
            </div>
            <h3 className="text-[#00418d] text-lg font-semibold text-center mb-3">
              Flexible Pricing
            </h3>
            <p className="text-gray-700 text-sm leading-relaxed text-center">
              Choose pay-per-report or subscription plans that scale with
              your organization’s hiring needs.
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <h3 className="text-2xl font-semibold mb-4 text-[#00418d]">
            Transform your hiring process with verified, authenticated skill
            assessments.
          </h3>
          <p className="text-gray-700 max-w-2xl mx-auto mb-10">
            Experience a revolutionary approach to talent acquisition with
            SkillKwiz. Sign up now and discover a world of possibilities.
          </p>

          <Link
            href="/services"
            className="
            inline-flex items-center justify-center
            bg-[#f73e5d] text-white
            px-8 py-3 rounded-full
            font-medium
            hover:bg-opacity-90
            transition-transform
            hover:scale-[1.03]"
          >
            Get Started
          </Link>
        </div>
      </div>
    </section>
  );
}