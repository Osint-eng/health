import React from 'react';
import { Language } from '../types';
import { Globe } from 'lucide-react';

interface LanguageSelectorProps {
  currentLanguage: Language;
  onLanguageChange: (lang: Language) => void;
  className?: string;
}

export const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  currentLanguage,
  onLanguageChange,
  className = '',
}) => {
  return (
    <div className={`inline-flex items-center rounded-xl bg-teal-900/10 p-1 border border-teal-800/15 ${className}`}>
      <Globe className="w-4 h-4 ml-2 mr-1.5 text-teal-800 shrink-0" />
      <button
        type="button"
        onClick={() => onLanguageChange('en')}
        className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
          currentLanguage === 'en'
            ? 'bg-teal-700 text-white shadow-sm'
            : 'text-teal-950 hover:bg-teal-800/10'
        }`}
      >
        English
      </button>
      <button
        type="button"
        onClick={() => onLanguageChange('te')}
        className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
          currentLanguage === 'te'
            ? 'bg-teal-700 text-white shadow-sm font-telugu'
            : 'text-teal-950 hover:bg-teal-800/10 font-telugu'
        }`}
      >
        తెలుగు (Telugu)
      </button>
    </div>
  );
};
