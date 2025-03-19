"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useAuth } from "@/contexts/auth-context";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faEnvelope,
  faLock,
  faFingerprint,
  faBell,
  faShield,
  faCheck,
  faExclamationCircle,
} from "@fortawesome/free-solid-svg-icons";
import {
  EmailAuthProvider,
  updatePassword,
  reauthenticateWithCredential,
} from "firebase/auth";
import { BiometricService } from "@/lib/biometric";
import { NotificationService } from "@/lib/notification";

export default function SettingsPage() {
  const { user } = useAuth();
  const [biometricEnabled, setBiometricEnabled] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [isBiometricAvailable, setIsBiometricAvailable] = useState(false);

  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Check biometric availability on mount
  useEffect(() => {
    const checkBiometric = async () => {
      const available = await BiometricService.isAvailable();
      setIsBiometricAvailable(available);
    };
    checkBiometric();
  }, []);

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    // Validation
    if (newPassword.length < 6) {
      setError("New password must be at least 6 characters long");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("New passwords do not match");
      return;
    }

    setIsLoading(true);

    try {
      if (!user) throw new Error("No user found");

      // Reauthenticate user
      const credential = EmailAuthProvider.credential(
        user.email!,
        currentPassword
      );
      await reauthenticateWithCredential(user, credential);

      // Update password
      await updatePassword(user, newPassword);

      setSuccess("Password updated successfully");
      setIsChangingPassword(false);
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err: any) {
      console.error(err);
      setError(
        err.code === "auth/wrong-password"
          ? "Current password is incorrect"
          : "Failed to update password"
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleBiometricToggle = async () => {
    try {
      if (!isBiometricAvailable) {
        setError("Biometric authentication is not available on this device");
        return;
      }

      const success = await BiometricService.authenticate();
      if (success) {
        setBiometricEnabled(!biometricEnabled);
        setSuccess("Biometric authentication settings updated");
      } else {
        setError("Biometric authentication failed");
      }
    } catch (err) {
      console.error(err);
      setError("Failed to toggle biometric authentication");
    }
  };

  const handleNotificationToggle = async () => {
    try {
      if (!notificationsEnabled) {
        // Enabling notifications
        const permissionGranted = await NotificationService.requestPermission();
        if (!permissionGranted) {
          setError("Notification permission denied");
          return;
        }

        const fcmSetup = await NotificationService.setupFCM();
        if (!fcmSetup) {
          setError("Failed to setup notifications");
          return;
        }

        setNotificationsEnabled(true);
        setSuccess("Notifications enabled successfully");
      } else {
        // Disabling notifications
        setNotificationsEnabled(false);
        setSuccess("Notifications disabled");
      }
    } catch (err) {
      console.error(err);
      setError("Failed to toggle notifications");
    }
  };

  return (
    <div className="text-white pb-20 lg:pb-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-2xl font-bold">Settings</h1>
        <p className="text-gray-400 mt-2">Manage your account preferences</p>
      </motion.div>

      <div className="grid gap-6 max-w-4xl">
        {/* Profile Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="bg-white/5 rounded-2xl p-4 lg:p-6"
        >
          <div className="flex items-center gap-4 lg:gap-6">
            <div className="w-16 h-16 lg:w-20 lg:h-20 rounded-full bg-blue-600 flex items-center justify-center">
              <FontAwesomeIcon icon={faUser} className="w-8 h-8" />
            </div>
            <div>
              <h2 className="text-lg lg:text-xl font-semibold">Your Profile</h2>
              <p className="text-gray-400 flex items-center gap-2 mt-1 text-sm lg:text-base">
                <FontAwesomeIcon icon={faEnvelope} className="w-4 h-4" />
                {user?.email}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Password Change Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-white/5 rounded-2xl p-4 lg:p-6"
        >
          <div className="flex items-center gap-4 mb-6">
            <FontAwesomeIcon icon={faLock} className="w-5 h-5 text-blue-400" />
            <h2 className="text-lg lg:text-xl font-semibold">Password</h2>
          </div>

          {error && (
            <div className="mb-4 p-4 bg-red-500/10 text-red-500 rounded-lg flex items-center gap-2">
              <FontAwesomeIcon icon={faExclamationCircle} className="w-4 h-4" />
              {error}
            </div>
          )}

          {success && (
            <div className="mb-4 p-4 bg-green-500/10 text-green-500 rounded-lg flex items-center gap-2">
              <FontAwesomeIcon icon={faCheck} className="w-4 h-4" />
              {success}
            </div>
          )}

          {!isChangingPassword ? (
            <button
              onClick={() => setIsChangingPassword(true)}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
            >
              Change Password
            </button>
          ) : (
            <form onSubmit={handlePasswordChange} className="space-y-4">
              <div>
                <label className="block text-sm text-gray-400 mb-1">
                  Current Password
                </label>
                <input
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                  required
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">
                  New Password
                </label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                  required
                  minLength={6}
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">
                  Confirm New Password
                </label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                  required
                />
              </div>
              <div className="flex flex-col lg:flex-row gap-4">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? "Updating..." : "Update Password"}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setIsChangingPassword(false);
                    setError("");
                    setSuccess("");
                  }}
                  className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          )}
        </motion.div>

        {/* Security Settings */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="bg-white/5 rounded-2xl p-4 lg:p-6"
        >
          <div className="flex items-center gap-4 mb-6">
            <FontAwesomeIcon
              icon={faShield}
              className="w-5 h-5 text-blue-400"
            />
            <h2 className="text-lg lg:text-xl font-semibold">Security</h2>
          </div>

          <div className="space-y-6">
            {/* Biometric Login */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <FontAwesomeIcon
                  icon={faFingerprint}
                  className={`w-5 h-5 ${
                    isBiometricAvailable ? "text-gray-400" : "text-gray-600"
                  }`}
                />
                <div>
                  <h3 className="font-medium">Biometric Login</h3>
                  <p className="text-sm text-gray-400">
                    {isBiometricAvailable
                      ? "Use fingerprint or face ID to login"
                      : "Not available on this device"}
                  </p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={biometricEnabled}
                  onChange={handleBiometricToggle}
                  disabled={!isBiometricAvailable}
                />
                <div className="w-11 h-6 bg-white/10 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600 peer-disabled:opacity-50 peer-disabled:cursor-not-allowed"></div>
              </label>
            </div>

            {/* Notifications */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <FontAwesomeIcon
                  icon={faBell}
                  className="w-5 h-5 text-gray-400"
                />
                <div>
                  <h3 className="font-medium">Notifications</h3>
                  <p className="text-sm text-gray-400">
                    Get notified about new sermons
                  </p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={notificationsEnabled}
                  onChange={handleNotificationToggle}
                />
                <div className="w-11 h-6 bg-white/10 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
