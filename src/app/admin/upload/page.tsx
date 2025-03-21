"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import {
  RiUploadCloud2Line,
  RiImageAddLine,
  RiMusicLine,
  RiInformationLine,
  RiCloseLine,
  RiAddLine,
} from "react-icons/ri";

interface UploadForm {
  title: string;
  description: string;
  preacher: string;
  series: string;
  newSeries: string;
  audioFile: File | null;
  thumbnailFile: File | null;
}

export default function UploadPage() {
  const [form, setForm] = useState<UploadForm>({
    title: "",
    description: "",
    preacher: "",
    series: "",
    newSeries: "",
    audioFile: null,
    thumbnailFile: null,
  });

  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [previewUrl, setPreviewUrl] = useState("");
  const [isNewSeries, setIsNewSeries] = useState(false);
  const [existingSeries, setExistingSeries] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const thumbnailInputRef = useRef<HTMLInputElement>(null);

  // Fetch existing series when component mounts
  useEffect(() => {
    const fetchSeries = async () => {
      try {
        const response = await fetch("/api/series");
        if (response.ok) {
          const data = await response.json();
          setExistingSeries(data);
        }
      } catch (error) {
        console.error("Error fetching series:", error);
      }
    };
    fetchSeries();
  }, []);

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: "audio" | "thumbnail"
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (type === "audio") {
      // Validate audio file type
      if (!file.type.startsWith("audio/")) {
        alert("Please upload an audio file");
        return;
      }
      setForm((prev) => ({ ...prev, audioFile: file }));
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

    // Validate form data
    if (!form.title.trim()) {
      alert("Please enter a sermon title");
      return;
    }
    if (!form.description.trim()) {
      alert("Please enter a sermon description");
      return;
    }
    if (!form.preacher.trim()) {
      alert("Please enter the preacher's name");
      return;
    }
    if (!isNewSeries && !form.series) {
      alert("Please select a series");
      return;
    }
    if (isNewSeries && !form.newSeries.trim()) {
      alert("Please enter a new series name");
      return;
    }
    if (!form.audioFile) {
      alert("Please select an audio file");
      return;
    }
    if (!form.thumbnailFile) {
      alert("Please select a thumbnail image");
      return;
    }

    setUploading(true);
    try {
      // Create FormData
      const formData = new FormData();
      formData.append("title", form.title.trim());
      formData.append("description", form.description.trim());
      formData.append("preacher", form.preacher.trim());
      formData.append(
        "series",
        isNewSeries ? form.newSeries.trim() : form.series
      );
      formData.append("audio", form.audioFile);
      formData.append("thumbnail", form.thumbnailFile);

      // Upload to API
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Upload failed");
      }

      // Reset form
      setForm({
        title: "",
        description: "",
        preacher: "",
        series: "",
        newSeries: "",
        audioFile: null,
        thumbnailFile: null,
      });
      setPreviewUrl("");
      setIsNewSeries(false);

      // Show success message
      alert("Sermon uploaded successfully!");

      // Refresh the series list if a new series was added
      if (isNewSeries) {
        const seriesResponse = await fetch("/api/series");
        if (seriesResponse.ok) {
          const seriesData = await seriesResponse.json();
          setExistingSeries(seriesData);
        }
      }
    } catch (error) {
      console.error("Upload error:", error);
      alert(
        error instanceof Error
          ? error.message
          : "Failed to upload sermon. Please try again."
      );
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
          <p className="text-gray-400">Upload and publish new sermon audio</p>
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
          {/* Audio Upload */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10 rounded-2xl blur-xl"></div>
            <div className="relative bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
              <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
                <RiMusicLine className="w-5 h-5" />
                Audio Upload
              </h2>

              <div
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-white/10 rounded-xl p-8 text-center cursor-pointer hover:border-blue-500/50 transition-colors"
              >
                <RiUploadCloud2Line className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-white mb-2">
                  {form.audioFile
                    ? form.audioFile.name
                    : "Click to upload audio"}
                </p>
                <p className="text-gray-400 text-sm">
                  Support MP3, WAV, maximum 500MB
                </p>
              </div>
              <input
                ref={fileInputRef}
                type="file"
                accept="audio/*"
                onChange={(e) => handleFileChange(e, "audio")}
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
                    Support JPG, PNG (1:1)
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
                    required
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
                    required
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
                    required
                  />
                </div>

                <div>
                  <label className="block text-white mb-2">Series</label>
                  <div className="flex items-center gap-4 mb-2">
                    <button
                      type="button"
                      onClick={() => setIsNewSeries(false)}
                      className={`px-4 py-2 rounded-xl transition-colors ${
                        !isNewSeries
                          ? "bg-blue-600 text-white"
                          : "bg-white/5 text-gray-400"
                      }`}
                    >
                      Existing Series
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsNewSeries(true)}
                      className={`px-4 py-2 rounded-xl transition-colors ${
                        isNewSeries
                          ? "bg-blue-600 text-white"
                          : "bg-white/5 text-gray-400"
                      }`}
                    >
                      New Series
                    </button>
                  </div>

                  {isNewSeries ? (
                    <input
                      type="text"
                      value={form.newSeries}
                      onChange={(e) =>
                        setForm((prev) => ({
                          ...prev,
                          newSeries: e.target.value,
                        }))
                      }
                      className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
                      placeholder="Enter new series name"
                      required
                    />
                  ) : (
                    <select
                      value={form.series}
                      onChange={(e) =>
                        setForm((prev) => ({ ...prev, series: e.target.value }))
                      }
                      className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-blue-500"
                      required
                    >
                      <option value="" disabled>
                        Select a series
                      </option>
                      {existingSeries.map((series) => (
                        <option key={series} value={series}>
                          {series}
                        </option>
                      ))}
                    </select>
                  )}
                </div>
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={uploading}
            className="w-full px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-500 transition-colors disabled:bg-blue-600/50 disabled:cursor-not-allowed"
          >
            {uploading ? "Uploading..." : "Upload Sermon"}
          </button>
        </motion.div>
      </form>
    </div>
  );
}
