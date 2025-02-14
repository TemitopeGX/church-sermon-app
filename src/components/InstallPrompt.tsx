"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDownload,
  faTimes,
  faDesktop,
  faMobileScreen,
} from "@fortawesome/free-solid-svg-icons";

export default function InstallPrompt() {
  const [showPrompt, setShowPrompt] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isInstallable, setIsInstallable] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check if device is mobile
    setIsMobile(/iPhone|iPad|iPod|Android/i.test(navigator.userAgent));

    // Listen for the beforeinstallprompt event
    window.addEventListener("beforeinstallprompt", (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setIsInstallable(true);
    });

    // Check if app is already installed
    if (window.matchMedia("(display-mode: standalone)").matches) {
      setIsInstallable(false);
    }

    // Show prompt after a delay
    const timer = setTimeout(() => {
      setShowPrompt(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;

    try {
      // Show the install prompt
      const result = await deferredPrompt.prompt();
      console.log(`Install prompt result: ${result.outcome}`);

      // Reset the deferred prompt
      setDeferredPrompt(null);
      setShowPrompt(false);
    } catch (error) {
      console.error("Error installing app:", error);
    }
  };

  if (!isInstallable || !showPrompt) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 50 }}
        className="fixed bottom-20 lg:bottom-8 left-4 right-4 lg:left-auto lg:right-8 z-50"
      >
        <div className="bg-white/10 backdrop-blur-xl p-4 rounded-2xl shadow-lg max-w-md mx-auto lg:mx-0">
          <button
            onClick={() => setShowPrompt(false)}
            className="absolute top-2 right-2 text-gray-400 hover:text-white"
          >
            <FontAwesomeIcon icon={faTimes} className="w-4 h-4" />
          </button>

          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center">
              <FontAwesomeIcon
                icon={isMobile ? faMobileScreen : faDesktop}
                className="w-6 h-6 text-white"
              />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-white">
                Install Covenant Media
              </h3>
              <p className="text-sm text-gray-300 mt-1">
                {isMobile
                  ? "Add to your home screen for the best experience"
                  : "Install our desktop app for quick access"}
              </p>
              <button
                onClick={handleInstall}
                className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors"
              >
                <FontAwesomeIcon icon={faDownload} className="w-4 h-4" />
                Install Now
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
