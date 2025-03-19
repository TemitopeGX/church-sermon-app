import Image from "next/image";

const programs = [
  {
    title: "Women's Bible Study",
    time: "Tuesdays at 10:00 AM & 7:00 PM",
    description:
      "In-depth Bible study and discussion groups helping women grow in their understanding and application of God's Word.",
  },
  {
    title: "Prayer & Share",
    time: "First Saturday of each month",
    description:
      "Monthly gathering for prayer, fellowship, and mutual encouragement as we share life's joys and challenges.",
  },
  {
    title: "Mentoring Program",
    time: "Flexible Schedule",
    description:
      "One-on-one mentoring relationships pairing experienced women of faith with those seeking guidance and growth.",
  },
  {
    title: "Service Projects",
    time: "Quarterly",
    description:
      "Organized opportunities to serve our community and support various missions and charitable causes.",
  },
];

const upcomingEvents = [
  {
    title: "Women's Conference",
    date: "August 23-25, 2024",
    description:
      "Annual conference featuring inspiring speakers, worship, and workshops focused on spiritual growth and life application.",
  },
  {
    title: "Mother-Daughter Brunch",
    date: "May 11, 2024",
    description:
      "Special celebration of the unique bond between mothers and daughters with fellowship, food, and meaningful activities.",
  },
  {
    title: "Women's Retreat",
    date: "October 18-20, 2024",
    description:
      "Weekend getaway for spiritual renewal, rest, and building deeper connections with God and other women.",
  },
];

export default function WomensMinistryPage() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-24 bg-primary-800">
        <div className="absolute inset-0 opacity-20">
          <Image
            src="/images/womens-ministry.jpg"
            alt="Women's Ministry"
            fill
            className="object-cover"
          />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            Women's Ministry
          </h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto">
            Empowering women to grow in faith, build meaningful relationships,
            and make a difference in their world
          </p>
        </div>
      </section>

      {/* Welcome Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">
                Welcome to Women's Ministry
              </h2>
              <div className="prose prose-lg max-w-none">
                <p className="mb-4">
                  At The Covenant Chapel International, our Women's Ministry is
                  committed to creating a supportive community where women can
                  grow in their relationship with God, develop meaningful
                  friendships, and discover their unique purpose.
                </p>
                <p className="mb-4">
                  We believe that when women are equipped and empowered, they
                  can have a profound impact on their families, church, and
                  community. Through Bible study, prayer, fellowship, and
                  service, we help women flourish in every season of life.
                </p>
                <p>
                  Whether you're seeking spiritual growth, authentic
                  relationships, or opportunities to serve, we invite you to
                  join our community of women supporting and encouraging one
                  another.
                </p>
              </div>
            </div>
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
              <Image
                src="/images/women-welcome.jpg"
                alt="Women's Welcome"
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
          <h2 className="text-3xl font-bold text-center mb-12">Our Programs</h2>
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

      {/* Events Section */}
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

      {/* Testimonial Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
              <Image
                src="/images/women-community.jpg"
                alt="Women's Community"
                fill
                className="object-cover"
              />
            </div>
            <div>
              <h2 className="text-3xl font-bold mb-6">Life Together</h2>
              <div className="prose prose-lg max-w-none">
                <blockquote className="mb-6 text-gray-600 italic">
                  "The Women's Ministry has been a source of strength,
                  encouragement, and spiritual growth for me. Through the Bible
                  studies and mentoring program, I've grown deeper in my faith
                  and found lifelong friendships."
                </blockquote>
                <p className="text-primary-800 font-semibold">
                  - Rachel Thompson, Ministry Member
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">Join Our Community</h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            We'd love to welcome you to our Women's Ministry. Take the first
            step by joining one of our Bible studies or attending an upcoming
            event.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/connect"
              className="inline-flex items-center px-8 py-4 text-lg font-semibold text-white bg-primary-800 rounded-full hover:bg-primary-700 transition-all duration-300"
            >
              Get Connected
            </a>
            <a
              href="/events"
              className="inline-flex items-center px-8 py-4 text-lg font-semibold text-primary-800 border-2 border-primary-800 rounded-full hover:bg-primary-50 transition-all duration-300"
            >
              View All Events
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
