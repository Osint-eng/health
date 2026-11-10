import React, { useState } from 'react';
import {
  Globe,
  Sliders,
  Shield,
  Volume2,
  Check,
  ChevronRight,
  ChevronLeft,
  Mic,
  Play,
} from 'lucide-react';
import { Language, UserPreferences } from '../types';
import { speechSynthesizer } from '../services/speech';

interface OnboardingModalProps {
  preferences: UserPreferences;
  onSavePreferences: (prefs: Partial<UserPreferences>) => void;
  onComplete: () => void;
}

export const OnboardingModal: React.FC<OnboardingModalProps> = ({
  preferences,
  onSavePreferences,
  onComplete,
}) => {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [selectedLang, setSelectedLang] = useState<Language>(preferences.language);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(preferences.playback_speed);
  const [textSize, setTextSize] = useState<'normal' | 'large' | 'extra_large'>(preferences.text_size);
  const [saveHistory, setSaveHistory] = useState<boolean>(preferences.save_history);
  const [retainAudio, setRetainAudio] = useState<boolean>(preferences.retain_audio);
  const [contributeRecordings, setContributeRecordings] = useState<boolean>(
    preferences.contribute_recordings
  );

  const isTe = selectedLang === 'te';

  const playSampleAudio = (lang: Language) => {
    const text =
      lang === 'te'
        ? 'నమస్కారం, ఆరోగ్య వాయిస్‌కి స్వాగతం. అధికారిక ఆరోగ్య మార్గదర్శకాలను మీ భాషలో తెలుసుకోండి.'
        : 'Welcome to Arogya Voice. Source-grounded health information in simple language.';
    speechSynthesizer.speak(text, lang, playbackSpeed);
  };

  const handleNext = () => {
    if (step < 3) {
      setStep((step + 1) as any);
    } else {
      onSavePreferences({
        language: selectedLang,
        playback_speed: playbackSpeed,
        text_size: textSize,
        save_history: saveHistory,
        retain_audio: retainAudio,
        contribute_recordings: contributeRecordings,
      });
      onComplete();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 md:p-8 shadow-2xl border border-teal-900/15 relative">
        {/* Step Indicator */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-2">
            {[1, 2, 3].map((s) => (
              <div
                key={s}
                className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                  step === s
                    ? 'bg-teal-700 text-white'
                    : step > s
                    ? 'bg-teal-100 text-teal-800'
                    : 'bg-slate-100 text-slate-400'
                }`}
              >
                {step > s ? <Check className="w-3.5 h-3.5" /> : s}
              </div>
            ))}
          </div>
          <span className="text-xs font-semibold text-slate-400">
            {isTe ? `దశ ${step} / 3` : `Step ${step} of 3`}
          </span>
        </div>

        {/* STEP 1: Language Selection */}
        {step === 1 && (
          <div className="space-y-4 animate-fade-in">
            <div>
              <h3 className="text-lg font-bold text-slate-900 flex items-center space-x-2">
                <Globe className="w-5 h-5 text-teal-700" />
                <span>{isTe ? 'భాషను ఎంచుకోండి' : 'Choose Your Language'}</span>
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                {isTe
                  ? 'మీరు ఎప్పుడైనా సెట్టింగ్‌లలో ఈ భాషను మార్చుకోవచ్చు.'
                  : 'You can change your language anytime in Settings.'}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div
                onClick={() => setSelectedLang('en')}
                className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                  selectedLang === 'en'
                    ? 'border-teal-700 bg-teal-50/70 shadow-xs ring-2 ring-teal-700/20'
                    : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold text-sm text-slate-900">English</span>
                  {selectedLang === 'en' && <Check className="w-4 h-4 text-teal-700" />}
                </div>
                <p className="text-xs text-slate-500 mb-3">Complete health library & voice model</p>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    playSampleAudio('en');
                  }}
                  className="px-2.5 py-1 text-[11px] font-semibold bg-white border border-slate-200 rounded-lg text-slate-700 hover:bg-slate-50 flex items-center space-x-1"
                >
                  <Play className="w-3 h-3 text-teal-700 fill-current" />
                  <span>Sample Voice</span>
                </button>
              </div>

              <div
                onClick={() => setSelectedLang('te')}
                className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                  selectedLang === 'te'
                    ? 'border-teal-700 bg-teal-50/70 shadow-xs ring-2 ring-teal-700/20'
                    : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold text-sm text-slate-900 font-telugu">తెలుగు (Telugu)</span>
                  {selectedLang === 'te' && <Check className="w-4 h-4 text-teal-700" />}
                </div>
                <p className="text-xs text-slate-500 mb-3 font-telugu">పరిశీలించిన అధికారిక మార్గదర్శకాలు</p>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    playSampleAudio('te');
                  }}
                  className="px-2.5 py-1 text-[11px] font-semibold bg-white border border-slate-200 rounded-lg text-slate-700 hover:bg-slate-50 flex items-center space-x-1"
                >
                  <Play className="w-3 h-3 text-teal-700 fill-current" />
                  <span>నమూనా వాయిస్</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* STEP 2: Output Preferences */}
        {step === 2 && (
          <div className="space-y-5 animate-fade-in">
            <div>
              <h3 className="text-lg font-bold text-slate-900 flex items-center space-x-2">
                <Sliders className="w-5 h-5 text-teal-700" />
                <span>{isTe ? 'అవుట్‌పుట్ ప్రాధాన్యతలు' : 'Audio & Reading Preferences'}</span>
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                {isTe
                  ? 'వాయిస్‌తో పాటు స్క్రీన్‌పై స్పష్టమైన పాఠం ఎల్లప్పుడూ కనిపిస్తుంది.'
                  : 'Text is always visible alongside spoken answers.'}
              </p>
            </div>

            {/* Playback Speed */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-2">
                {isTe ? 'స్పీచ్ స్పీడ్ (Playback Speed)' : 'Speech Playback Speed'}
              </label>
              <div className="flex space-x-2">
                {[0.75, 1.0, 1.25].map((spd) => (
                  <button
                    key={spd}
                    type="button"
                    onClick={() => setPlaybackSpeed(spd)}
                    className={`flex-1 py-2 text-xs font-bold rounded-xl border transition-all ${
                      playbackSpeed === spd
                        ? 'bg-teal-700 text-white border-teal-700 shadow-xs'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    {spd}x {spd === 1.0 ? (isTe ? '(సాధారణ)' : '(Normal)') : ''}
                  </button>
                ))}
              </div>
            </div>

            {/* Text Size */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-2">
                {isTe ? 'అక్షరాల పరిమాణం (Text Size)' : 'Text Size & Readability'}
              </label>
              <div className="flex space-x-2">
                {[
                  { id: 'normal', label: isTe ? 'సాధారణం' : 'Standard' },
                  { id: 'large', label: isTe ? 'పెద్దది' : 'Large' },
                  { id: 'extra_large', label: isTe ? 'అతి పెద్దది' : 'X-Large' },
                ].map((sz) => (
                  <button
                    key={sz.id}
                    type="button"
                    onClick={() => setTextSize(sz.id as any)}
                    className={`flex-1 py-2 text-xs font-bold rounded-xl border transition-all ${
                      textSize === sz.id
                        ? 'bg-teal-700 text-white border-teal-700 shadow-xs'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    {sz.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* STEP 3: Privacy & Optional Consents */}
        {step === 3 && (
          <div className="space-y-4 animate-fade-in">
            <div>
              <h3 className="text-lg font-bold text-slate-900 flex items-center space-x-2">
                <Shield className="w-5 h-5 text-teal-700" />
                <span>{isTe ? 'గోప్యత & అనుమతులు' : 'Privacy & Consent Controls'}</span>
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                {isTe
                  ? 'మేము మీ గోప్యతను గౌరవిస్తాము. ఆడియో నిల్వ పూర్తిగా మీ ఇష్టం.'
                  : 'Plain-language controls. Audio recording retention is never required for app access.'}
              </p>
            </div>

            <div className="space-y-3 pt-1">
              <label className="flex items-start space-x-3 p-3 bg-slate-50 rounded-xl border border-slate-200 cursor-pointer">
                <input
                  type="checkbox"
                  checked={saveHistory}
                  onChange={(e) => setSaveHistory(e.target.checked)}
                  className="mt-0.5 rounded text-teal-700 focus:ring-teal-600"
                />
                <div className="text-xs">
                  <span className="font-bold text-slate-900 block">
                    {isTe ? 'సంభాషణల చరిత్రను భద్రపరచండి' : 'Save conversation history in browser'}
                  </span>
                  <span className="text-slate-500">
                    {isTe
                      ? 'గత ప్రశ్నలు మరియు మూలాలను సులభంగా మళ్లీ చూడటానికి అనుమతిస్తుంది.'
                      : 'Allows reviewing your past health questions and citations later.'}
                  </span>
                </div>
              </label>

              <label className="flex items-start space-x-3 p-3 bg-slate-50 rounded-xl border border-slate-200 cursor-pointer">
                <input
                  type="checkbox"
                  checked={retainAudio}
                  onChange={(e) => setRetainAudio(e.target.checked)}
                  className="mt-0.5 rounded text-teal-700 focus:ring-teal-600"
                />
                <div className="text-xs">
                  <span className="font-bold text-slate-900 block">
                    {isTe ? 'వాయిస్ ఆడియో నిల్వ (ఐచ్ఛికం)' : 'Retain voice recordings (optional)'}
                  </span>
                  <span className="text-slate-500">
                    {isTe
                      ? 'డిఫాల్ట్‌గా ఆడియో తక్షణమే తొలగించబడుతుంది (Off).'
                      : 'By default, raw audio is discarded immediately after transcription.'}
                  </span>
                </div>
              </label>

              <label className="flex items-start space-x-3 p-3 bg-slate-50 rounded-xl border border-slate-200 cursor-pointer">
                <input
                  type="checkbox"
                  checked={contributeRecordings}
                  onChange={(e) => setContributeRecordings(e.target.checked)}
                  className="mt-0.5 rounded text-teal-700 focus:ring-teal-600"
                />
                <div className="text-xs">
                  <span className="font-bold text-slate-900 block">
                    {isTe ? 'తెలుగు స్పీచ్ మెరుగుదలకు దోహదపడండి' : 'Contribute consented samples for Telugu speech testing'}
                  </span>
                  <span className="text-slate-500">
                    {isTe
                      ? 'వైద్య డేటా నుండి వేరుగా కేవలం స్పీచ్ మోడల్ నాణ్యత కొరకు మాత్రమే ఉపయోగించబడుతుంది.'
                      : 'Kept completely separate from the medical knowledge base.'}
                  </span>
                </div>
              </label>
            </div>
          </div>
        )}

        {/* Modal Navigation Buttons */}
        <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
          {step > 1 ? (
            <button
              type="button"
              onClick={() => setStep((step - 1) as any)}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl flex items-center space-x-1"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>{isTe ? 'వెనుకకు' : 'Back'}</span>
            </button>
          ) : (
            <div />
          )}

          <button
            type="button"
            onClick={handleNext}
            className="px-5 py-2.5 bg-teal-800 hover:bg-teal-900 text-white rounded-xl text-xs font-bold shadow-sm flex items-center space-x-1 transition-all"
          >
            <span>{step === 3 ? (isTe ? 'ప్రారంభించండి' : 'Finish & Start') : (isTe ? 'తదుపరి' : 'Continue')}</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
