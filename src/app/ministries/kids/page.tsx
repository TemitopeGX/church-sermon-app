import Image from "next/image";

const programs = [
  {
    title: "Sunday School",
    age: "Ages 4-12",
    time: "Sundays at 9:00 AM",
    description:
      "Age-appropriate Bible lessons, worship, and activities that help children understand and apply God's Word to their lives.",
  },
  {
    title: "Kids Worship",
    age: "Ages 4-12",
    time: "Sundays at 10:30 AM",
    description:
      "Dynamic worship experience designed specifically for children, including music, dance, and interactive Bible stories.",
  },
  {
    title: "Bible Adventures",
    age: "Ages 6-12",
    time: "Wednesdays at 6:30 PM",
    description:
      "Midweek program featuring Bible study, games, crafts, and character-building activities.",
  },
  {
    title: "Little Lambs",
    age: "Ages 2-3",
    time: "Sundays at 10:30 AM",
    description:
      "Nurturing environment for toddlers to learn about Jesus through play, songs, and simple Bible lessons.",
  },
];

export default function KidsMinistryPage() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-24 bg-primary-800">
        <div className="absolute inset-0 opacity-20">
          <Image
            src="/images/kids-ministry.jpg"
            alt="Kids Ministry"
            fill
            className="object-cover"
          />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            Kids Ministry
          </h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto">
            Nurturing young hearts in the love and knowledge of Jesus Christ
          </p>
        </div>
      </section>

      {/* Welcome Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">
                Welcome to Kids Ministry
              </h2>
              <div className="prose prose-lg max-w-none">
                <p className="mb-4">
                  At The Covenant Chapel International, we believe that children
                  are a precious gift from God and that it's our responsibility
                  to help them grow in their faith from an early age.
                </p>
                <p className="mb-4">
                  Our Kids Ministry provides a safe, fun, and nurturing
                  environment where children can learn about God's love, develop
                  lasting friendships, and build a strong foundation of faith
                  that will guide them throughout their lives.
                </p>
                <p>
                  Through age-appropriate teaching, worship, and activities, we
                  help children discover their identity in Christ and develop a
                  personal relationship with Him.
                </p>
              </div>
            </div>
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
              <Image
                src="/images/kids-welcome.jpg"
                alt="Kids Welcome"
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
                <p className="text-primary-800 mb-2">{program.age}</p>
                <p className="text-gray-600 mb-4">{program.time}</p>
                <p className="text-gray-600">{program.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Safety Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
              <Image
                src="/images/kids-safety.jpg"
                alt="Kids Safety"
                fill
                className="object-cover"
              />
            </div>
            <div>
              <h2 className="text-3xl font-bold mb-6">Your Child's Safety</h2>
              <div className="prose prose-lg max-w-none">
                <p className="mb-4">
                  We prioritize the safety and security of every child in our
                  care. Our comprehensive child protection policy includes:
                </p>
                <ul className="space-y-2">
                  <li>Background-checked and trained staff and volunteers</li>
                  <li>Secure check-in/check-out system</li>
                  <li>Well-maintained and age-appropriate facilities</li>
                  <li>Emergency response procedures</li>
                  <li>Strict health and sanitization protocols</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">Join Our Kids Ministry</h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            We'd love to welcome your children to our programs. Register today
            or contact us to learn more about how we can serve your family.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/connect"
              className="inline-flex items-center px-8 py-4 text-lg font-semibold text-white bg-primary-800 rounded-full hover:bg-primary-700 transition-all duration-300"
            >
              Register Your Child
            </a>
            <a
              href="/contact"
              className="inline-flex items-center px-8 py-4 text-lg font-semibold text-primary-800 border-2 border-primary-800 rounded-full hover:bg-primary-50 transition-all duration-300"
            >
              Contact Us
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
