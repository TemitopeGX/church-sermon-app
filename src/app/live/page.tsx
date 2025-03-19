"use client";

import Image from "next/image";
import { useState } from "react";

const serviceSchedule = [
  {
    name: "Sunday Morning Service",
    time: "10:30 AM",
    description:
      "Join us for worship, prayer, and a powerful message from God's Word.",
  },
  {
    name: "Wednesday Bible Study",
    time: "7:00 PM",
    description:
      "Midweek service focused on in-depth Bible teaching and prayer.",
  },
  {
    name: "Friday Prayer Meeting",
    time: "6:30 PM",
    description:
      "Corporate prayer gathering for spiritual growth and intercession.",
  },
];

export default function LivePage() {
  const [platform, setPlatform] = useState<"youtube" | "facebook">("youtube");

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-24 bg-primary-800">
        <div className="absolute inset-0 opacity-20">
          <Image
            src="/images/live-stream.jpg"
            alt="Live Stream"
            fill
            className="object-cover"
          />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            Live Stream
          </h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto">
            Join us for live worship services and experience the presence of God
            wherever you are
          </p>
        </div>
      </section>

      {/* Live Stream Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <div className="flex justify-center gap-4 mb-8">
              <button
                onClick={() => setPlatform("youtube")}
                className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                  platform === "youtube"
                    ? "bg-primary-800 text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                YouTube
              </button>
              <button
                onClick={() => setPlatform("facebook")}
                className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                  platform === "facebook"
                    ? "bg-primary-800 text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                Facebook
              </button>
            </div>
            <div className="aspect-video w-full max-w-4xl mx-auto bg-gray-900 rounded-2xl overflow-hidden">
              {platform === "youtube" ? (
                <iframe
                  src="https://www.youtube.com/embed/live_stream?channel=YOUR_CHANNEL_ID"
                  title="YouTube Live Stream"
                  className="w-full h-full"
                  allowFullScreen
                ></iframe>
              ) : (
                <iframe
                  src="https://www.facebook.com/plugins/video.php?href=https://www.facebook.com/YOUR_PAGE_ID/live/"
                  title="Facebook Live Stream"
                  className="w-full h-full"
                  allowFullScreen
                ></iframe>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Service Schedule */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">
            Service Schedule
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {serviceSchedule.map((service) => (
              <div
                key={service.name}
                className="bg-white p-8 rounded-2xl shadow-sm"
              >
                <h3 className="text-xl font-bold mb-2">{service.name}</h3>
                <p className="text-primary-800 mb-4">{service.time}</p>
                <p className="text-gray-600">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Connect Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Stay Connected</h2>
              <div className="prose prose-lg max-w-none">
                <p className="mb-4">
                  Our live stream services allow you to be part of our church
                  family from anywhere in the world. Join us for live worship,
                  prayer, and teaching.
                </p>
                <p className="mb-6">
                  Subscribe to our channels to receive notifications when we go
                  live and never miss a service.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <a
                    href="https://youtube.com/YOUR_CHANNEL"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-6 py-3 text-lg font-semibold text-white bg-red-600 rounded-full hover:bg-red-700 transition-all duration-300"
                  >
                    Subscribe on YouTube
                  </a>
                  <a
                    href="https://facebook.com/YOUR_PAGE"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-6 py-3 text-lg font-semibold text-white bg-blue-600 rounded-full hover:bg-blue-700 transition-all duration-300"
                  >
                    Follow on Facebook
                  </a>
                </div>
              </div>
            </div>
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
              <Image
                src="/images/live-connect.jpg"
                alt="Stay Connected"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Online Community */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">Join Our Online Community</h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Connect with other online members, share prayer requests, and
            participate in our virtual fellowship groups.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/connect"
              className="inline-flex items-center px-8 py-4 text-lg font-semibold text-white bg-primary-800 rounded-full hover:bg-primary-700 transition-all duration-300"
            >
              Join Online Community
            </a>
            <a
              href="/prayer"
              className="inline-flex items-center px-8 py-4 text-lg font-semibold text-primary-800 border-2 border-primary-800 rounded-full hover:bg-primary-50 transition-all duration-300"
            >
              Submit Prayer Request
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
