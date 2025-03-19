import Image from "next/image";
import Link from "next/link";
import {
  UserGroupIcon,
  HeartIcon,
  MusicalNoteIcon,
  BookOpenIcon,
  UsersIcon,
  HomeIcon,
} from "@heroicons/react/24/outline";

const ministries = [
  {
    name: "Kids Ministry",
    description:
      "Nurturing the next generation through biblical teaching and fun activities",
    icon: UserGroupIcon,
    image: "/images/kids-ministry.jpg",
    href: "/ministries/kids",
  },
  {
    name: "Youth Ministry",
    description:
      "Empowering young people to live boldly for Christ in today's world",
    icon: HeartIcon,
    image: "/images/youth-ministry.jpg",
    href: "/ministries/youth",
  },
  {
    name: "Young Adults",
    description:
      "Building a community of young professionals growing in faith together",
    icon: UsersIcon,
    image: "/images/young-adults.jpg",
    href: "/ministries/young-adults",
  },
  {
    name: "Women's Ministry",
    description:
      "Encouraging and equipping women to walk in their God-given purpose",
    icon: HeartIcon,
    image: "/images/womens-ministry.jpg",
    href: "/ministries/women",
  },
  {
    name: "Men's Ministry",
    description:
      "Developing godly men who lead with integrity in their homes and communities",
    icon: UsersIcon,
    image: "/images/mens-ministry.jpg",
    href: "/ministries/men",
  },
  {
    name: "Worship Ministry",
    description: "Leading the congregation in Spirit-filled worship and praise",
    icon: MusicalNoteIcon,
    image: "/images/worship-ministry.jpg",
    href: "/ministries/worship",
  },
  {
    name: "Prayer Ministry",
    description:
      "Interceding for the church, community, and nations through prayer",
    icon: BookOpenIcon,
    image: "/images/prayer-ministry.jpg",
    href: "/ministries/prayer",
  },
  {
    name: "Outreach Ministry",
    description: "Sharing God's love through community service and evangelism",
    icon: HomeIcon,
    image: "/images/outreach-ministry.jpg",
    href: "/ministries/outreach",
  },
];

export default function MinistriesPage() {
  return (
    <div className="relative">
      {/* Hero Section */}
      <section className="relative py-24 bg-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl mb-6">
              Our Ministries
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Discover how you can get involved and grow in your faith through
              our various ministry departments.
            </p>
          </div>
        </div>
      </section>

      {/* Ministries Grid */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {ministries.map((ministry) => (
              <Link
                key={ministry.name}
                href={ministry.href}
                className="group relative overflow-hidden rounded-2xl"
              >
                <div className="aspect-[4/3] relative">
                  <Image
                    src={ministry.image}
                    alt={ministry.name}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent" />
                </div>
                <div className="absolute inset-0 p-6 flex flex-col justify-end">
                  <div className="flex items-center mb-2">
                    <ministry.icon className="h-6 w-6 text-primary" />
                    <h3 className="text-xl font-semibold text-white ml-2">
                      {ministry.name}
                    </h3>
                  </div>
                  <p className="text-sm text-gray-300">
                    {ministry.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Get Involved */}
      <section className="py-24 bg-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">Get Involved</h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            We believe every member has a unique gift to contribute to the body
            of Christ. Find your place to serve and grow in our church family.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/volunteer" className="btn-primary">
              Volunteer
            </Link>
            <Link href="/contact" className="btn-secondary">
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
