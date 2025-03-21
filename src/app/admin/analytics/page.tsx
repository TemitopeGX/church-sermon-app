"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  RiBarChartBoxLine,
  RiLineChartLine,
  RiPieChartLine,
  RiEyeLine,
  RiTimeLine,
  RiUserLine,
  RiPlayCircleLine,
  RiCalendarLine,
} from "react-icons/ri";

interface AnalyticsData {
  totalViews: number;
  totalWatchTime: number;
  totalUsers: number;
  totalSermons: number;
  recentViews: { date: string; views: number }[];
  popularSermons: {
    title: string;
    views: number;
    watchTime: number;
  }[];
  categoryDistribution: {
    category: string;
    count: number;
  }[];
}

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState<"7d" | "30d" | "90d">("30d");
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<AnalyticsData>({
    totalViews: 0,
    totalWatchTime: 0,
    totalUsers: 0,
    totalSermons: 0,
    recentViews: [],
    popularSermons: [],
    categoryDistribution: [],
  });

  useEffect(() => {
    fetchAnalytics();
  }, [timeRange]);

  async function fetchAnalytics() {
    setLoading(true);
    try {
      const response = await fetch(`/api/analytics?range=${timeRange}`);
      if (!response.ok) throw new Error("Failed to fetch analytics");
      const analyticsData = await response.json();
      setData(analyticsData);
    } catch (error) {
      console.error("Error fetching analytics:", error);
    } finally {
      setLoading(false);
    }
  }

  const StatCard = ({ icon: Icon, title, value, subtitle }: any) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10 rounded-2xl blur-xl"></div>
      <div className="relative bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
        <div className="flex items-center gap-4 mb-4">
          <div className="p-3 bg-blue-500/20 rounded-xl">
            <Icon className="w-6 h-6 text-blue-400" />
          </div>
          <div>
            <h3 className="text-gray-400 text-sm">{title}</h3>
            <p className="text-2xl font-bold text-white">{value}</p>
          </div>
        </div>
        <p className="text-gray-400 text-sm">{subtitle}</p>
      </div>
    </motion.div>
  );

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-3xl blur-3xl"></div>
        <div className="relative bg-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/10">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">Analytics</h1>
              <p className="text-gray-400">
                Track sermon engagement and growth
              </p>
            </div>
            <select
              value={timeRange}
              onChange={(e) =>
                setTimeRange(e.target.value as "7d" | "30d" | "90d")
              }
              className="px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-white appearance-none focus:outline-none focus:border-blue-500"
            >
              <option value="7d" className="bg-[#1a1a1a]">
                Last 7 days
              </option>
              <option value="30d" className="bg-[#1a1a1a]">
                Last 30 days
              </option>
              <option value="90d" className="bg-[#1a1a1a]">
                Last 90 days
              </option>
            </select>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          icon={RiEyeLine}
          title="Total Views"
          value={loading ? "..." : data.totalViews.toLocaleString()}
          subtitle="Across all sermons"
        />
        <StatCard
          icon={RiTimeLine}
          title="Watch Time"
          value={loading ? "..." : `${Math.round(data.totalWatchTime / 3600)}h`}
          subtitle="Total hours watched"
        />
        <StatCard
          icon={RiUserLine}
          title="Unique Viewers"
          value={loading ? "..." : data.totalUsers.toLocaleString()}
          subtitle="Individual users"
        />
        <StatCard
          icon={RiPlayCircleLine}
          title="Total Sermons"
          value={loading ? "..." : data.totalSermons.toLocaleString()}
          subtitle="Published content"
        />
      </div>

      {/* Charts and Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Views Trend */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="relative"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10 rounded-2xl blur-xl"></div>
          <div className="relative bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
            <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
              <RiLineChartLine className="w-5 h-5" />
              Views Trend
            </h2>

            <div className="h-[300px] flex items-end gap-2">
              {data.recentViews.map((day, index) => (
                <div key={day.date} className="flex-1 group relative">
                  <div
                    className="bg-blue-500/50 hover:bg-blue-500/75 transition-colors rounded-t"
                    style={{
                      height: `${
                        (day.views /
                          Math.max(...data.recentViews.map((d) => d.views))) *
                        100
                      }%`,
                    }}
                  />
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-white/10 backdrop-blur-xl rounded-lg px-2 py-1 text-xs text-white whitespace-nowrap">
                    {day.views.toLocaleString()} views
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Category Distribution */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="relative"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10 rounded-2xl blur-xl"></div>
          <div className="relative bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
            <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
              <RiPieChartLine className="w-5 h-5" />
              Category Distribution
            </h2>

            <div className="space-y-4">
              {data.categoryDistribution.map((category) => (
                <div key={category.category}>
                  <div className="flex items-center justify-between text-sm mb-2">
                    <span className="text-white">{category.category}</span>
                    <span className="text-gray-400">
                      {category.count} sermons
                    </span>
                  </div>
                  <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-blue-500 rounded-full"
                      style={{
                        width: `${(category.count / data.totalSermons) * 100}%`,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Popular Sermons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="relative lg:col-span-2"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10 rounded-2xl blur-xl"></div>
          <div className="relative bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
            <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
              <RiBarChartBoxLine className="w-5 h-5" />
              Popular Sermons
            </h2>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-left border-b border-white/10">
                    <th className="pb-4 text-gray-400 font-medium">Title</th>
                    <th className="pb-4 text-gray-400 font-medium">Views</th>
                    <th className="pb-4 text-gray-400 font-medium">
                      Watch Time
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10">
                  {data.popularSermons.map((sermon) => (
                    <tr key={sermon.title}>
                      <td className="py-4 text-white">{sermon.title}</td>
                      <td className="py-4 text-gray-400">
                        {sermon.views.toLocaleString()}
                      </td>
                      <td className="py-4 text-gray-400">
                        {Math.round(sermon.watchTime / 60)}m
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
