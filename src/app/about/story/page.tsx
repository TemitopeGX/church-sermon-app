import Image from "next/image";

export default function StoryPage() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-24 bg-primary-800">
        <div className="absolute inset-0 opacity-20">
          <Image
            src="/images/church-history.jpg"
            alt="Church History"
            fill
            className="object-cover"
          />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            Our Story
          </h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto">
            A journey of faith, growth, and divine purpose spanning over two
            decades
          </p>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <h2 className="text-3xl font-bold mb-6">The Beginning</h2>
              <p className="text-gray-600 mb-4">
                The Covenant Chapel International began as a small prayer group
                in 2000, meeting in homes with a burning desire to see lives
                transformed through the power of God's Word.
              </p>
              <p className="text-gray-600">
                Under the leadership of Pastor Emmanuel Fajinmi, what started as
                a gathering of faithful believers has grown into a vibrant
                community of worshippers passionate about spreading the Gospel.
              </p>
            </div>
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
              <Image
                src="/images/church-early-days.jpg"
                alt="Early Days of The Covenant Chapel"
                fill
                className="object-cover"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16">
            <div className="md:order-2">
              <h2 className="text-3xl font-bold mb-6">Growth and Impact</h2>
              <p className="text-gray-600 mb-4">
                As the congregation grew, so did our impact in the community. We
                established various ministries to meet the diverse needs of our
                members and reach out to the community.
              </p>
              <p className="text-gray-600">
                Through faithful service and dedication to God's Word, we've
                seen countless lives transformed, families restored, and
                communities impacted by the love of Christ.
              </p>
            </div>
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden md:order-1">
              <Image
                src="/images/church-growth.jpg"
                alt="Church Growth Over the Years"
                fill
                className="object-cover"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Present Day</h2>
              <p className="text-gray-600 mb-4">
                Today, The Covenant Chapel International stands as a testament
                to God's faithfulness. Our church has become a spiritual home
                for people from all walks of life, united in our mission to
                celebrate endless life in Christ.
              </p>
              <p className="text-gray-600">
                We continue to expand our reach through digital platforms,
                community outreach, and various ministry programs, all while
                staying true to our founding principles of faith, love, and
                service.
              </p>
            </div>
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
              <Image
                src="/images/church-present.jpg"
                alt="The Covenant Chapel Today"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">Be Part of Our Story</h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Join us as we continue to write new chapters in our journey of faith
            and service. Your story could be part of our story.
          </p>
          <a
            href="/connect"
            className="inline-flex items-center px-8 py-4 text-lg font-semibold text-white bg-primary-800 rounded-full hover:bg-primary-700 transition-all duration-300"
          >
            Connect With Us
          </a>
        </div>
      </section>
    </main>
  );
}
