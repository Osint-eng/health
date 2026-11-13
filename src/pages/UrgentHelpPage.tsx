import React from 'react';
import {
  PhoneCall,
  ShieldAlert,
  HeartPulse,
  ArrowLeft,
  ShieldPlus,
  Edit3,
  Droplets,
} from 'lucide-react';
import { EMERGENCY_CONTACTS } from '../data/reviewedKnowledge';
import { Language, UserProfile } from '../types';

interface UrgentHelpPageProps {
  language: Language;
  onBack: () => void;
  userProfile?: UserProfile;
  onEditMedicalId?: () => void;
}

export const UrgentHelpPage: React.FC<UrgentHelpPageProps> = ({
  language,
  onBack,
  userProfile,
  onEditMedicalId,
}) => {
  const isTe = language === 'te';
  const medicalId = userProfile?.medical_id;

  return (
    <div className="max-w-3xl mx-auto px-4 py-6 md:py-8 space-y-6 animate-fade-in">
      <button
        type="button"
        onClick={onBack}
        className="inline-flex items-center space-x-1.5 text-xs font-bold text-slate-600 hover:text-slate-900"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>{isTe ? 'వెనుకకు' : 'Back to Home'}</span>
      </button>

      {/* Main Red Alert Card */}
      <div className="p-6 sm:p-8 bg-gradient-to-r from-red-700 via-rose-700 to-red-800 text-white rounded-3xl shadow-lg border border-red-900/20 space-y-3">
        <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center text-white mb-2">
          <ShieldAlert className="w-6 h-6 animate-pulse" />
        </div>

        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight leading-tight">
          {isTe ? 'తక్షణ అత్యవసర వైద్య సహాయం (Emergency)' : 'Immediate Urgent Emergency Protocols'}
        </h1>

        <p className="text-xs sm:text-sm text-red-100 font-medium leading-relaxed max-w-xl">
          {isTe
            ? 'ముఖ్య గమనిక: ఆరోగ్య వాయిస్ ఒక సాధారణ ఆరోగ్య సమాచార సహాయకుడు మాత్రమే. ఇది అత్యవసర పరిస్థితులను అంచనా వేయదు లేదా అంబులెన్స్‌లను పంపదు. తీవ్రమైన లక్షణాలు ఉంటే ఆలస్యం చేయకుండా అధికారిక హెల్ప్‌లైన్‌లకు కాల్ చేయండి.'
            : 'Critical Boundary: Arogya Voice does not assess clinical emergencies, contact dispatchers, or provide live triage. For acute distress, use the verified emergency contacts below immediately.'}
        </p>
      </div>

      {/* Patient Emergency Medical ID Card */}
      <div className="p-5 bg-white rounded-3xl border border-rose-200 shadow-xs space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-xl bg-rose-100 flex items-center justify-center text-rose-700">
              <ShieldPlus className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-extrabold text-slate-900 text-sm">
                {isTe ? 'అత్యవసర వైద్య ఐడి కార్డు (Emergency Medical ID)' : 'Emergency Medical ID Card'}
              </h3>
              <p className="text-[11px] text-slate-500">
                {userProfile
                  ? `${userProfile.name} (${userProfile.badge})`
                  : isTe
                  ? 'వ్యక్తిగత వైద్య వివరాలు'
                  : 'Personal first-responder summary'}
              </p>
            </div>
          </div>

          {onEditMedicalId && (
            <button
              type="button"
              onClick={onEditMedicalId}
              className="px-3 py-1.5 rounded-xl bg-rose-50 hover:bg-rose-100 border border-rose-200 text-rose-800 text-xs font-bold flex items-center space-x-1 transition-colors"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>{medicalId ? (isTe ? 'సవరించండి' : 'Edit ID') : isTe ? 'వివరాలు జోడించండి' : 'Add Medical ID'}</span>
            </button>
          )}
        </div>

        {medicalId ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs pt-1">
            <div className="p-3 rounded-2xl bg-rose-50/70 border border-rose-100 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-rose-700 block">
                  {isTe ? 'రక్త గ్రూపు (Blood Group)' : 'Blood Group'}
                </span>
                <span className="text-base font-extrabold text-rose-950 flex items-center space-x-1 mt-0.5">
                  <Droplets className="w-4 h-4 text-rose-600" />
                  <span>{medicalId.blood_group}</span>
                </span>
              </div>
              {medicalId.abha_id && (
                <div className="text-right">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">
                    ABHA ID
                  </span>
                  <span className="font-mono font-bold text-slate-800 text-[11px]">
                    {medicalId.abha_id}
                  </span>
                </div>
              )}
            </div>

            <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center justify-between gap-2">
              <div className="min-w-0">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">
                  {isTe ? 'అత్యవసర సంప్రదింపు' : 'Emergency Contact'}
                </span>
                <span className="font-bold text-slate-900 block truncate mt-0.5">
                  {medicalId.emergency_contact_name || (isTe ? 'నమోదు కాలేదు' : 'Not specified')}
                </span>
                {medicalId.emergency_contact_phone && (
                  <span className="text-[11px] text-slate-600 font-mono">
                    {medicalId.emergency_contact_phone}
                  </span>
                )}
              </div>
              {medicalId.emergency_contact_phone && (
                <a
                  href={`tel:${medicalId.emergency_contact_phone.replace(/\s+/g, '')}`}
                  className="px-3 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-[11px] font-bold shrink-0 flex items-center space-x-1"
                >
                  <PhoneCall className="w-3 h-3" />
                  <span>{isTe ? 'కాల్' : 'Call'}</span>
                </a>
              )}
            </div>

            <div className="p-3 rounded-2xl bg-amber-50/70 border border-amber-200/80">
              <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800 block">
                {isTe ? 'అలెర్జీలు (Allergies)' : 'Known Allergies'}
              </span>
              <span className="font-semibold text-slate-900 block mt-0.5">
                {medicalId.allergies}
              </span>
            </div>

            <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200/80">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">
                {isTe ? 'దీర్ఘకాలిక వ్యాధులు' : 'Chronic Conditions'}
              </span>
              <span className="font-semibold text-slate-900 block mt-0.5">
                {medicalId.chronic_conditions}
              </span>
            </div>
          </div>
        ) : (
          <div className="p-4 rounded-2xl bg-slate-50 border border-dashed border-slate-300 text-xs text-slate-600 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <span>
              {isTe
                ? 'అత్యవసర సమయాల్లో వేగవంతమైన సహాయం కోసం మీ రక్త గ్రూపు, అలెర్జీలు మరియు అత్యవసర నంబర్‌ను జోడించండి.'
                : 'No Emergency Medical ID saved for this profile yet. Add blood group, allergies, and family contact for quick responders.'}
            </span>
          </div>
        )}
      </div>

      {/* Triage Warning Signs */}
      <div className="p-5 bg-white rounded-3xl border border-red-200/90 shadow-xs space-y-3">
        <h3 className="font-bold text-slate-900 text-sm sm:text-base flex items-center text-red-700">
          <HeartPulse className="w-5 h-5 mr-2 shrink-0" />
          <span>
            {isTe ? 'ఈ క్రింది అత్యవసర లక్షణాలు ఉంటే ఆలస్యం చేయవద్దు:' : 'Recognize These Critical Medical Warning Signs:'}
          </span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-800">
          <div className="p-3 bg-red-50/60 rounded-xl border border-red-100">
            <strong className="block text-red-900 mb-0.5">
              {isTe ? 'గుండెపోటు లక్షణాలు (Chest Distress)' : 'Cardiac / Chest Symptoms'}
            </strong>
            {isTe
              ? 'తీవ్రమైన ఛాతీ నొప్పి, భారం, ఎడమ భుజం లేదా దవడలోకి పాకే నొప్పి, చమటలు.'
              : 'Crushing chest pressure, pain radiating to arm/jaw, cold diaphoresis.'}
          </div>

          <div className="p-3 bg-red-50/60 rounded-xl border border-red-100">
            <strong className="block text-red-900 mb-0.5">
              {isTe ? 'పక్షవాతం సంకేతాలు (Stroke / FAST)' : 'Stroke FAST Protocol'}
            </strong>
            {isTe
              ? 'ముఖం ఒకవైపు వంకరపోవడం, చేయి లేదా కాలు పడిపోవడం, మాట తడబడటం.'
              : 'Facial drooping, arm weakness, slurred speech or acute vision loss.'}
          </div>

          <div className="p-3 bg-red-50/60 rounded-xl border border-red-100">
            <strong className="block text-red-900 mb-0.5">
              {isTe ? 'తీవ్రమైన శ్వాస సమస్య (Respiratory Distress)' : 'Severe Breathlessness'}
            </strong>
            {isTe
              ? 'శ్వాస తీసుకోవడంలో తీవ్రమైన ఆయాసం, పెదవులు నీలంగా మారడం.'
              : 'Stridor, gasping for breath, central cyanosis, or acute choking.'}
          </div>

          <div className="p-3 bg-red-50/60 rounded-xl border border-red-100">
            <strong className="block text-red-900 mb-0.5">
              {isTe ? 'రక్తస్రావం & స్పృహ (Hemorrhage & Trauma)' : 'Hemorrhage & Coma'}
            </strong>
            {isTe
              ? 'ఆగని రక్తస్రావం, స్పృహ కోల్పోవడం, తీవ్రమైన తలగాయం.'
              : 'Uncontrolled hemorrhage, loss of consciousness, or severe head trauma.'}
          </div>
        </div>
      </div>

      {/* Verified Regional Numbers */}
      <div className="space-y-3">
        <h3 className="font-bold text-slate-900 text-sm">
          {isTe ? 'ధ్రువీకరించిన జాతీయ అత్యవసర నంబర్లు (Verified Helpline Contacts)' : 'Verified National Helplines (24/7 Access)'}
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {EMERGENCY_CONTACTS.map((contact) => (
            <div
              key={contact.number}
              className="p-4 bg-white rounded-2xl border border-slate-200/90 shadow-2xs hover:border-red-300 transition-colors flex items-center justify-between"
            >
              <div className="pr-2">
                <span className="font-bold text-sm text-slate-900 block">{contact.name}</span>
                <span className="text-xs text-slate-500 line-clamp-2 mt-0.5">{contact.description}</span>
              </div>
              <a
                href={contact.action}
                className="px-4 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-extrabold shrink-0 flex items-center space-x-1 shadow-sm transition-transform active:scale-95"
              >
                <PhoneCall className="w-3.5 h-3.5 mr-1" />
                <span>{contact.number}</span>
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

