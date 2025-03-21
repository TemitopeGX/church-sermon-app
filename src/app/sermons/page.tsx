"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import {
  RiPlayFill,
  RiPauseFill,
  RiVolumeMuteFill,
  RiVolumeUpFill,
  RiCalendarLine,
  RiTimeLine,
} from "react-icons/ri";
import Image from "next/image";

interface Sermon {
  _id: string;
  title: string;
  description: string;
  thumbnailUrl: string;
  duration: number;
  createdAt: string;
  preacher: string;
  series: string;
  audioUrl: string;
}

export default function SermonsPage() {
  const [sermons, setSermons] = useState<Sermon[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentSermon, setCurrentSermon] = useState<Sermon | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

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

  const handlePlayPause = () => {
    if (!currentSermon) return;
    if (isPlaying) {
      audioRef.current?.pause();
    } else {
      audioRef.current?.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = Number(e.target.value);
    if (audioRef.current) {
      audioRef.current.currentTime = time;
      setCurrentTime(time);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    setVolume(value);
    if (audioRef.current) {
      audioRef.current.volume = value;
    }
    setIsMuted(value === 0);
  };

  const toggleMute = () => {
    if (audioRef.current) {
      if (isMuted) {
        audioRef.current.volume = volume;
        setIsMuted(false);
      } else {
        audioRef.current.volume = 0;
        setIsMuted(true);
      }
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative bg-[#5b2324] py-24">
        <div className="absolute inset-0 bg-[url('/images/pattern.png')] opacity-10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
            Sermons
          </h1>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">
            Listen to our latest sermons and get inspired by the Word of God
          </p>
        </div>
      </div>

      {/* Sermons Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {loading
            ? // Loading skeletons
              Array(6)
                .fill(null)
                .map((_, index) => (
                  <div key={index} className="animate-pulse">
                    <div className="bg-gray-200 aspect-video rounded-xl mb-4"></div>
                    <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                  </div>
                ))
            : // Actual sermons
              sermons.map((sermon) => (
                <motion.div
                  key={sermon._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="group"
                >
                  <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 border border-gray-100">
                    <div className="relative aspect-video">
                      {sermon.thumbnailUrl ? (
                        <Image
                          src={sermon.thumbnailUrl}
                          alt={sermon.title}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                          <span className="text-gray-400">No thumbnail</span>
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                      <button
                        onClick={() => {
                          setCurrentSermon(sermon);
                          setIsPlaying(true);
                        }}
                        className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <div className="w-16 h-16 rounded-full bg-[#5b2324] flex items-center justify-center transform group-hover:scale-110 transition-transform">
                          <RiPlayFill className="w-8 h-8 text-white" />
                        </div>
                      </button>
                    </div>
                    <div className="p-6">
                      <div className="mb-4">
                        <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">
                          {sermon.title}
                        </h3>
                        <p className="text-[#5b2324] font-semibold mb-2">
                          {sermon.preacher}
                        </p>
                        <p className="text-gray-600 text-sm line-clamp-2 mb-4">
                          {sermon.description}
                        </p>
                      </div>
                      <div className="flex items-center justify-between text-sm text-gray-500">
                        <span className="flex items-center">
                          <RiCalendarLine className="w-4 h-4 mr-1" />
                          {new Date(sermon.createdAt).toLocaleDateString()}
                        </span>
                        <span className="flex items-center">
                          <RiTimeLine className="w-4 h-4 mr-1" />
                          {formatTime(sermon.duration)}
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
        </div>
      </div>

      {/* Audio Player */}
      {currentSermon && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-2xl"
        >
          <div className="max-w-7xl mx-auto px-4 py-4">
            <div className="flex items-center gap-6">
              {/* Thumbnail */}
              <div className="w-16 h-16 rounded-lg overflow-hidden shadow-lg">
                <img
                  src={currentSermon.thumbnailUrl}
                  alt={currentSermon.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Info */}
              <div className="flex-1">
                <h4 className="font-bold text-gray-900">
                  {currentSermon.title}
                </h4>
                <p className="text-sm text-[#5b2324]">
                  {currentSermon.preacher}
                </p>
              </div>

              {/* Controls */}
              <div className="flex items-center gap-6">
                <button
                  onClick={handlePlayPause}
                  className="w-12 h-12 rounded-full bg-[#5b2324] hover:bg-[#4a1d1e] transition-colors flex items-center justify-center shadow-lg"
                >
                  {isPlaying ? (
                    <RiPauseFill className="w-6 h-6 text-white" />
                  ) : (
                    <RiPlayFill className="w-6 h-6 text-white" />
                  )}
                </button>
              </div>

              {/* Progress Bar */}
              <div className="flex-1 flex items-center gap-4">
                <span className="text-sm text-gray-600 font-medium">
                  {formatTime(currentTime)}
                </span>
                <div className="relative flex-1">
                  <input
                    type="range"
                    min={0}
                    max={duration}
                    value={currentTime}
                    onChange={handleSeek}
                    className="w-full h-1 bg-gray-200 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#5b2324] [&::-webkit-slider-runnable-track]:bg-[#5b2324]/20"
                  />
                  <div
                    className="absolute left-0 top-0 h-1 bg-[#5b2324] rounded-full pointer-events-none"
                    style={{ width: `${(currentTime / duration) * 100}%` }}
                  ></div>
                </div>
                <span className="text-sm text-gray-600 font-medium">
                  {formatTime(duration)}
                </span>
              </div>

              {/* Volume Control */}
              <div className="flex items-center gap-3">
                <button
                  onClick={toggleMute}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  {isMuted ? (
                    <RiVolumeMuteFill className="w-5 h-5 text-gray-600" />
                  ) : (
                    <RiVolumeUpFill className="w-5 h-5 text-gray-600" />
                  )}
                </button>
                <div className="relative w-24">
                  <input
                    type="range"
                    min={0}
                    max={1}
                    step={0.1}
                    value={isMuted ? 0 : volume}
                    onChange={handleVolumeChange}
                    className="w-full h-1 bg-gray-200 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#5b2324] [&::-webkit-slider-runnable-track]:bg-[#5b2324]/20"
                  />
                  <div
                    className="absolute left-0 top-0 h-1 bg-[#5b2324] rounded-full pointer-events-none"
                    style={{ width: `${(isMuted ? 0 : volume) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>

          {/* Hidden Audio Element */}
          <audio
            ref={audioRef}
            src={currentSermon.audioUrl}
            onTimeUpdate={handleTimeUpdate}
            onLoadedMetadata={handleLoadedMetadata}
            onEnded={() => setIsPlaying(false)}
            autoPlay
          />
        </motion.div>
      )}
    </div>
  );
}
