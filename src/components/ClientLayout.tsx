'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import { MobileNav } from "@/components/MobileNav";
import { SafetyFooter } from "@/components/SafetyFooter";

export function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  
  const isDoctorRoute = pathname?.startsWith('/doctor');
  const isAuthRoute = ['/welcome', '/', '/login', '/signup', '/profile-setup', '/portal-select'].includes(pathname || '');
  
  const showGlobalUI = !isDoctorRoute && !isAuthRoute;

  return (
    <>
      <div className="flex-1 flex flex-col min-h-0 relative">
        {children}
        {showGlobalUI && (
          <div className="mt-auto">
            <SafetyFooter />
            <div className="h-24" />
          </div>
        )}
      </div>
      {showGlobalUI && <MobileNav />}
    </>
  );
}
