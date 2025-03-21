"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import {
  RiUploadCloud2Line,
  RiImageAddLine,
  RiVideoAddLine,
  RiInformationLine,
  RiCloseLine,
} from "react-icons/ri";

interface UploadForm {
  title: string;
  description: string;
  preacher: string;
  category: string;
  videoFile: File | null;
  thumbnailFile: File | null;
}

export default function UploadPage() {
  const [form, setForm] = useState<UploadForm>({
    title: "",
    description: "",
    preacher: "",
    category: "sunday service",
    videoFile: null,
    thumbnailFile: null,
  });

  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [previewUrl, setPreviewUrl] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const thumbnailInputRef = useRef<HTMLInputElement>(null);

  const categories = [
    "sunday service",
    "bible study",
    "prayer meeting",
    "special service",
  ];

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: "video" | "thumbnail"
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (type === "video") {
      setForm((prev) => ({ ...prev, videoFile: file }));
    } else {
      setForm((prev) => ({ ...prev, thumbnailFile: file }));
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.videoFile || !form.thumbnailFile) return;

    setUploading(true);
    try {
      // Create FormData
      const formData = new FormData();
      formData.append("title", form.title);
      formData.append("description", form.description);
      formData.append("preacher", form.preacher);
      formData.append("category", form.category);
      formData.append("video", form.videoFile);
      formData.append("thumbnail", form.thumbnailFile);

      // Upload to API
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("Upload failed");

      // Reset form
      setForm({
        title: "",
        description: "",
        preacher: "",
        category: "sunday service",
        videoFile: null,
        thumbnailFile: null,
      });
      setPreviewUrl("");

      // Show success message
    } catch (error) {
      console.error("Upload error:", error);
      // Show error message
    } finally {
      setUploading(false);
      setUploadProgress(0);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-3xl blur-3xl"></div>
        <div className="relative bg-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/10">
          <h1 className="text-3xl font-bold text-white mb-2">Upload Sermon</h1>
          <p className="text-gray-400">Upload and publish new sermon content</p>
        </div>
      </div>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 lg:grid-cols-2 gap-8"
      >
        {/* Upload Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-8"
        >
          {/* Video Upload */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10 rounded-2xl blur-xl"></div>
            <div className="relative bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
              <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
                <RiVideoAddLine className="w-5 h-5" />
                Video Upload
              </h2>

              <div
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-white/10 rounded-xl p-8 text-center cursor-pointer hover:border-blue-500/50 transition-colors"
              >
                <RiUploadCloud2Line className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-white mb-2">
                  {form.videoFile
                    ? form.videoFile.name
                    : "Click to upload video"}
                </p>
                <p className="text-gray-400 text-sm">
                  Support MP4, maximum 2GB
                </p>
              </div>
              <input
                ref={fileInputRef}
                type="file"
                accept="video/mp4"
                onChange={(e) => handleFileChange(e, "video")}
                className="hidden"
              />
            </div>
          </div>

          {/* Thumbnail Upload */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10 rounded-2xl blur-xl"></div>
            <div className="relative bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
              <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
                <RiImageAddLine className="w-5 h-5" />
                Thumbnail
              </h2>

              <div className="grid grid-cols-2 gap-4">
                <div
                  onClick={() => thumbnailInputRef.current?.click()}
                  className="border-2 border-dashed border-white/10 rounded-xl p-8 text-center cursor-pointer hover:border-blue-500/50 transition-colors"
                >
                  <RiUploadCloud2Line className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-white mb-2">Click to upload thumbnail</p>
                  <p className="text-gray-400 text-sm">
                    Support JPG, PNG (16:9)
                  </p>
                </div>
                {previewUrl && (
                  <div className="relative">
                    <img
                      src={previewUrl}
                      alt="Thumbnail preview"
                      className="w-full h-full object-cover rounded-xl"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setPreviewUrl("");
                        setForm((prev) => ({ ...prev, thumbnailFile: null }));
                      }}
                      className="absolute top-2 right-2 p-1 bg-red-500 rounded-full hover:bg-red-600 transition-colors"
                    >
                      <RiCloseLine className="w-4 h-4 text-white" />
                    </button>
                  </div>
                )}
              </div>
              <input
                ref={thumbnailInputRef}
                type="file"
                accept="image/*"
                onChange={(e) => handleFileChange(e, "thumbnail")}
                className="hidden"
              />
            </div>
          </div>
        </motion.div>

        {/* Form Fields */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="space-y-8"
        >
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10 rounded-2xl blur-xl"></div>
            <div className="relative bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
              <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
                <RiInformationLine className="w-5 h-5" />
                Sermon Details
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-white mb-2">Title</label>
                  <input
                    type="text"
                    value={form.title}
                    onChange={(e) =>
                      setForm((prev) => ({ ...prev, title: e.target.value }))
                    }
                    className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
                    placeholder="Enter sermon title"
                  />
                </div>

                <div>
                  <label className="block text-white mb-2">Description</label>
                  <textarea
                    value={form.description}
                    onChange={(e) =>
                      setForm((prev) => ({
                        ...prev,
                        description: e.target.value,
                      }))
                    }
                    className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 min-h-[100px]"
                    placeholder="Enter sermon description"
                  />
                </div>

                <div>
                  <label className="block text-white mb-2">Preacher</label>
                  <input
                    type="text"
                    value={form.preacher}
                    onChange={(e) =>
                      setForm((prev) => ({ ...prev, preacher: e.target.value }))
                    }
                    className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
                    placeholder="Enter preacher's name"
                  />
                </div>

                <div>
                  <label className="block text-white mb-2">Category</label>
                  <select
                    value={form.category}
                    onChange={(e) =>
                      setForm((prev) => ({ ...prev, category: e.target.value }))
                    }
                    className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-white appearance-none focus:outline-none focus:border-blue-500"
                  >
                    {categories.map((category) => (
                      <option
                        key={category}
                        value={category}
                        className="bg-[#1a1a1a]"
                      >
                        {category.charAt(0).toUpperCase() + category.slice(1)}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Upload Progress */}
          {uploading && (
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10 rounded-2xl blur-xl"></div>
              <div className="relative bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
                <div className="flex items-center gap-4">
                  <div className="flex-1 bg-white/5 rounded-full h-2 overflow-hidden">
                    <div
                      className="h-full bg-blue-500 transition-all duration-300"
                      style={{ width: `${uploadProgress}%` }}
                    />
                  </div>
                  <span className="text-white">{uploadProgress}%</span>
                </div>
              </div>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={uploading || !form.videoFile || !form.thumbnailFile}
            className={`w-full px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl transition-colors flex items-center justify-center gap-2 ${
              uploading || !form.videoFile || !form.thumbnailFile
                ? "opacity-50 cursor-not-allowed"
                : ""
            }`}
          >
            {uploading ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Uploading...
              </>
            ) : (
              "Upload Sermon"
            )}
          </button>
        </motion.div>
      </form>
    </div>
  );
}
