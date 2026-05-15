'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { Shield, Stethoscope, User, ArrowRight, Sparkles } from 'lucide-react';

export default function PortalSelectPage() {
  const router = useRouter();
  const [showPortals, setShowPortals] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowPortals(true);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  const portals = [
    {
      id: 'doctor',
      title: 'Doctor Dashboard',
      description: 'Review patient scans, manage records, and provide clinical expertise.',
      icon: Stethoscope,
      color: 'bg-dark-blue',
      shadow: 'shadow-blue-900/20',
      path: '/login?role=doctor',
      delay: 0.2
    },
    {
      id: 'patient',
      title: 'Patient Dashboard',
      description: 'Get instant AI skin analysis, track your history, and consult specialists.',
      icon: User,
      color: 'bg-success-green',
      shadow: 'shadow-emerald-900/20',
      path: '/login?role=patient',
      delay: 0.4
    }
  ];

  return (
    <div className="flex-1 flex flex-col items-center justify-center p-6 medical-gradient relative overflow-hidden min-h-screen">
      <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-white/20 rounded-full blur-[120px] animate-pulse-slow" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-light-green/20 rounded-full blur-[120px]" />

      <AnimatePresence mode="wait">
        {!showPortals ? (
          <motion.div
            key="splash"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1, filter: 'blur(10px)' }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-center z-10"
          >
            <motion.div
              animate={{ 
                y: [0, -15, 0],
                rotateZ: [0, 5, -5, 0],
                scale: [1, 1.05, 1]
              }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="w-28 h-28 bg-white rounded-[40px] flex items-center justify-center shadow-[0_20px_50px_rgba(30,58,138,0.15)] mb-10 border border-light-blue"
            >
              <Shield className="text-dark-blue" size={56} />
            </motion.div>
            <h1 className="text-4xl font-black text-dark-blue mb-2 tracking-tight">
              ONCURA <span className="text-clinical-blue font-black">AI</span>
            </h1>
          </motion.div>
        ) : (
          <motion.div
            key="portals"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-sm flex flex-col gap-8 z-10"
          >
            <div className="text-center mb-2">
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="inline-flex items-center gap-2 bg-light-blue/40 border border-light-blue px-5 py-2 rounded-full mb-6"
              >
                <Sparkles size={14} className="text-dark-blue" />
                <span className="text-[10px] font-black text-dark-blue uppercase tracking-widest">System Access</span>
              </motion.div>
              <motion.h2 className="text-3xl font-black text-dark-blue mb-3">Choose Dashboard</motion.h2>
              <motion.p className="text-slate-500 text-[13px] font-medium leading-relaxed px-8">Select your specialized interface to begin clinical operations</motion.p>
            </div>

            <div className="space-y-5">
              {portals.map((portal) => (
                <motion.button
                  key={portal.id}
                  onClick={() => router.push(portal.path)}
                  className={`group relative w-full text-left bg-white border-2 border-light-blue/30 rounded-[40px] p-7 flex items-center gap-6 
                             shadow-[0_15px_40px_rgba(30,58,138,0.05)] hover:shadow-[0_25px_60px_rgba(30,58,138,0.12)] 
                             hover:border-clinical-blue/20 transition-all duration-300`}
                >
                  <div className={`w-20 h-20 ${portal.color} rounded-3xl flex items-center justify-center text-white`}>
                    <portal.icon size={36} />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-black text-dark-blue mb-1.5">{portal.title}</h3>
                    <p className="text-slate-500 text-[12px] font-medium leading-snug">{portal.description}</p>
                  </div>
                  <ArrowRight size={18} className="text-dark-blue" />
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
