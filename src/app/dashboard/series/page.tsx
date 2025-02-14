"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Sermon } from "@/types/sermon";
import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlay,
  faMusic,
  faArrowLeft,
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

export default function SeriesPage() {
  const [sermons, setSermons] = useState<Sermon[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    fetchSermons();
  }, []);

  const fetchSermons = async () => {
    try {
      const response = await fetch("/api/sermons");
      if (!response.ok) {
        throw new Error("Failed to fetch sermons");
      }
      const data = await response.json();
      setSermons(data);
    } catch (error: any) {
      console.error("Error fetching sermons:", error);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSermonClick = (sermon: Sermon) => {
    router.push(`/player/${sermon._id}`);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-neutral-900 to-black flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-neutral-900 via-[#121212] to-black px-4 py-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-4"
          >
            <FontAwesomeIcon icon={faArrowLeft} className="w-4 h-4" />
            Back to Dashboard
          </Link>
          <h1 className="text-3xl font-bold text-white">All Sermons</h1>
        </div>

        {/* Sermons Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sermons.map((sermon) => (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              key={sermon._id}
              className="group relative bg-neutral-800/50 rounded-xl p-5 hover:bg-neutral-800 transition-all duration-300 cursor-pointer transform hover:scale-105 hover:shadow-2xl"
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
      </div>
    </div>
  );
}
