import React, { useState } from 'react';
import {
  ShieldCheck,
  ChevronDown,
  ChevronUp,
  FileText,
  AlertTriangle,
  Stethoscope,
  Info,
  Bookmark,
  Flag,
  HelpCircle,
  Sparkles,
} from 'lucide-react';
import { Citation, EvidenceStatus, Language, Message } from '../types';
import { AudioPlayer } from './AudioPlayer';

interface AnswerCardProps {
  message: Message;
  language: Language;
  onViewSource: (citation: Citation) => void;
  onReportIssue: (message: Message) => void;
  onSaveToHistory?: (message: Message) => void;
}

export const AnswerCard: React.FC<AnswerCardProps> = ({
  message,
  language,
  onViewSource,
  onReportIssue,
  onSaveToHistory,
}) => {
  const [expanded, setExpanded] = useState(false);
  const [saved, setSaved] = useState(false);
  const isTe = language === 'te';

  // Honest Status Config
  const getStatusBadge = (status: EvidenceStatus) => {
    switch (status) {
      case 'supported_by_reviewed_sources':
        return {
          icon: ShieldCheck,
          textEn: 'Supported by reviewed sources',
          textTe: 'సమీక్షించిన అధికారిక ఆధారం ఉంది',
          classes: 'bg-teal-50 text-teal-800 border-teal-200',
        };
      case 'needs_professional':
        return {
          icon: Stethoscope,
          textEn: 'This question needs a healthcare professional',
          textTe: 'ఈ ప్రశ్నకు వైద్యుడి సంప్రదింపు అవసరం',
          classes: 'bg-amber-50 text-amber-900 border-amber-200',
        };
      case 'urgent_help':
        return {
          icon: AlertTriangle,
          textEn: 'Possible urgent situation — seek immediate help',
          textTe: 'అత్యవసర పరిస్థితి — వెంటనే సహాయం పొందండి',
          classes: 'bg-red-50 text-red-800 border-red-300 font-bold animate-pulse',
        };
      case 'no_approved_source_found':
        return {
          icon: Info,
          textEn: 'No approved source found',
          textTe: 'లైబ్రరీలో ఆమోదిత ఆధారం లభించలేదు',
          classes: 'bg-slate-100 text-slate-700 border-slate-200',
        };
      case 'needs_clarification':
      default:
        return {
          icon: HelpCircle,
          textEn: 'More information needed',
          textTe: 'మరింత స్పష్టమైన సమాచారం అవసరం',
          classes: 'bg-blue-50 text-blue-800 border-blue-200',
        };
    }
  };

  const statusInfo = getStatusBadge(message.status);
  const StatusIcon = statusInfo.icon;

  const handleSave = () => {
    setSaved(true);
    if (onSaveToHistory) onSaveToHistory(message);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div
      className={`rounded-2xl p-5 md:p-6 shadow-sm border transition-all ${
        message.is_urgent
          ? 'bg-red-50/70 border-red-300 shadow-red-100'
          : 'bg-white border-slate-200/90 shadow-slate-100'
      }`}
    >
      {/* Top Evidence Status Badge */}
      <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
        <span
          className={`inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${statusInfo.classes}`}
        >
          <StatusIcon className="w-3.5 h-3.5 shrink-0" />
          <span>{isTe ? statusInfo.textTe : statusInfo.textEn}</span>
        </span>

        {/* Audio Player for this answer */}
        <AudioPlayer
          textToSpeak={message.spoken_text || message.text}
          language={language}
        />
      </div>

      {/* Short Answer (Plain Language) */}
      <div className="mb-4">
        <h4 className="text-xs uppercase tracking-wider font-bold text-slate-400 mb-1">
          {isTe ? 'సంక్షిప్త సమాధానం (Short Answer)' : 'Concise Answer'}
        </h4>
        <p
          className={`text-slate-900 text-base md:text-lg leading-relaxed font-medium ${
            isTe ? 'font-telugu' : ''
          }`}
        >
          {message.text}
        </p>
      </div>

      {/* Expandable "More Detail" Section */}
      {message.detailed_explanation && (
        <div className="mb-4 pt-3 border-t border-slate-100">
          <button
            type="button"
            onClick={() => setExpanded(!expanded)}
            className="flex items-center justify-between w-full text-xs font-bold text-teal-800 hover:text-teal-900 py-1"
          >
            <span>{isTe ? 'మరిన్ని వివరాలు & వివరణ (More Detail)' : 'Detailed Supporting Explanation'}</span>
            {expanded ? <ChevronUp className="w-4 h-4 ml-1" /> : <ChevronDown className="w-4 h-4 ml-1" />}
          </button>

          {expanded && (
            <div
              className={`mt-2 p-3.5 bg-slate-50 border border-slate-200/70 rounded-xl text-sm md:text-base text-slate-800 leading-relaxed animate-fade-in ${
                isTe ? 'font-telugu' : ''
              }`}
            >
              <p>{message.detailed_explanation}</p>

              {/* Questions to ask doctor if provided */}
              {message.questions_to_ask_doctor && message.questions_to_ask_doctor.length > 0 && (
                <div className="mt-3 pt-3 border-t border-slate-200/60">
                  <h5 className="text-xs font-bold text-slate-700 mb-1.5 flex items-center">
                    <Sparkles className="w-3.5 h-3.5 text-teal-700 mr-1.5" />
                    {isTe ? 'మీ వైద్యుడిని అడగవలసిన ప్రశ్నలు:' : 'Recommended Questions to Ask Your Doctor:'}
                  </h5>
                  <ul className="list-disc list-inside space-y-1 text-xs text-slate-700 ml-1">
                    {message.questions_to_ask_doctor.map((q, idx) => (
                      <li key={idx}>{q}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* Cited Sources */}
      {message.citations && message.citations.length > 0 && (
        <div className="mb-4 pt-3 border-t border-slate-100">
          <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2.5 flex items-center justify-between">
            <div className="flex items-center">
              <FileText className="w-3.5 h-3.5 mr-1.5 text-teal-700" />
              <span>{isTe ? 'సమీక్షించిన అధికారిక ఆధారాలు (Verified Sources):' : 'Reviewed Official Sources:'}</span>
            </div>
            {message.similarity_score !== undefined && message.similarity_score > 0 && (
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-teal-100 text-teal-900 border border-teal-200">
                <Sparkles className="w-3 h-3 mr-1 text-teal-700" />
                {Math.round(message.similarity_score * 100)}% Vector Match (BGE-M3)
              </span>
            )}
          </div>

          <div className="space-y-2.5">
            {message.citations.map((cite, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-xl bg-teal-50/40 border border-teal-200/70 transition-all hover:border-teal-300 group"
              >
                <div className="flex items-start justify-between gap-2 mb-1.5">
                  <div className="truncate">
                    <div className="text-xs font-bold text-slate-900 group-hover:text-teal-900 truncate">
                      {cite.document_title}
                    </div>
                    <div className="text-[11px] text-slate-500 flex flex-wrap items-center gap-1.5 mt-0.5">
                      <span>{cite.publisher}</span>
                      <span>·</span>
                      <span className="font-medium text-slate-700">{cite.page_or_section}</span>
                      <span>·</span>
                      <span>Rev: {cite.review_date}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    {cite.similarity_score !== undefined && (
                      <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-white text-teal-800 border border-teal-300 shadow-2xs">
                        {Math.round(cite.similarity_score * 100)}% Match
                      </span>
                    )}
                    <button
                      type="button"
                      onClick={() => onViewSource(cite)}
                      className="text-[11px] font-bold text-teal-700 hover:text-teal-900 underline"
                    >
                      {isTe ? 'ఆధారం →' : 'Details →'}
                    </button>
                  </div>
                </div>

                {/* Inline Supporting Excerpt Preview */}
                {cite.supporting_excerpt && (
                  <div className="mt-2 pl-3 border-l-2 border-teal-500/60 bg-white/70 p-2 rounded-r-lg text-xs leading-relaxed text-slate-700 font-serif italic">
                    "{cite.supporting_excerpt.length > 220
                      ? cite.supporting_excerpt.substring(0, 220) + '...'
                      : cite.supporting_excerpt}"
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Actions and Mandatory Boundary Note */}
      <div className="pt-3 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
        <div className="flex items-center space-x-2">
          <button
            type="button"
            onClick={handleSave}
            className={`inline-flex items-center space-x-1 px-3 py-1.5 rounded-lg border transition-colors ${
              saved
                ? 'bg-teal-50 text-teal-800 border-teal-300 font-semibold'
                : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
            }`}
          >
            <Bookmark className="w-3.5 h-3.5" />
            <span>{saved ? (isTe ? 'భద్రపరచబడింది' : 'Saved!') : (isTe ? 'భద్రపరచండి' : 'Save')}</span>
          </button>

          <button
            type="button"
            onClick={() => onReportIssue(message)}
            className="inline-flex items-center space-x-1 px-3 py-1.5 rounded-lg bg-white text-slate-500 border border-slate-200 hover:text-rose-700 hover:bg-rose-50/60 transition-colors"
          >
            <Flag className="w-3.5 h-3.5" />
            <span>{isTe ? 'రిపోర్ట్ చేయండి' : 'Report an issue'}</span>
          </button>
        </div>

        {/* Boundary Note */}
        <div className="text-[11px] text-slate-500 italic flex items-center">
          <span className="w-1.5 h-1.5 rounded-full bg-teal-600 mr-1.5 shrink-0" />
          <span>
            {isTe
              ? 'సాధారణ సమాచారం మాత్రమే — ఇది వ్యక్తిగత రోగ నిర్ధారణ లేదా ప్రిస్క్రిప్షన్ కాదు.'
              : 'General information — not a medical diagnosis or prescription.'}
          </span>
        </div>
      </div>
    </div>
  );
};
