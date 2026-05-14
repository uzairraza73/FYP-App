'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { useStore } from '@/lib/store';
import React, { useEffect } from 'react';

export const PageWrapper = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const { theme, language } = useStore();

  useEffect(() => {
    if (theme === 'dark') document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
  }, [theme]);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        dir={language === 'ur' ? 'rtl' : 'ltr'}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className="flex-1 flex flex-col"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};
