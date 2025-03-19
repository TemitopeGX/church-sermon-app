import Image from "next/image";

const programs = [
  {
    title: "Connect Groups",
    time: "Various Times",
    description:
      "Small groups meeting throughout the week for fellowship, Bible study, and life application discussions.",
  },
  {
    title: "Sunday Gatherings",
    time: "Sundays at 5:00 PM",
    description:
      "Weekly service featuring contemporary worship, relevant teaching, and community building.",
  },
  {
    title: "Leadership Development",
    time: "Monthly",
    description:
      "Training and mentoring program to develop the next generation of church leaders.",
  },
  {
    title: "Social Events",
    time: "Monthly",
    description:
      "Regular social activities, outings, and community service projects to build relationships and serve others.",
  },
];

const ministryAreas = [
  {
    title: "Spiritual Growth",
    description:
      "Bible studies, prayer groups, and discipleship opportunities to deepen your faith journey.",
  },
  {
    title: "Career & Purpose",
    description:
      "Workshops and mentoring to help you integrate your faith with your professional life.",
  },
  {
    title: "Relationships",
    description:
      "Support and guidance for building healthy relationships and preparing for marriage.",
  },
  {
    title: "Community Impact",
    description:
      "Opportunities to serve and make a difference in our local community and beyond.",
  },
];

export default function YoungAdultsPage() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-24 bg-primary-800">
        <div className="absolute inset-0 opacity-20">
          <Image
            src="/images/young-adults.jpg"
            alt="Young Adults Ministry"
            fill
            className="object-cover"
          />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            Young Adults Ministry
          </h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto">
            A community of young professionals and college students pursuing
            God's purpose together
          </p>
        </div>
      </section>

      {/* Welcome Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">
                Welcome to Young Adults
              </h2>
              <div className="prose prose-lg max-w-none">
                <p className="mb-4">
                  Our Young Adults Ministry is designed for those in their 20s
                  and early 30s who are navigating the exciting and challenging
                  seasons of college, career, and early family life.
                </p>
                <p className="mb-4">
                  We believe this is a crucial time in life where having a
                  strong community of believers and mentors can make all the
                  difference in your spiritual journey and life decisions.
                </p>
                <p>
                  Whether you're a college student, young professional, single,
                  or married, we have a place for you to connect, grow, and
                  serve alongside others who are pursuing God's purpose for
                  their lives.
                </p>
              </div>
            </div>
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
              <Image
                src="/images/young-adults-welcome.jpg"
                alt="Young Adults Welcome"
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

      {/* Ministry Areas */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">
            Ministry Focus Areas
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {ministryAreas.map((area) => (
              <div key={area.title} className="bg-gray-50 p-8 rounded-2xl">
                <h3 className="text-xl font-bold mb-4">{area.title}</h3>
                <p className="text-gray-600">{area.description}</p>
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
                src="/images/young-adults-community.jpg"
                alt="Young Adults Community"
                fill
                className="object-cover"
              />
            </div>
            <div>
              <h2 className="text-3xl font-bold mb-6">Life in Community</h2>
              <div className="prose prose-lg max-w-none">
                <blockquote className="mb-6 text-gray-600 italic">
                  "Being part of the Young Adults Ministry has been
                  transformative. I've found genuine friendships, spiritual
                  mentors, and a supportive community that helps me navigate
                  life's challenges while growing in my faith."
                </blockquote>
                <p className="text-primary-800 font-semibold">
                  - Sarah Chen, Young Professional
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
            Take the next step in your faith journey. Connect with other young
            adults who are pursuing God's purpose for their lives.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/connect"
              className="inline-flex items-center px-8 py-4 text-lg font-semibold text-white bg-primary-800 rounded-full hover:bg-primary-700 transition-all duration-300"
            >
              Join a Connect Group
            </a>
            <a
              href="/events"
              className="inline-flex items-center px-8 py-4 text-lg font-semibold text-primary-800 border-2 border-primary-800 rounded-full hover:bg-primary-50 transition-all duration-300"
            >
              View Upcoming Events
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
