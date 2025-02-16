"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Sermon } from "@/types/sermon";
import SermonPlayer from "@/components/SermonPlayer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faHeart,
  faMusic,
  faShareAlt,
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import Image from "next/image";

export default function PlayerPage({ params }: { params: { id: string } }) {
  const [sermon, setSermon] = useState<Sermon | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    fetchSermon();
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const fetchSermon = async () => {
    try {
      const response = await fetch(`/api/sermons/${params.id}`);
      if (!response.ok) {
        throw new Error("Failed to fetch sermon");
      }
      const data = await response.json();
      setSermon(data);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleProgress = async (progress: number) => {
    try {
      // Only update progress if it's significant (e.g., every 10%)
      if (sermon && progress % 10 === 0) {
        await fetch(`/api/sermons/${sermon._id}/progress`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ progress }),
        });
      }
    } catch (error) {
      console.error("Error updating progress:", error);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#0f0f0f] flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error || !sermon) {
    return (
      <div className="min-h-screen bg-[#0f0f0f] p-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 text-red-400">
            {error || "Sermon not found"}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0f0f0f]">
      {isMobile ? (
        // Mobile View - Original Design
        <div className="p-4">
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-4"
          >
            <FontAwesomeIcon icon={faArrowLeft} className="w-4 h-4" />
            Back to Dashboard
          </Link>

          <div className="relative aspect-square rounded-lg overflow-hidden mb-6">
            {sermon.thumbnailUrl ? (
              <Image
                src={sermon.thumbnailUrl}
                alt={sermon.title}
                fill
                className="object-cover"
                unoptimized
              />
            ) : (
              <div className="w-full h-full bg-neutral-800 flex items-center justify-center">
                <FontAwesomeIcon
                  icon={faMusic}
                  className="w-12 h-12 text-neutral-600"
                />
              </div>
            )}
          </div>

          <div className="mb-6">
            <h1 className="text-xl font-bold text-white mb-2">
              {sermon.title}
            </h1>
            <p className="text-gray-400 text-sm">{sermon.preacher}</p>
          </div>

          <SermonPlayer
            audioUrl={sermon.audioUrl}
            title={sermon.title}
            preacher={sermon.preacher}
            description={sermon.description}
            thumbnailUrl={sermon.thumbnailUrl}
            onProgress={handleProgress}
          />
        </div>
      ) : (
        // Desktop View - New Design
        <div className="max-w-[1400px] mx-auto p-6">
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-6"
          >
            <FontAwesomeIcon icon={faArrowLeft} className="w-4 h-4" />
            Back to Dashboard
          </Link>

          <div className="grid lg:grid-cols-[minmax(0,1fr),400px] gap-8">
            {/* Left Column - Large Thumbnail - Adjusted size */}
            <div className="relative w-full max-w-2xl mx-auto aspect-[4/3] rounded-2xl overflow-hidden bg-gradient-to-br from-amber-500 to-amber-300">
              {sermon.thumbnailUrl ? (
                <Image
                  src={sermon.thumbnailUrl}
                  alt={sermon.title}
                  fill
                  className="object-cover"
                  unoptimized
                  priority
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <span className="text-4xl font-bold text-white/20 rotate-[-45deg]">
                    Thumbnail image
                  </span>
                </div>
              )}
            </div>

            {/* Right Column - Player Controller - More compact */}
            <div className="flex flex-col">
              {/* Title Section */}
              <div className="mb-4">
                <h1 className="text-2xl font-bold text-white mb-1">
                  {sermon.title}
                </h1>
                <p className="text-gray-400 text-sm">{sermon.preacher}</p>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2 mb-4">
                <button className="px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors text-white text-sm font-medium">
                  <FontAwesomeIcon icon={faHeart} className="w-4 h-4 mr-2" />
                  Like
                </button>
                <button className="px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors text-white text-sm font-medium">
                  <FontAwesomeIcon icon={faShareAlt} className="w-4 h-4 mr-2" />
                  Share
                </button>
              </div>

              {/* Description */}
              <div className="mb-4">
                <p className="text-gray-400 text-sm line-clamp-2">
                  {sermon.description}
                </p>
              </div>

              {/* Player */}
              <SermonPlayer
                audioUrl={sermon.audioUrl}
                title={sermon.title}
                preacher={sermon.preacher}
                description={sermon.description}
                thumbnailUrl={sermon.thumbnailUrl}
                onProgress={handleProgress}
              />

              {/* Recent Uploads */}
              <div className="mt-4">
                <h2 className="text-white font-bold text-sm mb-3">
                  Three Recent Upload
                </h2>
                <div className="grid grid-cols-3 gap-3">
                  {[1, 2, 3].map((_, index) => (
                    <div
                      key={index}
                      className="aspect-square bg-red-500 first:bg-red-500 even:bg-yellow-500 last:bg-blue-900 rounded-lg hover:opacity-80 transition-opacity cursor-pointer"
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
