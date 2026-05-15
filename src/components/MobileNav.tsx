'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Camera, BarChart3, MessageSquare, User } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

const navItems = [
  { icon: LayoutDashboard, label: 'Home', href: '/home' },
  { icon: Camera, label: 'Scan', href: '/scan' },
  { icon: BarChart3, label: 'Progress', href: '/history' },
  { icon: MessageSquare, label: 'Chat', href: '/chat' },
  { icon: User, label: 'Profile', href: '/profile' },
];

export const MobileNav = () => {
  const pathname = usePathname();

  const hideNav = [
    '/welcome', 
    '/login', 
    '/signup', 
    '/profile-setup', 
    '/',
    '/portal-select'
  ].includes(pathname);

  if (hideNav) {
    return null;
  }

  return (
    <nav className="absolute bottom-0 left-0 w-full glass-card border-t border-slate-100 dark:border-slate-800 px-4 py-3 pb-6 z-50 rounded-t-[32px] shadow-2xl">
      <div className="flex justify-between items-center max-w-[400px] mx-auto">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link key={item.href} href={item.href} className="relative py-1 px-3">
              <motion.div
                whileTap={{ scale: 0.9 }}
                className={cn(
                  "flex flex-col items-center gap-1.5 transition-all duration-300",
                  isActive ? "text-clinical-blue" : "text-slate-400 dark:text-slate-500"
                )}
              >
                <div className={cn(
                  "p-2 rounded-xl transition-all duration-300",
                  isActive ? "bg-clinical-blue/10 dark:bg-clinical-blue/20" : "bg-transparent"
                )}>
                  <item.icon size={22} strokeWidth={isActive ? 2.5 : 2} />
                </div>
                <span className={cn(
                  "text-[9px] font-black uppercase tracking-widest",
                  isActive ? "opacity-100" : "opacity-0 -translate-y-1"
                )}>
                  {item.label}
                </span>
                
                {isActive && (
                  <motion.div
                    layoutId="nav-pill"
                    className="absolute -top-1 w-1 h-1 bg-clinical-blue rounded-full"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </motion.div>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};
