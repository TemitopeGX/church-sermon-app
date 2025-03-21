"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  RiSearchLine,
  RiFilter3Line,
  RiPlayCircleLine,
  RiEditLine,
  RiDeleteBinLine,
  RiCalendarLine,
  RiTimeLine,
  RiEyeLine,
} from "react-icons/ri";

interface Sermon {
  _id: string;
  title: string;
  description: string;
  videoUrl: string;
  thumbnailUrl: string;
  duration: number;
  views?: number;
  createdAt: string;
  category: string;
  preacher: string;
}

export default function SermonsPage() {
  const [sermons, setSermons] = useState<Sermon[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("newest");

  useEffect(() => {
    fetchSermons();
  }, []);

  async function fetchSermons() {
    try {
      const response = await fetch("/api/sermons");
      if (!response.ok) throw new Error("Failed to fetch sermons");
      const data = await response.json();
      setSermons(data);
    } catch (error) {
      console.error("Error fetching sermons:", error);
    } finally {
      setLoading(false);
    }
  }

  const categories = [
    "all",
    "sunday service",
    "bible study",
    "prayer meeting",
    "special service",
  ];

  const filteredSermons = sermons
    .filter(
      (sermon) =>
        (selectedCategory === "all" || sermon.category === selectedCategory) &&
        (sermon.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          sermon.preacher.toLowerCase().includes(searchQuery.toLowerCase()))
    )
    .sort((a, b) => {
      if (sortBy === "newest")
        return (
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      if (sortBy === "oldest")
        return (
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        );
      if (sortBy === "most-viewed") return (b.views || 0) - (a.views || 0);
      return 0;
    });

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-3xl blur-3xl"></div>
        <div className="relative bg-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/10">
          <h1 className="text-3xl font-bold text-white mb-2">Sermons</h1>
          <p className="text-gray-400">
            Manage and organize your sermon content
          </p>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="relative">
          <RiSearchLine className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search sermons..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
          />
        </div>

        <div className="relative">
          <RiFilter3Line className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-xl text-white appearance-none focus:outline-none focus:border-blue-500"
          >
            {categories.map((category) => (
              <option key={category} value={category} className="bg-[#1a1a1a]">
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </option>
            ))}
          </select>
        </div>

        <div className="relative">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-white appearance-none focus:outline-none focus:border-blue-500"
          >
            <option value="newest" className="bg-[#1a1a1a]">
              Newest First
            </option>
            <option value="oldest" className="bg-[#1a1a1a]">
              Oldest First
            </option>
            <option value="most-viewed" className="bg-[#1a1a1a]">
              Most Viewed
            </option>
          </select>
        </div>

        <button className="px-6 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl transition-colors">
          Add New Sermon
        </button>
      </div>

      {/* Sermons Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading
          ? Array(6)
              .fill(0)
              .map((_, index) => (
                <motion.div
                  key={`skeleton-${index}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="animate-pulse"
                >
                  <div className="aspect-video bg-white/5 rounded-xl mb-4"></div>
                  <div className="h-4 bg-white/5 rounded w-3/4 mb-2"></div>
                  <div className="h-4 bg-white/5 rounded w-1/2"></div>
                </motion.div>
              ))
          : filteredSermons.map((sermon) => (
              <motion.div
                key={`sermon-${sermon._id}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="group relative bg-white/5 rounded-xl overflow-hidden"
              >
                <div className="aspect-video relative">
                  <img
                    src={sermon.thumbnailUrl}
                    alt={sermon.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                    <button className="p-2 bg-blue-600 rounded-full hover:bg-blue-500 transition-colors">
                      <RiPlayCircleLine className="w-6 h-6 text-white" />
                    </button>
                    <button className="p-2 bg-green-600 rounded-full hover:bg-green-500 transition-colors">
                      <RiEditLine className="w-6 h-6 text-white" />
                    </button>
                    <button className="p-2 bg-red-600 rounded-full hover:bg-red-500 transition-colors">
                      <RiDeleteBinLine className="w-6 h-6 text-white" />
                    </button>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-white mb-2">
                    {sermon.title}
                  </h3>
                  <p className="text-gray-400 text-sm mb-4">
                    {sermon.preacher}
                  </p>
                  <div className="flex items-center justify-between text-sm text-gray-400">
                    <div className="flex items-center gap-2">
                      <RiCalendarLine className="w-4 h-4" />
                      {new Date(sermon.createdAt).toLocaleDateString()}
                    </div>
                    <div className="flex items-center gap-2">
                      <RiTimeLine className="w-4 h-4" />
                      {Math.floor(sermon.duration / 60)}:
                      {(sermon.duration % 60).toString().padStart(2, "0")}
                    </div>
                    <div className="flex items-center gap-2">
                      <RiEyeLine className="w-4 h-4" />
                      {(sermon.views || 0).toLocaleString()}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
      </div>
    </div>
  );
}
