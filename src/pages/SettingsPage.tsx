import React, { useState } from 'react';
import {
  Settings,
  Shield,
  Sliders,
  Globe,
  Trash2,
  CheckCircle2,
  LogOut,
  Info,
  Server,
  Mic,
  Bookmark,
} from 'lucide-react';
import { Language, UserPreferences } from '../types';
import { api } from '../services/api';

interface SettingsPageProps {
  preferences: UserPreferences;
  onUpdatePreferences: (prefs: Partial<UserPreferences>) => void;
  onClearAllData: () => void;
}

export const SettingsPage: React.FC<SettingsPageProps> = ({
  preferences,
  onUpdatePreferences,
  onClearAllData,
}) => {
  const [prefs, setPrefs] = useState<UserPreferences>(preferences);
  const [savedNotice, setSavedNotice] = useState(false);
  const isTe = prefs.language === 'te';

  const handleUpdate = async (updates: Partial<UserPreferences>) => {
    const newPrefs = { ...prefs, ...updates };
    setPrefs(newPrefs);
    onUpdatePreferences(updates);
    try {
      await api.updatePreferences(updates);
      setSavedNotice(true);
      setTimeout(() => setSavedNotice(false), 2000);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-6 md:py-8 space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight flex items-center space-x-2">
            <Settings className="w-6 h-6 text-teal-700" />
            <span>{isTe ? 'సెట్టింగ్‌లు & గోప్యత' : 'Settings & Privacy Controls'}</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            {isTe
              ? 'మీ భాష, వాయిస్ వేగం మరియు డేటా నియంత్రణలను నిర్వహించండి.'
              : 'Manage language, speech audio speed, and honest privacy retention.'}
          </p>
        </div>

        {savedNotice && (
          <span className="inline-flex items-center space-x-1 px-3 py-1 bg-teal-50 border border-teal-200 text-teal-800 rounded-lg text-xs font-bold animate-fade-in">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>{isTe ? 'భద్రపరచబడింది' : 'Preferences Saved'}</span>
          </span>
        )}
      </div>

      {/* Honest Processing Mode Callout */}
      <div className="p-5 bg-gradient-to-br from-slate-900 to-teal-950 text-white rounded-3xl shadow-sm space-y-3">
        <div className="flex items-center space-x-2 text-teal-300 text-xs font-bold uppercase tracking-wider">
          <Server className="w-4 h-4" />
          <span>{isTe ? 'పారదర్శక సిస్టమ్ స్థితి' : 'Transparent System Architecture'}</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs pt-1">
          <div className="p-3 bg-white/10 rounded-2xl border border-white/10">
            <div className="text-teal-200 text-[11px] mb-0.5">Processing Mode</div>
            <div className="font-bold text-white text-sm">Cloud-Assisted (Server RAG)</div>
            <div className="text-[10px] text-slate-300 mt-0.5">Approved Passages Index</div>
          </div>
          <div className="p-3 bg-white/10 rounded-2xl border border-white/10">
            <div className="text-teal-200 text-[11px] mb-0.5">Audio Retention</div>
            <div className="font-bold text-white text-sm">
              {prefs.retain_audio ? 'Enabled (Consented)' : 'Off (Privacy Compliant)'}
            </div>
            <div className="text-[10px] text-slate-300 mt-0.5">Discarded after transcription</div>
          </div>
          <div className="p-3 bg-white/10 rounded-2xl border border-white/10">
            <div className="text-teal-200 text-[11px] mb-0.5">Conversation History</div>
            <div className="font-bold text-white text-sm">
              {prefs.save_history ? 'Active (Browser)' : 'Off (Ephemeral)'}
            </div>
            <div className="text-[10px] text-slate-300 mt-0.5">User-controlled storage</div>
          </div>
        </div>
      </div>

      {/* Language & Voice Settings */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-xs space-y-4">
        <h3 className="font-bold text-slate-900 text-sm flex items-center space-x-2">
          <Globe className="w-4 h-4 text-teal-700" />
          <span>{isTe ? 'భాష మరియు స్పీచ్ ప్రాధాన్యతలు' : 'Language & Spoken Voice Output'}</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => handleUpdate({ language: 'en' })}
            className={`p-3.5 rounded-2xl border text-left transition-all ${
              prefs.language === 'en'
                ? 'border-teal-700 bg-teal-50/70 ring-2 ring-teal-700/20'
                : 'border-slate-200 hover:bg-slate-50'
            }`}
          >
            <div className="font-bold text-slate-900 text-sm">English</div>
            <div className="text-xs text-slate-500 mt-0.5">Primary language · Tested clinical guidelines</div>
          </button>

          <button
            type="button"
            onClick={() => handleUpdate({ language: 'te' })}
            className={`p-3.5 rounded-2xl border text-left transition-all ${
              prefs.language === 'te'
                ? 'border-teal-700 bg-teal-50/70 ring-2 ring-teal-700/20'
                : 'border-slate-200 hover:bg-slate-50'
            }`}
          >
            <div className="font-bold text-slate-900 text-sm font-telugu">తెలుగు (Telugu)</div>
            <div className="text-xs text-slate-500 mt-0.5 font-telugu">పరిశీలించిన అధికారిక మార్గదర్శకాలు</div>
          </button>
        </div>

        {/* Playback speed */}
        <div className="pt-2">
          <label className="block text-xs font-bold text-slate-700 mb-1.5">
            {isTe ? 'ఆడియో మాట్లాడే వేగం (Speech Speed)' : 'Speech Playback Speed'}
          </label>
          <div className="flex space-x-2">
            {[0.75, 1.0, 1.25].map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => handleUpdate({ playback_speed: s })}
                className={`flex-1 py-2 text-xs font-bold rounded-xl border transition-all ${
                  prefs.playback_speed === s
                    ? 'bg-teal-700 text-white border-teal-700 shadow-xs'
                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                }`}
              >
                {s}x {s === 1.0 ? '(Normal)' : ''}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Privacy and Data Controls */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-xs space-y-4">
        <h3 className="font-bold text-slate-900 text-sm flex items-center space-x-2">
          <Shield className="w-4 h-4 text-teal-700" />
          <span>{isTe ? 'గోప్యత & డేటా పాలసీ' : 'Privacy & Consents'}</span>
        </h3>

        <div className="space-y-3">
          <label className="flex items-center justify-between p-3.5 bg-slate-50 rounded-2xl border border-slate-200/80 cursor-pointer">
            <div>
              <span className="font-bold text-xs text-slate-900 block">
                {isTe ? 'సంభాషణల చరిత్రను భద్రపరచండి' : 'Save conversation history'}
              </span>
              <span className="text-[11px] text-slate-500">
                {isTe
                  ? 'మీ పరికరంలో గత ప్రశ్నలను మళ్లీ చూడటానికి అనుమతిస్తుంది.'
                  : 'Allows accessing past cited answers across your browsing sessions.'}
              </span>
            </div>
            <input
              type="checkbox"
              checked={prefs.save_history}
              onChange={(e) => handleUpdate({ save_history: e.target.checked })}
              className="rounded text-teal-700 focus:ring-teal-600 w-4 h-4 ml-3"
            />
          </label>

          <label className="flex items-center justify-between p-3.5 bg-slate-50 rounded-2xl border border-slate-200/80 cursor-pointer">
            <div>
              <span className="font-bold text-xs text-slate-900 block">
                {isTe ? 'వాయిస్ రికార్డింగ్‌ల నిల్వ (ఐచ్ఛికం)' : 'Voice audio retention'}
              </span>
              <span className="text-[11px] text-slate-500">
                {isTe
                  ? 'డిఫాల్ట్‌గా ఆఫ్ చేయబడింది. ఆడియో తక్షణమే రద్దు చేయబడుతుంది.'
                  : 'Off by default. Audio is destroyed immediately after transcription.'}
              </span>
            </div>
            <input
              type="checkbox"
              checked={prefs.retain_audio}
              onChange={(e) => handleUpdate({ retain_audio: e.target.checked })}
              className="rounded text-teal-700 focus:ring-teal-600 w-4 h-4 ml-3"
            />
          </label>
        </div>

        {/* Clear Data & Sign out */}
        <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
          <button
            type="button"
            onClick={onClearAllData}
            className="w-full sm:w-auto px-4 py-2 bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 rounded-xl text-xs font-bold transition-colors flex items-center justify-center space-x-1.5"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>{isTe ? 'అన్ని సంభాషణ డేటాను తుడిచివేయండి' : 'Permanently Delete All Data'}</span>
          </button>

          <div className="text-[11px] text-slate-400">
            {isTe ? 'ఆరోగ్య వాయిస్ v1.0 MVP' : 'Arogya Voice MVP v1.0.4'}
          </div>
        </div>
      </div>
    </div>
  );
};
