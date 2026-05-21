"use client";

import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { usePathname } from "next/navigation";

export default function SiteHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const pathname = usePathname();

  return (
    <div className="w-full fixed top-0 left-0 z-50 ">
      <nav className="flex flex-col w-full md:w-4/5 lg:w-3/5 xl:w-1/2 mx-auto bg-gradient-to-r from-[#eaf8ff] via-[#f3f8ff] to-[#ffe5ea] text-black shadow-lg rounded-b-3xl border border-gray-200">
        {/* HEADER BAR */}
        <div className="flex items-center justify-between px-4 h-16">

          {/* ✅ LOGO (FIXED + BIGGER + CLEAN) */}
          <Link href="/" className="flex items-center h-full pl-2 md:pl-4">
            <Image
              src="/images/Sk-logo1.png"
              alt="SkillKwiz Logo"
              width={147}
              height={80}
              className="object-contain scale-150 -translate-y-1 md:-translate-y-2"
              priority
            />
          </Link>

          {/* ✅ MOBILE MENU BUTTON */}
          <button
            className="md:hidden text-white focus:outline-none"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>

          {/* ✅ DESKTOP NAV */}
          <div className="hidden md:flex items-center gap-4">

            <Link
              href="/"
              className={`relative group px-3 py-2 text-sm lg:text-base transition ${
                pathname === "/" ? "text-yellow-400 font-semibold" : "text-gray-800"
              }`}
            >
              Home
              <span className="absolute left-0 bottom-0 w-full h-0.5 bg-gradient-to-r from-blue-600 to-yellow-400 scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
            </Link>

            <Link
              href="/about"
              className={`relative group px-3 py-2 text-sm lg:text-base transition ${
                pathname === "/about"
                  ? "text-yellow-400 font-semibold"
                  : "text-gray-800"
              }`}
            >
              About Us
              <span className="absolute left-0 bottom-0 w-full h-0.5 bg-gradient-to-r from-blue-600 to-yellow-400 scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
            </Link>

            <Link
              href="/services"
              className={`relative group px-3 py-2 text-sm lg:text-base transition ${
                pathname === "/services"
                  ? "text-yellow-400 font-semibold"
                  : "text-gray-800"
              }`}
            >
              Services
              <span className="absolute left-0 bottom-0 w-full h-0.5 bg-gradient-to-r from-blue-600 to-yellow-400 scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
            </Link>

            <Link
              href="/blog"
              className={`relative group px-3 py-2 text-sm lg:text-base transition ${
                pathname === "/blog"
                  ? "text-yellow-400 font-semibold"
                  : "text-gray-800"
              }`}
            >
              Blog
              <span className="absolute left-0 bottom-0 w-full h-0.5 bg-gradient-to-r from-blue-600 to-yellow-400 scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
            </Link>

          </div>
        </div>

        {/* ✅ MOBILE MENU */}
        {isMenuOpen && (
          <div className="md:hidden flex flex-col items-center py-4 bg-white rounded-b-3xl absolute top-0 left-0 w-full pt-16 shadow-lg">

            {["Home", "About Us", "Services", "Blog"].map((item, i) => (
              <Link
                key={i}
                href={
                  item === "Home"
                    ? "/"
                    : `/${item.toLowerCase().replace(" ", "")}`
                }
                className="text-gray-800 relative group py-3 text-lg w-full text-center"
                onClick={() => setIsMenuOpen(false)}
              >
                {item}
                <span className="absolute left-1/4 right-1/4 bottom-0 w-1/2 h-0.5 bg-gradient-to-r from-blue-600 to-yellow-400 scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
              </Link>
            ))}

          </div>
        )}

      </nav>
    </div>
  );
}