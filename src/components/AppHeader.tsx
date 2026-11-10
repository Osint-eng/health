import React from 'react';
import { Sparkles, ShieldAlert, User, LogIn } from 'lucide-react';
import { Language } from '../types';
import { LanguageSelector } from './LanguageSelector';

interface AppHeaderProps {
  language: Language;
  onLanguageChange: (lang: Language) => void;
  onOpenUrgent: () => void;
  onOpenAuth: () => void;
  isGuest?: boolean;
}

export const AppHeader: React.FC<AppHeaderProps> = ({
  language,
  onLanguageChange,
  onOpenUrgent,
  onOpenAuth,
  isGuest = true,
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
          <span className="font-extrabold text-slate-900 tracking-tight text-base sm:text-lg">
            Arogya Voice
          </span>
          <span className="hidden sm:inline-block text-[11px] font-semibold text-teal-800 bg-teal-50 border border-teal-200/70 px-2 py-0.5 rounded-full">
            {isTe ? 'అధికారిక ఆధారాలు' : 'Verified Guidelines'}
          </span>
        </div>

        {/* Header Right: Language, Emergency, Account */}
        <div className="flex items-center space-x-2 md:space-x-3">
          <LanguageSelector
            currentLanguage={language}
            onLanguageChange={onLanguageChange}
          />

          <button
            type="button"
            onClick={onOpenUrgent}
            title="Immediate emergency help"
            className="hidden sm:inline-flex items-center space-x-1 px-2.5 py-1.5 rounded-xl bg-red-50 hover:bg-red-100 text-red-700 border border-red-200 text-xs font-bold transition-colors"
          >
            <ShieldAlert className="w-3.5 h-3.5 text-red-600 shrink-0" />
            <span>108 / 112</span>
          </button>

          <button
            type="button"
            onClick={onOpenAuth}
            className="inline-flex items-center space-x-1 px-3 py-1.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-xs font-semibold text-slate-700 transition-colors"
          >
            {isGuest ? (
              <>
                <User className="w-3.5 h-3.5 text-teal-700" />
                <span>{isTe ? 'అతిథి (Guest)' : 'Guest Mode'}</span>
              </>
            ) : (
              <>
                <LogIn className="w-3.5 h-3.5 text-teal-700" />
                <span>{isTe ? 'ఖాతా' : 'Account'}</span>
              </>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
