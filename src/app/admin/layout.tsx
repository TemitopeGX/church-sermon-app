"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import {
  RiDashboardLine,
  RiVideoLine,
  RiLiveLine,
  RiSettings4Line,
  RiMenuLine,
  RiCloseLine,
  RiUploadCloud2Line,
  RiBarChartBoxLine,
  RiTeamLine,
} from "react-icons/ri";

const menuItems = [
  { name: "Dashboard", icon: RiDashboardLine, href: "/admin/dashboard" },
  { name: "Sermons", icon: RiVideoLine, href: "/admin/sermons" },
  { name: "Live Stream", icon: RiLiveLine, href: "/admin/live" },
  { name: "Upload", icon: RiUploadCloud2Line, href: "/admin/upload" },
  { name: "Analytics", icon: RiBarChartBoxLine, href: "/admin/analytics" },
  { name: "Users", icon: RiTeamLine, href: "/admin/users" },
  { name: "Settings", icon: RiSettings4Line, href: "/admin/settings" },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#030014] to-[#1a1a1a]">
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="fixed top-4 left-4 z-50 p-2 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10 lg:hidden"
      >
        {isSidebarOpen ? (
          <RiCloseLine className="w-6 h-6 text-white" />
        ) : (
          <RiMenuLine className="w-6 h-6 text-white" />
        )}
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-white/5 backdrop-blur-xl border-r border-white/10 transform transition-transform duration-300 ease-in-out z-40 
          ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          } lg:translate-x-0`}
      >
        <div className="p-6">
          <h1 className="text-2xl font-bold text-white mb-8">Admin Panel</h1>
          <nav className="space-y-1">
            {menuItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors relative ${
                    isActive
                      ? "text-white bg-white/10"
                      : "text-gray-400 hover:text-white hover:bg-white/5"
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute left-0 top-0 w-full h-full bg-white/10 rounded-lg -z-10"
                    />
                  )}
                  <item.icon className="w-5 h-5" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <main
        className={`transition-all duration-300 ease-in-out ${
          isSidebarOpen ? "lg:ml-64" : "ml-0"
        }`}
      >
        <div className="min-h-screen p-6 lg:p-8">{children}</div>
      </main>
    </div>
  );
}
