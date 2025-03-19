import Image from "next/image";

const programs = [
  {
    title: "Youth Service",
    time: "Sundays at 10:30 AM",
    description:
      "Dynamic worship and relevant teaching designed specifically for teens, helping them apply biblical principles to their daily lives.",
  },
  {
    title: "Life Groups",
    time: "Wednesdays at 6:30 PM",
    description:
      "Small group meetings where youth can build meaningful relationships, discuss life challenges, and grow in their faith together.",
  },
  {
    title: "Youth Night",
    time: "Fridays at 7:00 PM",
    description:
      "Fun-filled evening of games, worship, fellowship, and spiritual growth activities.",
  },
  {
    title: "Discipleship Program",
    time: "Various Times",
    description:
      "Mentoring program pairing youth with mature believers for personal spiritual development and leadership training.",
  },
];

const upcomingEvents = [
  {
    title: "Summer Youth Camp",
    date: "July 15-19, 2024",
    description:
      "Five days of adventure, worship, and spiritual growth at Camp Wilderness.",
  },
  {
    title: "Youth Conference",
    date: "September 8-10, 2024",
    description:
      "Annual youth conference featuring guest speakers, workshops, and worship.",
  },
  {
    title: "Mission Trip",
    date: "December 27-31, 2024",
    description:
      "Service opportunity to share God's love through community outreach projects.",
  },
];

export default function YouthMinistryPage() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-24 bg-primary-800">
        <div className="absolute inset-0 opacity-20">
          <Image
            src="/images/youth-ministry.jpg"
            alt="Youth Ministry"
            fill
            className="object-cover"
          />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            Youth Ministry
          </h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto">
            Empowering the next generation to live boldly for Christ
          </p>
        </div>
      </section>

      {/* Welcome Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">
                Welcome to Youth Ministry
              </h2>
              <div className="prose prose-lg max-w-none">
                <p className="mb-4">
                  At The Covenant Chapel International, our youth ministry is
                  dedicated to helping teenagers navigate their faith journey
                  during these crucial years of their lives.
                </p>
                <p className="mb-4">
                  We create an environment where youth can encounter God, build
                  lasting friendships, and develop their leadership potential
                  while having fun and growing in their faith.
                </p>
                <p>
                  Through relevant teaching, meaningful worship, and authentic
                  relationships, we equip young people to stand firm in their
                  faith and make a positive impact in their world.
                </p>
              </div>
            </div>
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
              <Image
                src="/images/youth-welcome.jpg"
                alt="Youth Welcome"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Programs Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">
            Weekly Programs
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {programs.map((program) => (
              <div
                key={program.title}
                className="bg-white p-8 rounded-2xl shadow-sm"
              >
                <h3 className="text-xl font-bold mb-2">{program.title}</h3>
                <p className="text-primary-800 mb-4">{program.time}</p>
                <p className="text-gray-600">{program.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">
            Upcoming Events
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {upcomingEvents.map((event) => (
              <div key={event.title} className="bg-gray-50 p-8 rounded-2xl">
                <h3 className="text-xl font-bold mb-2">{event.title}</h3>
                <p className="text-primary-800 mb-4">{event.date}</p>
                <p className="text-gray-600">{event.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Get Involved Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
              <Image
                src="/images/youth-involved.jpg"
                alt="Get Involved"
                fill
                className="object-cover"
              />
            </div>
            <div>
              <h2 className="text-3xl font-bold mb-6">Get Involved</h2>
              <div className="prose prose-lg max-w-none">
                <p className="mb-4">
                  There are many ways to get involved in our youth ministry:
                </p>
                <ul className="space-y-2">
                  <li>Join our weekly youth services and Life Groups</li>
                  <li>Participate in outreach and mission opportunities</li>
                  <li>Serve on our youth worship team</li>
                  <li>Join our leadership development program</li>
                  <li>Attend special events and camps</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">Join Our Youth Community</h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            We'd love to welcome you to our youth ministry. Come experience
            authentic community, meaningful worship, and life-changing
            encounters with God.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/connect"
              className="inline-flex items-center px-8 py-4 text-lg font-semibold text-white bg-primary-800 rounded-full hover:bg-primary-700 transition-all duration-300"
            >
              Join Us This Week
            </a>
            <a
              href="/contact"
              className="inline-flex items-center px-8 py-4 text-lg font-semibold text-primary-800 border-2 border-primary-800 rounded-full hover:bg-primary-50 transition-all duration-300"
            >
              Contact Youth Pastor
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
