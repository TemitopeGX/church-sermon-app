import Image from "next/image";

export default function VisionPage() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-24 bg-primary-800">
        <div className="absolute inset-0 opacity-20">
          <Image
            src="/images/church-vision.jpg"
            alt="Church Vision"
            fill
            className="object-cover"
          />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            Our Vision & Mission
          </h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto">
            Transforming lives through the power of God's Word and building a
            community of believers passionate about Christ
          </p>
        </div>
      </section>

      {/* Vision Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <h2 className="text-3xl font-bold mb-6">Our Vision</h2>
              <p className="text-gray-600 mb-4">
                To be a beacon of hope and transformation in our community and
                beyond, leading people to experience the life-changing power of
                Jesus Christ.
              </p>
              <p className="text-gray-600">
                We envision a church that bridges cultural gaps, breaks down
                barriers, and creates an environment where everyone can
                encounter God's presence and discover their divine purpose.
              </p>
            </div>
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
              <Image
                src="/images/church-worship.jpg"
                alt="Worship at The Covenant Chapel"
                fill
                className="object-cover"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16">
            <div className="md:order-2">
              <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
              <p className="text-gray-600 mb-4">
                To celebrate endless life in Christ by creating an atmosphere of
                worship, fostering spiritual growth, and equipping believers for
                ministry.
              </p>
              <p className="text-gray-600">
                Through dynamic worship, biblical teaching, and compassionate
                outreach, we aim to help people discover and fulfill their
                God-given potential.
              </p>
            </div>
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden md:order-1">
              <Image
                src="/images/church-mission.jpg"
                alt="Church Mission in Action"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">
            Our Core Values
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-sm">
              <h3 className="text-xl font-bold mb-4">Biblical Foundation</h3>
              <p className="text-gray-600">
                We are committed to teaching and living according to God's Word,
                which is our ultimate authority and guide.
              </p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-sm">
              <h3 className="text-xl font-bold mb-4">Spirit-Led Worship</h3>
              <p className="text-gray-600">
                We prioritize creating an atmosphere where people can experience
                God's presence through authentic, Spirit-led worship.
              </p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-sm">
              <h3 className="text-xl font-bold mb-4">Community & Fellowship</h3>
              <p className="text-gray-600">
                We believe in building strong relationships and fostering a
                supportive community of believers.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">Join Our Vision</h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Be part of a community that's making a difference. Together, we can
            impact lives and transform our world for Christ.
          </p>
          <a
            href="/connect"
            className="inline-flex items-center px-8 py-4 text-lg font-semibold text-white bg-primary-800 rounded-full hover:bg-primary-700 transition-all duration-300"
          >
            Get Involved
          </a>
        </div>
      </section>
    </main>
  );
}
