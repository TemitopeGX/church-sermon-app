"use client";

import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlayCircle,
  faUsers,
  faChartLine,
  faCloudUpload,
  faVideo,
  faCalendarPlus,
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

export default function AdminDashboardPage() {
  const stats = [
    {
      icon: faPlayCircle,
      label: "Total Sermons",
      value: "0",
      change: "New",
      color: "text-blue-500",
    },
    {
      icon: faUsers,
      label: "Active Users",
      value: "0",
      change: "New",
      color: "text-green-500",
    },
    {
      icon: faChartLine,
      label: "Total Views",
      value: "0",
      change: "New",
      color: "text-purple-500",
    },
  ];

  const recentSermons: {
    title: string;
    date: string;
    views: number;
    duration: string;
  }[] = [];

  const quickActions = [
    {
      icon: faCloudUpload,
      label: "Upload Sermon",
      href: "/admin/upload",
      color: "bg-blue-600 hover:bg-blue-700",
    },
    {
      icon: faVideo,
      label: "Start Live Stream",
      href: "/admin/live",
      color: "bg-purple-600 hover:bg-purple-700",
    },
    {
      icon: faCalendarPlus,
      label: "Schedule Service",
      href: "/admin/schedule",
      color: "bg-green-600 hover:bg-green-700",
    },
  ];

  return (
    <div className="text-white">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <p className="text-gray-400 mt-2">Welcome to Covenant Media Admin</p>
      </motion.div>

      {/* Stats Grid */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
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
              <span className="text-blue-400">{stat.change}</span>
            </div>
          </div>
        ))}
      </motion.div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="mb-8"
      >
        <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {quickActions.map((action, index) => (
            <Link
              key={index}
              href={action.href}
              className={`${action.color} p-4 rounded-xl flex items-center gap-3 transition-colors`}
            >
              <FontAwesomeIcon icon={action.icon} className="w-5 h-5" />
              {action.label}
            </Link>
          ))}
        </div>
      </motion.div>

      {/* Recent Sermons */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <h2 className="text-xl font-semibold mb-4">Recent Sermons</h2>
        {recentSermons.length > 0 ? (
          <div className="bg-white/5 rounded-2xl overflow-hidden">
            <table className="w-full">
              <thead className="bg-white/5">
                <tr>
                  <th className="text-left p-4 text-gray-400">Title</th>
                  <th className="text-left p-4 text-gray-400">Date</th>
                  <th className="text-left p-4 text-gray-400">Views</th>
                  <th className="text-left p-4 text-gray-400">Duration</th>
                </tr>
              </thead>
              <tbody>
                {recentSermons.map((sermon, index) => (
                  <tr
                    key={index}
                    className="border-t border-white/5 hover:bg-white/5 transition-colors"
                  >
                    <td className="p-4">{sermon.title}</td>
                    <td className="p-4 text-gray-400">{sermon.date}</td>
                    <td className="p-4 text-gray-400">{sermon.views}</td>
                    <td className="p-4 text-gray-400">{sermon.duration}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="bg-white/5 rounded-2xl p-8 text-center">
            <p className="text-gray-400">No sermons uploaded yet</p>
            <Link
              href="/admin/upload"
              className="inline-block mt-4 px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
            >
              Upload Your First Sermon
            </Link>
          </div>
        )}
      </motion.div>
    </div>
  );
}
