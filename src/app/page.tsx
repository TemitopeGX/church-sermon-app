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

export default function HomePage() {
  return (
    <main className="flex flex-col min-h-screen">
      {/* Hero Section with Overlay */}
      <section className="relative h-screen">
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
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-white max-w-5xl mx-auto leading-tight">
            WE ENVISION ALL MEN CELEBRATING ENDLESS LIFE IN CHRIST
          </h1>
          <p className="mt-6 text-lg sm:text-xl text-white/90 max-w-2xl mx-auto">
            Join us in worship as we celebrate the transforming power of God's
            love
          </p>
          <Link
            href="/about"
            className="mt-8 inline-flex items-center px-8 py-4 text-lg font-semibold text-primary-800 bg-white rounded-full hover:bg-white/90 transition-all duration-300 transform hover:scale-105"
          >
            Learn More
            <ArrowRightIcon className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </section>

      {/* Quick Links Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Sunday Service Card */}
            <div className="group relative overflow-hidden rounded-2xl aspect-[4/3]">
              <Image
                src="/images/sunday-service.jpg"
                alt="Sunday Service"
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <h3 className="text-2xl font-bold mb-2">Sunday Service</h3>
                <p className="text-white/90 mb-4">
                  Join us for powerful worship and the Word
                </p>
                <Link
                  href="/events"
                  className="inline-flex items-center text-sm font-semibold text-white hover:text-primary-300 transition-colors"
                >
                  View Schedule <ArrowRightIcon className="ml-2 h-4 w-4" />
                </Link>
              </div>
            </div>

            {/* Connect Card */}
            <div className="group relative overflow-hidden rounded-2xl aspect-[4/3]">
              <Image
                src="/images/connect.jpg"
                alt="Connect With Us"
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <h3 className="text-2xl font-bold mb-2">Connect With Us</h3>
                <p className="text-white/90 mb-4">
                  Connect with believers and grow together
                </p>
                <Link
                  href="/connect"
                  className="inline-flex items-center text-sm font-semibold text-white hover:text-primary-300 transition-colors"
                >
                  Join a Group <ArrowRightIcon className="ml-2 h-4 w-4" />
                </Link>
              </div>
            </div>

            {/* Celebrations Card */}
            <div className="group relative overflow-hidden rounded-2xl aspect-[4/3]">
              <Image
                src="/images/celebrations.jpg"
                alt="Celebrations"
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <h3 className="text-2xl font-bold mb-2">Celebrations</h3>
                <p className="text-white/90 mb-4">
                  Experience the joy of fellowship
                </p>
                <Link
                  href="/events"
                  className="inline-flex items-center text-sm font-semibold text-white hover:text-primary-300 transition-colors"
                >
                  View Gallery <ArrowRightIcon className="ml-2 h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Movement Section */}
      <section className="py-24 bg-primary-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            A MOVEMENT THAT CANNOT BE STOPPED!
          </h2>
          <p className="text-xl text-white/90 mb-8">
            A BILLION SOULS IN 10,000 CITIES
          </p>
          <Link
            href="/about"
            className="inline-flex items-center px-8 py-4 text-primary-800 bg-white rounded-full hover:bg-white/90 transition-all duration-300"
          >
            Find out more <ArrowRightIcon className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </section>

      {/* Worship With Us Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
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
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
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
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="relative aspect-[3/4] rounded-2xl overflow-hidden">
              <Image
                src="/images/pastor.jpg"
                alt="Lead Pastor"
                fill
                className="object-cover"
              />
            </div>
            <div>
              <h2 className="text-3xl font-bold mb-6">MEET THE SET MAN</h2>
              <p className="text-lg text-gray-600 mb-8">
                Meet Pastor Emmanuel Fajinmi, Our Lead Pastor has a heart for
                seeing lives transformed through the power of God's Word. With
                over two decades of ministry experience, he leads our church
                with vision, compassion, and a deep commitment to biblical
                truth.
              </p>
              <Link
                href="/about"
                className="inline-flex items-center px-8 py-4 text-white bg-primary-800 rounded-full hover:bg-primary-700 transition-all duration-300"
              >
                Read More <ArrowRightIcon className="ml-2 h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Give Section */}
      <section className="py-24 bg-primary-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Give to The Covenant Chapel
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Your generosity helps us reach more people with the love of Christ
          </p>
          <Link
            href="/give"
            className="inline-flex items-center px-8 py-4 text-primary-800 bg-white rounded-full hover:bg-white/90 transition-all duration-300"
          >
            Give Now <ArrowRightIcon className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold mb-8">JOIN OUR MAILING LIST</h2>
          <form className="max-w-md mx-auto flex gap-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-full border-2 border-gray-300 focus:border-primary-800 focus:ring-0"
            />
            <button
              type="submit"
              className="px-8 py-3 bg-primary-800 text-white rounded-full hover:bg-primary-700 transition-all duration-300"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}
