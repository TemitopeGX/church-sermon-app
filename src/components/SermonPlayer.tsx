"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlay,
  faPause,
  faVolumeHigh,
  faVolumeMute,
  faRotateLeft,
  faRotateRight,
  faHeart,
  faShareAlt,
  faEllipsisH,
  faRepeat,
  faShuffle,
  faMusic,
} from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";

interface SermonPlayerProps {
  audioUrl: string;
  title: string;
  preacher: string;
  description: string;
  thumbnailUrl?: string;
  onProgress?: (progress: number) => void;
}

export default function SermonPlayer({
  audioUrl,
  title,
  preacher,
  description,
  thumbnailUrl,
  onProgress,
}: SermonPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [isRepeat, setIsRepeat] = useState(false);
  const [isShuffle, setIsShuffle] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
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

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!audioRef.current) return;

    const newTime = (parseFloat(e.target.value) / 100) * duration;
    audioRef.current.currentTime = newTime;
    setProgress(parseFloat(e.target.value));
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!audioRef.current) return;

    const newVolume = parseFloat(e.target.value);
    audioRef.current.volume = newVolume;
    setVolume(newVolume);
    setIsMuted(newVolume === 0);
  };

  const toggleMute = () => {
    if (!audioRef.current) return;

    if (isMuted) {
      audioRef.current.volume = volume;
      setIsMuted(false);
    } else {
      audioRef.current.volume = 0;
      setIsMuted(true);
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  const handleSkip = (offset: number) => {
    if (!audioRef.current) return;

    const newTime = audioRef.current.currentTime + offset;
    if (newTime < 0) {
      audioRef.current.currentTime = 0;
    } else if (newTime > duration) {
      audioRef.current.currentTime = duration;
    } else {
      audioRef.current.currentTime = newTime;
    }
    setProgress(parseFloat(((newTime / duration) * 100).toFixed(2)));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-neutral-900/50 backdrop-blur-sm rounded-xl p-4"
    >
      <div className="space-y-4">
        {/* Progress Bar */}
        <div className="relative group">
          <div className="flex items-center gap-4 mb-2">
            <span className="text-sm font-medium text-gray-400 tabular-nums">
              {formatTime(currentTime)}
            </span>
            <div className="relative flex-1 h-1.5 group">
              <div className="absolute inset-0 rounded-full bg-white/10 overflow-hidden group-hover:bg-white/20 transition-colors">
                <div
                  className="absolute h-full bg-blue-500 rounded-full transition-all duration-150"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={progress}
                onChange={handleSeek}
                className="absolute inset-0 w-full opacity-0 cursor-pointer"
              />
            </div>
            <span className="text-sm font-medium text-gray-400 tabular-nums">
              {formatTime(duration)}
            </span>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-8">
            {/* Shuffle Button */}
            <button
              onClick={() => setIsShuffle(!isShuffle)}
              className={`transition-colors ${
                isShuffle ? "text-blue-400" : "text-gray-400 hover:text-white"
              }`}
            >
              <FontAwesomeIcon icon={faShuffle} className="w-5 h-5" />
            </button>

            {/* Previous */}
            <button
              onClick={() => handleSkip(-10)}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <FontAwesomeIcon icon={faRotateLeft} className="w-6 h-6" />
            </button>

            {/* Play/Pause */}
            <button
              onClick={togglePlay}
              className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center hover:scale-105 hover:bg-blue-400 transition-all duration-200 shadow-lg group"
            >
              <FontAwesomeIcon
                icon={isPlaying ? faPause : faPlay}
                className="w-7 h-7 text-white group-hover:scale-110 transition-transform ml-0.5"
              />
            </button>

            {/* Next */}
            <button
              onClick={() => handleSkip(10)}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <FontAwesomeIcon icon={faRotateRight} className="w-6 h-6" />
            </button>

            {/* Repeat Button */}
            <button
              onClick={() => setIsRepeat(!isRepeat)}
              className={`transition-colors ${
                isRepeat ? "text-blue-400" : "text-gray-400 hover:text-white"
              }`}
            >
              <FontAwesomeIcon icon={faRepeat} className="w-5 h-5" />
            </button>
          </div>

          {/* Volume Control */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 group">
              <button
                onClick={toggleMute}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <FontAwesomeIcon
                  icon={isMuted ? faVolumeMute : faVolumeHigh}
                  className="w-5 h-5"
                />
              </button>
              <div className="w-24 h-1.5 relative">
                <div className="absolute inset-0 rounded-full bg-white/10 group-hover:bg-white/20 transition-colors">
                  <div
                    className="absolute h-full bg-blue-500 rounded-full transition-all"
                    style={{ width: `${isMuted ? 0 : volume * 100}%` }}
                  />
                </div>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={isMuted ? 0 : volume}
                  onChange={handleVolumeChange}
                  className="absolute inset-0 w-full opacity-0 cursor-pointer"
                />
              </div>
            </div>

            {/* More Options */}
            <button className="text-gray-400 hover:text-white transition-colors">
              <FontAwesomeIcon icon={faEllipsisH} className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
