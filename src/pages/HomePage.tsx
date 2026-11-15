import React from 'react';
import {
  Mic,
  MessageSquare,
  ArrowRight,
  ShieldCheck,
  Heart,
  Baby,
  Activity,
  CreditCard,
  PhoneCall,
  Clock,
} from 'lucide-react';
import { Conversation, Language } from '../types';
import { TRANSLATIONS } from '../locales/translations';

interface HomePageProps {
  language: Language;
  recentConversations: Conversation[];
  onStartVoice: () => void;
  onStartText: () => void;
  onSelectTopic: (topic: string, sampleQuery?: string) => void;
  onOpenConversation: (conv: Conversation) => void;
  onOpenUrgent: () => void;
  onOpenLibrary: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  language,
  recentConversations,
  onStartVoice,
  onStartText,
  onSelectTopic,
  onOpenConversation,
  onOpenUrgent,
  onOpenLibrary,
}) => {
  const t = TRANSLATIONS[language];
  const isTe = language === 'te';

  const topics = [
    {
      id: 'mosquito_borne',
      titleEn: 'Mosquito-borne Diseases (Dengue & Malaria)',
      titleTe: 'దోమల వ్యాధులు (డెంగ్యూ, మలేరియా)',
      descEn: 'WHO guidelines on symptoms, vector prevention, and critical warning signs to seek care',
      descTe: 'లక్షణాలు, నివారణ మరియు ఆసుపత్రికి వెళ్లాల్సిన అత్యవసర హెచ్చరిక సంకేతాలు',
      icon: Activity,
      color: 'teal',
      sampleQuery: isTe ? t.sampleQuestionMosquito : 'What are the emergency warning signs of severe dengue that require immediate hospitalization?',
      badge: 'WHO GHO',
    },
    {
      id: 'child_growth',
      titleEn: 'Child Health & WHO Growth Standards',
      titleTe: 'పిల్లల పెరుగుదల ప్రమాణాలు (WHO)',
      descEn: 'Interpretation principles for growth percentiles and z-scores — not personal diagnosis',
      descTe: 'ఎత్తు, బరువు చార్టుల పరిశీలనా సూత్రాలు (వ్యక్తిగత రోగ నిర్ధారణ కాదు)',
      icon: Baby,
      color: 'rose',
      sampleQuery: isTe ? t.sampleQuestionChildGrowth : 'How should parents interpret WHO Child Growth Standard percentiles and z-scores?',
      badge: 'WHO Standards',
    },
    {
      id: 'common_symptoms_fever',
      titleEn: 'Common Symptoms & Fever Care',
      titleTe: 'జ్వరం & సాధారణ లక్షణాల జాగ్రత్తలు',
      descEn: 'PAHO/WHO home care, hydration, clear boundaries, and red flags to seek emergency help',
      descTe: 'PAHO/WHO మార్గదర్శకాలు, తగినంత ద్రవాలు మరియు అత్యవసర రెడ్ ఫ్లాగ్స్',
      icon: Heart,
      color: 'indigo',
      sampleQuery: isTe ? t.sampleQuestionFever : 'What red flags with a fever indicate a patient needs urgent emergency medical evaluation?',
      badge: 'PAHO / WHO',
    },
    {
      id: 'scheme_pmjay',
      titleEn: 'Government Schemes (PM-JAY & WHO UHC)',
      titleTe: 'ప్రభుత్వ పథకాలు (PM-JAY & ఆభా)',
      descEn: 'Official national scheme docs: eligibility, ₹5 Lakh cover, documents, and ABHA registration',
      descTe: '₹5 లక్షల ఉచిత ఆరోగ్య బీమా, అర్హత ధ్రువీకరణ, అవసరమైన పత్రాలు మరియు ఆభా ఖాతా',
      icon: CreditCard,
      color: 'amber',
      sampleQuery: isTe ? t.sampleQuestion4 : 'What documents are required to apply for Ayushman Bharat PM-JAY and generate the Golden Card?',
      badge: 'NHA & WHO UHC',
    },
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 md:py-10 space-y-8 animate-fade-in">
      {/* 1. Calm Institutional Hero (<5s Identity + Guest-First CTA) */}
      <section className="bg-white rounded-3xl border border-slate-200/90 shadow-xs p-6 sm:p-10 text-center space-y-5">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-teal-50 border border-teal-200/80 text-teal-800 text-[11px] font-bold uppercase tracking-wider">
          <ShieldCheck className="w-3.5 h-3.5 text-teal-700" />
          <span>{isTe ? 'WHO · PAHO · NHA ధృవీకరించిన ఆధారాలు' : 'WHO · PAHO · NHA Verified Knowledge'}</span>
        </div>

        <div className="space-y-2.5 max-w-2xl mx-auto">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-[1.12]">
            {isTe ? (
              <span className="font-telugu">ఆధారం బలంగా ఉంటేనే సమాధానం.</span>
            ) : (
              <span>
                Health answers you can{' '}
                <span className="text-teal-700">independently verify.</span>
              </span>
            )}
          </h1>

          <p className="text-sm sm:text-base text-slate-700 font-semibold leading-relaxed">
            {isTe
              ? 'చాలా ఆరోగ్య AIలు సమాధానం చెప్పడానికి ప్రయత్నిస్తాయి. ఆరోగ్య వాయిస్ మాత్రం ఆమోదిత ఆధారాలు బలంగా ఉన్నప్పుడే సమాధానం ఇస్తుంది.'
              : 'Most health AIs try to answer. Arogya Voice answers only when approved evidence is strong enough.'}
          </p>
        </div>

        {/* Single Effortless Guest-First Entry Actions */}
        <div className="pt-1 flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            type="button"
            onClick={onStartText}
            className="w-full sm:w-auto px-7 py-3.5 bg-teal-700 hover:bg-teal-800 text-white rounded-2xl text-sm sm:text-base font-bold shadow-sm shadow-teal-700/15 flex items-center justify-center space-x-2 transition-colors"
          >
            <MessageSquare className="w-4 h-4 text-teal-100" />
            <span className={isTe ? 'font-telugu' : ''}>
              {isTe ? 'అతిథిగా ప్రశ్న అడగండి (లాగిన్ అవసరం లేదు)' : 'Start Asking as Guest'}
            </span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={onStartVoice}
            className="w-full sm:w-auto px-6 py-3.5 bg-slate-50 hover:bg-teal-50/70 text-slate-800 hover:text-teal-900 border border-slate-200 hover:border-teal-300 rounded-2xl text-sm sm:text-base font-semibold flex items-center justify-center space-x-2 transition-colors"
          >
            <Mic className="w-4 h-4 text-teal-700" />
            <span className={isTe ? 'font-telugu' : ''}>{t.askByVoice}</span>
          </button>
        </div>

        <div className="pt-1 flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-xs text-slate-500">
          <span>{isTe ? 'లాగిన్ లేదా ఖాతా అవసరం లేదు' : 'No login required'}</span>
          <span className="text-slate-300">•</span>
          <span>{isTe ? 'ఇంగ్లీష్ & తెలుగు వాయిస్' : 'English & తెలుగు Voice'}</span>
          <span className="text-slate-300">•</span>
          <span>{isTe ? 'ప్రతి సమాధానానికి ఆధారం & పరిమితులు' : 'Pre-Answer Evidence Validation'}</span>
        </div>
      </section>

      {/* 2. Four Core Pillars (Clear Module Row) */}
      <section aria-label="Core Safety Pillars" className="space-y-3">
        <div className="flex items-center justify-between px-1">
          <h2 className="text-xs font-extrabold uppercase tracking-wider text-slate-500">
            {isTe ? 'నాలుగు ప్రధాన భద్రతా స్తంభాలు' : 'Four Core Safety Pillars'}
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
          <div className="p-4 bg-white rounded-2xl border border-slate-200/90 shadow-2xs flex flex-col justify-between space-y-2">
            <div>
              <div className="text-[11px] font-bold text-teal-700 mb-1">
                01 · {isTe ? 'ఆధారాల నిబద్ధత' : 'Evidence Discipline'}
              </div>
              <h3 className="font-bold text-slate-900 text-sm">
                {isTe ? 'బలం లేకుంటే నిరాకరణ' : 'Refuses Weak Claims'}
              </h3>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                {isTe
                  ? 'Strong, Moderate, Weak, None ఆధారాల స్థాయిని బట్టి మాత్రమే సమాధానం.'
                  : 'Scores every query across Strong, Moderate, Weak, and None — refusing rather than guessing.'}
              </p>
            </div>
          </div>

          <div className="p-4 bg-white rounded-2xl border border-slate-200/90 shadow-2xs flex flex-col justify-between space-y-2">
            <div>
              <div className="text-[11px] font-bold text-amber-700 mb-1">
                02 · {isTe ? 'క్లినికల్ సంయమనం' : 'Clinical Abstention'}
              </div>
              <h3 className="font-bold text-slate-900 text-sm">
                {isTe ? 'డోసేజ్ & నిర్ధారణ నిషేధం' : 'No Diagnosis or Dosages'}
              </h3>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                {isTe
                  ? 'మందుల మోతాదులు లేదా వ్యాధి నిర్ధారణ అడిగితే వైద్యుడిని సూచిస్తుంది.'
                  : 'Blocks prescribing or personal dosing requests and suggests doctor questions.'}
              </p>
            </div>
          </div>

          <div className="p-4 bg-white rounded-2xl border border-slate-200/90 shadow-2xs flex flex-col justify-between space-y-2">
            <div>
              <div className="text-[11px] font-bold text-red-700 mb-1">
                03 · {isTe ? 'అత్యవసర రూటింగ్' : 'Emergency Routing'}
              </div>
              <h3 className="font-bold text-slate-900 text-sm">
                {isTe ? 'తక్షణ 108 / 112 సహాయం' : 'Instant 108 / 112 Triage'}
              </h3>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                {isTe
                  ? 'ఛాతీ నొప్పి, శ్వాస ఇబ్బంది వంటి లక్షణాలకు తక్షణ ఎమర్జెన్సీ నంబర్లు.'
                  : 'Detects red-flag symptoms immediately and dispatches helpline dialers.'}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onOpenUrgent}
            className="p-4 bg-white hover:bg-rose-50/40 rounded-2xl border border-slate-200/90 hover:border-rose-300 shadow-2xs text-left transition-colors group flex flex-col justify-between space-y-2"
          >
            <div>
              <div className="text-[11px] font-bold text-rose-700 mb-1 flex items-center justify-between">
                <span>04 · {isTe ? 'వ్యక్తిగత వైద్య ఐడి' : 'Emergency Medical ID'}</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </div>
              <h3 className="font-bold text-slate-900 text-sm">
                {isTe ? 'రక్త గ్రూపు & అలెర్జీ కార్డు' : 'Personal Medical ID'}
              </h3>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                {isTe
                  ? 'రక్త గ్రూపు, అలెర్జీలు & అత్యవసర నంబర్ అత్యవసరంలో వెంటనే కనిపిస్తాయి.'
                  : 'Optional blood group, allergies & family contact surfaced during emergencies.'}
              </p>
            </div>
          </button>
        </div>
      </section>

      {/* 3. Reviewed Official Knowledge Topics */}
      <section className="space-y-3">
        <div className="flex items-center justify-between px-1">
          <div>
            <h2 className="text-base sm:text-lg font-bold text-slate-900">
              {t.exploreReviewedTopics}
            </h2>
            <p className="text-xs text-slate-500">
              {isTe
                ? 'ధృవీకరించిన పత్రాల నుండి నేరుగా ఒక అంశాన్ని ఎంచుకోండి.'
                : 'Select an indexed WHO, PAHO, or NHA domain to test grounded answers.'}
            </p>
          </div>

          <button
            type="button"
            onClick={onOpenLibrary}
            className="text-xs font-semibold text-teal-800 hover:underline flex items-center space-x-1 shrink-0"
          >
            <span>{isTe ? 'లైబ్రరీ చూడండి' : 'Browse Library'}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          {topics.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.id}
                onClick={() => onSelectTopic(item.id, item.sampleQuery)}
                className="p-4 sm:p-5 bg-white rounded-2xl border border-slate-200/90 hover:border-teal-400 hover:shadow-sm transition-all cursor-pointer group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2.5">
                    <div className="flex items-center space-x-2.5">
                      <div className="w-9 h-9 rounded-xl bg-teal-50 border border-teal-100 flex items-center justify-center text-teal-800 group-hover:bg-teal-700 group-hover:text-white transition-colors shrink-0">
                        <Icon className="w-4 h-4" />
                      </div>
                      <span className="text-[11px] font-bold text-teal-800 bg-teal-50/80 border border-teal-200/60 px-2 py-0.5 rounded-md">
                        {item.badge}
                      </span>
                    </div>
                    <span className="text-xs font-semibold text-teal-700 group-hover:underline flex items-center">
                      <span>{isTe ? 'అడగండి' : 'Ask'}</span>
                      <ArrowRight className="w-3 h-3 ml-1" />
                    </span>
                  </div>

                  <h3 className="font-bold text-slate-900 text-sm mb-1 group-hover:text-teal-900">
                    {isTe ? item.titleTe : item.titleEn}
                  </h3>
                  <p className="text-xs text-slate-500 line-clamp-2">
                    {isTe ? item.descTe : item.descEn}
                  </p>
                </div>

                <div className="mt-3 pt-2.5 border-t border-slate-100 text-[11px] text-slate-600 line-clamp-1">
                  “{item.sampleQuery}”
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 4. Recent Saved Conversations */}
      {recentConversations.length > 0 && (
        <section className="space-y-2.5">
          <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-500 flex items-center space-x-1.5 px-1">
            <Clock className="w-3.5 h-3.5 text-slate-400" />
            <span>{isTe ? 'ఇటీవలి సంభాషణలు' : 'Recent Sessions'}</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            {recentConversations.slice(0, 3).map((conv) => (
              <div
                key={conv.id}
                onClick={() => onOpenConversation(conv)}
                className="p-3 bg-white rounded-xl border border-slate-200/80 hover:border-teal-400 cursor-pointer transition-all flex items-center justify-between"
              >
                <div className="truncate pr-3">
                  <span className="font-semibold text-xs text-slate-900 truncate block">
                    {conv.title}
                  </span>
                  <span className="text-[10px] text-slate-400">
                    {new Date(conv.updated_at).toLocaleDateString()} · {conv.messages.length} msgs
                  </span>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 5. Calm Emergency Card */}
      <div className="p-4 bg-rose-50/70 border border-rose-200 rounded-2xl flex items-center justify-between gap-3">
        <div className="flex items-center space-x-3">
          <div className="w-9 h-9 rounded-xl bg-rose-100 flex items-center justify-center text-rose-700 shrink-0">
            <PhoneCall className="w-4 h-4" />
          </div>
          <div>
            <div className="text-xs font-bold text-rose-950">
              {isTe ? 'అత్యవసర వైద్య పరిస్థితి?' : 'Need Immediate Emergency Care?'}
            </div>
            <div className="text-[11px] text-rose-800">
              {isTe
                ? 'ఆరోగ్య వాయిస్ సాధారణ సమాచార వేదిక మాత్రమే. అత్యవసరానికి 108 / 112 కు కాల్ చేయండి.'
                : 'For acute symptoms, dial 108 / 112 immediately or open Urgent Help & Medical ID.'}
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={onOpenUrgent}
          className="px-3.5 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-bold shrink-0 transition-colors"
        >
          {isTe ? 'అత్యవసర సహాయం' : 'Urgent Help'}
        </button>
      </div>
    </div>
  );
};
