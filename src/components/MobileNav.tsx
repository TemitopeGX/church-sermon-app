"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faLayerGroup,
  faVideo,
  faBookOpen,
  faCog,
} from "@fortawesome/free-solid-svg-icons";

export default function MobileNav() {
  const pathname = usePathname();

  const navItems = [
    { icon: faHome, label: "Home", href: "/dashboard" },
    { icon: faLayerGroup, label: "Series", href: "/dashboard/series" },
    { icon: faVideo, label: "Live", href: "/dashboard/live" },
    { icon: faBookOpen, label: "Library", href: "/dashboard/library" },
    { icon: faCog, label: "Settings", href: "/dashboard/settings" },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-black/95 backdrop-blur-lg border-t border-white/10 lg:hidden z-50">
      <div className="flex justify-around items-center h-16">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`flex flex-col items-center justify-center flex-1 h-full ${
              pathname === item.href ? "text-white" : "text-gray-400"
            }`}
          >
            <FontAwesomeIcon icon={item.icon} className="w-5 h-5" />
            <span className="text-xs mt-1">{item.label}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
