"use client";

import { motion } from "framer-motion";
import { useAuth } from "@/contexts/auth-context";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faEnvelope } from "@fortawesome/free-solid-svg-icons";

export default function ProfilePage() {
  const { user } = useAuth();

  return (
    <div className="text-white">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-2xl font-bold">Profile</h1>
        <p className="text-gray-400 mt-2">Manage your account settings</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="bg-white/5 rounded-2xl p-6 max-w-2xl"
      >
        <div className="flex items-center gap-6 mb-8">
          <div className="w-20 h-20 rounded-full bg-blue-600 flex items-center justify-center">
            <FontAwesomeIcon icon={faUser} className="w-8 h-8" />
          </div>
          <div>
            <h2 className="text-xl font-semibold">Your Profile</h2>
            <p className="text-gray-400 flex items-center gap-2 mt-1">
              <FontAwesomeIcon icon={faEnvelope} className="w-4 h-4" />
              {user?.email}
            </p>
          </div>
        </div>

        {/* Add more profile settings as needed */}
      </motion.div>
    </div>
  );
}
