"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCloudUpload,
  faSpinner,
  faCheck,
} from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/navigation";

export default function UploadPage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [preacher, setPreacher] = useState("");
  const [date, setDate] = useState("");
  const [series, setSeries] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsUploading(true);
    setError("");

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("preacher", preacher);
      formData.append("date", date);
      formData.append("series", series);
      if (file) formData.append("audioFile", file);
      if (thumbnail) formData.append("thumbnail", thumbnail);

      const response = await fetch("/api/sermons", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Upload failed");
      }

      // Reset form
      setTitle("");
      setDescription("");
      setPreacher("");
      setDate("");
      setSeries("");
      setFile(null);
      setThumbnail(null);

      // Redirect to sermons list or show success message
      router.push("/admin/sermons");
    } catch (error: any) {
      setError(error.message);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="text-white max-w-4xl">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-2xl font-bold">Upload Sermon</h1>
        <p className="text-gray-400 mt-2">Add a new sermon to the library</p>
      </motion.div>

      <motion.form
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        onSubmit={handleSubmit}
        className="space-y-6"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm text-gray-300">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm text-gray-300">Preacher</label>
            <input
              type="text"
              value={preacher}
              onChange={(e) => setPreacher(e.target.value)}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm text-gray-300">Date</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm text-gray-300">Series (Optional)</label>
            <input
              type="text"
              value={series}
              onChange={(e) => setSeries(e.target.value)}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm text-gray-300">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm text-gray-300">Audio File</label>
            <div className="relative">
              <input
                type="file"
                onChange={(e) => setFile(e.target.files?.[0] || null)}
                className="hidden"
                id="audio-file"
                accept="audio/*"
                required
              />
              <label
                htmlFor="audio-file"
                className="w-full px-4 py-8 flex flex-col items-center justify-center bg-white/5 border border-white/10 border-dashed rounded-lg cursor-pointer hover:bg-white/10 transition-colors"
              >
                <FontAwesomeIcon
                  icon={faCloudUpload}
                  className="w-8 h-8 mb-2 text-gray-400"
                />
                <span className="text-sm text-gray-400">
                  {file ? file.name : "Click to upload audio file"}
                </span>
              </label>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm text-gray-300">
              Thumbnail (Optional)
            </label>
            <div className="relative">
              <input
                type="file"
                onChange={(e) => setThumbnail(e.target.files?.[0] || null)}
                className="hidden"
                id="thumbnail"
                accept="image/*"
              />
              <label
                htmlFor="thumbnail"
                className="w-full px-4 py-8 flex flex-col items-center justify-center bg-white/5 border border-white/10 border-dashed rounded-lg cursor-pointer hover:bg-white/10 transition-colors"
              >
                <FontAwesomeIcon
                  icon={faCloudUpload}
                  className="w-8 h-8 mb-2 text-gray-400"
                />
                <span className="text-sm text-gray-400">
                  {thumbnail ? thumbnail.name : "Click to upload thumbnail"}
                </span>
              </label>
            </div>
          </div>
        </div>

        <button
          type="submit"
          disabled={isUploading}
          className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {isUploading ? (
            <>
              <FontAwesomeIcon
                icon={faSpinner}
                className="w-5 h-5 animate-spin"
              />
              Uploading...
            </>
          ) : (
            <>
              <FontAwesomeIcon icon={faCheck} className="w-5 h-5" />
              Upload Sermon
            </>
          )}
        </button>
      </motion.form>
    </div>
  );
}
