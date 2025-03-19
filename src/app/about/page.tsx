import Image from "next/image";
import Link from "next/link";

const aboutSections = [
  {
    title: "Our Story",
    description: "Journey through our history of faith and community building",
    image: "/images/church-history.jpg",
    link: "/about/story",
  },
  {
    title: "Vision & Mission",
    description: "Discover our purpose and plans for the future",
    image: "/images/church-vision.jpg",
    link: "/about/vision",
  },
  {
    title: "Leadership",
    description: "Meet the dedicated team guiding our church",
    image: "/images/church-leadership.jpg",
    link: "/about/leadership",
  },
  {
    title: "What We Believe",
    description: "Explore our foundational beliefs and values",
    image: "/images/church-beliefs.jpg",
    link: "/about/beliefs",
  },
];

const stats = [
  {
    number: "10",
    label: "Years of Ministry",
  },
  {
    number: "1000+",
    label: "Church Members",
  },
  {
    number: "50+",
    label: "Ministry Programs",
  },
  {
    number: "100+",
    label: "Community Projects",
  },
];

export default function AboutPage() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-24 bg-primary-800">
        <div className="absolute inset-0 opacity-20">
          <Image
            src="/images/about-hero.jpg"
            alt="About Our Church"
            fill
            className="object-cover"
          />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            About Our Church
          </h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto">
            Welcome to The Covenant Chapel International, where faith meets
            community and tradition embraces innovation
          </p>
        </div>
      </section>

      {/* Welcome Message */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Welcome to Our Church</h2>
              <div className="prose prose-lg max-w-none">
                <p className="mb-4">
                  The Covenant Chapel International is a vibrant, Spirit-filled
                  community of believers dedicated to celebrating God's love and
                  sharing His message of hope with the world.
                </p>
                <p className="mb-4">
                  Our church is built on the foundation of God's Word, powered
                  by prayer, and committed to making disciples who will impact
                  their world for Christ.
                </p>
                <p>
                  Whether you're exploring faith for the first time or looking
                  for a church to call home, you'll find a warm welcome and a
                  place to belong in our diverse family of believers.
                </p>
              </div>
            </div>
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
              <Image
                src="/images/church-welcome.jpg"
                alt="Welcome to Our Church"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="text-center p-8 bg-white rounded-2xl shadow-sm"
              >
                <div className="text-4xl font-bold text-primary-800 mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Sections */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {aboutSections.map((section) => (
              <Link
                key={section.title}
                href={section.link}
                className="group relative overflow-hidden rounded-2xl"
              >
                <div className="relative aspect-[16/9]">
                  <Image
                    src={section.image}
                    alt={section.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-8">
                    <h3 className="text-2xl font-bold text-white mb-2">
                      {section.title}
                    </h3>
                    <p className="text-white/90">{section.description}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Core Values Preview */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
              <Image
                src="/images/core-values.jpg"
                alt="Our Core Values"
                fill
                className="object-cover"
              />
            </div>
            <div>
              <h2 className="text-3xl font-bold mb-6">Our Core Values</h2>
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-bold mb-2">Biblical Teaching</h3>
                  <p className="text-gray-600">
                    Grounding everything we do in the truth of God's Word.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Authentic Worship</h3>
                  <p className="text-gray-600">
                    Creating space for genuine encounters with God through
                    Spirit-led worship.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Community</h3>
                  <p className="text-gray-600">
                    Building meaningful relationships and supporting one another
                    in faith.
                  </p>
                </div>
                <Link
                  href="/about/beliefs"
                  className="inline-flex items-center px-8 py-4 text-lg font-semibold text-white bg-primary-800 rounded-full hover:bg-primary-700 transition-all duration-300"
                >
                  Learn More About Our Beliefs
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">Join Our Church Family</h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            We'd love to have you join us for worship and become part of our
            church family. Experience the warmth of our community and grow in
            your faith journey with us.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/visit"
              className="inline-flex items-center px-8 py-4 text-lg font-semibold text-white bg-primary-800 rounded-full hover:bg-primary-700 transition-all duration-300"
            >
              Plan Your Visit
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center px-8 py-4 text-lg font-semibold text-primary-800 border-2 border-primary-800 rounded-full hover:bg-primary-50 transition-all duration-300"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
