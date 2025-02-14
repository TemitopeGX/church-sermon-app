"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function DashboardPage() {
  return (
    <div className="px-4">
      {/* Welcome Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-2xl font-bold text-white mb-2">Latest Sermons</h1>
        <p className="text-gray-400">Listen to our most recent messages</p>
      </motion.div>

      {/* Sermons Grid */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {/* Sample Sermon Card */}
        <div className="bg-white/5 rounded-2xl overflow-hidden hover:bg-white/10 transition-colors">
          <div className="relative h-48">
            <Image
              src="/church-image.jpg"
              alt="Sermon Thumbnail"
              fill
              className="object-cover"
            />
          </div>
          <div className="p-6">
            <h3 className="text-lg font-semibold text-white mb-2">
              Sunday Service - Walking in Faith
            </h3>
            <p className="text-gray-400 text-sm mb-4">
              Pastor John Doe • February 25, 2024
            </p>
            <button className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors">
              Listen Now
            </button>
          </div>
        </div>

        {/* Add more sermon cards as needed */}
      </motion.div>

      {/* Featured Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="mt-12"
      >
        <h2 className="text-xl font-bold text-white mb-6">Featured Series</h2>
        <div className="bg-white/5 rounded-2xl p-6">
          <h3 className="text-lg font-semibold text-white mb-2">
            Foundations of Faith
          </h3>
          <p className="text-gray-400">
            A comprehensive study on building strong spiritual foundations.
          </p>
        </div>
      </motion.div>
    </div>
  );
}
