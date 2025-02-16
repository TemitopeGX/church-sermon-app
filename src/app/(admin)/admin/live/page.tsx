"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faYoutube, faFacebook } from "@fortawesome/free-brands-svg-icons";
import { faSave } from "@fortawesome/free-solid-svg-icons";

export default function LiveSettingsPage() {
  const [youtubeId, setYoutubeId] = useState("");
  const [facebookUrl, setFacebookUrl] = useState(
    "https://www.facebook.com/plugins/video.php?href=https%3A%2F%2Fwww.facebook.com%2Fcovenantchapelgh%2Fvideos%2F1234567890"
  );
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setSuccess("");

    try {
      const response = await fetch("/api/live-settings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          youtubeId,
          facebookUrl,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to update live settings");
      }

      setSuccess("Live settings updated successfully!");
    } catch (error: any) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="text-white">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-2xl font-bold">Live Stream Settings</h1>
        <p className="text-gray-400 mt-2">Configure your live stream sources</p>
      </motion.div>

      <motion.form
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        onSubmit={handleSubmit}
        className="max-w-2xl space-y-6"
      >
        {/* YouTube Settings */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <FontAwesomeIcon
              icon={faYoutube}
              className="w-6 h-6 text-red-500"
            />
            <h2 className="text-lg font-semibold">YouTube Live</h2>
          </div>
          <div className="space-y-2">
            <label className="text-sm text-gray-300">Video ID</label>
            <input
              type="text"
              value={youtubeId}
              onChange={(e) => setYoutubeId(e.target.value)}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
              placeholder="Enter YouTube video ID"
            />
          </div>
        </div>

        {/* Facebook Settings */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <FontAwesomeIcon
              icon={faFacebook}
              className="w-6 h-6 text-blue-500"
            />
            <h2 className="text-lg font-semibold">Facebook Live</h2>
          </div>
          <div className="space-y-2">
            <label className="text-sm text-gray-300">Stream URL</label>
            <input
              type="text"
              value={facebookUrl}
              onChange={(e) => setFacebookUrl(e.target.value)}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
              placeholder="Enter Facebook stream URL"
            />
          </div>
        </div>

        {error && (
          <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400">
            {error}
          </div>
        )}

        {success && (
          <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg text-green-400">
            {success}
          </div>
        )}

        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          <FontAwesomeIcon icon={faSave} className="w-4 h-4" />
          {isLoading ? "Saving..." : "Save Settings"}
        </button>
      </motion.form>
    </div>
  );
}
