"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Sermon } from "@/types/sermon";
import { useRouter } from "next/navigation";
import MobilePlayer from "@/components/MobilePlayer";

export default function DashboardPage() {
  const [sermons, setSermons] = useState<Sermon[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const router = useRouter();
  const [selectedSermon, setSelectedSermon] = useState<Sermon | null>(null);
  const [isPlayerOpen, setIsPlayerOpen] = useState(false);

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
    <div className="px-4">
      {/* Welcome Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-2xl font-bold text-white mb-2">Latest Sermons</h1>
        <p className="text-gray-400">Listen to our most recent messages</p>
      </motion.div>

      {error && (
        <div className="p-4 mb-6 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400">
          {error}
        </div>
      )}

      {/* Sermons Grid */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {isLoading ? (
          <div className="col-span-3 text-center py-12">
            <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
          </div>
        ) : sermons.length > 0 ? (
          sermons.map((sermon) => (
            <div
              key={sermon._id}
              className="bg-white/5 rounded-2xl overflow-hidden hover:bg-white/10 transition-colors"
            >
              <div className="relative h-48">
                {sermon.thumbnailUrl ? (
                  <Image
                    src={sermon.thumbnailUrl}
                    alt={sermon.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    unoptimized
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = "/fallback-image.jpg";
                    }}
                  />
                ) : (
                  <div className="h-48 w-full bg-blue-600/20 flex items-center justify-center">
                    <span className="text-blue-500">No Thumbnail</span>
                  </div>
                )}
              </div>
              <div className="p-6">
                <h3 className="text-lg font-semibold text-white mb-2">
                  {sermon.title}
                </h3>
                <p className="text-gray-400 text-sm mb-4">
                  {sermon.preacher} •{" "}
                  {new Date(sermon.date).toLocaleDateString()}
                </p>
                <Link
                  href={`/sermons/${sermon._id}`}
                  className="w-full inline-block text-center py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                >
                  Listen Now
                </Link>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-3 text-center py-12 bg-white/5 rounded-2xl">
            <p className="text-gray-400">No sermons available</p>
          </div>
        )}
      </motion.div>

      {/* Featured Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="mt-12"
      >
        <h2 className="text-xl font-bold text-white mb-6">Featured Series</h2>
        <div className="bg-white/5 rounded-2xl p-6">
          <h3 className="text-lg font-semibold text-white mb-2">
            Foundations of Faith
          </h3>
          <p className="text-gray-400">
            A comprehensive study on building strong spiritual foundations.
          </p>
        </div>
      </motion.div>

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
