import Image from "next/image";
import Link from "next/link";
import {
  CalendarIcon,
  ClockIcon,
  MapPinIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";

const upcomingEvents = [
  {
    title: "Sunday Service",
    description:
      "Join us for a powerful time of worship and the Word. Everyone is welcome!",
    date: "Every Sunday",
    time: "10:00 AM",
    location: "Main Sanctuary",
    image: "/images/sunday-service.jpg",
    category: "Service",
  },
  {
    title: "Prayer Meeting",
    description:
      "Come together for corporate prayer as we intercede for our church, city, and nations.",
    date: "Every Wednesday",
    time: "6:30 PM",
    location: "Prayer Room",
    image: "/images/prayer-meeting.jpg",
    category: "Prayer",
  },
  {
    title: "Youth Conference 2024",
    description:
      "A three-day conference for young people to encounter God and discover their purpose.",
    date: "April 15-17, 2024",
    time: "6:00 PM",
    location: "Main Sanctuary",
    image: "/images/youth-conference.jpg",
    category: "Conference",
  },
  {
    title: "Women's Retreat",
    description:
      "A weekend of fellowship, worship, and spiritual renewal for women.",
    date: "May 3-5, 2024",
    time: "All Day",
    location: "Mountain Retreat Center",
    image: "/images/womens-retreat.jpg",
    category: "Retreat",
  },
  {
    title: "Marriage Enrichment Seminar",
    description:
      "Strengthen your marriage through biblical principles and practical insights.",
    date: "May 18, 2024",
    time: "9:00 AM - 4:00 PM",
    location: "Fellowship Hall",
    image: "/images/marriage-seminar.jpg",
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

const categories = [
  "All",
  "Service",
  "Prayer",
  "Conference",
  "Retreat",
  "Seminar",
  "Children",
];

export default function EventsPage() {
  return (
    <div className="relative">
      {/* Hero Section */}
      <section className="relative py-24 bg-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl mb-6">
              Events & Calendar
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Stay connected with what's happening at The Covenant Chapel
              International.
            </p>
          </div>
        </div>
      </section>

      {/* Events Filter */}
      <section className="py-12 border-b border-accent/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-4 justify-center">
            {categories.map((category) => (
              <button
                key={category}
                className={`px-4 py-2 rounded-full text-sm font-medium ${
                  category === "All"
                    ? "bg-primary text-white"
                    : "bg-accent/5 text-foreground hover:bg-accent/10"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Events Grid */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {upcomingEvents.map((event) => (
              <div
                key={event.title}
                className="group relative overflow-hidden rounded-2xl bg-card"
              >
                <div className="aspect-[4/3] relative">
                  <Image
                    src={event.image}
                    alt={event.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute top-4 right-4 bg-primary/90 text-white px-3 py-1 rounded-full text-sm font-medium">
                    {event.category}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{event.title}</h3>
                  <p className="text-muted-foreground mb-4">
                    {event.description}
                  </p>
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <div className="flex items-center">
                      <CalendarIcon className="h-5 w-5 mr-2" />
                      {event.date}
                    </div>
                    <div className="flex items-center">
                      <ClockIcon className="h-5 w-5 mr-2" />
                      {event.time}
                    </div>
                    <div className="flex items-center">
                      <MapPinIcon className="h-5 w-5 mr-2" />
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
      <section className="py-24 bg-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">Get Involved</h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Want to stay updated with our events? Subscribe to our newsletter or
            follow us on social media.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/newsletter" className="btn-primary">
              Subscribe to Updates
            </Link>
            <Link href="/contact" className="btn-secondary">
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
