"use client";

import type { StaticImport } from "next/dist/shared/lib/get-img-props";
import Image from "next/image";
import Link from "next/link";
import {
  CalendarIcon,
  VideoCameraIcon,
  UserGroupIcon,
  HeartIcon,
  ArrowRightIcon,
} from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";

const upcomingEvents = [
  {
    id: 1,
    title: "Sunday Service",
    date: "Every Sunday",
    time: "10:00 AM",
    location: "Main Campus",
  },
  {
    id: 2,
    title: "Prayer Meeting",
    date: "Every Wednesday",
    time: "6:30 PM",
    location: "Prayer Room",
  },
  {
    id: 3,
    title: "Youth Service",
    date: "Every Friday",
    time: "7:00 PM",
    location: "Youth Center",
  },
];

const ministries = [
  {
    name: "Worship",
    description: "Experience powerful worship and encounter God's presence",
    icon: VideoCameraIcon,
    href: "/ministries/worship",
  },
  {
    name: "Community",
    description: "Connect with others and grow together in faith",
    icon: UserGroupIcon,
    href: "/ministries/community",
  },
  {
    name: "Outreach",
    description: "Share God's love through local and global missions",
    icon: HeartIcon,
    href: "/ministries/outreach",
  },
];

const featuredContent = [
  {
    title: "Sunday Service",
    description: "Join us for powerful worship and the Word",
    image: "/images/worship.jpg",
    link: "/live",
  },
  {
    title: "Our Social Media",
    description: "Connect with believers and grow together",
    image: "/images/social.jpg",
    link: "/connect",
  },
  {
    title: "Celebrations",
    description: "Experience the joy of fellowship",
    image: "/images/celebration.jpg",
    link: "/events",
  },
];

interface Location {
  name: string;
  image?: string | StaticImport;
  address: string;
  isMap?: boolean;
}

const locations: Location[] = [
  {
    name: "Main Sanctuary",
    image: "/images/church-building.jpg",
    address: "THE COVENANT CHAPEL INT'L, Osogbo, Osun State",
  },
  {
    name: "Get Directions",
    address: "Find your way to our church",
    isMap: true,
  },
];

const quickLinks = [
  {
    title: "Sunday Service",
    description: "Join us for powerful worship and the Word",
    image: "/images/worship.jpg",
    link: "/events",
    linkText: "View Schedule",
  },
  {
    title: "Connect With Us",
    description: "Visit our Social Media Platform",
    image: "/images/social.jpg",
    link: "/connect",
    linkText: "Visit our social media",
  },
  {
    title: "Celebrations",
    description: "Experience the joy of fellowship",
    image: "/images/celebrations.jpg",
    link: "/events",
    linkText: "View Gallery",
  },
];

