"use client";

import { useAuth } from "@/contexts/auth-context";
import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faUpload,
  faList,
  faVideo,
  faUsers,
  faChartLine,
  faSignOut,
  faCog,
} from "@fortawesome/free-solid-svg-icons";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, loading, signOut, isAdmin } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  // Verify admin status
  useEffect(() => {
    if (!loading && (!user || !isAdmin)) {
      router.push("/sign-in");
    }
  }, [user, loading, isAdmin, router]);

  if (loading || !user) {
    return (
      <div className="min-h-screen bg-[#030014] flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  const navItems = [
    { icon: faHome, label: "Dashboard", href: "/admin" },
    { icon: faUpload, label: "Upload Sermon", href: "/admin/upload" },
    { icon: faList, label: "Manage Sermons", href: "/admin/sermons" },
    { icon: faVideo, label: "Live Settings", href: "/admin/live" },
    { icon: faUsers, label: "Users", href: "/admin/users" },
    { icon: faChartLine, label: "Analytics", href: "/admin/analytics" },
    { icon: faCog, label: "Settings", href: "/admin/settings" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#030014] to-[#1a1a1a]">
      {/* Sidebar */}
      <div className="fixed w-64 h-full bg-black/30 backdrop-blur-xl">
        <div className="p-6">
          <Link href="/admin" className="flex items-center gap-2">
            <Image
              src="/logo.png"
              alt="Logo"
              width={40}
              height={40}
              className="w-10 h-10"
            />
            <span className="text-lg font-bold text-white">Admin Panel</span>
          </Link>
        </div>

        <nav className="px-4 py-2">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg mb-1 transition-colors ${
                pathname === item.href
                  ? "bg-white/20 text-white"
                  : "text-gray-400 hover:text-white hover:bg-white/10"
              }`}
            >
              <FontAwesomeIcon icon={item.icon} className="w-5 h-5" />
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center">
              <span className="text-white font-medium">
                {user.email?.[0].toUpperCase()}
              </span>
            </div>
            <span className="text-sm text-white font-medium truncate">
              {user.email}
            </span>
          </div>
          <button
            onClick={() => signOut()}
            className="w-full px-4 py-2 text-sm font-medium text-white bg-white/10 rounded-lg hover:bg-white/20 transition-colors flex items-center justify-center gap-2"
          >
            <FontAwesomeIcon icon={faSignOut} className="w-4 h-4" />
            Sign Out
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="pl-64">
        <main className="p-8">{children}</main>
      </div>
    </div>
  );
}
