import Image from "next/image";
import Link from "next/link";

export default function AboutPage() {
  return (
    <>
      {/* ================= HERO ================= */}
<section
  className="
    relative pt-[72px] text-white overflow-hidden
    bg-gradient-to-br from-[#002b5c] via-[#004aad] to-[#3b82f6]
  "
>
  {/* background glow */}
  <div className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-[#f73e5d]/20 rounded-full blur-3xl" />
  <div className="absolute top-1/3 right-0 w-[400px] h-[400px] bg-cyan-400/20 rounded-full blur-3xl" />

  <div
    className="
      relative max-w-7xl mx-auto px-6
      min-h-[90vh]
      flex items-center justify-center
    "
  >

    {/* TEXT CONTENT */}
    <div
      className="
        animate-fade-up
        absolute z-20
        text-center
        max-w-3xl
        px-6
      "
    >
      <p className="text-sm uppercase tracking-widest text-white/70 mb-4">
        About SkillKwiz
      </p>

      <h1 className="text-4xl md:text-5xl font-semibold leading-tight mb-6">
        Enterprise-grade skill assessment
        <br /> built on trust and accuracy
      </h1>

      <p className="text-white/80 text-base mb-8 max-w-xl mx-auto">
        SkillKwiz helps organizations make confident talent decisions
        through secure, data-driven skill assessments designed for scale.
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
          hover:scale-[1.03]
        "
      >
        Get Started
      </Link>
    </div>

    {/* BACKGROUND IMAGE */}
    <div className="absolute inset-0 flex items-center justify-center opacity-30">
      <Image
        src="/images/homepage/home_globe.gif"
        alt="Global skill assessment platform"
        width={520}
        height={420}
        className="animate-float-slow"
      />
    </div>

  </div>
</section>

      {/* ================= STATS ================= */}
      <section className="bg-gradient-to-b from-[#bcd4ff] to-[#e0ecff] border-b">
        <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { label: "Skills Assessed", value: "3000+" },
            { label: "Secure Centers", value: "100+" },
            { label: "Industries Served", value: "25+" },
            { label: "Assessment Accuracy", value: "99%" },
          ].map((item) => (
            <div key={item.label} className="animate-fade-up">
              <p className="text-3xl font-semibold text-[#00418d]">
                {item.value}
              </p>
              <p className="text-sm text-gray-600 mt-1">
                {item.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ================= VISION / MISSION / VALUES ================= */}
      <section className="bg-gradient-to-b from-[#edf3ff] to-[#d6e4ff]">
        <div className="max-w-7xl mx-auto px-6 py-24">
          <div className="mb-16 max-w-2xl animate-fade-up">
            <h2 className="text-3xl font-semibold text-[#00418d] mb-4">
              Our purpose
            </h2>
            <p className="text-gray-700">
              We exist to bring transparency, fairness, and confidence into
              skill evaluation.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            {[
              {
                title: "Vision",
                img: "/images/aboutpage/eye.gif",
                text:
                  "A world where hiring and growth decisions are driven by verified skills, not assumptions.",
              },
              {
                title: "Mission",
                img: "/images/aboutpage/mission.gif",
                text:
                  "To deliver secure, scalable, and accurate skill assessments trusted by enterprises worldwide.",
              },
              {
                title: "Values",
                img: "/images/aboutpage/purpose.gif",
                text:
                  "Integrity, security, objectivity, and respect for every stakeholder.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="bg-white p-8 rounded border text-center animate-fade-up transition hover:-translate-y-2 hover:shadow-lg"
              >
                <Image
                  src={item.img}
                  alt={item.title}
                  width={140}
                  height={140}
                  className="mx-auto mb-6 transition-transform duration-300 hover:scale-105"
                />

                <h3 className="text-lg font-semibold text-[#00418d] mb-3">
                  {item.title}
                </h3>

                <p className="text-sm text-gray-700 leading-relaxed">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= WHO WE ARE ================= */}
      <section className="bg-gradient-to-b from-[#e6f0ff] to-[#f5f9ff]">
        <div className="max-w-7xl mx-auto px-6 py-24 grid md:grid-cols-2 gap-20 items-center">
          <div className="animate-fade-up">
            <h2 className="text-3xl font-semibold text-[#00418d] mb-6">
              Who we are
            </h2>

            <p className="text-gray-700 mb-6">
              We are your partner in skill assessment.
              Our expertise lies in assessing skill levels in people and quantifying them...
            </p>

            <blockquote className="border-l-4 border-[#f73e5d] pl-4 italic text-gray-600">
              “Objective, reliable, meaningful skill evaluation.”
            </blockquote>
            <blockquote className="border-l-4 border-[#f73e5d] pl-4 text-gray-600">
              -Venugopal B A
              CEO, SkillKwiz
            </blockquote>
          </div>

          {/* Floating team images */}

          <div className="flex gap-6 justify-center items-end">
            {[0, 1, 2].map((i) => (
              <div key={i} className="relative">
                {/* ✅ THIS wrapper is animated */}
                <span className="float-same-place">
                  <Image
                    src={`/images/aboutpage/about_who_we_are-${i}.png`}
                    alt="Team collaboration"
                    width={140}
                    height={240}
                    className="rounded-xl shadow-md"
                  />
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= LEADERSHIP ================= */}
      <section className="bg-gradient-to-b from-[#f5f9ff] to-[#dbeafe]">
        <div className="max-w-7xl mx-auto px-6 py-24 grid md:grid-cols-3 gap-16 items-center">
          <div className="text-center group">
            <Image
              src="/images/aboutpage/Venugopal.png"
              alt="CEO"
              width={220}
              height={220}
              className="mx-auto rounded-xl shadow-lg transition-transform duration-300 group-hover:scale-105"
            />
            <p className="font-semibold text-[#00418d] mt-4">
              Venugopal B A
            </p>
            <p className="text-sm text-gray-600">
              Chief Executive Officer
            </p>
          </div>

          <div className="md:col-span-2 text-gray-700 leading-relaxed animate-fade-up">
            <p className="mb-6">
              Venugopal B A, a veteran leader in the IT industry with experience spanning 24 years in senior leadership roles,
              has chosen to take on the mantle of leading SkillKwiz.
              His understanding of one of the key challenges faced by the services sector gave birth to the vision that is SkillKwiz today.


            </p>

            <p>
              With a rich background in the technology industry,
              he aims to establish SkillKwiz as an AI first and foremost company.
              He is poised to take SkillKwiz to its next level of growth by turning it into a company that is shaped entirely by the market it serves.
            </p>
          </div>
        </div>
      </section>

      {/* ================= VIDEO ================= */}
      <section className="bg-gradient-to-b from-[#dbeafe] to-[#f5f9ff]">
        <div className="max-w-6xl mx-auto px-6 py-24 animate-fade-up">
          <h2 className="text-3xl font-semibold text-[#00418d] mb-8 text-center">
            Learn more about SkillKwiz
          </h2>

          <video
            className="w-full rounded-xl border shadow-lg"
            controls
            poster="/images/aboutpage/about_video.png"
          >
            <source src="/images/aboutpage/about_video.mp4" type="video/mp4" />
          </video>
        </div>
      </section>
    </>
  );
}