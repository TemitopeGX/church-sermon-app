"use client";

import { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlay,
  faPause,
  faVolumeHigh,
  faVolumeMute,
  faExpand,
} from "@fortawesome/free-solid-svg-icons";

declare global {
  interface Window {
    FB: any;
  }
}

interface FacebookPlayerProps {
  videoUrl: string;
}

export default function FacebookPlayer({ videoUrl }: FacebookPlayerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    // Load Facebook SDK
    const loadFacebookSDK = () => {
      const script = document.createElement("script");
      script.src = `https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v12.0&appId=${process.env.NEXT_PUBLIC_FACEBOOK_APP_ID}`;
      script.async = true;
      script.defer = true;
      script.crossOrigin = "anonymous";
      document.body.appendChild(script);

      window.FB = window.FB || {};
      window.FB.init = window.FB.init || function () {};
    };

    loadFacebookSDK();
  }, []);

  const handleFullscreen = () => {
    if (containerRef.current) {
      if (document.fullscreenElement) {
        document.exitFullscreen();
      } else {
        containerRef.current.requestFullscreen();
      }
    }
  };

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
    // Note: Facebook's iframe doesn't provide direct play/pause control
    // This is just for UI feedback
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
    // Note: Facebook's iframe doesn't provide direct mute control
    // This is just for UI feedback
  };

  return (
    <div
      ref={containerRef}
      className="relative aspect-video w-full bg-black rounded-2xl overflow-hidden group"
    >
      {/* Facebook Video Embed */}
      <div className="w-full h-full">
        <div
          className="fb-video"
          data-href={videoUrl}
          data-width="100%"
          data-height="100%"
          data-allowfullscreen="true"
          data-autoplay="false"
          data-show-captions="false"
        />
      </div>

      {/* Custom Controls Overlay */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 opacity-0 group-hover:opacity-100 transition-opacity">
        {/* Progress Bar (Visual only) */}
        <div className="relative w-full h-1 bg-white/30 rounded cursor-pointer mb-4">
          <div className="absolute h-full bg-blue-600 rounded w-0" />
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={togglePlay}
              className="text-white hover:text-blue-500 transition-colors"
            >
              <FontAwesomeIcon
                icon={isPlaying ? faPause : faPlay}
                className="w-5 h-5"
              />
            </button>
            <button
              onClick={toggleMute}
              className="text-white hover:text-blue-500 transition-colors"
            >
              <FontAwesomeIcon
                icon={isMuted ? faVolumeMute : faVolumeHigh}
                className="w-5 h-5"
              />
            </button>
            <span className="text-white text-sm">Live</span>
          </div>

          <button
            onClick={handleFullscreen}
            className="text-white hover:text-blue-500 transition-colors"
          >
            <FontAwesomeIcon icon={faExpand} className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
