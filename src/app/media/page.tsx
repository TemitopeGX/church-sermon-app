"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import {
  PlayIcon,
  VideoCameraIcon,
  MicrophoneIcon,
  PhotoIcon,
  GlobeAltIcon,
} from "@heroicons/react/24/solid";
import { FaYoutube, FaFacebook, FaInstagram } from "react-icons/fa";

const featuredContent = {
  title: "Sunday Service: The Power of Faith",
  description:
    "Join Pastor Johnson as he explores how faith can move mountains in our daily lives.",
  image: "/images/sermon-featured.jpg",
  date: "March 24, 2024",
  duration: "1:25:30",
  type: "sermon",
};

const mediaCategories = [
  {
    id: "all",
    name: "All Content",
    icon: PlayIcon,
  },
  {
    id: "sermons",
    name: "Sermons",
    icon: VideoCameraIcon,
  },
  {
    id: "podcasts",
    name: "Podcasts",
    icon: MicrophoneIcon,
  },
  {
    id: "gallery",
    name: "Photo Gallery",
    icon: PhotoIcon,
  },
];

const recentContent = [
  {
    title: "Walking in God's Purpose",
    type: "sermon",
    image: "/images/sermon-1.jpg",
    date: "March 17, 2024",
    duration: "55:20",
  },
  {
    title: "Faith Talk: Prayer Life",
    type: "podcast",
    image: "/images/podcast-1.jpg",
    date: "March 15, 2024",
    duration: "45:10",
  },
  {
    title: "Youth Conference 2024",
    type: "gallery",
    image: "/images/gallery-1.jpg",
    date: "March 10, 2024",
    photoCount: "32 photos",
  },
  // Add more content items as needed
];

// Remove individual team members data since we're using a single image
const teamImage = {
  src: "/images/team/media-team.jpg",
  alt: "Our Media Team",
};

// Updated social links to use Font Awesome icons
const socialLinks = [
  {
    name: "YouTube",
    url: "https://youtube.com/@yourchurch",
    icon: FaYoutube,
    color: "text-red-600",
  },
  {
    name: "Facebook",
    url: "https://facebook.com/yourchurch",
    icon: FaFacebook,
    color: "text-blue-600",
  },
  {
    name: "Instagram",
    url: "https://instagram.com/yourchurch",
    icon: FaInstagram,
    color: "text-pink-600",
  },
];

// Sample sermons - replace with data from your admin dashboard
const sermons = [
  {
    title: "Walking in God's Purpose",
    preacher: "Pastor John Smith",
    date: "March 24, 2024",
    duration: "55:20",
    thumbnail: "/images/sermons/sermon-1.jpg",
    videoUrl: "#",
  },
  // Add more sermons from your dashboard
];

export default function MediaPage() {
  const [activeCategory, setActiveCategory] = useState("all");

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative py-24 bg-primary-800">
        <div className="absolute inset-0 opacity-20">
          <Image
            src="/images/media-hero.jpg"
            alt="Media Center"
            fill
            className="object-cover"
          />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            Media Ministry
          </h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto">
            Spreading God's Word through modern technology and reaching hearts
            across the globe.
          </p>
        </div>
      </section>

      {/* Team Section - Updated to single landscape image */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Media Team</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Meet the dedicated individuals who work behind the scenes to bring
              you quality content and meaningful experiences.
            </p>
          </div>
          <div className="relative aspect-[21/9] rounded-2xl overflow-hidden shadow-lg">
            <Image
              src={teamImage.src}
              alt={teamImage.alt}
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
              <p className="text-lg font-medium max-w-3xl">
                Our media team combines creativity, technical expertise, and
                spiritual dedication to share God's message through modern
                technology.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Live Stream Section */}
      <section className="py-16 bg-gradient-to-br from-primary-900 to-primary-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Join Us Live</h2>
              <p className="text-white/90 text-lg mb-8">
                Can't make it to church? Join our live stream services and be
                part of our worship experience from anywhere in the world.
              </p>
              <Link
                href="/live"
                className="inline-flex items-center gap-2 px-8 py-4 bg-white text-primary-800 rounded-full font-semibold hover:bg-gray-100 transition-colors"
              >
                <GlobeAltIcon className="h-5 w-5" />
                Watch Live Stream
              </Link>
            </div>
            <div className="relative aspect-video rounded-2xl overflow-hidden">
              <Image
                src="/images/live-stream-preview.jpg"
                alt="Live Stream Preview"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                <PlayIcon className="h-16 w-16 text-white" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sermons Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Recent Sermons</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Watch and listen to our latest messages and get inspired by God's
              Word.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sermons.map((sermon) => (
              <div
                key={sermon.title}
                className="bg-white rounded-2xl overflow-hidden shadow-sm group hover:shadow-md transition-shadow"
              >
                <div className="relative aspect-video">
                  <Image
                    src={sermon.thumbnail}
                    alt={sermon.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity">
                    <PlayIcon className="h-16 w-16 text-white" />
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-4 text-gray-500 text-sm mb-2">
                    <span>{sermon.date}</span>
                    <span>•</span>
                    <span>{sermon.duration}</span>
                  </div>
                  <h3 className="text-xl font-bold mb-2">{sermon.title}</h3>
                  <p className="text-primary-800 font-medium">
                    {sermon.preacher}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Media Section - Updated with Font Awesome icons */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Connect With Us</h2>
          <p className="text-gray-600 max-w-2xl mx-auto mb-8">
            Follow us on social media to stay updated with our latest content
            and connect with our community.
          </p>
          <div className="flex justify-center gap-12">
            {socialLinks.map((social) => (
              <a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group"
              >
                <div className="w-16 h-16 rounded-full bg-white shadow-sm flex items-center justify-center group-hover:bg-gray-50 transition-colors">
                  <social.icon
                    className={`w-8 h-8 ${social.color} transition-transform group-hover:scale-110`}
                  />
                </div>
                <span className="block mt-2 text-sm font-medium text-gray-600">
                  {social.name}
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
