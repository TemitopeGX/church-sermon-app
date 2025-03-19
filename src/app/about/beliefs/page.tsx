import Image from "next/image";

const beliefs = [
  {
    title: "The Bible",
    description:
      "We believe the Bible is the inspired, infallible Word of God, serving as our ultimate authority for faith and practice.",
  },
  {
    title: "The Trinity",
    description:
      "We believe in one God eternally existing in three persons: Father, Son, and Holy Spirit.",
  },
  {
    title: "Jesus Christ",
    description:
      "We believe in the deity of Jesus Christ, His virgin birth, sinless life, sacrificial death, bodily resurrection, and imminent return.",
  },
  {
    title: "Salvation",
    description:
      "We believe salvation is by grace through faith in Jesus Christ alone, not by works, and results in the forgiveness of sins and eternal life.",
  },
  {
    title: "The Holy Spirit",
    description:
      "We believe in the present ministry of the Holy Spirit, who indwells believers and empowers them for godly living and service.",
  },
  {
    title: "The Church",
    description:
      "We believe the church is the body of Christ, composed of all believers, and exists to worship God, make disciples, and serve the community.",
  },
  {
    title: "Baptism & Communion",
    description:
      "We practice water baptism by immersion and regularly observe the Lord's Supper as commanded by Jesus Christ.",
  },
  {
    title: "Christian Living",
    description:
      "We believe Christians should live holy lives that reflect Christ's character, demonstrating love, integrity, and service to others.",
  },
];

export default function BeliefsPage() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-24 bg-primary-800">
        <div className="absolute inset-0 opacity-20">
          <Image
            src="/images/church-beliefs.jpg"
            alt="Church Beliefs"
            fill
            className="object-cover"
          />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            What We Believe
          </h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto">
            Our foundational beliefs and doctrinal positions that guide our
            faith and practice
          </p>
        </div>
      </section>

      {/* Statement of Faith Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl font-bold mb-6">Statement of Faith</h2>
            <p className="text-gray-600">
              At The Covenant Chapel International, our beliefs are rooted in
              the unchanging truth of God's Word. These foundational principles
              guide our worship, teaching, and service to our community and the
              world.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {beliefs.map((belief) => (
              <div key={belief.title} className="bg-gray-50 p-8 rounded-2xl">
                <h3 className="text-xl font-bold mb-4">{belief.title}</h3>
                <p className="text-gray-600">{belief.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Scripture Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Biblical Foundation</h2>
              <div className="prose prose-lg max-w-none">
                <p className="mb-4">
                  "All Scripture is God-breathed and is useful for teaching,
                  rebuking, correcting and training in righteousness, so that
                  the servant of God may be thoroughly equipped for every good
                  work."
                </p>
                <p className="text-primary-800 font-semibold">
                  - 2 Timothy 3:16-17
                </p>
              </div>
            </div>
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
              <Image
                src="/images/bible-study.jpg"
                alt="Bible Study"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">
            Learn More About Our Faith
          </h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Join us for our weekly services and Bible studies to deepen your
            understanding of God's Word and grow in your faith journey.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/connect"
              className="inline-flex items-center px-8 py-4 text-lg font-semibold text-white bg-primary-800 rounded-full hover:bg-primary-700 transition-all duration-300"
            >
              Join a Bible Study
            </a>
            <a
              href="/about/leadership"
              className="inline-flex items-center px-8 py-4 text-lg font-semibold text-primary-800 border-2 border-primary-800 rounded-full hover:bg-primary-50 transition-all duration-300"
            >
              Meet Our Leaders
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
