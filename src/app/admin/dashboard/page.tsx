"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  RiVideoLine,
  RiEyeLine,
  RiUserLine,
  RiTimeLine,
  RiArrowUpLine,
  RiArrowDownLine,
  RiPlayCircleLine,
  RiCalendarLine,
} from "react-icons/ri";

interface DashboardStats {
  sermonsCount: number;
  totalViews: number;
  activeUsers: number;
  totalWatchTime: number;
}

interface Sermon {
  _id: string;
  title: string;
  createdAt: string;
  views: number;
  duration: number;
}

export default function Dashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [recentSermons, setRecentSermons] = useState<Sermon[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchDashboardData() {
      try {
        const response = await fetch("/api/stats");
        if (!response.ok) throw new Error("Failed to fetch dashboard data");
        const data = await response.json();
        setStats(data.stats);
        setRecentSermons(data.recentSermons);
      } catch (err) {
        setError("Failed to load dashboard data");
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#030014] to-[#1a1a1a]">
        <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#030014] to-[#1a1a1a]">
        <div className="bg-red-500/10 backdrop-blur-xl rounded-2xl p-6 border border-red-500/20">
          <p className="text-red-400">{error}</p>
        </div>
      </div>
    );
  }

  const statCards = [
    {
      name: "Total Sermons",
      value: stats?.sermonsCount || 0,
      icon: RiVideoLine,
      change: "+12%",
      isIncrease: true,
    },
    {
      name: "Total Views",
      value: stats?.totalViews || 0,
      icon: RiEyeLine,
      change: "+18%",
      isIncrease: true,
    },
    {
      name: "Active Users",
      value: stats?.activeUsers || 0,
      icon: RiUserLine,
      change: "+8%",
      isIncrease: true,
    },
    {
      name: "Watch Time (hrs)",
      value: stats?.totalWatchTime || 0,
      icon: RiTimeLine,
      change: "+25%",
      isIncrease: true,
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-3xl blur-3xl"></div>
        <div className="relative bg-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/10">
          <h1 className="text-3xl font-bold text-white mb-2">
            Welcome to Admin Dashboard
          </h1>
          <p className="text-gray-400">
            Monitor and manage your church's digital presence
          </p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, index) => (
          <motion.div
            key={stat.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="relative group"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10 rounded-2xl blur-xl group-hover:blur-2xl transition-all"></div>
            <div className="relative bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10 group-hover:border-white/20 transition-colors">
              <div className="flex items-center justify-between">
                <div className="p-3 bg-white/10 rounded-xl group-hover:bg-white/15 transition-colors">
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
                <div
                  className={`flex items-center gap-1 text-sm ${
                    stat.isIncrease ? "text-green-400" : "text-red-400"
                  }`}
                >
                  {stat.isIncrease ? (
                    <RiArrowUpLine className="w-4 h-4" />
                  ) : (
                    <RiArrowDownLine className="w-4 h-4" />
                  )}
                  {stat.change}
                </div>
              </div>
              <div className="mt-4">
                <h3 className="text-gray-400 text-sm">{stat.name}</h3>
                <p className="text-2xl font-bold text-white mt-1">
                  {stat.value.toLocaleString()}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Recent Sermons */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10 rounded-2xl blur-xl"></div>
        <div className="relative bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
          <h2 className="text-xl font-bold text-white mb-6">Recent Sermons</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-gray-400 text-sm border-b border-white/10">
                  <th className="text-left py-3 px-4">Title</th>
                  <th className="text-left py-3 px-4">Date</th>
                  <th className="text-left py-3 px-4">Views</th>
                  <th className="text-left py-3 px-4">Duration</th>
                </tr>
              </thead>
              <tbody>
                {recentSermons.map((sermon, index) => (
                  <motion.tr
                    key={sermon._id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="text-white border-b border-white/5 hover:bg-white/5 transition-colors"
                  >
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-3">
                        <RiPlayCircleLine className="w-5 h-5 text-blue-500" />
                        <span className="font-medium">{sermon.title}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2 text-gray-400">
                        <RiCalendarLine className="w-4 h-4" />
                        {new Date(sermon.createdAt).toLocaleDateString()}
                      </div>
                    </td>
                    <td className="py-4 px-4 text-gray-400">
                      {sermon.views.toLocaleString()}
                    </td>
                    <td className="py-4 px-4 text-gray-400">
                      {Math.floor(sermon.duration / 60)}:
                      {(sermon.duration % 60).toString().padStart(2, "0")}
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
