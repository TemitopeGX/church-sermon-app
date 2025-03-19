"use client";

import { useState } from "react";
import { PlayIcon, PauseIcon } from "@heroicons/react/24/solid";
import { CalendarIcon, ClockIcon } from "@heroicons/react/24/outline";
import Image from "next/image";

// This will be replaced with actual data from your backend
const sermons = [
  {
    id: 1,
    title: "Walking in Faith",
    speaker: "Pastor John Doe",
    date: "2024-03-17",
    duration: "45:30",
    audioUrl: "/sermons/sample.mp3",
    description:
      "A powerful message about walking in faith during challenging times.",
  },
  // Add more sermons here
];

const recentSermons = [
  {
    title: "Walking in Divine Purpose",
    speaker: "Pastor Emmanuel Fajinmi",
    date: "March 17, 2024",
    scripture: "Ephesians 2:10",
    description:
      "Discover how to identify and fulfill God's unique purpose for your life.",
    image: "/images/sermon-purpose.jpg",
  },
  {
    title: "The Power of Prayer",
    speaker: "Pastor Sarah Johnson",
    date: "March 10, 2024",
    scripture: "James 5:16",
    description:
      "Understanding the transformative power of prayer in our daily lives.",
    image: "/images/sermon-prayer.jpg",
  },
  {
    title: "Building Strong Families",
    speaker: "Pastor Emmanuel Fajinmi",
    date: "March 3, 2024",
    scripture: "Joshua 24:15",
    description:
      "Biblical principles for creating and maintaining God-centered families.",
    image: "/images/sermon-family.jpg",
  },
  {
    title: "Faith That Moves Mountains",
    speaker: "Pastor Michael Thompson",
    date: "February 25, 2024",
    scripture: "Matthew 17:20",
    description:
      "Exploring what it means to have mountain-moving faith in today's world.",
    image: "/images/sermon-faith.jpg",
  },
];

const sermonSeries = [
  {
    title: "Foundations of Faith",
    episodes: 6,
    description:
      "Essential teachings about the core principles of Christian faith.",
    image: "/images/series-foundations.jpg",
  },
  {
    title: "Kingdom Living",
    episodes: 8,
    description:
      "Practical insights for living as citizens of God's kingdom in today's world.",
    image: "/images/series-kingdom.jpg",
  },
  {
    title: "Spiritual Warfare",
    episodes: 4,
    description:
      "Understanding and overcoming spiritual battles through God's Word.",
    image: "/images/series-warfare.jpg",
  },
];

export default function SermonsPage() {
  const [playing, setPlaying] = useState<number | null>(null);
  const [audioElement, setAudioElement] = useState<HTMLAudioElement | null>(
    null
  );

  const togglePlay = (sermonId: number, audioUrl: string) => {
    if (playing === sermonId) {
      audioElement?.pause();
      setPlaying(null);
    } else {
      if (audioElement) {
        audioElement.pause();
      }
      const audio = new Audio(audioUrl);
      audio.play();
      setAudioElement(audio);
      setPlaying(sermonId);
    }
  };

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-24 bg-primary-800">
        <div className="absolute inset-0 opacity-20">
          <Image
            src="/images/sermons-hero.jpg"
            alt="Sermons"
            fill
            className="object-cover"
          />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            Sermons
          </h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto">
            Transformative messages that inspire, encourage, and equip you in
            your faith journey
          </p>
        </div>
      </section>

      {/* Recent Sermons Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-12">Recent Sermons</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {recentSermons.map((sermon) => (
              <div
                key={sermon.title}
                className="bg-white rounded-2xl shadow-sm overflow-hidden"
              >
                <div className="relative aspect-[16/9]">
                  <Image
                    src={sermon.image}
                    alt={sermon.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{sermon.title}</h3>
                  <p className="text-primary-800 mb-2">{sermon.speaker}</p>
                  <div className="flex items-center text-sm text-gray-600 mb-4">
                    <span className="mr-4">{sermon.date}</span>
                    <span>{sermon.scripture}</span>
                  </div>
                  <p className="text-gray-600 mb-4">{sermon.description}</p>
                  <div className="flex gap-4">
                    <a
                      href={`/sermons/${sermon.title
                        .toLowerCase()
                        .replace(/\s+/g, "-")}`}
                      className="text-primary-800 font-semibold hover:text-primary-700"
                    >
                      Watch Now
                    </a>
                    <a
                      href={`/sermons/${sermon.title
                        .toLowerCase()
                        .replace(/\s+/g, "-")}/audio`}
                      className="text-primary-800 font-semibold hover:text-primary-700"
                    >
                      Listen
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sermon Series Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-12">Sermon Series</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {sermonSeries.map((series) => (
              <div
                key={series.title}
                className="bg-white rounded-2xl shadow-sm overflow-hidden"
              >
                <div className="relative aspect-[16/9]">
                  <Image
                    src={series.image}
                    alt={series.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{series.title}</h3>
                  <p className="text-primary-800 mb-4">
                    {series.episodes} Episodes
                  </p>
                  <p className="text-gray-600 mb-4">{series.description}</p>
                  <a
                    href={`/sermons/series/${series.title
                      .toLowerCase()
                      .replace(/\s+/g, "-")}`}
                    className="text-primary-800 font-semibold hover:text-primary-700"
                  >
                    View Series
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Archive Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Sermon Archive</h2>
              <div className="prose prose-lg max-w-none">
                <p className="mb-4">
                  Access our complete library of past sermons, organized by
                  date, speaker, topic, and Bible book. Our archive contains
                  years of biblical teaching to help you grow in your faith
                  journey.
                </p>
                <div className="flex gap-4">
                  <a
                    href="/sermons/archive"
                    className="inline-flex items-center px-6 py-3 text-lg font-semibold text-white bg-primary-800 rounded-full hover:bg-primary-700 transition-all duration-300"
                  >
                    Browse Archive
                  </a>
                  <a
                    href="/sermons/topics"
                    className="inline-flex items-center px-6 py-3 text-lg font-semibold text-primary-800 border-2 border-primary-800 rounded-full hover:bg-primary-50 transition-all duration-300"
                  >
                    Browse by Topic
                  </a>
                </div>
              </div>
            </div>
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
              <Image
                src="/images/sermon-archive.jpg"
                alt="Sermon Archive"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Subscribe Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">Never Miss a Message</h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Subscribe to our podcast and receive notifications when new sermons
            are available. Available on all major platforms.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="#"
              className="inline-flex items-center px-6 py-3 text-lg font-semibold text-white bg-primary-800 rounded-full hover:bg-primary-700 transition-all duration-300"
            >
              Apple Podcasts
            </a>
            <a
              href="#"
              className="inline-flex items-center px-6 py-3 text-lg font-semibold text-white bg-primary-800 rounded-full hover:bg-primary-700 transition-all duration-300"
            >
              Spotify
            </a>
            <a
              href="#"
              className="inline-flex items-center px-6 py-3 text-lg font-semibold text-white bg-primary-800 rounded-full hover:bg-primary-700 transition-all duration-300"
            >
              Google Podcasts
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
