import React from 'react';
import { Sparkles, ShieldAlert, UserCheck, RotateCcw } from 'lucide-react';
import { Language, UserProfile } from '../types';
import { LanguageSelector } from './LanguageSelector';

interface AppHeaderProps {
  language: Language;
  onLanguageChange: (lang: Language) => void;
  onOpenUrgent: () => void;
  onOpenAuth: () => void;
  currentUser: UserProfile;
  onResetDemoData?: () => void;
}

export const AppHeader: React.FC<AppHeaderProps> = ({
  language,
  onLanguageChange,
  onOpenUrgent,
  onOpenAuth,
  currentUser,
  onResetDemoData,
}) => {
  const isTe = language === 'te';

  return (
    <header className="bg-white/80 backdrop-blur-md border-b border-slate-200/80 sticky top-0 z-20 px-4 py-2.5">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        {/* Brand */}
        <div className="flex items-center space-x-2.5">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-teal-800 to-teal-600 flex items-center justify-center text-white shadow-xs">
            <Sparkles className="w-4 h-4 text-teal-200" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-extrabold text-slate-900 tracking-tight text-base sm:text-lg">
                Arogya Voice
              </span>
              <span className="hidden md:inline-block text-[10px] font-bold text-teal-800 bg-teal-50 border border-teal-200/70 px-2 py-0.5 rounded-full">
                {isTe ? 'అధికారిక ఆధారాలు' : 'Verified Guidelines'}
              </span>
            </div>
          </div>
        </div>

        {/* Header Right: Language, Emergency, Persona & Reset */}
        <div className="flex items-center space-x-2 md:space-x-3">
          <LanguageSelector
            currentLanguage={language}
            onLanguageChange={onLanguageChange}
          />

          <button
            type="button"
            onClick={onOpenUrgent}
            title="Immediate emergency helpline dispatch"
            className="hidden sm:inline-flex items-center space-x-1 px-2.5 py-1.5 rounded-xl bg-red-50 hover:bg-red-100 text-red-700 border border-red-200 text-xs font-bold transition-colors shadow-2xs"
          >
            <ShieldAlert className="w-3.5 h-3.5 text-red-600 shrink-0" />
            <span>108 / 112</span>
          </button>

          {/* Quick Demo Reset Button for Judges */}
          {onResetDemoData && (
            <button
              type="button"
              onClick={onResetDemoData}
              title="Reset all data to clean verified demo baseline"
              className="hidden lg:inline-flex items-center space-x-1 px-2 py-1.5 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-600 border border-slate-200 text-xs font-semibold transition-colors"
            >
              <RotateCcw className="w-3 h-3 text-slate-500" />
              <span>Reset Demo</span>
            </button>
          )}

          {/* Active User Persona Pill */}
          <button
            type="button"
            onClick={onOpenAuth}
            title="Click to switch persona (Auditor / ASHA / Patient / Guest)"
            className="inline-flex items-center space-x-2 px-2.5 py-1.5 rounded-xl border border-slate-200 hover:border-teal-300 hover:bg-teal-50/50 bg-white text-xs font-semibold transition-all shadow-2xs group"
          >
            <div className={`w-5 h-5 rounded-md ${currentUser.avatar_color} text-white flex items-center justify-center text-[10px] font-extrabold shrink-0`}>
              {currentUser.name.charAt(0)}
            </div>
            <div className="text-left hidden sm:block truncate max-w-[130px]">
              <div className="text-[11px] font-bold text-slate-900 group-hover:text-teal-900 truncate leading-tight">
                {currentUser.name}
              </div>
              <div className="text-[9px] font-semibold text-slate-400 truncate">
                {currentUser.badge}
              </div>
            </div>
          </button>
        </div>
      </div>
    </header>
  );
};
