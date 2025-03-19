"use client";

import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart,
  faHistory,
  faBookmark,
} from "@fortawesome/free-solid-svg-icons";

export default function LibraryPage() {
  return (
    <div className="text-white">
      {/* Library Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-2xl font-bold">Your Library</h1>
      </motion.div>

      {/* Library Sections */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="grid gap-4"
      >
        {/* Favorites */}
        <div className="p-4 bg-white/5 rounded-lg">
          <div className="flex items-center gap-4 mb-4">
            <FontAwesomeIcon icon={faHeart} className="w-5 h-5 text-red-500" />
            <h2 className="text-lg font-semibold">Favorites</h2>
          </div>
          <p className="text-gray-400">Your favorite sermons and series</p>
        </div>

        {/* Recently Played */}
        <div className="p-4 bg-white/5 rounded-lg">
          <div className="flex items-center gap-4 mb-4">
            <FontAwesomeIcon
              icon={faHistory}
              className="w-5 h-5 text-blue-500"
            />
            <h2 className="text-lg font-semibold">Recently Played</h2>
          </div>
          <p className="text-gray-400">Sermons you've listened to recently</p>
        </div>

        {/* Saved Series */}
        <div className="p-4 bg-white/5 rounded-lg">
          <div className="flex items-center gap-4 mb-4">
            <FontAwesomeIcon
              icon={faBookmark}
              className="w-5 h-5 text-purple-500"
            />
            <h2 className="text-lg font-semibold">Saved Series</h2>
          </div>
          <p className="text-gray-400">Series you're following</p>
        </div>
      </motion.div>
    </div>
  );
}
