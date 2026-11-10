import React, { useState } from 'react';
import { X, Flag, CheckCircle2, AlertCircle } from 'lucide-react';
import { FeedbackReport, Language } from '../types';
import { api } from '../services/api';

interface ReportModalProps {
  messageId: string;
  questionText: string;
  answerText: string;
  language: Language;
  onClose: () => void;
  onReportSuccess?: () => void;
}

export const ReportModal: React.FC<ReportModalProps> = ({
  messageId,
  questionText,
  answerText,
  language,
  onClose,
  onReportSuccess,
}) => {
  const [category, setCategory] = useState<FeedbackReport['category']>('unsupported_claim');
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const isTe = language === 'te';

  const categories: { key: FeedbackReport['category']; labelEn: string; labelTe: string }[] = [
    { key: 'unsupported_claim', labelEn: 'Unsupported clinical claim', labelTe: 'ఆధారం లేని క్లెయిమ్' },
    { key: 'wrong_retrieval', labelEn: 'Wrong or irrelevant source retrieved', labelTe: 'సరికాని పత్రం లభించింది' },
    { key: 'incorrect_translation', labelEn: 'Incorrect translation / Telugu phrasing', labelTe: 'తప్పుడు అనువాదం లేదా తెలుగు భాషా దోషం' },
    { key: 'speech_recognition_error', labelEn: 'Speech recognition error in question', labelTe: 'వాయిస్ సరిగ్గా రికగ్నైజ్ కాలేదు' },
    { key: 'unsafe_response', labelEn: 'Potential safety concern / urgent miss', labelTe: 'భద్రతా సమస్య లేదా అత్యవసర విషయం' },
    { key: 'outdated_source', labelEn: 'Outdated guideline or document', labelTe: 'పాతబడిపోయిన పత్రం' },
    { key: 'broken_citation', labelEn: 'Broken citation or missing page', labelTe: 'పేజీ లేదా కొటేషన్ లోపం' },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await api.reportIssue(messageId, category, comment, questionText, answerText);
      setSubmitted(true);
      if (onReportSuccess) onReportSuccess();
      setTimeout(() => {
        onClose();
      }, 1800);
    } catch (err) {
      console.error(err);
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in">
      <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-700 rounded-full hover:bg-slate-100"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center space-x-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-rose-50 border border-rose-200 flex items-center justify-center text-rose-600 shrink-0">
            <Flag className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900">
              {isTe ? 'సమస్యను నివేదించండి' : 'Report an Issue with this Answer'}
            </h3>
            <p className="text-xs text-slate-500">
              {isTe
                ? 'మీ ఫీడ్‌బ్యాక్ మా వైద్య సమీక్షకుల బృందానికి చేరుతుంది.'
                : 'Reviewed by clinical auditors to improve safety and citation fidelity.'}
            </p>
          </div>
        </div>

        {submitted ? (
          <div className="py-8 text-center space-y-2">
            <CheckCircle2 className="w-12 h-12 text-teal-600 mx-auto animate-bounce" />
            <h4 className="font-bold text-slate-900 text-sm">
              {isTe ? 'నివేదిక విజయవంతంగా సమర్పించబడింది' : 'Report Logged Successfully'}
            </h4>
            <p className="text-xs text-slate-600">
              {isTe
                ? 'ధన్యవాదాలు! మా సమీక్షకుల బృందం దీనిని పరిశీలించి రిగ్రెషన్ పరీక్షను కలుపుతారు.'
                : 'Thank you. This has been sent to our reviewer queue to update guidelines or evaluation tests.'}
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                {isTe ? 'సమస్య వర్గం (Category)' : 'Issue Category'}
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as any)}
                className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-600/30"
              >
                {categories.map((c) => (
                  <option key={c.key} value={c.key}>
                    {isTe ? c.labelTe : c.labelEn}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                {isTe ? 'అదనపు వివరాలు (ఐచ్ఛికం)' : 'Additional details (optional)'}
              </label>
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                rows={3}
                placeholder={
                  isTe
                    ? 'ఏ అంశం తప్పుగా ఉంది లేదా ఏ ఆధారం సరిపోలలేదు...'
                    : 'Describe what was unsupported, misquoted, or needs review...'
                }
                className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-600/30 resize-none"
              />
            </div>

            <div className="text-[11px] text-slate-500 bg-slate-50 p-2.5 rounded-xl border border-slate-100 flex items-start space-x-1.5">
              <AlertCircle className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
              <span>
                {isTe
                  ? 'గమనిక: దిద్దుబాట్లు సిస్టమ్ పాలసీలు మరియు పరీక్షలను అప్‌డేట్ చేస్తాయి—యూజర్ సంభాషణలపై నేరుగా మోడల్‌ను రీట్రైన్ చేయవు.'
                  : 'Corrections update guidelines, content review, and regression tests—never silently retraining on private user conversations.'}
              </span>
            </div>

            <div className="flex items-center justify-end space-x-2 pt-2 border-t border-slate-100">
              <button
                type="button"
                onClick={onClose}
                className="px-3 py-1.5 text-xs text-slate-600 hover:bg-slate-100 rounded-lg"
              >
                {isTe ? 'రద్దు' : 'Cancel'}
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-4 py-1.5 bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold rounded-lg shadow-xs"
              >
                {isSubmitting ? '...' : isTe ? 'నివేదించు' : 'Submit Report'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
