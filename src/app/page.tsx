'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { Shield, Sparkles, Camera, BarChart3, MessageSquare, Zap, Target, Cpu } from 'lucide-react';
import { useStore } from '@/lib/store';
import { cn } from '@/lib/utils';

const slides = [
  {
    id: 1,
    title: "Clinical-Grade Vision AI",
    description: "Our neural network is trained on 100,000+ dermatological cases to provide industry-leading diagnostic indicators.",
    icon: Cpu,
    color: "bg-slate-900",
    gradient: "from-blue-600 to-indigo-900"
  },
  {
    id: 2,
    title: "98.2% Detection Accuracy",
    description: "Proprietary AI algorithms analyze lesion patterns, border irregularity, and color distribution with clinical precision.",
    icon: Target,
    color: "bg-indigo-600",
    gradient: "from-indigo-600 to-purple-600"
  },
  {
    id: 3,
    title: "Instant Expert Verification",
    description: "Every AI scan is flagged for specialist review, ensuring you get the most accurate medical guidance possible.",
    icon: Shield,
    color: "bg-emerald-600",
    gradient: "from-emerald-600 to-teal-800"
  }
];

export default function WelcomePage() {
  const router = useRouter();
  const [step, setStep] = useState<'splash' | 'onboarding'>('splash');
  const [currentSlide, setCurrentSlide] = useState(0);
  const { setHasCompletedOnboarding, hasCompletedOnboarding } = useStore();

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
    <div className="flex-1 flex flex-col relative overflow-hidden medical-gradient min-h-screen">
      <AnimatePresence mode="wait">
        {step === 'splash' ? (
          <motion.div
            key="splash"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
            transition={{ duration: 0.8 }}
            className="flex-1 flex flex-col items-center justify-center p-8 z-20"
          >
            <motion.div
              animate={{ 
                scale: [1, 1.1, 1],
                rotate: [0, 5, -5, 0]
              }}
              transition={{ duration: 4, repeat: Infinity }}
              className="w-28 h-28 bg-slate-900 rounded-[32px] flex items-center justify-center shadow-[0_20px_50px_rgba(0,0,0,0.3)] border border-slate-800 mb-8 relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-clinical-blue/20 to-transparent" />
              <Shield className="text-white relative z-10" size={56} />
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-center"
            >
              <h1 className="text-4xl font-black text-slate-900 mb-2 tracking-tighter">
                ONCURA <span className="text-clinical-blue">AI</span>
              </h1>
              <p className="text-slate-400 font-black uppercase tracking-[0.3em] text-[10px]">
                Advanced Neural Diagnostics
              </p>
            </motion.div>

            <div className="absolute bottom-20 flex flex-col items-center gap-4">
              <div className="flex gap-2">
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={i}
                    animate={{ 
                      scale: [1, 1.5, 1],
                      opacity: [0.3, 1, 0.3] 
                    }}
                    transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }}
                    className="w-2 h-2 bg-clinical-blue rounded-full"
                  />
                ))}
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="onboarding"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
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
                whileTap={{ scale: 0.9 }}
                onClick={finishOnboarding}
                className="px-5 py-2.5 glass-card rounded-2xl text-slate-500 text-[10px] font-black uppercase tracking-widest hover:text-slate-900 transition-colors border border-slate-200"
              >
                Skip Intro
              </motion.button>
            </div>

            <div className="flex-1 flex flex-col items-center justify-center px-10 text-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentSlide}
                  initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: -40, filter: "blur(10px)" }}
                  transition={{ type: "spring", damping: 25, stiffness: 120 }}
                  className="flex flex-col items-center"
                >
                  <div className={`w-36 h-36 bg-gradient-to-br ${slides[currentSlide].gradient} rounded-[48px] flex items-center justify-center text-white shadow-[0_30px_60px_-15px_rgba(0,0,0,0.3)] mb-12 relative group`}>
                    <div className="absolute inset-4 border-2 border-white/20 rounded-[36px] group-hover:scale-110 transition-transform duration-700" />
                    {React.createElement(slides[currentSlide].icon, { size: 64, className: "drop-shadow-2xl" })}
                  </div>
                  
                  <h2 className="text-4xl font-black text-slate-900 mb-5 leading-[1.1] tracking-tight">
                    {slides[currentSlide].title}
                  </h2>
                  <p className="text-slate-500 text-[15px] font-medium leading-relaxed max-w-[300px]">
                    {slides[currentSlide].description}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="p-10">
              <motion.button
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                onClick={nextSlide}
                className={cn(
                  "w-full py-6 rounded-3xl font-black text-xs uppercase tracking-[0.2em] shadow-2xl transition-all duration-500 flex items-center justify-center gap-3",
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
