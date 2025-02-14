"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Sermon } from "@/types/sermon";
import { useRouter } from "next/navigation";
import MobilePlayer from "@/components/MobilePlayer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faPlay,
  faHeart,
  faHistory,
  faFire,
  faMusic,
  faHome,
  faCompass,
  faBookmark,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";

export default function DashboardPage() {
  const [sermons, setSermons] = useState<Sermon[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredSermons, setFilteredSermons] = useState<Sermon[]>([]);
  const router = useRouter();
  const [selectedSermon, setSelectedSermon] = useState<Sermon | null>(null);
  const [isPlayerOpen, setIsPlayerOpen] = useState(false);

  useEffect(() => {
    fetchSermons();
  }, []);

  useEffect(() => {
    if (!searchQuery.trim()) {
      setFilteredSermons(sermons);
      return;
    }

    const query = searchQuery.toLowerCase();
    const filtered = sermons.filter(
      (sermon) =>
        sermon.title.toLowerCase().includes(query) ||
        sermon.preacher.toLowerCase().includes(query) ||
        sermon.description?.toLowerCase().includes(query)
    );
    setFilteredSermons(filtered);
  }, [searchQuery, sermons]);

  const fetchSermons = async () => {
    try {
      const response = await fetch("/api/sermons");
      if (!response.ok) {
        throw new Error("Failed to fetch sermons");
      }
      const data = await response.json();
      setSermons(data);
      setFilteredSermons(data);
    } catch (error: any) {
      console.error("Error fetching sermons:", error);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSermonClick = (sermon: Sermon) => {
    if (window.innerWidth >= 1024) {
      // Desktop - Navigate to player page
      router.push(`/player/${sermon._id}`);
    } else {
      // Mobile - Open player sheet
      setSelectedSermon(sermon);
      setIsPlayerOpen(true);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-neutral-900 via-[#121212] to-black px-4 py-6">
      {/* Header Section */}
      <div className="max-w-7xl mx-auto mb-12">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-8">
            <h1 className="text-3xl font-bold text-white">Good Evening</h1>
            <div className="hidden lg:flex items-center gap-4">
              <button className="px-4 py-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors">
                Latest
              </button>
              <button className="px-4 py-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors">
                Popular
              </button>
              <button className="px-4 py-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors">
                Categories
              </button>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button className="text-gray-400 hover:text-white transition-colors">
              <FontAwesomeIcon icon={faHeart} className="w-5 h-5" />
            </button>
            <button className="text-gray-400 hover:text-white transition-colors">
              <FontAwesomeIcon icon={faHistory} className="w-5 h-5" />
            </button>
            <div className="hidden lg:block h-8 w-px bg-white/10" />
            <button className="hidden lg:flex items-center gap-2 px-4 py-2 rounded-full bg-blue-600 text-white hover:bg-blue-500 transition-colors">
              <FontAwesomeIcon icon={faPlus} className="w-4 h-4" />
              <span>Add Sermon</span>
            </button>
          </div>
        </div>

        {/* Search Bar with functionality */}
        <div className="relative max-w-xl">
          <FontAwesomeIcon
            icon={faSearch}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4"
          />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search sermons, preachers..."
            className="w-full bg-white/10 text-white pl-12 pr-4 py-3.5 rounded-full focus:outline-none focus:bg-white/20 transition-colors text-sm"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
            >
              ×
            </button>
          )}
        </div>

        {/* Search Results Count */}
        {searchQuery && (
          <div className="mt-4 text-gray-400 text-sm">
            Found {filteredSermons.length} result
            {filteredSermons.length !== 1 ? "s" : ""}
          </div>
        )}
      </div>

      {/* Conditional Rendering based on Search */}
      {searchQuery ? (
        // Search Results
        <section className="max-w-7xl mx-auto mb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredSermons.map((sermon) => (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ y: -5 }}
                key={sermon._id}
                className="group relative bg-neutral-800/50 rounded-xl p-5 hover:bg-neutral-800 transition-all duration-300 cursor-pointer hover:shadow-2xl hover:shadow-blue-500/10"
                onClick={() => handleSermonClick(sermon)}
              >
                <div className="relative aspect-[4/3] rounded-lg overflow-hidden mb-5 shadow-lg">
                  {sermon.thumbnailUrl ? (
                    <Image
                      src={sermon.thumbnailUrl}
                      alt={sermon.title}
                      fill
                      className="object-cover transform group-hover:scale-110 transition-transform duration-500"
                      unoptimized
                    />
                  ) : (
                    <div className="w-full h-full bg-neutral-700 flex items-center justify-center">
                      <FontAwesomeIcon
                        icon={faMusic}
                        className="w-12 h-12 text-neutral-500"
                      />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <button className="absolute right-4 bottom-4 w-14 h-14 bg-blue-600 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 shadow-xl hover:scale-110 hover:bg-blue-500">
                    <FontAwesomeIcon
                      icon={faPlay}
                      className="w-6 h-6 text-white ml-1"
                    />
                  </button>
                </div>
                <div className="space-y-2">
                  <h3 className="text-white font-semibold text-xl line-clamp-1 group-hover:text-blue-500 transition-colors">
                    {sermon.title}
                  </h3>
                  <p className="text-gray-400 text-base line-clamp-2">
                    by {sermon.preacher}
                  </p>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <span>{new Date(sermon.date).toLocaleDateString()}</span>
                    <span>•</span>
                    <span>{sermon.duration}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      ) : (
        // Regular Content
        <>
          {/* Recent Sermons (formerly Trending Now) - with larger cards */}
          <section className="max-w-7xl mx-auto mb-12">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <FontAwesomeIcon
                  icon={faMusic}
                  className="w-5 h-5 text-blue-600"
                />
                <h2 className="text-xl font-bold text-white">Recent Sermons</h2>
              </div>
              <Link
                href="/dashboard/series"
                className="text-sm text-gray-400 hover:text-white transition-colors"
              >
                See All
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredSermons.slice(0, 3).map((sermon) => (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  whileHover={{ y: -5 }}
                  key={sermon._id}
                  className="group relative bg-neutral-800/50 rounded-xl p-5 hover:bg-neutral-800 transition-all duration-300 cursor-pointer hover:shadow-2xl hover:shadow-blue-500/10"
                  onClick={() => handleSermonClick(sermon)}
                >
                  <div className="relative aspect-[4/3] rounded-lg overflow-hidden mb-5 shadow-lg">
                    {sermon.thumbnailUrl ? (
                      <Image
                        src={sermon.thumbnailUrl}
                        alt={sermon.title}
                        fill
                        className="object-cover transform group-hover:scale-110 transition-transform duration-500"
                        unoptimized
                      />
                    ) : (
                      <div className="w-full h-full bg-neutral-700 flex items-center justify-center">
                        <FontAwesomeIcon
                          icon={faMusic}
                          className="w-12 h-12 text-neutral-500"
                        />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <button className="absolute right-4 bottom-4 w-14 h-14 bg-blue-600 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 shadow-xl hover:scale-110 hover:bg-blue-500">
                      <FontAwesomeIcon
                        icon={faPlay}
                        className="w-6 h-6 text-white ml-1"
                      />
                    </button>
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-white font-semibold text-xl line-clamp-1 group-hover:text-blue-500 transition-colors">
                      {sermon.title}
                    </h3>
                    <p className="text-gray-400 text-base line-clamp-2">
                      by {sermon.preacher}
                    </p>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <span>{new Date(sermon.date).toLocaleDateString()}</span>
                      <span>•</span>
                      <span>{sermon.duration}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>

          {/* Recently Played with smaller cards */}
          <section className="max-w-7xl mx-auto mb-12">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <FontAwesomeIcon
                  icon={faHistory}
                  className="w-5 h-5 text-blue-500"
                />
                <h2 className="text-xl font-bold text-white">
                  Recently Played
                </h2>
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {filteredSermons.slice(3, 9).map((sermon) => (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  whileHover={{ scale: 1.05 }}
                  key={sermon._id}
                  className="group bg-neutral-800/50 rounded-lg p-3 hover:bg-neutral-800 transition-all duration-300 cursor-pointer hover:shadow-lg hover:shadow-blue-500/10"
                  onClick={() => handleSermonClick(sermon)}
                >
                  <div className="relative aspect-square rounded-md overflow-hidden mb-3 shadow-md">
                    {sermon.thumbnailUrl ? (
                      <Image
                        src={sermon.thumbnailUrl}
                        alt={sermon.title}
                        fill
                        className="object-cover transform group-hover:scale-110 transition-transform duration-500"
                        unoptimized
                      />
                    ) : (
                      <div className="w-full h-full bg-neutral-700 flex items-center justify-center">
                        <FontAwesomeIcon
                          icon={faMusic}
                          className="w-6 h-6 text-neutral-500"
                        />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <button className="absolute inset-0 w-full h-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <FontAwesomeIcon
                        icon={faPlay}
                        className="w-8 h-8 text-white transform scale-0 group-hover:scale-100 transition-transform duration-300"
                      />
                    </button>
                  </div>
                  <h3 className="text-white text-sm font-medium line-clamp-1 group-hover:text-blue-500 transition-colors">
                    {sermon.title}
                  </h3>
                </motion.div>
              ))}
            </div>
          </section>

          {/* All Sermons */}
          <section>
            <h2 className="text-xl font-bold text-white mb-4">All Sermons</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
              {filteredSermons.map((sermon) => (
                <div
                  key={sermon._id}
                  className="group bg-neutral-800/50 rounded-lg p-3 hover:bg-neutral-800 transition-colors cursor-pointer"
                  onClick={() => handleSermonClick(sermon)}
                >
                  <div className="relative aspect-square rounded-md overflow-hidden mb-3">
                    {sermon.thumbnailUrl ? (
                      <Image
                        src={sermon.thumbnailUrl}
                        alt={sermon.title}
                        fill
                        className="object-cover"
                        unoptimized
                      />
                    ) : (
                      <div className="w-full h-full bg-neutral-700 flex items-center justify-center">
                        <span className="text-neutral-400">No Thumbnail</span>
                      </div>
                    )}
                  </div>
                  <h3 className="text-white text-sm font-medium line-clamp-1">
                    {sermon.title}
                  </h3>
                  <p className="text-gray-400 text-xs line-clamp-1">
                    {sermon.preacher}
                  </p>
                </div>
              ))}
            </div>
          </section>
        </>
      )}

      {/* Mobile Player */}
      {selectedSermon && (
        <MobilePlayer
          sermon={selectedSermon}
          isOpen={isPlayerOpen}
          onClose={() => setIsPlayerOpen(false)}
          onProgress={async (progress) => {
            // Track progress here
          }}
        />
      )}
    </div>
  );
}
