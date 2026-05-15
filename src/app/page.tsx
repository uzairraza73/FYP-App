'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { Shield, Sparkles, Zap, Target, Cpu } from 'lucide-react';
import { useStore } from '@/lib/store';
import { cn } from '@/lib/utils';

const slides = [
  {
    id: 1,
    title: "Clinical-Grade Vision AI",
    description: "Our neural network is trained on 100,000+ dermatological cases to provide industry-leading diagnostic indicators.",
    icon: Cpu,
    color: "bg-slate-900",
    gradient: "from-blue-600 to-indigo-900",
    rotate: "rotateY(-15deg)"
  },
  {
    id: 2,
    title: "98.2% Detection Accuracy",
    description: "Proprietary AI algorithms analyze lesion patterns, border irregularity, and color distribution with clinical precision.",
    icon: Target,
    color: "bg-indigo-600",
    gradient: "from-indigo-600 to-purple-600",
    rotate: "rotateX(15deg)"
  },
  {
    id: 3,
    title: "Instant Expert Verification",
    description: "Every AI scan is flagged for specialist review, ensuring you get the most accurate medical guidance possible.",
    icon: Shield,
    color: "bg-emerald-600",
    gradient: "from-emerald-600 to-teal-800",
    rotate: "rotateY(15deg)"
  }
];

export default function WelcomePage() {
  const router = useRouter();
  const [step, setStep] = useState<'splash' | 'onboarding'>('splash');
  const [currentSlide, setCurrentSlide] = useState(0);
  const { setHasCompletedOnboarding } = useStore();

  useEffect(() => {
    const timer = setTimeout(() => {
      setStep('onboarding');
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  const nextSlide = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(s => s + 1);
    } else {
      finishOnboarding();
    }
  };

  const finishOnboarding = () => {
    setHasCompletedOnboarding(true);
    router.push('/portal-select'); 
  };

  return (
    <div className="flex-1 flex flex-col relative overflow-hidden medical-gradient min-h-screen" style={{ perspective: '1200px' }}>
      <AnimatePresence mode="wait">
        {step === 'splash' ? (
          <motion.div
            key="splash"
            initial={{ opacity: 0, rotateX: 45, y: 50 }}
            animate={{ opacity: 1, rotateX: 0, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, rotateY: 90, filter: "blur(10px)" }}
            transition={{ duration: 1, ease: "circOut" }}
            className="flex-1 flex flex-col items-center justify-center p-8 z-20"
          >
            <motion.div
              animate={{ 
                y: [0, -20, 0],
                rotateY: [0, 10, -10, 0],
                rotateX: [0, 5, -5, 0]
              }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="w-32 h-32 bg-slate-900 rounded-[40px] flex items-center justify-center shadow-[0_30px_70px_rgba(0,0,0,0.4)] border border-slate-800 mb-8 relative overflow-hidden preserve-3d"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-clinical-blue/30 to-transparent" />
              <Shield className="text-white relative z-10 drop-shadow-[0_10px_10px_rgba(0,0,0,0.5)]" size={64} />
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-center"
            >
              <h1 className="text-5xl font-black text-slate-900 mb-2 tracking-tighter">
                ONCURA <span className="text-clinical-blue">AI</span>
              </h1>
              <p className="text-slate-400 font-black uppercase tracking-[0.4em] text-[10px]">
                Advanced Neural Diagnostics
              </p>
            </motion.div>
          </motion.div>
        ) : (
          <motion.div
            key="onboarding"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ type: "spring", damping: 20 }}
            className="flex-1 flex flex-col z-10"
          >
            <div className="flex justify-between items-center p-8">
              <div className="flex gap-2">
                {slides.map((_, i) => (
                  <div 
                    key={i} 
                    className={`h-1.5 rounded-full transition-all duration-700 ${
                      i === currentSlide ? "w-10 bg-slate-900" : "w-2 bg-slate-200"
                    }`}
                  />
                ))}
              </div>
              <motion.button 
                whileTap={{ scale: 0.9, rotate: -2 }}
                onClick={finishOnboarding}
                className="px-6 py-2.5 glass-card rounded-2xl text-slate-500 text-[10px] font-black uppercase tracking-widest hover:text-slate-900 transition-all border border-slate-200"
              >
                Skip Intro
              </motion.button>
            </div>

            <div className="flex-1 flex flex-col items-center justify-center px-10 text-center preserve-3d">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentSlide}
                  initial={{ opacity: 0, z: -100, rotateY: 45 }}
                  animate={{ opacity: 1, z: 0, rotateY: 0 }}
                  exit={{ opacity: 0, z: 100, rotateY: -45 }}
                  transition={{ type: "spring", damping: 25, stiffness: 100 }}
                  className="flex flex-col items-center"
                >
                  <motion.div 
                    animate={{ 
                      rotateY: [0, 5, -5, 0],
                      y: [0, -10, 0]
                    }}
                    transition={{ duration: 5, repeat: Infinity }}
                    className={`w-44 h-44 bg-gradient-to-br ${slides[currentSlide].gradient} rounded-[56px] flex items-center justify-center text-white shadow-[0_40px_80px_-20px_rgba(0,0,0,0.4)] mb-12 relative group preserve-3d`}
                  >
                    <div className="absolute inset-4 border-2 border-white/20 rounded-[44px] group-hover:scale-105 transition-transform duration-700" />
                    <div className="transform translate-z-10">
                      {React.createElement(slides[currentSlide].icon, { size: 72, className: "drop-shadow-[0_15px_15px_rgba(0,0,0,0.4)]" })}
                    </div>
                  </motion.div>
                  
                  <motion.h2 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-4xl font-black text-slate-900 mb-5 leading-[1.1] tracking-tight"
                  >
                    {slides[currentSlide].title}
                  </motion.h2>
                  <motion.p 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-slate-500 text-[16px] font-medium leading-relaxed max-w-[320px]"
                  >
                    {slides[currentSlide].description}
                  </motion.p>
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="p-10">
              <motion.button
                whileHover={{ scale: 1.02, rotateX: 5 }}
                whileTap={{ scale: 0.98, rotateX: -5 }}
                onClick={nextSlide}
                className={cn(
                  "w-full py-6 rounded-3xl font-black text-xs uppercase tracking-[0.2em] shadow-2xl transition-all duration-500 flex items-center justify-center gap-3 preserve-3d",
                  currentSlide === slides.length - 1 
                    ? "bg-slate-900 text-white shadow-slate-900/40" 
                    : "bg-white text-slate-900 border-2 border-slate-100 shadow-slate-200/50"
                )}
              >
                {currentSlide === slides.length - 1 ? 'Launch Oncura' : 'Next Discovery'}
                {currentSlide === slides.length - 1 ? <Zap size={18} className="text-clinical-blue fill-clinical-blue" /> : <Sparkles size={18} />}
              </motion.button>
              
              <p className="text-center mt-6 text-[10px] text-slate-400 font-bold uppercase tracking-widest">
                Trusted by 500+ Dermatologists Worldwide
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
