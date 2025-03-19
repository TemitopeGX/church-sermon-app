import Image from "next/image";

const programs = [
  {
    title: "Men's Bible Study",
    time: "Thursdays at 6:30 AM & 7:00 PM",
    description:
      "Weekly Bible study focused on helping men grow in their faith and apply biblical principles to their daily lives.",
  },
  {
    title: "Brotherhood Breakfast",
    time: "First Saturday of each month",
    description:
      "Monthly fellowship breakfast featuring guest speakers, testimonies, and opportunities to build relationships.",
  },
  {
    title: "Men's Discipleship",
    time: "Various Times",
    description:
      "Small group discipleship program focusing on spiritual growth, accountability, and leadership development.",
  },
  {
    title: "Service Projects",
    time: "Monthly",
    description:
      "Hands-on service opportunities to help those in need and make a practical difference in our community.",
  },
];

const ministryAreas = [
  {
    title: "Spiritual Leadership",
    description:
      "Equipping men to be spiritual leaders in their homes, church, and community through biblical teaching and mentoring.",
  },
  {
    title: "Marriage & Family",
    description:
      "Supporting men in their roles as husbands and fathers through resources, counseling, and fellowship.",
  },
  {
    title: "Career & Purpose",
    description:
      "Helping men integrate their faith with their professional lives and discover God's purpose for their lives.",
  },
  {
    title: "Brotherhood & Support",
    description:
      "Creating opportunities for authentic relationships, accountability, and mutual support among men.",
  },
];

export default function MensMinistryPage() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-24 bg-primary-800">
        <div className="absolute inset-0 opacity-20">
          <Image
            src="/images/mens-ministry.jpg"
            alt="Men's Ministry"
            fill
            className="object-cover"
          />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            Men's Ministry
          </h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto">
            Building men of faith, character, and purpose
          </p>
        </div>
      </section>

      {/* Welcome Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">
                Welcome to Men's Ministry
              </h2>
              <div className="prose prose-lg max-w-none">
                <p className="mb-4">
                  The Men's Ministry at The Covenant Chapel International is
                  committed to helping men grow in their relationship with God,
                  lead their families with wisdom and grace, and make a positive
                  impact in their spheres of influence.
                </p>
                <p className="mb-4">
                  We believe that when men are equipped with God's Word and
                  supported by a community of brothers in Christ, they can
                  fulfill their God-given roles with confidence and purpose.
                </p>
                <p>
                  Through Bible study, fellowship, mentoring, and service
                  opportunities, we help men develop into the leaders God has
                  called them to be.
                </p>
              </div>
            </div>
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
              <Image
                src="/images/men-welcome.jpg"
                alt="Men's Welcome"
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
            Areas of Focus
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
                src="/images/men-community.jpg"
                alt="Men's Community"
                fill
                className="object-cover"
              />
            </div>
            <div>
              <h2 className="text-3xl font-bold mb-6">Brotherhood in Christ</h2>
              <div className="prose prose-lg max-w-none">
                <blockquote className="mb-6 text-gray-600 italic">
                  "The Men's Ministry has helped me grow stronger in my faith
                  and become a better husband and father. The brotherhood and
                  accountability I've found here have been invaluable in my
                  spiritual journey."
                </blockquote>
                <p className="text-primary-800 font-semibold">
                  - David Martinez, Ministry Member
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">Join the Brotherhood</h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Take the next step in your faith journey. Join us for Bible study,
            fellowship, and opportunities to grow as a man of God.
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
              View Events
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
