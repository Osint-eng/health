import React from 'react';
import {
  Mic,
  MessageSquare,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Heart,
  Baby,
  Activity,
  CreditCard,
  PhoneCall,
  Clock,
  BookOpen,
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
    <div className="max-w-4xl mx-auto px-4 py-6 md:py-10 space-y-8 animate-fade-in">
      {/* Hero Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-teal-100/70 text-teal-800 text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5 text-teal-700" />
          <span>{isTe ? 'ఆధారాల నిబద్ధత కలిగిన ఆరోగ్య వేదిక' : 'Evidence-Disciplined Healthcare AI'}</span>
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
          {isTe ? (
            <span className="font-telugu">ఆధారం బలంగా ఉంటేనే సమాధానం.</span>
          ) : (
            <span>
              Answers only when <span className="text-teal-700">evidence is strong enough.</span>
            </span>
          )}
        </h1>

        <p className="max-w-2xl mx-auto text-sm sm:text-base text-slate-700 font-semibold">
          {isTe
            ? 'చాలా ఆరోగ్య AIలు సమాధానం చెప్పడానికి ప్రయత్నిస్తాయి. ఆరోగ్య వాయిస్ మాత్రం ధృవీకరించబడిన ఆధారాలు ఉంటేనే సమాధానం ఇస్తుంది — లేకపోతే సురక్షితంగా నిరాకరిస్తుంది.'
            : 'Most health AIs try to answer. Arogya Voice answers only when approved evidence is strong enough.'}
        </p>

        <p className="max-w-2xl mx-auto text-xs sm:text-sm text-slate-500 font-medium">
          {t.scopeStatement}
        </p>
      </div>

      {/* Main Interaction Cards (Ask by Voice / Type) */}
      <div className="bg-gradient-to-b from-white to-teal-50/40 rounded-3xl p-6 sm:p-8 border border-teal-900/10 shadow-sm text-center relative overflow-hidden">
        <div className="max-w-md mx-auto space-y-4">
          <p className="text-xs uppercase tracking-wider font-bold text-teal-800">
            {isTe ? 'మీరు ఏమి తెలుసుకోవాలనుకుంటున్నారు?' : 'What would you like to know today?'}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <button
              type="button"
              onClick={onStartVoice}
              className="w-full sm:w-auto px-6 py-4 bg-teal-700 hover:bg-teal-800 text-white rounded-2xl text-sm sm:text-base font-bold shadow-md shadow-teal-700/20 flex items-center justify-center space-x-2.5 transition-transform active:scale-95 group"
            >
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Mic className="w-4 h-4 text-white" />
              </div>
              <span className={isTe ? 'font-telugu' : ''}>{t.askByVoice}</span>
            </button>

            <button
              type="button"
              onClick={onStartText}
              className="w-full sm:w-auto px-6 py-4 bg-white hover:bg-slate-50 text-slate-800 border border-slate-200 rounded-2xl text-sm sm:text-base font-semibold shadow-xs flex items-center justify-center space-x-2 transition-colors"
            >
              <MessageSquare className="w-4 h-4 text-teal-700" />
              <span className={isTe ? 'font-telugu' : ''}>{t.typeQuestion}</span>
            </button>
          </div>

          <div className="pt-3 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-xs text-slate-500">
            <span className="flex items-center">
              <ShieldCheck className="w-3.5 h-3.5 text-teal-600 mr-1" />
              {isTe ? 'ఆధారాల బలం గేట్' : 'Strict Evidence Gate'}
            </span>
            <span>•</span>
            <span>{isTe ? 'సురక్షిత నిరాకరణ' : 'Refuses Weak Claims'}</span>
            <span>•</span>
            <span>{isTe ? '108/112 అత్యవసర రూటింగ్' : '108/112 Emergency Routing'}</span>
          </div>
        </div>
      </div>

      {/* Four Core Pillars */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        <div className="p-4 bg-white rounded-2xl border border-teal-200/80 shadow-xs space-y-1.5">
          <div className="text-[10px] font-extrabold uppercase tracking-wider text-teal-700">
            01 · {isTe ? 'ఆధారాల నిబద్ధత' : 'Evidence Discipline'}
          </div>
          <h4 className="font-bold text-slate-900 text-sm">
            {isTe ? 'బలం లేకుంటే నిరాకరణ' : 'Refuses Without Evidence'}
          </h4>
          <p className="text-xs text-slate-500 leading-relaxed">
            {isTe
              ? 'Strong, Moderate, Weak, None ఆధారాల స్థాయిని బట్టి మాత్రమే సమాధానం.'
              : 'Calibrates every reply across Strong, Moderate, Weak, and None — hedging or refusing instead of guessing.'}
          </p>
        </div>

        <div className="p-4 bg-white rounded-2xl border border-amber-200/80 shadow-xs space-y-1.5">
          <div className="text-[10px] font-extrabold uppercase tracking-wider text-amber-700">
            02 · {isTe ? 'క్లినికల్ సంయమనం' : 'Clinical Abstention'}
          </div>
          <h4 className="font-bold text-slate-900 text-sm">
            {isTe ? 'డోసేజ్ & రోగ నిర్ధారణ నిషేధం' : 'No Diagnosis or Dosages'}
          </h4>
          <p className="text-xs text-slate-500 leading-relaxed">
            {isTe
              ? 'వ్యక్తిగత మందుల మోతాదులు లేదా నిర్ధారణ అడిగితే వైద్యుడిని సూచిస్తుంది.'
              : 'Strictly blocks prescribing and personal dosing requests and generates questions for your doctor.'}
          </p>
        </div>

        <div className="p-4 bg-white rounded-2xl border border-red-200/80 shadow-xs space-y-1.5">
          <div className="text-[10px] font-extrabold uppercase tracking-wider text-red-700">
            03 · {isTe ? 'అత్యవసర రూటింగ్' : 'Emergency Routing'}
          </div>
          <h4 className="font-bold text-slate-900 text-sm">
            {isTe ? 'తక్షణ 108 / 112 సహాయం' : 'Instant 108 / 112 Triage'}
          </h4>
          <p className="text-xs text-slate-500 leading-relaxed">
            {isTe
              ? 'ఛాతీ నొప్పి, శ్వాస ఇబ్బంది వంటి లక్షణాలకు తక్షణ ఎమర్జెన్సీ నంబర్లు.'
              : 'Detects acute red flags like chest pain, stroke, or breathlessness and dispatches direct helpline dialers.'}
          </p>
        </div>

        <button
          type="button"
          onClick={onOpenUrgent}
          className="p-4 bg-rose-50/50 hover:bg-rose-50 rounded-2xl border border-rose-200/90 shadow-xs space-y-1.5 text-left transition-colors group"
        >
          <div className="text-[10px] font-extrabold uppercase tracking-wider text-rose-700 flex items-center justify-between">
            <span>04 · {isTe ? 'వ్యక్తిగత వైద్య ఐడి' : 'Emergency Medical ID'}</span>
            <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
          </div>
          <h4 className="font-bold text-slate-900 text-sm">
            {isTe ? 'రక్త గ్రూపు & అలెర్జీ కార్డు' : 'Personal First-Responder ID'}
          </h4>
          <p className="text-xs text-slate-500 leading-relaxed">
            {isTe
              ? 'రక్త గ్రూపు, అలెర్జీలు, అత్యవసర నంబర్ & ABHA ఐడి అత్యవసరంలో వెంటనే కనిపిస్తాయి.'
              : 'Surfaces your blood group, allergies, chronic conditions & family contact directly during emergencies.'}
          </p>
        </button>
      </div>

      {/* Reviewed Official Topics */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-bold text-slate-900">
              {t.exploreReviewedTopics}
            </h3>
            <p className="text-xs text-slate-500">
              {isTe
                ? 'ప్రస్తుతం పరిశీలించిన 3 ఆరోగ్య రంగాలు మరియు 1 ప్రభుత్వ పథకం అందుబాటులో ఉన్నాయి.'
                : 'Narrowly selected, peer-reviewed public health guidelines.'}
            </p>
          </div>

          <button
            type="button"
            onClick={onOpenLibrary}
            className="text-xs font-semibold text-teal-800 hover:underline flex items-center space-x-1"
          >
            <span>{isTe ? 'లైబ్రరీ చూడండి' : 'View Library'}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {topics.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.id}
                onClick={() => onSelectTopic(item.id, item.sampleQuery)}
                className="p-5 bg-white rounded-2xl border border-slate-200 hover:border-teal-400/80 hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-10 h-10 rounded-xl bg-teal-50 border border-teal-200/50 flex items-center justify-center text-teal-800 group-hover:bg-teal-700 group-hover:text-white transition-colors">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[11px] font-semibold text-teal-800 group-hover:underline flex items-center">
                      <span>{isTe ? 'అడగండి' : 'Ask topic'}</span>
                      <ArrowRight className="w-3 h-3 ml-1" />
                    </span>
                  </div>

                  <div className="flex items-center space-x-2 mb-1">
                    <span className="text-[10px] font-bold text-teal-800 bg-teal-50 border border-teal-200/80 px-2 py-0.5 rounded-md">
                      {item.badge}
                    </span>
                  </div>
                  <h4 className="font-bold text-slate-900 text-sm mb-1 group-hover:text-teal-900">
                    {isTe ? item.titleTe : item.titleEn}
                  </h4>
                  <p className="text-xs text-slate-500 line-clamp-2">
                    {isTe ? item.descTe : item.descEn}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 text-[11px] text-teal-900 font-medium bg-teal-50/50 p-2 rounded-xl italic">
                  "{item.sampleQuery}"
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Recent Saved Conversations */}
      {recentConversations.length > 0 && (
        <div className="pt-2">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-bold text-slate-900 flex items-center space-x-2">
              <Clock className="w-4 h-4 text-slate-500" />
              <span>{isTe ? 'ఇటీవలి సంభాషణలు' : 'Recent Conversations'}</span>
            </h3>
          </div>

          <div className="space-y-2">
            {recentConversations.slice(0, 3).map((conv) => (
              <div
                key={conv.id}
                onClick={() => onOpenConversation(conv)}
                className="p-3 bg-white rounded-xl border border-slate-200/80 hover:border-teal-400 cursor-pointer transition-all flex items-center justify-between"
              >
                <div className="truncate pr-4">
                  <span className="font-semibold text-xs md:text-sm text-slate-900 truncate block">
                    {conv.title}
                  </span>
                  <span className="text-[10px] text-slate-400">
                    {new Date(conv.updated_at).toLocaleDateString()} · {conv.messages.length} messages
                  </span>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-400 shrink-0" />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Persistent Emergency Card at bottom */}
      <div className="p-4 bg-red-50 border border-red-200 rounded-2xl flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-9 h-9 rounded-xl bg-red-100 flex items-center justify-center text-red-600 shrink-0">
            <PhoneCall className="w-4 h-4" />
          </div>
          <div>
            <div className="text-xs font-bold text-red-950">
              {isTe ? 'అత్యవసర వైద్య పరిస్థితి ఉన్నప్పుడు:' : 'Need Immediate Emergency Care?'}
            </div>
            <div className="text-[11px] text-red-700">
              {isTe
                ? 'ఆరోగ్య వాయిస్ సాధారణ సమాచార వేదిక మాత్రమే. అత్యవసర సేవలకు 108 / 112 కు కాల్ చేయండి.'
                : 'Arogya Voice is for general information only. Dial 108 / 112 for ambulance services.'}
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={onOpenUrgent}
          className="px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-bold shrink-0 transition-colors"
        >
          {isTe ? 'సహాయం' : 'Emergency Help'}
        </button>
      </div>
    </div>
  );
};
