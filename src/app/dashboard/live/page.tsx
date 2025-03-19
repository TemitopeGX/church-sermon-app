"use client";

import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faYoutube } from "@fortawesome/free-brands-svg-icons";

export default function LivePage() {
  // Update the Facebook URL to the correct one
  const facebookUrl =
    "https://www.facebook.com/plugins/video.php?href=https%3A%2F%2Ffb.watch%2FxNg1k-v9Yr%2F&show_text=false";

  return (
    <div className="min-h-screen bg-gradient-to-b from-neutral-900 via-[#121212] to-black p-4 lg:p-8">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-2xl lg:text-3xl font-bold text-white">
            Live Service
          </h1>
          <p className="text-gray-400 mt-2">Watch our live service</p>
        </motion.div>

        <div className="aspect-video w-full bg-black rounded-2xl overflow-hidden shadow-2xl">
          <iframe
            src={facebookUrl}
            className="w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>

        <div className="mt-8 flex gap-4">
          <a
            href="https://www.facebook.com/covenantchapelgh"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
          >
            <FontAwesomeIcon icon={faFacebook} className="w-5 h-5" />
            Watch on Facebook
          </a>

          <a
            href="https://www.youtube.com/@covenantchapelgh"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
          >
            <FontAwesomeIcon icon={faYoutube} className="w-5 h-5" />
            Watch on YouTube
          </a>
        </div>
      </div>
    </div>
  );
}
