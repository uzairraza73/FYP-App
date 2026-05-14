'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import { ShieldAlert } from 'lucide-react';

export const SafetyFooter = () => {
  const pathname = usePathname();

  const hiddenPaths = ['/welcome', '/', '/login', '/signup', '/profile-setup', '/scan'];
  if (hiddenPaths.includes(pathname)) return null;

  return (
    <footer className="w-full py-6 text-center bg-transparent select-none px-6">
      <div className="flex items-center justify-center gap-2 mb-1">
        <ShieldAlert size={12} className="text-slate-300" />
        <span className="text-[9px] text-slate-400 font-black uppercase tracking-[0.15em]">Clinical Disclaimer</span>
      </div>
      <p className="text-[9px] text-slate-300 font-medium leading-relaxed max-w-[250px] mx-auto uppercase tracking-wider">
        AI Analysis is for educational use. Consult a dermatologist for medical diagnosis.
      </p>
    </footer>
  );
};
