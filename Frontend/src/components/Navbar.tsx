"use client";

import Link from "next/link";
import { useState } from "react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="relative sticky top-0 z-50 px-6 py-4 flex flex-wrap justify-between items-center overflow-hidden rounded-b-lg shadow-md">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-400 via-blue-600 to-green-500 animate-gradient-x opacity-30 -z-10"></div>

      {/* Logo */}
      <Link href="/" className="flex items-center gap-2 relative z-10">
        <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-lg">
          C
        </div>
        <span className="text-2xl font-bold text-blue-600">CabMap</span>
      </Link>

      {/* Mobile menu button */}
      <button
        className="sm:hidden text-gray-700 hover:text-blue-600 relative z-10"
        onClick={() => setIsOpen(!isOpen)}
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
          />
        </svg>
      </button>

      {/* Links */}
      <ul
        className={`flex flex-col sm:flex-row gap-4 sm:items-center w-full sm:w-auto transition-all duration-300 relative z-10 ${
          isOpen ? "block mt-4 sm:mt-0" : "hidden sm:flex"
        }`}
      >
        {[
          { href: "/", label: "Home", gradient: "from-blue-400 to-blue-600" },
          { href: "/resolve", label: "Resolve Address", gradient: "from-blue-400 to-blue-600" },
          { href: "/book", label: "Book Cab", gradient: "from-green-400 to-green-600" },
        ].map((link) => (
          <li key={link.href} className="relative group">
            <Link
              href={link.href}
              className="text-gray-700 font-medium transition-colors hover:text-gray-900"
            >
              {link.label}
            </Link>
            {/* Animated gradient underline */}
            <span
              className={`absolute left-0 -bottom-1 h-1 w-0 bg-gradient-to-r ${link.gradient} transition-all duration-300 group-hover:w-full rounded-full`}
            ></span>
          </li>
        ))}
      </ul>

      {/* Tailwind gradient animation */}
      <style jsx>{`
        @keyframes gradient-x {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }
        .animate-gradient-x {
          background-size: 200% 200%;
          animation: gradient-x 8s ease infinite;
        }
      `}</style>
    </nav>
  );
};

export default Navbar;
