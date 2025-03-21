"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  RiYoutubeLine,
  RiFacebookCircleLine,
  RiLiveLine,
  RiSettings4Line,
  RiInformationLine,
} from "react-icons/ri";

export default function LiveStreamPage() {
  const [youtubeUrl, setYoutubeUrl] = useState(
    process.env.NEXT_PUBLIC_YOUTUBE_LIVE_ID || ""
  );
  const [facebookUrl, setFacebookUrl] = useState(
    process.env.NEXT_PUBLIC_FACEBOOK_LIVE_URL || ""
  );
  const [isLive, setIsLive] = useState(false);
  const [platform, setPlatform] = useState<"youtube" | "facebook" | "both">(
    "both"
  );
  const [saving, setSaving] = useState(false);

  const handleSaveSettings = async () => {
    setSaving(true);
    try {
      // Save settings to API
      await fetch("/api/live-settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ youtubeUrl, facebookUrl, platform }),
      });
      // Show success message
    } catch (error) {
      console.error("Error saving settings:", error);
      // Show error message
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-3xl blur-3xl"></div>
        <div className="relative bg-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/10">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">
                Live Stream
              </h1>
              <p className="text-gray-400">
                Configure your live streaming settings
              </p>
            </div>
            <div className="flex items-center gap-4">
              <span
                className={`flex items-center gap-2 px-4 py-2 rounded-xl ${
                  isLive
                    ? "bg-red-500/20 text-red-400"
                    : "bg-gray-500/20 text-gray-400"
                }`}
              >
                <RiLiveLine className="w-5 h-5" />
                {isLive ? "Live Now" : "Offline"}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Platform Settings */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10 rounded-2xl blur-xl"></div>
          <div className="relative bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
            <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
              <RiSettings4Line className="w-5 h-5" />
              Platform Settings
            </h2>

            <div className="space-y-4">
              <label className="block">
                <span className="text-white mb-2 block">
                  Streaming Platform
                </span>
                <select
                  value={platform}
                  onChange={(e) =>
                    setPlatform(
                      e.target.value as "youtube" | "facebook" | "both"
                    )
                  }
                  className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-white appearance-none focus:outline-none focus:border-blue-500"
                >
                  <option value="both" className="bg-[#1a1a1a]">
                    Both Platforms
                  </option>
                  <option value="youtube" className="bg-[#1a1a1a]">
                    YouTube Only
                  </option>
                  <option value="facebook" className="bg-[#1a1a1a]">
                    Facebook Only
                  </option>
                </select>
              </label>

              <div className="space-y-6 mt-6">
                <div
                  className={
                    platform !== "facebook"
                      ? ""
                      : "opacity-50 pointer-events-none"
                  }
                >
                  <label className="block">
                    <span className="text-white mb-2 block flex items-center gap-2">
                      <RiYoutubeLine className="w-5 h-5 text-red-500" />
                      YouTube Stream URL
                    </span>
                    <input
                      type="text"
                      value={youtubeUrl}
                      onChange={(e) => setYoutubeUrl(e.target.value)}
                      placeholder="Enter YouTube stream URL"
                      className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
                    />
                  </label>
                </div>

                <div
                  className={
                    platform !== "youtube"
                      ? ""
                      : "opacity-50 pointer-events-none"
                  }
                >
                  <label className="block">
                    <span className="text-white mb-2 block flex items-center gap-2">
                      <RiFacebookCircleLine className="w-5 h-5 text-blue-500" />
                      Facebook Stream URL
                    </span>
                    <input
                      type="text"
                      value={facebookUrl}
                      onChange={(e) => setFacebookUrl(e.target.value)}
                      placeholder="Enter Facebook stream URL"
                      className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
                    />
                  </label>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Stream Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="relative"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10 rounded-2xl blur-xl"></div>
          <div className="relative bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
            <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
              <RiInformationLine className="w-5 h-5" />
              Stream Information
            </h2>

            <div className="space-y-4">
              <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-xl">
                <h3 className="text-blue-400 font-medium mb-2">Quick Tips</h3>
                <ul className="text-gray-400 text-sm space-y-2">
                  <li>• Ensure stable internet connection before going live</li>
                  <li>• Test your stream settings before the actual service</li>
                  <li>• Monitor chat and engagement during the stream</li>
                  <li>• Have a backup stream key ready</li>
                </ul>
              </div>

              <div className="p-4 bg-white/5 rounded-xl">
                <h3 className="text-white font-medium mb-4">Stream Health</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Connection</span>
                    <span className="text-green-400">Excellent</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Quality</span>
                    <span className="text-green-400">1080p</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Bitrate</span>
                    <span className="text-green-400">6000 kbps</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <button
          onClick={handleSaveSettings}
          disabled={saving}
          className={`px-6 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl transition-colors flex items-center gap-2 ${
            saving ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {saving ? (
            <>
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              Saving...
            </>
          ) : (
            "Save Settings"
          )}
        </button>
      </div>
    </div>
  );
}
