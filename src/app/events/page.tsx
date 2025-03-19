"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  CalendarIcon,
  ClockIcon,
  MapPinIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";

const eventCategories = [
  "All",
  "Service",
  "Prayer",
  "Conference",
  "Retreat",
  "Seminar",
  "Children",
];

const upcomingEvents = [
  {
    title: "Sunday Service",
    description:
      "Join us for a powerful time of worship and the Word. Everyone is welcome!",
    date: "Every Sunday",
    time: "10:00 AM",
    location: "Main Sanctuary",
    image: "/images/worship.jpg",
    category: "Service",
  },
  {
    title: "Prayer Meeting",
    description:
      "Come together for corporate prayer as we intercede for our church, city, and nations.",
    date: "Every Wednesday",
    time: "6:30 PM",
    location: "Prayer Room",
    image: "/images/prayer.jpg",
    category: "Prayer",
  },
  {
    title: "Youth Conference 2024",
    description:
      "A three-day conference for young people to encounter God and discover their purpose.",
    date: "April 15-17, 2024",
    time: "6:00 PM",
    location: "Main Sanctuary",
    image: "/images/youth.jpg",
    category: "Conference",
  },
  {
    title: "Women's Retreat",
    description:
      "A weekend of fellowship, worship, and spiritual renewal for women.",
    date: "May 3-5, 2024",
    time: "All Day",
    location: "Mountain Retreat Center",
    image: "/images/women.jpg",
    category: "Retreat",
  },
  {
    title: "Marriage Enrichment Seminar",
    description:
      "Strengthen your marriage through biblical principles and practical insights.",
    date: "May 18, 2024",
    time: "9:00 AM - 4:00 PM",
    location: "Fellowship Hall",
    image: "/images/marriage.jpg",
    category: "Seminar",
  },
  {
    title: "Vacation Bible School",
    description:
      "A fun-filled week of Bible stories, games, and activities for children.",
    date: "June 10-14, 2024",
    time: "9:00 AM - 12:00 PM",
    location: "Children's Center",
    image: "/images/vbs.jpg",
    category: "Children",
  },
];

export default function EventsPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredEvents =
    selectedCategory === "All"
      ? upcomingEvents
      : upcomingEvents.filter((event) => event.category === selectedCategory);

  return (
    <div className="min-h-screen bg-[#f8f8f8]">
      {/* Hero Section */}
      <section className="relative py-20 bg-[#5b2324]">
        <div className="absolute inset-0 overflow-hidden">
          <Image
            src="/images/events-bg.jpg"
            alt="Events Background"
            fill
            className="object-cover opacity-20"
          />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4 font-aurora">
              Events & Calendar
            </h1>
            <p className="text-lg sm:text-xl text-white/80 max-w-3xl mx-auto">
              Stay connected with what's happening at The Covenant Chapel
              International.
            </p>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-8 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-nowrap items-center gap-4 overflow-x-auto pb-4 scrollbar-hide">
            {eventCategories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-all duration-300
                  ${
                    selectedCategory === category
                      ? "bg-[#5b2324] text-white"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Events Grid */}
      <section className="py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredEvents.map((event) => (
              <div
                key={event.title}
                className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300"
              >
                <div className="relative aspect-[16/9]">
                  <Image
                    src={event.image}
                    alt={event.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute top-4 right-4 bg-[#5b2324]/90 text-white px-3 py-1 rounded-full text-sm font-medium">
                    {event.category}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2 text-gray-900">
                    {event.title}
                  </h3>
                  <p className="text-gray-600 mb-4 line-clamp-2">
                    {event.description}
                  </p>
                  <div className="space-y-2 text-sm text-gray-500">
                    <div className="flex items-center">
                      <CalendarIcon className="h-5 w-5 mr-2 text-[#5b2324]" />
                      {event.date}
                    </div>
                    <div className="flex items-center">
                      <ClockIcon className="h-5 w-5 mr-2 text-[#5b2324]" />
                      {event.time}
                    </div>
                    <div className="flex items-center">
                      <MapPinIcon className="h-5 w-5 mr-2 text-[#5b2324]" />
                      {event.location}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-[#5b2324] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6 font-aurora">Get Involved</h2>
          <p className="text-lg text-white/80 mb-8 max-w-2xl mx-auto">
            Want to stay updated with our events? Subscribe to our newsletter or
            follow us on social media.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/newsletter"
              className="inline-flex items-center px-8 py-3 text-[#5b2324] bg-white rounded-full hover:bg-gray-100 transition-all duration-300 font-semibold"
            >
              Subscribe to Updates
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center px-8 py-3 text-white border-2 border-white rounded-full hover:bg-white/10 transition-all duration-300 font-semibold"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
