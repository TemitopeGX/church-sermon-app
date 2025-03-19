"use client";

import Link from "next/link";
import {
  VideoCameraIcon,
  Bars3Icon,
  ChevronDownIcon,
} from "@heroicons/react/24/outline";
import { useState } from "react";
import MobileMenu from "@/components/MobileMenu";

const navigation = [
  { name: "HOME", href: "/" },
  {
    name: "ABOUT",
    href: "/about",
    submenu: [
      { name: "Our Story", href: "/about/story" },
      { name: "Our Vision", href: "/about/vision" },
      { name: "Leadership", href: "/about/leadership" },
      { name: "What We Believe", href: "/about/beliefs" },
    ],
  },
  {
    name: "MINISTRIES",
    href: "/ministries",
    submenu: [
      { name: "Icon of Glory Ministry", href: "/ministries/kids" },
      { name: "Arrow - Head Ministry", href: "/ministries/youth" },

      { name: "Women's Ministry", href: "/ministries/women" },
    ],
  },
  {
    name: "MEDIA",
    href: "/media",
    submenu: [
      { name: "Sermons", href: "/sermons" },
      { name: "Live Stream", href: "/live" },
      { name: "Podcast", href: "/podcast" },
      { name: "Blog", href: "/blog" },
    ],
  },
  { name: "EVENTS", href: "/events" },
  { name: "GIVE", href: "/give" },
];

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50">
        <nav className="bg-background/80 backdrop-blur-lg border-b border-accent/10">
          <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex h-20 items-center justify-between">
              {/* Logo */}
              <div className="flex-shrink-0">
                <Link href="/" className="flex items-center">
                  <img
                    className="h-12 w-auto"
                    src="/logo.png"
                    alt="The Covenant Chapel"
                  />
                </Link>
              </div>

              {/* Desktop Navigation */}
              <div className="hidden lg:flex lg:items-center lg:space-x-8">
                {navigation.map((item) => (
                  <div key={item.name} className="relative group">
                    <Link
                      href={item.href}
                      className="nav-link text-sm font-semibold inline-flex items-center"
                    >
                      {item.name}
                      {item.submenu && (
                        <ChevronDownIcon className="h-4 w-4 ml-1 transition-transform group-hover:rotate-180" />
                      )}
                    </Link>
                    {item.submenu && (
                      <div className="absolute left-0 mt-2 w-48 rounded-lg bg-card shadow-lg ring-1 ring-black ring-opacity-5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                        <div className="py-1">
                          {item.submenu.map((subItem) => (
                            <Link
                              key={subItem.name}
                              href={subItem.href}
                              className="block px-4 py-2 text-sm text-foreground hover:bg-accent/5"
                            >
                              {subItem.name}
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Mobile menu button */}
              <div className="flex lg:hidden">
                <button
                  type="button"
                  className="text-foreground hover:text-accent"
                  onClick={() => setMobileMenuOpen(true)}
                >
                  <Bars3Icon className="h-6 w-6" />
                </button>
              </div>

              {/* Watch Live Button */}
              <div className="hidden lg:block">
                <Link href="/live" className="live-button">
                  <VideoCameraIcon className="h-5 w-5 mr-2" />
                  Watch Live
                </Link>
              </div>
            </div>
          </div>
        </nav>

        {/* Mobile menu */}
        <MobileMenu
          isOpen={mobileMenuOpen}
          setIsOpen={setMobileMenuOpen}
          navigation={navigation}
        />
      </header>

      {/* Main content */}
      <main className="pt-20 min-h-screen">{children}</main>

      {/* Footer */}
      <footer className="bg-primary-800 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            {/* Logo Section */}
            <div className="col-span-1">
              <img
                src="/footer-logo.png"
                alt="The Covenant Chapel"
                className="h-12 w-auto mb-6"
              />
              <p className="text-white/70 text-sm">
                Experience divine worship reimagined for the digital age
              </p>
            </div>

            {/* Quick Links */}
            <div className="col-span-1">
              <h3 className="text-white font-semibold mb-4">Connect</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/membership"
                    className="text-white/70 hover:text-white transition-colors"
                  >
                    Become a member
                  </Link>
                </li>
                <li>
                  <Link
                    href="/prayer"
                    className="text-white/70 hover:text-white transition-colors"
                  >
                    Prayer Request
                  </Link>
                </li>
                <li>
                  <Link
                    href="/first-timers"
                    className="text-white/70 hover:text-white transition-colors"
                  >
                    First Timers
                  </Link>
                </li>
              </ul>
            </div>

            {/* Resources */}
            <div className="col-span-1">
              <h3 className="text-white font-semibold mb-4">Resources</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/classes"
                    className="text-white/70 hover:text-white transition-colors"
                  >
                    Membership Classes
                  </Link>
                </li>
                <li>
                  <Link
                    href="/counselling"
                    className="text-white/70 hover:text-white transition-colors"
                  >
                    Counselling
                  </Link>
                </li>
                <li>
                  <Link
                    href="/volunteer"
                    className="text-white/70 hover:text-white transition-colors"
                  >
                    Volunteer
                  </Link>
                </li>
              </ul>
            </div>

            {/* Media */}
            <div className="col-span-1">
              <h3 className="text-white font-semibold mb-4">Media</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/watch"
                    className="text-white/70 hover:text-white transition-colors"
                  >
                    Watch Online
                  </Link>
                </li>
                <li>
                  <Link
                    href="/sermons"
                    className="text-white/70 hover:text-white transition-colors"
                  >
                    Sermons
                  </Link>
                </li>
                <li>
                  <Link
                    href="/podcast"
                    className="text-white/70 hover:text-white transition-colors"
                  >
                    Podcast
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Footer */}
          <div className="mt-12 pt-8 border-t border-white/10">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-sm text-white/70">
                © {new Date().getFullYear()} The Covenant Chapel International.
                All rights reserved.
              </p>
              <div className="flex space-x-6 mt-4 md:mt-0">
                <Link
                  href="https://instagram.com"
                  className="text-white/70 hover:text-white transition-colors"
                >
                  <span className="sr-only">Instagram</span>
                  <svg
                    className="h-6 w-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                      clipRule="evenodd"
                    />
                  </svg>
                </Link>
                <Link
                  href="https://twitter.com"
                  className="text-white/70 hover:text-white transition-colors"
                >
                  <span className="sr-only">Twitter</span>
                  <svg
                    className="h-6 w-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </Link>
                <Link
                  href="https://youtube.com"
                  className="text-white/70 hover:text-white transition-colors"
                >
                  <span className="sr-only">YouTube</span>
                  <svg
                    className="h-6 w-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fillRule="evenodd"
                      d="M19.812 5.418c.861.23 1.538.907 1.768 1.768C21.998 8.746 22 12 22 12s0 3.255-.418 4.814a2.504 2.504 0 0 1-1.768 1.768c-1.56.419-7.814.419-7.814.419s-6.255 0-7.814-.419a2.505 2.505 0 0 1-1.768-1.768C2 15.255 2 12 2 12s0-3.255.417-4.814a2.507 2.507 0 0 1 1.768-1.768C5.744 5 11.998 5 11.998 5s6.255 0 7.814.418ZM15.194 12 10 15V9l5.194 3Z"
                      clipRule="evenodd"
                    />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
