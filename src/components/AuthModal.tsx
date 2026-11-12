import React, { useState } from 'react';
import { X, Lock, Mail, User, ShieldCheck, CheckCircle2, Stethoscope, Users, UserCheck, ArrowRight, RotateCcw } from 'lucide-react';
import { Language, UserProfile } from '../types';
import { DEMO_PERSONAS } from '../data/demoPersonas';

interface AuthModalProps {
  language: Language;
  currentUser: UserProfile;
  onClose: () => void;
  onSelectPersona: (persona: UserProfile) => void;
  onResetDemoData?: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  language,
  currentUser,
  onClose,
  onSelectPersona,
  onResetDemoData,
}) => {
  const [resetting, setResetting] = useState(false);
  const [resetMessage, setResetMessage] = useState('');
  const isTe = language === 'te';

  const handleSelect = (persona: UserProfile) => {
    onSelectPersona(persona);
    onClose();
  };

  const handleReset = async () => {
    if (!onResetDemoData) return;
    setResetting(true);
    try {
      await onResetDemoData();
      setResetMessage(isTe ? 'డెమో డేటా విజయవంతంగా రీసెట్ చేయబడింది!' : 'Demo data reset to clean verified state!');
      setTimeout(() => setResetMessage(''), 3000);
    } catch {
      setResetMessage('Reset error');
    } finally {
      setResetting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-7 shadow-2xl border border-slate-200 relative max-h-[92vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-700 rounded-full hover:bg-slate-100"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="text-center mb-6">
          <div className="w-12 h-12 rounded-2xl bg-teal-50 border border-teal-200/80 flex items-center justify-center text-teal-800 mx-auto mb-2 shadow-xs">
            <UserCheck className="w-6 h-6 text-teal-700" />
          </div>
          <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 tracking-tight">
            {isTe ? 'పాత్రలు & వినియోగదారుల మార్పిడి (RBAC)' : 'User Identity & Role-Based Access'}
          </h3>
          <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
            {isTe
              ? 'న్యాయనిర్ణేతలు మరియు పరిశీలకుల కోసం 1-క్లిక్ రోల్ స్విచ్చింగ్.'
              : 'Select a verified persona to test role-specific clinical permissions, audit rights, and language flows.'}
          </p>
        </div>

        {resetMessage && (
          <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs font-semibold text-emerald-800 text-center mb-4">
            {resetMessage}
          </div>
        )}

        {/* Persona Selection Grid */}
        <div className="space-y-3 mb-6">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-400 px-1">
            {isTe ? 'నమూనా వినియోగదారు పాత్రలు (Demo Personas):' : 'Pre-configured Demo Personas:'}
          </div>

          {DEMO_PERSONAS.map((persona) => {
            const isSelected = currentUser.id === persona.id;
            return (
              <div
                key={persona.id}
                onClick={() => handleSelect(persona)}
                className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                  isSelected
                    ? 'bg-teal-50/70 border-teal-500/80 shadow-xs ring-1 ring-teal-500/30'
                    : 'bg-white hover:bg-slate-50 border-slate-200 hover:border-teal-300'
                }`}
              >
                <div className="flex items-center space-x-3 truncate pr-2">
                  <div className={`w-10 h-10 rounded-xl ${persona.avatar_color} text-white flex items-center justify-center font-bold text-sm shrink-0 shadow-2xs`}>
                    {persona.name.charAt(0)}
                  </div>
                  <div className="truncate">
                    <div className="flex items-center space-x-2">
                      <h4 className="text-xs sm:text-sm font-bold text-slate-900 truncate">
                        {persona.name}
                      </h4>
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        persona.role === 'clinical_reviewer'
                          ? 'bg-emerald-100 text-emerald-800'
                          : persona.role === 'asha_worker'
                          ? 'bg-teal-100 text-teal-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}>
                        {persona.badge}
                      </span>
                    </div>
                    <div className="text-[11px] text-slate-500 truncate mt-0.5">
                      {persona.organization} · Lang: {persona.preferred_language.toUpperCase()}
                    </div>
                  </div>
                </div>

                <div className="shrink-0 pl-2">
                  {isSelected ? (
                    <span className="inline-flex items-center text-xs font-bold text-teal-700 bg-teal-100/70 px-2.5 py-1 rounded-lg">
                      <CheckCircle2 className="w-3.5 h-3.5 mr-1 text-teal-700" />
                      Active
                    </span>
                  ) : (
                    <span className="text-xs font-semibold text-slate-400 hover:text-teal-700 flex items-center">
                      Switch →
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Quick Demo Reset Card */}
        {onResetDemoData && (
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 mb-2">
            <div>
              <div className="text-xs font-bold text-slate-800 flex items-center space-x-1.5">
                <RotateCcw className="w-3.5 h-3.5 text-teal-700" />
                <span>{isTe ? 'క్లీన్ డెమో ప్రారంభ స్థితి' : 'Reset to Clean Demo Baseline'}</span>
              </div>
              <p className="text-[11px] text-slate-500 mt-0.5">
                {isTe
                  ? 'సమీక్షించిన పత్రాలు, సంభాషణలు మరియు టెస్ట్‌లను అసలు స్థితికి పునరుద్ధరిస్తుంది.'
                  : 'Restores the 7 verified documents, clean seed conversation, and audit benchmarks.'}
              </p>
            </div>
            <button
              type="button"
              disabled={resetting}
              onClick={handleReset}
              className="px-3.5 py-2 bg-white hover:bg-slate-100 border border-slate-300 text-slate-700 hover:text-teal-900 rounded-xl text-xs font-bold transition-all shrink-0 shadow-2xs"
            >
              {resetting ? 'Resetting...' : isTe ? 'రీసెట్ చేయండి' : 'Reset Demo'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
