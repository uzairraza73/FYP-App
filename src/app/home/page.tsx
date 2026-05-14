'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { 
  Camera, BarChart3, MessageSquare, Bell, ArrowRight, ChevronRight,
  Activity, Sparkles, User, History, ShieldCheck, Stethoscope,
  HeartPulse, Info, Droplets, Settings, LogOut, Languages, Moon, Sun, X
} from 'lucide-react';
import { useStore } from '@/lib/store';
import { cn } from '@/lib/utils';

const translations = {
  en: {
    welcome: "Welcome",
    dashboard: "Clinical Health Dashboard",
    patientDetails: "Patient Details",
    profileSummary: "Profile Summary",
    age: "Age",
    blood: "Blood",
    condition: "Condition",
    status: "Status",
    stable: "Stable",
    healthy: "Healthy",
    startScan: "Start AI Scan",
    dermatologicalAnalysis: "Dermatological Analysis",
    aiCareBot: "AI Care Bot",
    clinicalChat: "Clinical Chat",
    scanHistory: "Scan History",
    reportsFound: "Reports Found",
    healthAnalysis: "Health Analysis",
    prediction: "Prediction: Your skin recovery is at efficiency. The AI suggests continuing current hydration protocols.",
    efficiency: "efficiency",
    consultSpecialist: "Specialist Consultation",
    bookSession: "Book Expert Clinical Session",
    clinicalInsight: "Clinical Insight",
    insightText: "AI analysis indicates that consistent morning hydration significantly improves skin barrier function by 22%.",
    settings: "Settings",
    language: "Language",
    theme: "Theme",
    signOut: "Sign Out",
    notifications: "Notifications",
    noNotifications: "No new notifications",
    years: "y"
  },
  ur: {
    welcome: "خوش آمدید",
    dashboard: "کلینیکل ہیلتھ ڈیش بورڈ",
    patientDetails: "مریض کی تفصیلات",
    profileSummary: "پروفائل خلاصہ",
    age: "عمر",
    blood: "خون",
    condition: "حالت",
    status: "حالت",
    stable: "مستحکم",
    healthy: "صحت مند",
    startScan: "AI اسکین شروع کریں",
    dermatologicalAnalysis: "جلد کا تجزیہ",
    aiCareBot: "AI کیئر بوٹ",
    clinicalChat: "کلینیکل چیٹ",
    scanHistory: "اسکین کی تاریخ",
    reportsFound: "رپورٹس ملی ہیں",
    healthAnalysis: "صحت کا تجزیہ",
    prediction: "پیشن گوئی: آپ کی جلد کی بحالی کی کارکردگی 92٪ ہے۔ AI موجودہ ہائیڈریشن پروٹوکول کو جاری رکھنے کا مشورہ دیتا ہے۔",
    efficiency: "کارکردگی",
    consultSpecialist: "ماهر سے مشورہ",
    bookSession: "ماہر کلینیکل سیشن بک کریں",
    clinicalInsight: "کلینیکل بصیرت",
    insightText: "AI تجزیہ بتاتا ہے کہ صبح کی مسلسل ہائیڈریشن جلد کی رکاوٹ کے کام کو 22 فیصد تک بہتر بناتی ہے۔",
    settings: "ترتیبات",
    language: "زبان",
    theme: "تھیم",
    signOut: "سائن آؤٹ",
    notifications: "اطلاعات",
    noNotifications: "کوئی نئی اطلاع نہیں ہے",
    years: "سال"
  }
};

