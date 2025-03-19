"use client";

import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import FacebookPlayer from "@/components/FacebookPlayer";

export default function FacebookLivePage() {
  return (
    <div className="text-white min-h-[calc(100vh-6rem)]">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6"
      >
        <Link
          href="/dashboard/live"
          className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 mb-4"
        >
          <FontAwesomeIcon icon={faArrowLeft} className="w-4 h-4" />
          Back to Live Streams
        </Link>
        <h1 className="text-2xl font-bold">Facebook Live</h1>
      </motion.div>

      {/* Video Player */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="max-w-5xl mx-auto"
      >
        <FacebookPlayer
          videoUrl={process.env.NEXT_PUBLIC_FACEBOOK_LIVE_URL || ""}
        />
      </motion.div>

      {/* Stream Info */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="mt-6 max-w-5xl mx-auto"
      >
        <h2 className="text-xl font-semibold mb-2">Live Service</h2>
        <p className="text-gray-400">
          Join us for our live service streaming on Facebook.
        </p>
      </motion.div>
    </div>
  );
}
