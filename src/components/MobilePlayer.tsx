"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlay,
  faPause,
  faChevronDown,
  faBackward,
  faForward,
  faHeart,
  faShareAlt,
  faEllipsisH,
} from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import { Sermon } from "@/types/sermon";

interface MobilePlayerProps {
  sermon: Sermon;
  isOpen: boolean;
  onClose: () => void;
  onProgress?: (progress: number) => void;
}

export default function MobilePlayer({
  sermon,
  isOpen,
  onClose,
  onProgress,
}: MobilePlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
      const progressPercent = (audio.currentTime / audio.duration) * 100;
      setProgress(progressPercent);
      onProgress?.(progressPercent);
    };

    const handleLoadedMetadata = () => {
      setDuration(audio.duration);
    };

    const handleEnded = () => {
      setIsPlaying(false);
      setProgress(0);
      setCurrentTime(0);
    };

    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("loadedmetadata", handleLoadedMetadata);
    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
      audio.removeEventListener("ended", handleEnded);
    };
  }, [onProgress]);

  const togglePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleSeek = (
    e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>
  ) => {
    const progressBar = e.currentTarget;
    const rect = progressBar.getBoundingClientRect();
    const x = "touches" in e ? e.touches[0].clientX : e.clientX;
    const clickPosition = (x - rect.left) / rect.width;
    const newTime = clickPosition * duration;

    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
      setCurrentTime(newTime);
      setProgress(clickPosition * 100);
    }
  };

  const handleSkip = (seconds: number) => {
    if (!audioRef.current) return;
    audioRef.current.currentTime += seconds;
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Add audio element */}
          <audio ref={audioRef} src={sermon.audioUrl} preload="metadata" />

          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/95 z-50 lg:hidden"
          />

          {/* Player Sheet */}
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 20 }}
            className="fixed inset-x-0 bottom-0 z-50 bg-gradient-to-b from-neutral-900/95 to-black h-screen lg:hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 pt-4 pb-8">
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <FontAwesomeIcon icon={faChevronDown} className="w-5 h-5" />
              </button>
              <span className="text-sm font-medium text-gray-200">
                Now Playing
              </span>
              <button className="text-gray-400 hover:text-white transition-colors">
                <FontAwesomeIcon icon={faEllipsisH} className="w-5 h-5" />
              </button>
            </div>

            {/* Artwork */}
            <div className="px-8 mb-8">
              <div className="relative aspect-square w-full rounded-xl overflow-hidden shadow-2xl">
                {sermon.thumbnailUrl ? (
                  <Image
                    src={sermon.thumbnailUrl}
                    alt={sermon.title}
                    fill
                    className="object-cover"
                    unoptimized
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = "/fallback-image.jpg";
                    }}
                  />
                ) : (
                  <div className="w-full h-full bg-neutral-800 flex items-center justify-center">
                    <span className="text-neutral-400">No Thumbnail</span>
                  </div>
                )}
              </div>
            </div>

            {/* Info */}
            <div className="px-8 mb-8">
              <h2 className="text-2xl font-bold text-white mb-2">
                {sermon.title}
              </h2>
              <p className="text-gray-400 text-lg">{sermon.preacher}</p>
            </div>

            {/* Progress Bar - Update to be clickable */}
            <div className="px-8 mb-6">
              <div
                className="relative w-full h-1 bg-neutral-800 rounded-full mb-2 cursor-pointer"
                onClick={handleSeek}
                onTouchStart={handleSeek}
              >
                <div
                  className="absolute h-full bg-white rounded-full"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <div className="flex justify-between text-xs text-gray-400">
                <span>{formatTime(currentTime)}</span>
                <span>{formatTime(duration)}</span>
              </div>
            </div>

            {/* Controls - Update click handlers */}
            <div className="px-8">
              <div className="flex items-center justify-between mb-8">
                <button
                  className="text-gray-400 hover:text-white transition-colors"
                  onClick={() => handleSkip(-10)}
                >
                  <FontAwesomeIcon icon={faBackward} className="w-7 h-7" />
                </button>
                <button
                  onClick={togglePlay}
                  className="w-16 h-16 bg-white rounded-full flex items-center justify-center hover:scale-105 transition-transform"
                >
                  <FontAwesomeIcon
                    icon={isPlaying ? faPause : faPlay}
                    className="w-7 h-7 text-black"
                  />
                </button>
                <button
                  className="text-gray-400 hover:text-white transition-colors"
                  onClick={() => handleSkip(10)}
                >
                  <FontAwesomeIcon icon={faForward} className="w-7 h-7" />
                </button>
              </div>

              {/* Secondary Controls */}
              <div className="flex items-center justify-between">
                <button className="text-gray-400 hover:text-white transition-colors">
                  <FontAwesomeIcon icon={faHeart} className="w-5 h-5" />
                </button>
                <button className="text-gray-400 hover:text-white transition-colors">
                  <FontAwesomeIcon icon={faShareAlt} className="w-5 h-5" />
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
