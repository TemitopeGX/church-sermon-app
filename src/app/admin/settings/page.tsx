"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  RiSettings4Line,
  RiNotificationLine,
  RiGlobalLine,
  RiLockLine,
  RiSaveLine,
  RiCheckLine,
} from "react-icons/ri";

interface Settings {
  notifications: {
    emailNotifications: boolean;
    pushNotifications: boolean;
    newSermonAlert: boolean;
    weeklyDigest: boolean;
  };
  site: {
    siteName: string;
    siteDescription: string;
    contactEmail: string;
    churchAddress: string;
  };
  security: {
    requireEmailVerification: boolean;
    allowUserRegistration: boolean;
    sessionTimeout: number;
  };
}

export default function SettingsPage() {
  const [settings, setSettings] = useState<Settings>({
    notifications: {
      emailNotifications: true,
      pushNotifications: true,
      newSermonAlert: true,
      weeklyDigest: false,
    },
    site: {
      siteName: "",
      siteDescription: "",
      contactEmail: "",
      churchAddress: "",
    },
    security: {
      requireEmailVerification: true,
      allowUserRegistration: true,
      sessionTimeout: 30,
    },
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    fetchSettings();
  }, []);

  async function fetchSettings() {
    try {
      const response = await fetch("/api/settings");
      if (!response.ok) throw new Error("Failed to fetch settings");
      const data = await response.json();
      setSettings(data);
    } catch (error) {
      console.error("Error fetching settings:", error);
    } finally {
      setLoading(false);
    }
  }

  async function handleSave() {
    setSaving(true);
    try {
      const response = await fetch("/api/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(settings),
      });

      if (!response.ok) throw new Error("Failed to save settings");

      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    } catch (error) {
      console.error("Error saving settings:", error);
    } finally {
      setSaving(false);
    }
  }

  const SettingsSection = ({ title, icon: Icon, children }: any) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10 rounded-2xl blur-xl"></div>
      <div className="relative bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
        <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
          <Icon className="w-5 h-5" />
          {title}
        </h2>
        {children}
      </div>
    </motion.div>
  );

  if (loading) {
    return (
      <div className="space-y-8">
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-3xl blur-3xl"></div>
          <div className="relative bg-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/10">
            <div className="animate-pulse">
              <div className="h-8 bg-white/5 rounded w-48 mb-2"></div>
              <div className="h-4 bg-white/5 rounded w-64"></div>
            </div>
          </div>
        </div>

        {Array(3)
          .fill(0)
          .map((_, index) => (
            <div key={index} className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10 rounded-2xl blur-xl"></div>
              <div className="relative bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
                <div className="animate-pulse space-y-4">
                  <div className="h-6 bg-white/5 rounded w-32"></div>
                  <div className="space-y-3">
                    <div className="h-10 bg-white/5 rounded"></div>
                    <div className="h-10 bg-white/5 rounded"></div>
                    <div className="h-10 bg-white/5 rounded"></div>
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-3xl blur-3xl"></div>
        <div className="relative bg-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/10">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">Settings</h1>
              <p className="text-gray-400">Configure application settings</p>
            </div>
            <button
              onClick={handleSave}
              disabled={saving}
              className={`px-6 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl transition-colors flex items-center gap-2 ${
                saving ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {saving ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <RiSaveLine className="w-5 h-5" />
                  Save Changes
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Success Message */}
      {showSuccess && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-green-500/10 border border-green-500/20 rounded-xl p-4 flex items-center gap-3"
        >
          <RiCheckLine className="w-5 h-5 text-green-400" />
          <p className="text-green-400">Settings saved successfully!</p>
        </motion.div>
      )}

      {/* Notifications Settings */}
      <SettingsSection title="Notifications" icon={RiNotificationLine}>
        <div className="space-y-4">
          <label className="flex items-center justify-between">
            <span className="text-white">Email Notifications</span>
            <input
              type="checkbox"
              checked={settings.notifications.emailNotifications}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  notifications: {
                    ...settings.notifications,
                    emailNotifications: e.target.checked,
                  },
                })
              }
              className="w-5 h-5 rounded bg-white/5 border-white/10 text-blue-600 focus:ring-blue-500"
            />
          </label>

          <label className="flex items-center justify-between">
            <span className="text-white">Push Notifications</span>
            <input
              type="checkbox"
              checked={settings.notifications.pushNotifications}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  notifications: {
                    ...settings.notifications,
                    pushNotifications: e.target.checked,
                  },
                })
              }
              className="w-5 h-5 rounded bg-white/5 border-white/10 text-blue-600 focus:ring-blue-500"
            />
          </label>

          <label className="flex items-center justify-between">
            <span className="text-white">New Sermon Alerts</span>
            <input
              type="checkbox"
              checked={settings.notifications.newSermonAlert}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  notifications: {
                    ...settings.notifications,
                    newSermonAlert: e.target.checked,
                  },
                })
              }
              className="w-5 h-5 rounded bg-white/5 border-white/10 text-blue-600 focus:ring-blue-500"
            />
          </label>

          <label className="flex items-center justify-between">
            <span className="text-white">Weekly Digest</span>
            <input
              type="checkbox"
              checked={settings.notifications.weeklyDigest}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  notifications: {
                    ...settings.notifications,
                    weeklyDigest: e.target.checked,
                  },
                })
              }
              className="w-5 h-5 rounded bg-white/5 border-white/10 text-blue-600 focus:ring-blue-500"
            />
          </label>
        </div>
      </SettingsSection>

      {/* Site Settings */}
      <SettingsSection title="Site Information" icon={RiGlobalLine}>
        <div className="space-y-4">
          <div>
            <label className="block text-white mb-2">Site Name</label>
            <input
              type="text"
              value={settings.site.siteName}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  site: { ...settings.site, siteName: e.target.value },
                })
              }
              className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
              placeholder="Enter site name"
            />
          </div>

          <div>
            <label className="block text-white mb-2">Site Description</label>
            <textarea
              value={settings.site.siteDescription}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  site: { ...settings.site, siteDescription: e.target.value },
                })
              }
              className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 min-h-[100px]"
              placeholder="Enter site description"
            />
          </div>

          <div>
            <label className="block text-white mb-2">Contact Email</label>
            <input
              type="email"
              value={settings.site.contactEmail}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  site: { ...settings.site, contactEmail: e.target.value },
                })
              }
              className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
              placeholder="Enter contact email"
            />
          </div>

          <div>
            <label className="block text-white mb-2">Church Address</label>
            <textarea
              value={settings.site.churchAddress}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  site: { ...settings.site, churchAddress: e.target.value },
                })
              }
              className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
              placeholder="Enter church address"
            />
          </div>
        </div>
      </SettingsSection>

      {/* Security Settings */}
      <SettingsSection title="Security" icon={RiLockLine}>
        <div className="space-y-4">
          <label className="flex items-center justify-between">
            <span className="text-white">Require Email Verification</span>
            <input
              type="checkbox"
              checked={settings.security.requireEmailVerification}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  security: {
                    ...settings.security,
                    requireEmailVerification: e.target.checked,
                  },
                })
              }
              className="w-5 h-5 rounded bg-white/5 border-white/10 text-blue-600 focus:ring-blue-500"
            />
          </label>

          <label className="flex items-center justify-between">
            <span className="text-white">Allow User Registration</span>
            <input
              type="checkbox"
              checked={settings.security.allowUserRegistration}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  security: {
                    ...settings.security,
                    allowUserRegistration: e.target.checked,
                  },
                })
              }
              className="w-5 h-5 rounded bg-white/5 border-white/10 text-blue-600 focus:ring-blue-500"
            />
          </label>

          <div>
            <label className="block text-white mb-2">
              Session Timeout (minutes)
            </label>
            <input
              type="number"
              value={settings.security.sessionTimeout}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  security: {
                    ...settings.security,
                    sessionTimeout: parseInt(e.target.value) || 30,
                  },
                })
              }
              min="5"
              max="120"
              className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>
      </SettingsSection>
    </div>
  );
}