export default function HomePage() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  return (
    <main className="flex flex-col min-h-screen">
      {/* Hero Section with Overlay */}
      <section className="relative h-[80vh] sm:h-screen">
        <div className="absolute inset-0">
          <Image
            src="/images/hero-worship.jpg"
            alt="Worship at The Covenant Chapel"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl sm:text-4xl lg:text-7xl font-bold text-white max-w-5xl mx-auto leading-tight">
            WE ENVISION ALL MEN CELEBRATING ENDLESS LIFE IN CHRIST
          </h1>
          <p className="mt-4 sm:mt-6 text-base sm:text-xl text-white/90 max-w-2xl mx-auto">
            Join us in worship as we celebrate the transforming power of God's
            love
          </p>
          <Link
            href="/about"
            className="mt-6 sm:mt-8 inline-flex items-center px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-semibold text-primary-800 bg-white rounded-full hover:bg-white/90 transition-all duration-300 transform hover:scale-105"
          >
            Learn More
            <ArrowRightIcon className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
          </Link>
        </div>
      </section>

      {/* Quick Links Section */}
      <section className="py-10 sm:py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8 sm:mb-12 font-aurora">
          WELCOME TO CHURCH!
        </h2>
        <div className="max-w-7xl mx-auto">
          {isMobile ? (
            <Swiper
              modules={[Autoplay, Pagination]}
              spaceBetween={16}
              slidesPerView={1}
              autoplay={{ delay: 3000, disableOnInteraction: false }}
              pagination={{ clickable: true }}
              className="w-full"
            >
              {quickLinks.map((card, index) => (
                <SwiperSlide key={index}>
                  <div className="group relative overflow-hidden rounded-2xl aspect-[4/3]">
                    <Image
                      src={card.image}
                      alt={card.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 text-white">
                      <h3 className="text-lg sm:text-2xl font-bold mb-1 sm:mb-2">
                        {card.title}
                      </h3>
                      <p className="text-sm sm:text-base text-white/90 mb-2 sm:mb-4">
                        {card.description}
                      </p>
                      <Link
                        href={card.link}
                        className="inline-flex items-center text-xs sm:text-sm font-semibold text-white hover:text-primary-300 transition-colors"
                      >
                        {card.linkText}{" "}
                        <ArrowRightIcon className="ml-2 h-3 w-3 sm:h-4 sm:w-4" />
                      </Link>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8">
              {quickLinks.map((card, index) => (
                <div
                  key={index}
                  className="group relative overflow-hidden rounded-2xl aspect-[4/3]"
                >
                  <Image
                    src={card.image}
                    alt={card.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 text-white">
                    <h3 className="text-lg sm:text-2xl font-bold mb-1 sm:mb-2">
                      {card.title}
                    </h3>
                    <p className="text-sm sm:text-base text-white/90 mb-2 sm:mb-4">
                      {card.description}
                    </p>
                    <Link
                      href={card.link}
                      className="inline-flex items-center text-xs sm:text-sm font-semibold text-white hover:text-primary-300 transition-colors"
                    >
                      {card.linkText}{" "}
                      <ArrowRightIcon className="ml-2 h-3 w-3 sm:h-4 sm:w-4" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Movement Section */}
      <section className="py-16 sm:py-24 bg-primary-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 font-aurora">
            A MOVEMENT THAT CANNOT BE STOPPED!
          </h2>
          <p className="text-lg sm:text-xl text-white/90 mb-6 sm:mb-8">
            A BILLION SOULS IN 10,000 CITIES
          </p>
          <Link
            href="/about"
            className="inline-flex items-center px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-semibold text-primary-800 bg-white rounded-full hover:bg-white/90 transition-all duration-300"
          >
            Find out more{" "}
            <ArrowRightIcon className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
          </Link>
        </div>
      </section>

      {/* Worship With Us Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 font-aurora">
            WORSHIP WITH US
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Church Image Card */}
            <div className="relative overflow-hidden rounded-2xl aspect-video">
              <Image
                src="/images/church-building.jpg"
                alt="Main Sanctuary"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <h3 className="text-2xl font-bold mb-2">Main Sanctuary</h3>
                <p className="text-white/90">
                  THE COVENANT CHAPEL INT'L, Osogbo, Osun State
                </p>
              </div>
            </div>

            {/* Map Card */}
            <div className="relative overflow-hidden rounded-2xl aspect-video">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2579.6797708032454!2d4.5233585017260625!3d7.784091334972844!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1037874ec3e98a1b%3A0xad63f1a933d7907d!2sTHE%20COVENANT%20CHAPEL%20INT'L!5e0!3m2!1sen!2sng!4v1742298048825!5m2!1sen!2sng"
                className="absolute inset-0 w-full h-full border-0"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
              <div className="absolute bottom-0 left-0 right-0 p-6 flex justify-end">
                <a
                  href="https://maps.app.goo.gl/AkGw9D3DESwF2g3V8"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-6 py-3 text-sm font-semibold bg-primary-800 text-white rounded-full hover:bg-primary-700 transition-all duration-300"
                >
                  See Directions
                  <ArrowRightIcon className="ml-2 h-4 w-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quote Section */}
      <section className="relative py-32">
        <div className="absolute inset-0">
          <Image
            src="/images/worship-background.jpg"
            alt="Worship Background"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/60" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6 font-aurora">
            WE BOAST IN CHRIST JESUS
          </h2>
          <p className="text-xl text-white/90 max-w-3xl mx-auto italic">
            "For it is by grace you have been saved, through faith—and this is
            not from yourselves, it is the gift of God." - Ephesians 2:8
          </p>
          <Link
            href="/about"
            className="mt-8 inline-flex items-center px-8 py-4 text-primary-800 bg-white rounded-full hover:bg-white/90 transition-all duration-300"
          >
            Learn More <ArrowRightIcon className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </section>

      {/* Pastor Section */}
      <section className="py-16 sm:py-24 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12 items-center">
            <div className="relative aspect-[4/5] sm:aspect-[3/4] overflow-hidden">
              <Image
                src="/images/pastor.jpg"
                alt="Lead Pastor"
                fill
                className="object-cover"
              />
            </div>
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-white font-aurora">
                MEET THE SET MAN
              </h2>
              <p className="text-base sm:text-lg text-gray-300 mb-6 sm:mb-8">
                Meet Pastor Emmanuel Fajinmi, Our Lead Pastor has a heart for
                seeing lives transformed through the power of God's Word. With
                over two decades of ministry experience, he leads our church
                with vision, compassion, and a deep commitment to biblical
                truth.
              </p>
              <Link
                href="/about"
                className="inline-flex items-center px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-semibold text-black bg-white rounded-full hover:bg-gray-100 transition-all duration-300"
              >
                Read More{" "}
                <ArrowRightIcon className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Monthly Banner Section */}
      <section className="py-12 sm:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative aspect-[21/9] w-full overflow-hidden rounded-2xl shadow-xl">
            <Image
              src="/images/monthly-flyer.jpg"
              alt="Monthly Church Program"
              fill
              className="object-cover"
            />
            {/* Optional overlay for text visibility */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent" />
            <div className="absolute bottom-0 left-0 p-6 sm:p-8 text-white">
              <h2 className="text-2xl sm:text-3xl font-bold mb-2 font-aurora">
                March 2025
              </h2>
              <p className="text-lg sm:text-xl text-white/90 max-w-xl">
                Our Season Of Infallible Proofs
              </p>
            </div>
            {/* Optional CTA button */}
            <div className="absolute bottom-6 sm:bottom-8 right-6 sm:right-8">
              <Link
                href="/events"
                className="inline-flex items-center px-6 py-3 text-sm font-semibold bg-white text-primary-800 rounded-full hover:bg-white/90 transition-all duration-300 shadow-lg"
              >
                View All Events <ArrowRightIcon className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Give Section */}
      <section className="py-16 bg-[#ffefef] text-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#ffefef] rounded-3xl p-8 sm:p-12 relative overflow-hidden">
            <div className="relative z-10">
              <h2 className="text-4xl sm:text-5xl font-bold mb-4 text-black font-aurora">
                ONLINE SEEDING
              </h2>
              <p className="text-lg text-gray-700 mb-8">
                Your generosity keeps blessing lives, thank you for giving.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  href="/give"
                  className="inline-flex items-center px-8 py-3 text-black bg-[#e94f4f] rounded-full hover:bg-[#d64545] transition-all duration-300"
                >
                  ONLINE SEEDING
                </Link>
              </div>
            </div>
            {/* Decorative hand illustration on the right */}
            <div className="absolute right-0 bottom-0 w-1/3 h-full opacity-20">
              <Image
                src="/images/giving-hand.png"
                alt="Decorative hand illustration"
                fill
                className="object-contain object-right-bottom"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 bg-[#5b2324] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 font-aurora">
            JOIN OUR MAILING LIST
          </h2>
          <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
            We promise not to spam you, but send you edifying and amazing
            content regularly from Celebration Church International.
          </p>
          <form className="max-w-xl mx-auto">
            <div className="flex flex-col sm:flex-row gap-4">
              <input
                type="email"
                placeholder="Email address"
                className="flex-1 px-6 py-3 rounded-full border-0 focus:ring-2 focus:ring-white bg-white/20 text-white placeholder-white/70"
              />
              <button
                type="submit"
                className="px-8 py-3 bg-white text-[#5b2324] font-semibold rounded-full hover:bg-gray-100 transition-all duration-300"
              >
                SUBMIT
              </button>
            </div>
          </form>
        </div>
      </section>
    </main>
  );
}
