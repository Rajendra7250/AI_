"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, FileText, CheckSquare, MessageSquare, BookOpen, LogOut } from "lucide-react";

export default function Sidebar() {
  const pathname = usePathname();

  const links = [
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { name: "Resume Builder", href: "/resume", icon: FileText },
    { name: "Interview Q&A", href: "/interview", icon: CheckSquare },
    { name: "Mock Session", href: "/mock", icon: MessageSquare },
    { name: "Study Room", href: "/study", icon: BookOpen },
  ];

  return (
    <div className="w-64 h-screen glass border-r border-white/5 flex flex-col p-6 relative z-20 sticky top-0">
      <div className="mb-10 text-center">
        <h2 className="text-3xl font-extrabold text-gradient tracking-wider">AIPS</h2>
      </div>

      <nav className="flex-1 space-y-4">
        {links.map((link) => {
          const isActive = pathname === link.href;
          const Icon = link.icon;
          return (
            <Link key={link.name} href={link.href}>
              <motion.div
                whileHover={{ x: 5 }}
                whileTap={{ scale: 0.95 }}
                className={`flex items-center space-x-3 p-4 rounded-xl transition-all ${
                  isActive 
                  ? "bg-white/10 text-white shadow-[0_0_15px_rgba(255,122,24,0.3)]" 
                  : "text-gray-400 hover:text-white hover:bg-white/5"
                }`}
              >
                <Icon size={20} className={isActive ? "text-primary" : ""} />
                <span className="font-medium">{link.name}</span>
                {isActive && (
                  <motion.div 
                    layoutId="activeTab"
                    className="absolute left-0 w-1 rounded-r-full bg-primary h-8"
                  />
                )}
              </motion.div>
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto pt-6 border-t border-white/10">
        <Link href="/login">
          <motion.div
            whileHover={{ x: 5 }}
            className="flex items-center space-x-3 p-4 rounded-xl text-gray-400 hover:text-red-400 transition-all cursor-pointer"
          >
            <LogOut size={20} />
            <span className="font-medium">Logout</span>
          </motion.div>
        </Link>
      </div>
    </div>
  );
}