export default function HomePage() {
  const router = useRouter();
  const { 
    user, history, language, setLanguage, theme, setTheme, 
    notificationsEnabled, setNotificationsEnabled, signOut 
  } = useStore();
  const [showSettings, setShowSettings] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const t = translations[language] || translations.en;

  const handleSignOut = () => {
    signOut();
    setShowSettings(false);
    router.replace('/');
  };

  return (
    <div className="flex-1 overflow-y-auto px-6 pt-12 pb-32 medical-gradient transition-colors duration-500">
      <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="flex justify-between items-start mb-8">
        <div>
          <h1 className="text-3xl font-black text-dark-blue dark:text-white mb-1 drop-shadow-sm">{t.welcome}, {user?.name || 'User'} 👋</h1>
          <p className="text-clinical-blue/80 dark:text-slate-400 text-[12px] font-black uppercase tracking-[0.2em]">{t.dashboard}</p>
        </div>
        <div className="flex gap-2">
          <motion.button whileTap={{ scale: 0.9 }} onClick={() => setShowNotifications(true)} className="w-12 h-12 glass-card rounded-2xl flex items-center justify-center text-clinical-blue relative dark:bg-slate-800 dark:border-slate-700">
            <Bell size={22} />
            {notificationsEnabled && <span className="absolute top-3 right-3 w-2 h-2 bg-red-500 rounded-full border-2 border-white dark:border-slate-800" />}
          </motion.button>
          <motion.button whileTap={{ scale: 0.9 }} onClick={() => setShowSettings(true)} className="w-12 h-12 glass-card rounded-2xl flex items-center justify-center text-slate-500 dark:text-slate-400 dark:bg-slate-800 dark:border-slate-700">
            <Settings size={22} />
          </motion.button>
        </div>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-card rounded-[32px] p-6 mb-6 border-l-4 border-l-clinical-blue hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-500 dark:bg-slate-900/50 dark:border-slate-800">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-12 h-12 bg-clinical-blue/10 dark:bg-clinical-blue/20 rounded-2xl flex items-center justify-center text-clinical-blue shadow-inner"><User size={24} /></div>
          <div>
            <h3 className="text-[15px] font-black text-dark-blue dark:text-white uppercase tracking-wider">{t.patientDetails}</h3>
            <p className="text-[10px] text-slate-500 dark:text-slate-300/60 font-black uppercase tracking-widest mt-0.5">{t.profileSummary}</p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center gap-3 bg-slate-50/50 dark:bg-slate-800/50 p-2.5 rounded-xl border border-slate-100/50 dark:border-slate-700/50"><Activity size={14} className="text-slate-600 dark:text-slate-500" /><span className="text-[12px] font-black text-slate-800 dark:text-slate-200">{t.age}: {user?.age || '24'}{t.years}</span></div>
          <div className="flex items-center gap-3 bg-slate-50/50 dark:bg-slate-800/50 p-2.5 rounded-xl border border-slate-100/50 dark:border-slate-700/50"><Droplets size={14} className="text-red-600 dark:text-red-500" /><span className="text-[12px] font-black text-slate-800 dark:text-slate-200">{t.blood}: {user?.bloodGroup || 'B+'}</span></div>
          <div className="flex items-center gap-3 bg-slate-50/50 dark:bg-slate-800/50 p-2.5 rounded-xl border border-slate-100/50 dark:border-slate-700/50"><HeartPulse size={14} className="text-clinical-blue" /><span className="text-[12px] font-black text-slate-800 dark:text-slate-200 truncate">{user?.previousDiseases || t.healthy}</span></div>
          <div className="flex items-center gap-3 bg-slate-50/50 dark:bg-slate-800/50 p-2.5 rounded-xl border border-slate-100/50 dark:border-slate-700/50"><Info size={14} className="text-slate-600 dark:text-slate-500" /><span className="text-[12px] font-black text-slate-800 dark:text-slate-200">{t.stable}</span></div>
        </div>
      </motion.div>

      <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={() => router.push('/scan')} className="bg-clinical-blue rounded-[32px] p-7 mb-6 relative overflow-hidden group cursor-pointer shadow-2xl shadow-blue-500/30">
        <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 rounded-full -mr-16 -mt-16 blur-3xl group-hover:scale-125 transition-transform duration-700" />
        <div className="relative z-10 flex items-center justify-between">
          <div><h2 className="text-white text-2xl font-black mb-1 leading-tight">{t.startScan}</h2><p className="text-white/70 text-[10px] font-black uppercase tracking-[0.2em]">{t.dermatologicalAnalysis}</p></div>
          <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-3xl flex items-center justify-center shadow-lg group-hover:rotate-12 transition-transform"><Camera className="text-white" size={32} /></div>
        </div>
      </motion.div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <motion.div whileHover={{ y: -5 }} whileTap={{ scale: 0.98 }} onClick={() => router.push('/chat')} className="glass-card rounded-[32px] p-5 flex flex-col gap-4 hover:border-clinical-blue/40 transition-all shadow-xl shadow-blue-900/[0.02] dark:bg-slate-900/50 dark:border-slate-800">
          <div className="w-12 h-12 bg-violet-100 dark:bg-violet-900/40 rounded-2xl flex items-center justify-center text-violet-700 dark:text-violet-300 shadow-sm"><MessageSquare size={24} /></div>
          <div><h4 className="text-[14px] font-black text-dark-blue dark:text-white leading-tight">{t.aiCareBot}</h4><p className="text-[10px] text-slate-500 dark:text-slate-300/60 font-black uppercase tracking-widest mt-1">{t.clinicalChat}</p></div>
        </motion.div>
        <motion.div whileHover={{ y: -5 }} whileTap={{ scale: 0.98 }} onClick={() => router.push('/history')} className="glass-card rounded-[32px] p-5 flex flex-col gap-4 hover:border-emerald-400/40 transition-all shadow-xl shadow-blue-900/[0.02] dark:bg-slate-900/50 dark:border-slate-800">
          <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/40 rounded-2xl flex items-center justify-center text-emerald-700 dark:text-emerald-300 shadow-sm"><History size={24} /></div>
          <div><h4 className="text-[14px] font-black text-dark-blue dark:text-white leading-tight">{t.scanHistory}</h4><p className="text-[10px] text-slate-500 dark:text-slate-300/60 font-black uppercase tracking-widest mt-1">{history.length || 0} {t.reportsFound}</p></div>
        </motion.div>
      </div>
    </div>
  );
}
