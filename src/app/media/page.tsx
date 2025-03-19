"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  PlayIcon,
  VideoCameraIcon,
  MicrophoneIcon,
  PhotoIcon,
  GlobeAltIcon,
} from "@heroicons/react/24/solid";
import { FaYoutube, FaFacebook, FaInstagram } from "react-icons/fa";

const services = [
  {
    icon: VideoCameraIcon,
    title: "Live Production",
    description:
      "Professional live streaming and video production for all church events",
  },
  {
    icon: MicrophoneIcon,
    title: "Audio Engineering",
    description:
      "High-quality sound mixing and audio production for crystal clear sound",
  },
  {
    icon: PhotoIcon,
    title: "Photography",
    description:
      "Capturing precious moments and memories of our church community",
  },
  {
    icon: GlobeAltIcon,
    title: "Social Media",
    description:
      "Engaging content creation and management across all platforms",
  },
];

const sermons = [
  {
    title: "Walking in God's Purpose",
    preacher: "Pastor John Smith",
    date: "March 24, 2024",
    duration: "55:20",
    thumbnail: "/images/sermons/sermon-1.jpg",
    description: "Discover your divine purpose and walk in it with confidence.",
  },
  {
    title: "The Power of Faith",
    preacher: "Pastor John Smith",
    date: "March 17, 2024",
    duration: "1:02:15",
    thumbnail: "/images/sermons/sermon-2.jpg",
    description: "Understanding how faith moves mountains in our daily lives.",
  },
  {
    title: "Living in Divine Grace",
    preacher: "Pastor John Smith",
    date: "March 10, 2024",
    duration: "58:45",
    thumbnail: "/images/sermons/sermon-3.jpg",
    description: "Experiencing God's unmerited favor in every area of life.",
  },
];

const socialLinks = [
  {
    name: "YouTube",
    url: "https://youtube.com/@yourchurch",
    icon: FaYoutube,
    color: "text-red-600",
    followers: "50K+",
  },
  {
    name: "Facebook",
    url: "https://facebook.com/yourchurch",
    icon: FaFacebook,
    color: "text-blue-600",
    followers: "35K+",
  },
  {
    name: "Instagram",
    url: "https://instagram.com/yourchurch",
    icon: FaInstagram,
    color: "text-pink-600",
    followers: "25K+",
  },
];

export default function MediaPage() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <main className="min-h-screen">
      {/* Hero Section with Video Background */}
      <section className="relative h-[85vh] overflow-hidden bg-black">
        <div className="absolute inset-0">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover opacity-60"
          >
            <source src="/videos/media-bg.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/70" />
        </div>
        <div className="relative z-10 h-full flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-4xl sm:text-5xl lg:text-7xl font-bold text-white mb-6 font-aurora"
            >
              Media Ministry
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl sm:text-2xl text-white/90 max-w-3xl mx-auto mb-8"
            >
              Spreading God's Word through modern technology and reaching hearts
              across the globe.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Link
                href="/live"
                className="inline-flex items-center px-8 py-4 bg-[#5b2324] text-white rounded-full hover:bg-[#4a1c1d] transition-all duration-300 transform hover:scale-105"
              >
                <PlayIcon className="w-6 h-6 mr-2" />
                Watch Live Stream
              </Link>
              <Link
                href="/sermons"
                className="inline-flex items-center px-8 py-4 bg-white/10 text-white rounded-full hover:bg-white/20 backdrop-blur-sm transition-all duration-300 transform hover:scale-105"
              >
                <VideoCameraIcon className="w-6 h-6 mr-2" />
                View Latest Sermons
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-[#f8f8f8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 font-aurora">
              What We Do
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our team combines creativity, technical expertise, and spiritual
              dedication to share God's message through modern technology.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              >
                <service.icon className="w-12 h-12 text-[#5b2324] mb-4" />
                <h3 className="text-xl font-bold mb-2">{service.title}</h3>
                <p className="text-gray-600">{service.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section with Parallax */}
      <section className="relative py-24 overflow-hidden bg-[#5b2324]">
        <div className="absolute inset-0">
          <Image
            src="/images/media-team.jpg"
            alt="Media Team"
            fill
            className="object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#5b2324] via-[#5b2324]/95 to-[#5b2324]/90" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4 font-aurora">
              Our Media Team
            </h2>
            <p className="text-lg text-white/80 max-w-2xl mx-auto">
              Meet the dedicated individuals who work behind the scenes to bring
              you quality content and meaningful experiences.
            </p>
          </motion.div>
          <div className="relative aspect-[21/9] rounded-2xl overflow-hidden shadow-2xl">
            <Image
              src="/images/media-team.jpg"
              alt="Our Media Team"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-8">
              <p className="text-xl text-white/90 max-w-3xl">
                Our media team combines creativity, technical expertise, and
                spiritual dedication to share God's message through modern
                technology.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Recent Sermons with Hover Effects */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 font-aurora">
              Recent Sermons
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Watch and listen to our latest messages and get inspired by God's
              Word.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sermons.map((sermon, index) => (
              <motion.div
                key={sermon.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="relative aspect-video">
                  <Image
                    src={sermon.thumbnail}
                    alt={sermon.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <PlayIcon className="w-16 h-16 text-white transform scale-90 group-hover:scale-100 transition-transform duration-300" />
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-4 text-gray-500 text-sm mb-2">
                    <span>{sermon.date}</span>
                    <span>•</span>
                    <span>{sermon.duration}</span>
                  </div>
                  <h3 className="text-xl font-bold mb-2 group-hover:text-[#5b2324] transition-colors duration-300">
                    {sermon.title}
                  </h3>
                  <p className="text-gray-600 mb-3 line-clamp-2">
                    {sermon.description}
                  </p>
                  <p className="text-[#5b2324] font-medium">
                    {sermon.preacher}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-center mt-12"
          >
            <Link
              href="/sermons"
              className="inline-flex items-center px-8 py-3 bg-[#5b2324] text-white rounded-full hover:bg-[#4a1c1d] transition-all duration-300 transform hover:scale-105"
            >
              View All Sermons
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Social Media Section with Stats */}
      <section className="py-16 bg-gradient-to-r from-[#5b2324] to-[#8b3536]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4 font-aurora">
              Connect With Us
            </h2>
            <p className="text-xl text-white/80 mb-12 max-w-2xl mx-auto">
              Follow us on social media to stay updated with our latest content
              and connect with our community.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={social.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{
                    opacity: isVisible ? 1 : 0,
                    y: isVisible ? 0 : 20,
                  }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group bg-white/10 backdrop-blur-sm rounded-2xl p-6 hover:bg-white/20 transition-all duration-300"
                >
                  <div className="flex flex-col items-center">
                    <social.icon
                      className={`w-12 h-12 ${social.color} group-hover:scale-110 transition-transform duration-300`}
                    />
                    <h3 className="text-xl font-bold text-white mt-4 mb-2">
                      {social.name}
                    </h3>
                    <p className="text-white/80">
                      {social.followers} Followers
                    </p>
                  </div>
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
