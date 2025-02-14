"use client";

import { useRef, useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlay,
  faPause,
  faVolumeHigh,
  faVolumeMute,
  faRotateLeft,
  faRotateRight,
} from "@fortawesome/free-solid-svg-icons";

interface SermonPlayerProps {
  audioUrl: string;
  title: string;
  onProgress?: (progress: number) => void;
}

export default function SermonPlayer({
  audioUrl,
  title,
  onProgress,
}: SermonPlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleLoadedMetadata = () => {
      setDuration(audio.duration);
    };

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
      const progressPercent = (audio.currentTime / audio.duration) * 100;
      setProgress(progressPercent);
      onProgress?.(progressPercent);
    };

    audio.addEventListener("loadedmetadata", handleLoadedMetadata);
    audio.addEventListener("timeupdate", handleTimeUpdate);

    return () => {
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
      audio.removeEventListener("timeupdate", handleTimeUpdate);
    };
  }, [onProgress]);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const seek = (seconds: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = Math.max(
        0,
        Math.min(audioRef.current.currentTime + seconds, duration)
      );
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  return (
    <div className="bg-white/5 rounded-2xl p-6">
      <audio ref={audioRef} src={audioUrl} />

      <h3 className="text-lg font-semibold mb-4">{title}</h3>

      {/* Progress Bar */}
      <div className="relative w-full h-1 bg-white/10 rounded-full mb-4">
        <div
          className="absolute h-full bg-blue-600 rounded-full"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Time Display */}
      <div className="flex justify-between text-sm text-gray-400 mb-4">
        <span>{formatTime(currentTime)}</span>
        <span>{formatTime(duration)}</span>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-center gap-6">
        <button
          onClick={() => seek(-10)}
          className="text-gray-400 hover:text-white transition-colors"
        >
          <FontAwesomeIcon icon={faRotateLeft} className="w-5 h-5" />
        </button>

        <button
          onClick={togglePlay}
          className="w-12 h-12 bg-blue-600 hover:bg-blue-700 rounded-full flex items-center justify-center transition-colors"
        >
          <FontAwesomeIcon
            icon={isPlaying ? faPause : faPlay}
            className="w-5 h-5"
          />
        </button>

        <button
          onClick={() => seek(10)}
          className="text-gray-400 hover:text-white transition-colors"
        >
          <FontAwesomeIcon icon={faRotateRight} className="w-5 h-5" />
        </button>

        <button
          onClick={toggleMute}
          className="text-gray-400 hover:text-white transition-colors"
        >
          <FontAwesomeIcon
            icon={isMuted ? faVolumeMute : faVolumeHigh}
            className="w-5 h-5"
          />
        </button>
      </div>
    </div>
  );
}
