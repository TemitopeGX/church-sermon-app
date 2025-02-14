"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUsers,
  faPlayCircle,
  faChartLine,
  faGlobe,
} from "@fortawesome/free-solid-svg-icons";

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState("7d");

  const stats = [
    {
      icon: faUsers,
      label: "Total Users",
      value: "0",
      change: "+0%",
      color: "text-blue-500",
    },
    {
      icon: faPlayCircle,
      label: "Sermon Plays",
      value: "0",
      change: "+0%",
      color: "text-green-500",
    },
    {
      icon: faChartLine,
      label: "Engagement Rate",
      value: "0%",
      change: "+0%",
      color: "text-purple-500",
    },
    {
      icon: faGlobe,
      label: "Live Viewers",
      value: "0",
      change: "+0%",
      color: "text-orange-500",
    },
  ];

  return (
    <div className="text-white">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-2xl font-bold">Analytics</h1>
        <p className="text-gray-400 mt-2">Track your church media metrics</p>
      </motion.div>

      {/* Time Range Selector */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="mb-8"
      >
        <div className="flex gap-2">
          {["7d", "30d", "90d", "1y"].map((range) => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              className={`px-4 py-2 rounded-lg transition-colors ${
                timeRange === range
                  ? "bg-blue-600 text-white"
                  : "bg-white/5 text-gray-400 hover:bg-white/10"
              }`}
            >
              {range}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Stats Grid */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
      >
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-white/5 rounded-2xl p-6 hover:bg-white/10 transition-colors"
          >
            <div className="flex items-center gap-4 mb-4">
              <FontAwesomeIcon
                icon={stat.icon}
                className={`w-8 h-8 ${stat.color}`}
              />
              <div>
                <p className="text-gray-400 text-sm">{stat.label}</p>
                <h3 className="text-2xl font-bold">{stat.value}</h3>
              </div>
            </div>
            <div className="text-sm">
              <span className="text-green-400">{stat.change}</span>
              <span className="text-gray-400 ml-2">vs last period</span>
            </div>
          </div>
        ))}
      </motion.div>

      {/* Charts Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="grid grid-cols-1 lg:grid-cols-2 gap-6"
      >
        {/* Placeholder for charts */}
        <div className="bg-white/5 rounded-2xl p-6 min-h-[400px] flex items-center justify-center">
          <p className="text-gray-400">Sermon Views Chart</p>
        </div>
        <div className="bg-white/5 rounded-2xl p-6 min-h-[400px] flex items-center justify-center">
          <p className="text-gray-400">User Growth Chart</p>
        </div>
      </motion.div>
    </div>
  );
}
