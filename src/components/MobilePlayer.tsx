"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlay,
  faPause,
  faChevronDown,
  faVolumeHigh,
  faVolumeMute,
  faRotateLeft,
  faRotateRight,
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

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 z-50 lg:hidden"
            onClick={onClose}
          />

          {/* Player Sheet */}
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 20 }}
            className="fixed inset-x-0 bottom-0 z-50 bg-gradient-to-b from-gray-900 to-black rounded-t-3xl pb-safe lg:hidden"
            style={{ height: "90vh" }}
          >
            {/* Handle */}
            <div className="flex justify-center pt-3 pb-5">
              <div className="w-12 h-1 bg-white/20 rounded-full" />
            </div>

            {/* Content */}
            <div className="px-6 h-full flex flex-col">
              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-6 right-6 text-gray-400"
              >
                <FontAwesomeIcon icon={faChevronDown} className="w-5 h-5" />
              </button>

              {/* Artwork */}
              <div className="relative aspect-square w-full max-w-sm mx-auto mb-8 rounded-lg overflow-hidden">
                {sermon.thumbnailUrl ? (
                  <Image
                    src={sermon.thumbnailUrl}
                    alt={sermon.title}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-blue-600/20 flex items-center justify-center">
                    <span className="text-blue-500">No Thumbnail</span>
                  </div>
                )}
              </div>

              {/* Info */}
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-white mb-2">
                  {sermon.title}
                </h2>
                <p className="text-gray-400">{sermon.preacher}</p>
              </div>

              {/* Progress Bar */}
              <div className="relative w-full h-1 bg-white/10 rounded-full mb-4">
                <div
                  className="absolute h-full bg-blue-600 rounded-full"
                  style={{ width: `${progress}%` }}
                />
              </div>

              {/* Controls */}
              <div className="flex items-center justify-center gap-8 mb-8">
                <button className="text-gray-400">
                  <FontAwesomeIcon icon={faRotateLeft} className="w-6 h-6" />
                </button>

                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center"
                >
                  <FontAwesomeIcon
                    icon={isPlaying ? faPause : faPlay}
                    className="w-6 h-6"
                  />
                </button>

                <button className="text-gray-400">
                  <FontAwesomeIcon icon={faRotateRight} className="w-6 h-6" />
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
