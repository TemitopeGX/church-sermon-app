"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useTheme } from "@/contexts/ThemeContext";
import { Dialog } from "@headlessui/react";
import {
  Bars3Icon,
  XMarkIcon,
  SunIcon,
  MoonIcon,
} from "@heroicons/react/24/outline";

const navigation = [
  { name: "Home", href: "/" },
  { name: "Live Stream", href: "/live" },
  { name: "Sermons", href: "/sermons" },
  { name: "About", href: "/about" },
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/95 backdrop-blur-sm border-b border-white/10">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image
              src="/images/logo.png"
              alt="Church Logo"
              width={40}
              height={40}
              className="w-auto h-8"
            />
            <span className="ml-2 text-xl font-bold text-white">
              Covenant Chapel
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="/about"
              className="text-gray-300 hover:text-white transition-colors"
            >
              About
            </Link>
            <Link
              href="/sermons"
              className="text-gray-300 hover:text-white transition-colors"
            >
              Sermons
            </Link>
            <Link
              href="/live"
              className="text-gray-300 hover:text-white transition-colors"
            >
              Live
            </Link>
            <Link
              href="/media"
              className="text-gray-300 hover:text-white transition-colors"
            >
              Media
            </Link>
            <Link
              href="/events"
              className="text-gray-300 hover:text-white transition-colors"
            >
              Events
            </Link>
            <Link
              href="/contact"
              className="px-4 py-2 text-white bg-primary-800 hover:bg-primary-700 rounded-full transition-colors"
            >
              Contact Us
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-gray-300 hover:text-white"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {mobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`${
            mobileMenuOpen ? "block" : "hidden"
          } md:hidden py-4 space-y-2 transition-all duration-300 ease-in-out`}
        >
          <Link
            href="/about"
            className="block text-gray-300 hover:text-white transition-colors"
          >
            About
          </Link>
          <Link
            href="/sermons"
            className="block text-gray-300 hover:text-white transition-colors"
          >
            Sermons
          </Link>
          <Link
            href="/live"
            className="block text-gray-300 hover:text-white transition-colors"
          >
            Live
          </Link>
          <Link
            href="/media"
            className="block text-gray-300 hover:text-white transition-colors"
          >
            Media
          </Link>
          <Link
            href="/events"
            className="block text-gray-300 hover:text-white transition-colors"
          >
            Events
          </Link>
          <Link
            href="/contact"
            className="inline-block px-4 py-2 text-white bg-primary-800 hover:bg-primary-700 rounded-full transition-colors"
          >
            Contact Us
          </Link>
        </div>
      </nav>
    </header>
  );
}
