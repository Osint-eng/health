import React, { useState } from 'react';
import {
  X,
  UserCheck,
  CheckCircle2,
  RotateCcw,
  HeartPulse,
  Phone,
  Droplets,
  AlertCircle,
  ShieldPlus,
  UserPlus,
} from 'lucide-react';
import { EmergencyMedicalId, Language, UserProfile } from '../types';
import { DEMO_PERSONAS } from '../data/demoPersonas';

interface AuthModalProps {
  language: Language;
  currentUser: UserProfile;
  onClose: () => void;
  onSelectPersona: (persona: UserProfile) => void;
  onResetDemoData?: () => void;
}

const BLOOD_GROUPS = ['O+', 'O-', 'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'Unknown'];

export const AuthModal: React.FC<AuthModalProps> = ({
  language,
  currentUser,
  onClose,
  onSelectPersona,
  onResetDemoData,
}) => {
  const [activeTab, setActiveTab] = useState<'personas' | 'profile'>('personas');
  const [resetting, setResetting] = useState(false);
  const [resetMessage, setResetMessage] = useState('');
  const isTe = language === 'te';

  // Local sign-in & Emergency Medical ID form state
  const [name, setName] = useState(
    currentUser.id === 'user_guest' ? '' : currentUser.name
  );
  const [phone, setPhone] = useState(currentUser.phone || '');
  const [preferredLang, setPreferredLang] = useState<Language>(
    currentUser.preferred_language || language
  );
  const [bloodGroup, setBloodGroup] = useState(
    currentUser.medical_id?.blood_group || 'O+'
  );
  const [allergies, setAllergies] = useState(
    currentUser.medical_id?.allergies || ''
  );
  const [chronicConditions, setChronicConditions] = useState(
    currentUser.medical_id?.chronic_conditions || ''
  );
  const [emergencyContactName, setEmergencyContactName] = useState(
    currentUser.medical_id?.emergency_contact_name || ''
  );
  const [emergencyContactPhone, setEmergencyContactPhone] = useState(
    currentUser.medical_id?.emergency_contact_phone || ''
  );
  const [abhaId, setAbhaId] = useState(currentUser.medical_id?.abha_id || '');
  const [formError, setFormError] = useState('');

  const handleSelect = (persona: UserProfile) => {
    onSelectPersona(persona);
    onClose();
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedName = name.trim();
    if (!trimmedName) {
      setFormError(
        isTe
          ? 'దయచేసి మీ పేరును నమోదు చేయండి.'
          : 'Please enter a name to save your profile.'
      );
      return;
    }

    const medicalId: EmergencyMedicalId = {
      blood_group: bloodGroup || 'Unknown',
      allergies: allergies.trim() || 'None reported',
      chronic_conditions: chronicConditions.trim() || 'None reported',
      emergency_contact_name: emergencyContactName.trim() || 'Not specified',
      emergency_contact_phone: emergencyContactPhone.trim() || '108',
      abha_id: abhaId.trim() || undefined,
    };

    const isExistingDemo = DEMO_PERSONAS.some((p) => p.id === currentUser.id && p.id !== 'user_guest');
    const updatedUser: UserProfile = isExistingDemo && currentUser.name === trimmedName
      ? {
          ...currentUser,
          phone: phone.trim() || currentUser.phone,
          preferred_language: preferredLang,
          medical_id: medicalId,
        }
      : {
          id: `user_custom_${trimmedName.toLowerCase().replace(/[^a-z0-9]+/g, '_')}`,
          name: trimmedName,
          phone: phone.trim() || undefined,
          role: 'patient',
          badge: 'Signed-In Member',
          organization: 'Personal Health Profile',
          preferred_language: preferredLang,
          avatar_color: 'bg-teal-700',
          medical_id: medicalId,
          permissions: {
            can_ask: true,
            can_browse_library: true,
            can_submit_feedback: true,
            can_ingest_documents: false,
            can_approve_documents: false,
            can_resolve_reviews: false,
            can_run_evals: false,
          },
        };

    onSelectPersona(updatedUser);
    onClose();
  };

  const handleReset = async () => {
    if (!onResetDemoData) return;
    setResetting(true);
    try {
      await onResetDemoData();
      setResetMessage(
        isTe
          ? 'డెమో డేటా విజయవంతంగా రీసెట్ చేయబడింది!'
          : 'Demo data reset to clean verified state!'
      );
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
        <div className="text-center mb-5">
          <div className="w-12 h-12 rounded-2xl bg-teal-50 border border-teal-200/80 flex items-center justify-center text-teal-800 mx-auto mb-2 shadow-xs">
            <UserCheck className="w-6 h-6 text-teal-700" />
          </div>
          <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 tracking-tight">
            {isTe
              ? 'వినియోగదారు ప్రొఫైల్ & అత్యవసర వైద్య ఐడి'
              : 'User Profile & Emergency Medical ID'}
          </h3>
          <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
            {isTe
              ? 'డెమో పాత్రలను మార్చండి లేదా మీ వ్యక్తిగత అత్యవసర వైద్య ఐడిని సేవ్ చేయండి.'
              : 'Switch demo personas or sign in locally with your Emergency Medical ID for instant urgent-care display.'}
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="grid grid-cols-2 gap-1.5 p-1 bg-slate-100 rounded-2xl mb-5">
          <button
            type="button"
            onClick={() => setActiveTab('personas')}
            className={`py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center space-x-1.5 ${
              activeTab === 'personas'
                ? 'bg-white text-teal-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <UserCheck className="w-3.5 h-3.5" />
            <span>{isTe ? 'డెమో పాత్రలు' : 'Demo Personas'}</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('profile')}
            className={`py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center space-x-1.5 ${
              activeTab === 'profile'
                ? 'bg-white text-rose-800 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <HeartPulse className="w-3.5 h-3.5" />
            <span>{isTe ? 'సైన్ ఇన్ & మెడికల్ ఐడి' : 'Sign In & Medical ID'}</span>
          </button>
        </div>

        {resetMessage && (
          <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs font-semibold text-emerald-800 text-center mb-4">
            {resetMessage}
          </div>
        )}

        {activeTab === 'personas' ? (
          <>
            {/* Persona Selection Grid */}
            <div className="space-y-3 mb-6">
              <div className="text-xs font-bold uppercase tracking-wider text-slate-400 px-1">
                {isTe
                  ? 'నమూనా వినియోగదారు పాత్రలు (Demo Personas):'
                  : 'Pre-configured Demo Personas:'}
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
                      <div
                        className={`w-10 h-10 rounded-xl ${persona.avatar_color} text-white flex items-center justify-center font-bold text-sm shrink-0 shadow-2xs`}
                      >
                        {persona.name.charAt(0)}
                      </div>
                      <div className="truncate">
                        <div className="flex items-center space-x-2">
                          <h4 className="text-xs sm:text-sm font-bold text-slate-900 truncate">
                            {persona.name}
                          </h4>
                          <span
                            className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                              persona.role === 'clinical_reviewer'
                                ? 'bg-emerald-100 text-emerald-800'
                                : persona.role === 'asha_worker'
                                ? 'bg-teal-100 text-teal-800'
                                : 'bg-amber-100 text-amber-800'
                            }`}
                          >
                            {persona.badge}
                          </span>
                        </div>
                        <div className="text-[11px] text-slate-500 truncate mt-0.5">
                          {persona.organization} · Lang: {persona.preferred_language.toUpperCase()}
                          {persona.medical_id?.blood_group
                            ? ` · Blood: ${persona.medical_id.blood_group}`
                            : ''}
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
                    <span>
                      {isTe
                        ? 'క్లీన్ డెమో ప్రారంభ స్థితి'
                        : 'Reset to Clean Demo Baseline'}
                    </span>
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
          </>
        ) : (
          <form onSubmit={handleSaveProfile} className="space-y-4">
            {formError && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-xs font-semibold text-red-700 flex items-center space-x-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{formError}</span>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-bold text-slate-600 mb-1">
                  {isTe ? 'పూర్తి పేరు *' : 'Full Name *'}
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g., Sita Ramulu"
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-500/30 focus:border-teal-600"
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-slate-600 mb-1">
                  {isTe ? 'ఫోన్ నంబర్' : 'Mobile Number'}
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+91 98480 XXXXX"
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-500/30 focus:border-teal-600"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-bold text-slate-600 mb-1">
                  {isTe ? 'ప్రాధాన్య భాష' : 'Preferred Language'}
                </label>
                <select
                  value={preferredLang}
                  onChange={(e) => setPreferredLang(e.target.value as Language)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-teal-500/30 focus:border-teal-600"
                >
                  <option value="en">English (EN)</option>
                  <option value="te">తెలుగు (TE)</option>
                </select>
              </div>
              <div>
                <label className="block text-[11px] font-bold text-slate-600 mb-1">
                  {isTe ? 'ABHA డిజిటల్ హెల్త్ ఐడి (ఐచ్ఛికం)' : 'ABHA Health ID (Optional)'}
                </label>
                <input
                  type="text"
                  value={abhaId}
                  onChange={(e) => setAbhaId(e.target.value)}
                  placeholder="91-XXXX-XXXX-XXXX"
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-500/30 focus:border-teal-600"
                />
              </div>
            </div>

            {/* Emergency Medical ID Section */}
            <div className="p-4 rounded-2xl bg-rose-50/70 border border-rose-200 space-y-3">
              <div className="flex items-center space-x-2 text-xs font-extrabold text-rose-900">
                <ShieldPlus className="w-4 h-4 text-rose-600" />
                <span>
                  {isTe
                    ? 'అత్యవసర వైద్య ఐడి కార్డు వివరాలు'
                    : 'Emergency Medical ID Details'}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-rose-900/80 mb-1 flex items-center space-x-1">
                    <Droplets className="w-3 h-3 text-rose-600" />
                    <span>{isTe ? 'రక్త గ్రూపు' : 'Blood Group'}</span>
                  </label>
                  <select
                    value={bloodGroup}
                    onChange={(e) => setBloodGroup(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-rose-200 bg-white focus:outline-none focus:ring-2 focus:ring-rose-500/30"
                  >
                    {BLOOD_GROUPS.map((bg) => (
                      <option key={bg} value={bg}>
                        {bg}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-rose-900/80 mb-1">
                    {isTe ? 'అలెర్జీలు (Allergies)' : 'Known Allergies'}
                  </label>
                  <input
                    type="text"
                    value={allergies}
                    onChange={(e) => setAllergies(e.target.value)}
                    placeholder="e.g., Penicillin, None known"
                    className="w-full px-3 py-2 text-xs rounded-xl border border-rose-200 bg-white focus:outline-none focus:ring-2 focus:ring-rose-500/30"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-rose-900/80 mb-1">
                  {isTe
                    ? 'దీర్ఘకాలిక ఆరోగ్య పరిస్థితులు'
                    : 'Chronic Conditions'}
                </label>
                <input
                  type="text"
                  value={chronicConditions}
                  onChange={(e) => setChronicConditions(e.target.value)}
                  placeholder="e.g., Hypertension, Type 2 Diabetes, Asthma"
                  className="w-full px-3 py-2 text-xs rounded-xl border border-rose-200 bg-white focus:outline-none focus:ring-2 focus:ring-rose-500/30"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-rose-900/80 mb-1">
                    {isTe ? 'అత్యవసర సంప్రదింపు వ్యక్తి' : 'Emergency Contact Name'}
                  </label>
                  <input
                    type="text"
                    value={emergencyContactName}
                    onChange={(e) => setEmergencyContactName(e.target.value)}
                    placeholder="e.g., Ramesh (Son)"
                    className="w-full px-3 py-2 text-xs rounded-xl border border-rose-200 bg-white focus:outline-none focus:ring-2 focus:ring-rose-500/30"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-rose-900/80 mb-1 flex items-center space-x-1">
                    <Phone className="w-3 h-3 text-rose-600" />
                    <span>{isTe ? 'అత్యవసర ఫోన్' : 'Emergency Contact Phone'}</span>
                  </label>
                  <input
                    type="tel"
                    value={emergencyContactPhone}
                    onChange={(e) => setEmergencyContactPhone(e.target.value)}
                    placeholder="+91 98480 54321"
                    className="w-full px-3 py-2 text-xs rounded-xl border border-rose-200 bg-white focus:outline-none focus:ring-2 focus:ring-rose-500/30"
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2">
              <span className="text-[11px] text-slate-400">
                {isTe
                  ? 'పరికరంలో మాత్రమే స్థానికంగా సేవ్ చేయబడుతుంది.'
                  : 'Stored locally on this device only.'}
              </span>
              <button
                type="submit"
                className="px-5 py-2.5 bg-teal-700 hover:bg-teal-800 text-white rounded-xl text-xs font-bold shadow-sm transition-all flex items-center space-x-1.5"
              >
                <UserPlus className="w-3.5 h-3.5" />
                <span>
                  {isTe ? 'ప్రొఫైల్ & మెడికల్ ఐడి సేవ్ చేయండి' : 'Save Profile & Medical ID'}
                </span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

