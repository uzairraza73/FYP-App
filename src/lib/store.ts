import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface ScanHistoryItem {
  id: string;
  date: string;
  imageUrl: string;
  disease: string;
  risk: 'Low' | 'Medium' | 'High';
  severity: 'Mild' | 'Moderate' | 'Severe';
  confidence: number;
}

interface UserProfile {
  name: string;
  email: string;
  age?: string;
  gender?: string;
  skinType?: string;
  allergies?: string;
  bloodGroup?: string;
  disability?: string;
  previousDiseases?: string;
  contactNumber?: string;
  language: 'en' | 'ur';
}

interface AppState {
  user: UserProfile | null;
  hasCompletedOnboarding: boolean;
  activeScanImage: string | null;
  history: ScanHistoryItem[];
  language: 'en' | 'ur';
  theme: 'light' | 'dark';
  notificationsEnabled: boolean;
  setUser: (user: Partial<UserProfile> | null) => void;
  setHasCompletedOnboarding: (val: boolean) => void;
  setActiveScanImage: (image: string | null) => void;
  addHistoryItem: (item: ScanHistoryItem) => void;
  clearHistory: () => void;
  setLanguage: (lang: 'en' | 'ur') => void;
  setTheme: (theme: 'light' | 'dark') => void;
  setNotificationsEnabled: (val: boolean) => void;
  signOut: () => void;
}

export const useStore = create<AppState>()(
  persist(
    (set) => ({
      user: { 
        name: 'Uzair', 
        email: 'uzair@example.com',
        language: 'en'
      },
      hasCompletedOnboarding: false,
      activeScanImage: null,
      history: [
        {
          id: '1',
          date: 'April 10',
          imageUrl: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=200',
          disease: 'Acne',
          risk: 'Medium',
          severity: 'Moderate',
          confidence: 0.92,
        },
      ],
      language: 'en',
      theme: 'light',
      notificationsEnabled: true,
      setUser: (userData) => set((state) => ({ 
        user: userData ? { ...(state.user || { name: '', email: '', language: 'en' }), ...userData } : null 
      })),
      setHasCompletedOnboarding: (val) => set({ hasCompletedOnboarding: val }),
      setActiveScanImage: (image) => set({ activeScanImage: image }),
      addHistoryItem: (item) => set((state) => ({ history: [item, ...state.history] })),
      clearHistory: () => set({ history: [] }),
      setLanguage: (lang) => set({ language: lang }),
      setTheme: (theme) => set({ theme: theme }),
      setNotificationsEnabled: (val) => set({ notificationsEnabled: val }),
      signOut: () => set({ 
        user: null, 
        hasCompletedOnboarding: false, 
        history: [], 
        activeScanImage: null,
        theme: 'light',
        language: 'en'
      }),
    }),
    {
      name: 'skin-detection-storage-v2',
    }
  )
);
