"use client";

import { useAuth } from "@/contexts/auth-context";
import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import MobileNav from "@/components/MobileNav";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faLayerGroup,
  faVideo,
  faHeart,
  faHistory,
  faSignOut,
  faUser,
  faCog,
} from "@fortawesome/free-solid-svg-icons";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, loading, signOut, isAdmin } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/sign-in");
    }
  }, [user, loading, router]);

  if (loading || !user) {
    return (
      <div className="min-h-screen bg-[#030014] flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  const navItems = [
    { icon: faHome, label: "Home", href: "/dashboard" },
    { icon: faLayerGroup, label: "Series", href: "/dashboard/series" },
    { icon: faVideo, label: "Live", href: "/dashboard/live" },
  ];

  const libraryItems = [
    { icon: faHeart, label: "Favorites", href: "/dashboard/favorites" },
    { icon: faHistory, label: "Recently Played", href: "/dashboard/history" },
  ];

  const profileItems = [
    { icon: faUser, label: "Profile", href: "/dashboard/profile" },
    { icon: faCog, label: "Settings", href: "/dashboard/settings" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#030014] to-[#1a1a1a]">
      {/* Desktop Sidebar */}
      <div className="hidden lg:flex w-64 bg-black/30 backdrop-blur-xl fixed h-full flex-col">
        <div className="p-6">
          <Link href="/dashboard" className="flex items-center gap-2">
            <Image
              src="/logo.png"
              alt="Logo"
              width={40}
              height={40}
              className="w-10 h-10"
            />
            <span className="text-lg font-bold text-white">Covenant Media</span>
          </Link>
        </div>

        <nav className="flex-1 px-2">
          <div className="space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-4 px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                  pathname === item.href
                    ? "bg-white/20 text-white"
                    : "text-gray-400 hover:text-white hover:bg-white/10"
                }`}
              >
                <FontAwesomeIcon icon={item.icon} className="w-5 h-5" />
                {item.label}
              </Link>
            ))}
          </div>

          <div className="mt-8 space-y-4">
            <div className="px-4">
              <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                Your Library
              </h3>
            </div>
            <div className="space-y-2">
              {libraryItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-4 px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                    pathname === item.href
                      ? "bg-white/20 text-white"
                      : "text-gray-400 hover:text-white hover:bg-white/10"
                  }`}
                >
                  <FontAwesomeIcon icon={item.icon} className="w-5 h-5" />
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          <div className="mt-8 space-y-4">
            <div className="px-4">
              <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                Account
              </h3>
            </div>
            <div className="space-y-2">
              {profileItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-4 px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                    pathname === item.href
                      ? "bg-white/20 text-white"
                      : "text-gray-400 hover:text-white hover:bg-white/10"
                  }`}
                >
                  <FontAwesomeIcon icon={item.icon} className="w-5 h-5" />
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          {isAdmin && (
            <Link
              href="/admin"
              className="flex items-center gap-4 px-4 py-3 text-sm font-medium rounded-lg transition-colors text-gray-400 hover:text-white hover:bg-white/10"
            >
              <FontAwesomeIcon icon={faCog} className="w-5 h-5" />
              Admin Dashboard
            </Link>
          )}
        </nav>

        <div className="p-4 mt-auto">
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
      <div className="lg:pl-64">
        <main className="p-4 lg:p-8 pb-24 lg:pb-8">{children}</main>
      </div>

      {/* Mobile Navigation */}
      <MobileNav />
    </div>
  );
}
