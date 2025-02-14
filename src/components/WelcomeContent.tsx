"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export default function WelcomeContent() {
  return (
    <div className="max-w-7xl mx-auto">
      <div className="grid lg:grid-cols-2 min-h-screen">
        {/* Left Section - Image */}
        <div className="relative h-[45vh] lg:h-screen">
          <Image
            src="/church-image.jpg"
            alt="Church Sanctuary"
            fill
            className="object-cover lg:rounded-br-[80px]"
            priority
          />
          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#030014] lg:bg-gradient-to-r" />
        </div>

        {/* Right Section - Content */}
        <div className="relative -mt-20 lg:mt-0">
          <div className="bg-[#030014] min-h-[60vh] rounded-t-[40px] px-8 pt-12 pb-8 lg:min-h-screen lg:rounded-none lg:px-16 lg:flex lg:flex-col lg:justify-center">
            {/* Dots Indicator */}
            <div className="flex justify-center gap-2 mb-8 lg:justify-start">
              <div className="w-2 h-2 rounded-full bg-blue-500"></div>
              <div className="w-2 h-2 rounded-full bg-white/20"></div>
              <div className="w-2 h-2 rounded-full bg-white/20"></div>
            </div>

            {/* Main Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="space-y-4 text-center lg:text-left mb-12"
            >
              <h1 className="text-3xl lg:text-5xl font-bold text-white">
                Covenant Media
              </h1>
              <p className="text-gray-400 text-lg lg:text-xl">
                For your spiritual growth
              </p>
              <p className="text-gray-500 text-sm lg:text-base max-w-xl">
                Access powerful sermons and teachings from our church. Listen
                anywhere, anytime, and grow in your faith journey.
              </p>
            </motion.div>

            {/* Action Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="relative max-w-md"
            >
              <Link href="/sign-in">
                <div className="bg-blue-600 w-14 h-14 lg:w-16 lg:h-16 rounded-full flex items-center justify-center absolute right-4 top-1/2 -translate-y-1/2 shadow-lg hover:bg-blue-700 transition-colors">
                  <svg
                    className="w-8 h-8 lg:w-10 lg:h-10 text-white transform translate-x-0.5"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M5 12h14" />
                    <path d="m12 5 7 7-7 7" />
                  </svg>
                </div>
                <div className="bg-white/5 backdrop-blur-sm p-6 lg:p-8 rounded-2xl pr-20 lg:pr-24 hover:bg-white/10 transition-colors">
                  <span className="text-blue-400 text-sm lg:text-base font-medium">
                    Get Started
                  </span>
                  <h3 className="text-white text-lg lg:text-xl font-semibold mt-1">
                    Listen to Sermons
                  </h3>
                </div>
              </Link>
            </motion.div>

            {/* Features */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="mt-8 grid grid-cols-2 gap-4 max-w-2xl"
            >
              <div className="bg-white/5 p-4 lg:p-6 rounded-2xl hover:bg-white/10 transition-colors">
                <span className="text-blue-400 text-sm lg:text-base">
                  Latest
                </span>
                <p className="text-white mt-1 lg:text-lg">Sunday Service</p>
              </div>
              <div className="bg-white/5 p-4 lg:p-6 rounded-2xl hover:bg-white/10 transition-colors">
                <span className="text-purple-400 text-sm lg:text-base">
                  Featured
                </span>
                <p className="text-white mt-1 lg:text-lg">Bible Studies</p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
