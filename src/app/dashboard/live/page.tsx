"use client";

import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faYoutube } from "@fortawesome/free-brands-svg-icons";
import Link from "next/link";

export default function LivePage() {
  return (
    <div className="text-white">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-2xl font-bold">Live Streams</h1>
        <p className="text-gray-400 mt-2">Watch our live services</p>
      </motion.div>

      <div className="grid gap-6 md:grid-cols-2 max-w-4xl">
        {/* Facebook Live */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Link
            href="/dashboard/live/facebook"
            className="block p-6 bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl hover:from-blue-500 hover:to-blue-600 transition-all transform hover:scale-[1.02]"
          >
            <div className="flex items-center gap-4 mb-4">
              <FontAwesomeIcon icon={faFacebook} className="w-8 h-8" />
              <h2 className="text-xl font-semibold">Facebook Live</h2>
            </div>
            <p className="text-blue-100">Watch our services live on Facebook</p>
          </Link>
        </motion.div>

        {/* YouTube Live */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Link
            href="/dashboard/live/youtube"
            className="block p-6 bg-gradient-to-br from-red-600 to-red-700 rounded-2xl hover:from-red-500 hover:to-red-600 transition-all transform hover:scale-[1.02]"
          >
            <div className="flex items-center gap-4 mb-4">
              <FontAwesomeIcon icon={faYoutube} className="w-8 h-8" />
              <h2 className="text-xl font-semibold">YouTube Live</h2>
            </div>
            <p className="text-red-100">Watch our services live on YouTube</p>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
