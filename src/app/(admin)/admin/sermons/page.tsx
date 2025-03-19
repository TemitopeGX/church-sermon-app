"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit,
  faTrash,
  faSearch,
  faFilter,
  faEye,
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { Sermon } from "@/types/sermon";

export default function SermonsPage() {
  const [sermons, setSermons] = useState<Sermon[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchSermons();
  }, []);

  const fetchSermons = async () => {
    try {
      setIsLoading(true);
      setError("");
      const response = await fetch("/api/sermons");
      if (!response.ok) {
        throw new Error("Failed to fetch sermons");
      }
      const data = await response.json();
      setSermons(data);
    } catch (error: any) {
      console.error("Error fetching sermons:", error);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Filter sermons based on search query
  const filteredSermons = sermons.filter(
    (sermon) =>
      sermon.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sermon.preacher.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this sermon?")) {
      try {
        await fetch(`/api/sermons/${id}`, {
          method: "DELETE",
        });
        fetchSermons(); // Refresh the list
      } catch (error) {
        console.error("Error deleting sermon:", error);
      }
    }
  };

  return (
    <div className="text-white">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-2xl font-bold">Manage Sermons</h1>
        <p className="text-gray-400 mt-2">View and manage all sermons</p>
      </motion.div>

      {/* Search and Filter */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="mb-6"
      >
        <div className="flex gap-4">
          <div className="flex-1 relative">
            <FontAwesomeIcon
              icon={faSearch}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              type="text"
              placeholder="Search sermons..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-white/5 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
            />
          </div>
          <button className="px-4 py-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors">
            <FontAwesomeIcon icon={faFilter} className="mr-2" />
            Filter
          </button>
        </div>
      </motion.div>

      {error && (
        <div className="p-4 mb-6 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400">
          {error}
        </div>
      )}

      {/* Sermons Table */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        {isLoading ? (
          <div className="text-center py-12">
            <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
          </div>
        ) : filteredSermons.length > 0 ? (
          <div className="bg-white/5 rounded-2xl overflow-hidden">
            <table className="w-full">
              <thead className="bg-white/5">
                <tr>
                  <th className="text-left p-4 text-gray-400">Title</th>
                  <th className="text-left p-4 text-gray-400">Preacher</th>
                  <th className="text-left p-4 text-gray-400">Date</th>
                  <th className="text-left p-4 text-gray-400">Views</th>
                  <th className="text-left p-4 text-gray-400">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredSermons.map((sermon) => (
                  <tr
                    key={sermon._id}
                    className="border-t border-white/5 hover:bg-white/5 transition-colors"
                  >
                    <td className="p-4">{sermon.title}</td>
                    <td className="p-4 text-gray-400">{sermon.preacher}</td>
                    <td className="p-4 text-gray-400">{sermon.date}</td>
                    <td className="p-4 text-gray-400">{sermon.views}</td>
                    <td className="p-4">
                      <div className="flex gap-2">
                        <Link
                          href={`/sermons/${sermon._id}`}
                          className="p-2 text-gray-400 hover:text-white transition-colors"
                        >
                          <FontAwesomeIcon icon={faEye} />
                        </Link>
                        <Link
                          href={`/admin/sermons/edit/${sermon._id}`}
                          className="p-2 text-blue-400 hover:text-blue-300 transition-colors"
                        >
                          <FontAwesomeIcon icon={faEdit} />
                        </Link>
                        <button
                          onClick={() => handleDelete(sermon._id!)}
                          className="p-2 text-red-400 hover:text-red-300 transition-colors"
                        >
                          <FontAwesomeIcon icon={faTrash} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-12 bg-white/5 rounded-2xl">
            <p className="text-gray-400">
              {searchQuery
                ? "No sermons found matching your search"
                : "No sermons uploaded yet"}
            </p>
            {!searchQuery && (
              <Link
                href="/admin/upload"
                className="inline-block mt-4 px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
              >
                Upload Your First Sermon
              </Link>
            )}
          </div>
        )}
      </motion.div>
    </div>
  );
}
