"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Sermon } from "@/types/sermon";
import SermonPlayer from "@/components/SermonPlayer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

export default function SermonPage({ params }: { params: { id: string } }) {
  const [sermon, setSermon] = useState<Sermon | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchSermon();
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
    // You could track user progress here
    // For example, save to database when they reach certain milestones
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#030014] flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error || !sermon) {
    return (
      <div className="min-h-screen bg-[#030014] p-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 text-red-400">
            {error || "Sermon not found"}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#030014] p-8">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-8"
          >
            <FontAwesomeIcon icon={faArrowLeft} className="w-4 h-4" />
            Back to Dashboard
          </Link>

          <div className="space-y-6">
            <div>
              <h1 className="text-2xl font-bold text-white">{sermon.title}</h1>
              <p className="text-gray-400 mt-2">By {sermon.preacher}</p>
            </div>

            <SermonPlayer
              audioUrl={sermon.audioUrl}
              title={sermon.title}
              onProgress={handleProgress}
            />

            <div className="bg-white/5 rounded-2xl p-6">
              <h2 className="text-lg font-semibold text-white mb-2">
                Description
              </h2>
              <p className="text-gray-400">{sermon.description}</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
