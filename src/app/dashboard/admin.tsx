import Link from "next/link";
import { ChartBarIcon, CogIcon, UsersIcon } from "@heroicons/react/24/outline";

const adminFeatures = [
  {
    name: "Analytics",
    description: "View detailed analytics and reports.",
    icon: ChartBarIcon,
    href: "/dashboard/analytics",
  },
  {
    name: "Manage Users",
    description: "Manage user accounts and permissions.",
    icon: UsersIcon,
    href: "/dashboard/users",
  },
  {
    name: "Settings",
    description: "Configure application settings and preferences.",
    icon: CogIcon,
    href: "/dashboard/settings",
  },
];

export default function AdminDashboard() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
      <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
        Admin Dashboard
      </h1>
      <p className="mt-4 text-lg leading-8 text-gray-600 dark:text-gray-300">
        Manage the application and view analytics.
      </p>
      <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {adminFeatures.map((feature) => (
          <Link key={feature.name} href={feature.href} className="group">
            <div className="dashboard-card">
              <div className="flex items-center gap-x-3">
                <feature.icon
                  className="h-6 w-6 text-primary-600 dark:text-primary-400"
                  aria-hidden="true"
                />
                <h3 className="text-lg font-semibold leading-6 text-gray-900 dark:text-white">
                  {feature.name}
                </h3>
              </div>
              <p className="mt-2 text-base leading-7 text-gray-600 dark:text-gray-300">
                {feature.description}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
