"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="text-white">
      {/* Search Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="relative">
          <FontAwesomeIcon
            icon={faSearch}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5"
          />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search sermons, series, or preachers"
            className="w-full pl-12 pr-4 py-3 bg-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-gray-400"
          />
        </div>
      </motion.div>

      {/* Recent Searches */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <h2 className="text-xl font-bold mb-4">Recent Searches</h2>
        <div className="grid gap-2">
          {/* Sample recent searches */}
          <button className="text-left px-4 py-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors">
            Faith and Patience
          </button>
          <button className="text-left px-4 py-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors">
            Prayer Series
          </button>
        </div>
      </motion.div>
    </div>
  );
}
