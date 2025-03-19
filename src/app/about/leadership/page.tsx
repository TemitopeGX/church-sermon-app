import Image from "next/image";

const leadershipTeam = [
  {
    name: "Pastor Emmanuel Fajinmi",
    role: "Senior Pastor",
    image: "/images/pastor-emmanuel.jpg",
    bio: "Pastor Emmanuel has been leading The Covenant Chapel International for over two decades with a passion for teaching God's Word and seeing lives transformed.",
  },
  {
    name: "Pastor Sarah Johnson",
    role: "Associate Pastor",
    image: "/images/pastor-sarah.jpg",
    bio: "Pastor Sarah oversees our women's ministry and pastoral care programs, bringing years of experience in counseling and discipleship.",
  },
  {
    name: "Pastor Michael Thompson",
    role: "Youth Pastor",
    image: "/images/pastor-michael.jpg",
    bio: "Pastor Michael leads our vibrant youth ministry, focusing on empowering the next generation through biblical teaching and mentorship.",
  },
  {
    name: "Deacon James Wilson",
    role: "Head of Operations",
    image: "/images/deacon-james.jpg",
    bio: "Deacon James manages our church operations and facilities, ensuring everything runs smoothly for our congregation.",
  },
  {
    name: "Minister Grace Chen",
    role: "Worship Director",
    image: "/images/minister-grace.jpg",
    bio: "Minister Grace leads our worship ministry, creating an atmosphere where people can encounter God's presence through music and praise.",
  },
  {
    name: "Deaconess Mary Roberts",
    role: "Children's Ministry Director",
    image: "/images/deaconess-mary.jpg",
    bio: "Deaconess Mary oversees our children's ministry, nurturing young hearts in the knowledge and love of Christ.",
  },
];

export default function LeadershipPage() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-24 bg-primary-800">
        <div className="absolute inset-0 opacity-20">
          <Image
            src="/images/church-leadership.jpg"
            alt="Church Leadership"
            fill
            className="object-cover"
          />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            Our Leadership Team
          </h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto">
            Meet the dedicated servants who guide our church community with
            wisdom, love, and faithful service
          </p>
        </div>
      </section>

      {/* Senior Pastor Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="relative aspect-[3/4] rounded-2xl overflow-hidden">
              <Image
                src="/images/pastor-emmanuel-full.jpg"
                alt="Pastor Emmanuel Fajinmi"
                fill
                className="object-cover"
              />
            </div>
            <div>
              <h2 className="text-3xl font-bold mb-4">
                Pastor Emmanuel Fajinmi
              </h2>
              <p className="text-xl text-primary-800 mb-6">Senior Pastor</p>
              <div className="prose prose-lg max-w-none">
                <p className="mb-4">
                  Pastor Emmanuel Fajinmi has been serving as the Senior Pastor
                  of The Covenant Chapel International since its inception. His
                  passion for God's Word and heart for people have been
                  instrumental in shaping our church's vision and mission.
                </p>
                <p className="mb-4">
                  With over two decades of ministry experience, Pastor Emmanuel
                  leads with wisdom, compassion, and a deep commitment to seeing
                  lives transformed through the power of the Gospel. His
                  teaching ministry focuses on practical application of biblical
                  principles and equipping believers for effective service.
                </p>
                <p>
                  Under his leadership, The Covenant Chapel has grown from a
                  small prayer group to a thriving community of believers
                  impacting lives locally and globally. Pastor Emmanuel is
                  supported by his wife and family in ministry, demonstrating a
                  living example of Christ-centered leadership.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Leadership Team Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">
            Meet Our Leadership Team
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {leadershipTeam.slice(1).map((leader) => (
              <div
                key={leader.name}
                className="bg-white rounded-2xl overflow-hidden shadow-sm"
              >
                <div className="relative aspect-[4/3]">
                  <Image
                    src={leader.image}
                    alt={leader.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{leader.name}</h3>
                  <p className="text-primary-800 mb-4">{leader.role}</p>
                  <p className="text-gray-600">{leader.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">Connect With Our Leaders</h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Our leadership team is here to serve and support you in your
            spiritual journey. Reach out to learn more about our ministries and
            how you can get involved.
          </p>
          <a
            href="/connect"
            className="inline-flex items-center px-8 py-4 text-lg font-semibold text-white bg-primary-800 rounded-full hover:bg-primary-700 transition-all duration-300"
          >
            Contact Us
          </a>
        </div>
      </section>
    </main>
  );
}
