import React from 'react';
import { X, ExternalLink, ShieldCheck, FileText, AlertCircle, Calendar, Building2 } from 'lucide-react';
import { Citation, Language } from '../types';

interface SourceModalProps {
  citation: Citation | null;
  language: Language;
  onClose: () => void;
  onReportOutdated?: (citation: Citation) => void;
}

export const SourceModal: React.FC<SourceModalProps> = ({
  citation,
  language,
  onClose,
  onReportOutdated,
}) => {
  if (!citation) return null;
  const isTe = language === 'te';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in">
      <div className="bg-white rounded-2xl max-w-xl w-full p-6 shadow-2xl border border-teal-900/15 overflow-hidden relative max-h-[90vh] flex flex-col">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-700 rounded-full hover:bg-slate-100"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center space-x-3 mb-4 pb-3 border-b border-slate-100">
          <div className="w-10 h-10 rounded-xl bg-teal-50 border border-teal-200/60 flex items-center justify-center text-teal-800 shrink-0">
            <FileText className="w-5 h-5" />
          </div>
          <div className="pr-6">
            <span className="text-[11px] font-bold uppercase tracking-wider text-teal-700 bg-teal-50 px-2 py-0.5 rounded-md">
              {isTe ? 'సమీక్షించిన అధికారిక ఆధారం' : 'Reviewed Source Document'}
            </span>
            <h3 className="text-base font-bold text-slate-900 mt-1 line-clamp-2">
              {citation.document_title}
            </h3>
          </div>
        </div>

        {/* Meta badges */}
        <div className="grid grid-cols-2 gap-2 text-xs mb-4">
          <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-100">
            <div className="flex items-center text-slate-500 mb-0.5">
              <Building2 className="w-3.5 h-3.5 mr-1 text-slate-400" />
              <span>{isTe ? 'ప్రచురణకర్త' : 'Publisher'}</span>
            </div>
            <div className="font-semibold text-slate-900 truncate">{citation.publisher}</div>
          </div>
          <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-100">
            <div className="flex items-center text-slate-500 mb-0.5">
              <Calendar className="w-3.5 h-3.5 mr-1 text-slate-400" />
              <span>{isTe ? 'సమీక్ష తేదీ' : 'Review Date'}</span>
            </div>
            <div className="font-semibold text-slate-900">
              {citation.review_date} ({citation.document_version_id})
            </div>
          </div>
        </div>

        {/* Exact Supporting Excerpt */}
        <div className="flex-1 overflow-y-auto mb-4 space-y-3 pr-1">
          <div>
            <div className="text-xs font-bold text-slate-700 mb-1 flex items-center justify-between">
              <span>{isTe ? 'ఖచ్చితమైన సహాయక భాగం (Exact Passage):' : 'Exact Supporting Excerpt:'}</span>
              <span className="text-[11px] font-medium text-teal-800 bg-teal-50 px-2 py-0.5 rounded">
                {citation.page_or_section}
              </span>
            </div>
            <div className="p-3.5 bg-teal-50/50 border border-teal-200/50 rounded-xl text-sm leading-relaxed text-slate-900 font-serif italic">
              "{citation.supporting_excerpt}"
            </div>
          </div>

          {citation.is_translated && (
            <div className="p-2.5 bg-indigo-50 border border-indigo-100 rounded-lg text-xs text-indigo-900">
              <strong>{isTe ? 'అనువాద గమనిక:' : 'Translation note:'}</strong>{' '}
              {isTe
                ? 'ఈ సమాధానం అధికారిక ఆంగ్ల పత్రం ఆధారంగా తెలుగులో సమీక్షించబడి అందించబడింది.'
                : 'This passage is presented in translated form based on the reviewed primary English guideline.'}
            </div>
          )}

          {/* Legal / Provenance Boundary Note */}
          <div className="p-3 bg-amber-50/80 border border-amber-200/70 rounded-xl text-[11px] text-amber-950 flex items-start space-x-2">
            <AlertCircle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
            <div>
              <strong>{isTe ? 'ఆధార విశ్వసనీయత:' : 'Source Provenance:'}</strong>{' '}
              {isTe
                ? 'ఈ పత్రం ఆరోగ్య వాయిస్ సమీక్షకుల చేత పరిశీలించబడింది. ఇది సంస్థ యొక్క అధికారిక వ్యక్తిగత ఆమోదాన్ని సూచించదు.'
                : 'This document has been reviewed and indexed for factual guidance by Arogya Voice clinical analysts. It does not imply personal clinical endorsement by the publisher.'}
            </div>
          </div>
        </div>

        {/* Modal Actions */}
        <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
          <a
            href={citation.original_url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-1.5 text-xs font-semibold text-teal-800 hover:text-teal-900 hover:underline"
          >
            <span>{isTe ? 'అసలు అధికారిక పత్రం చూడండి' : 'Open Original Official Document'}</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>

          <div className="flex items-center space-x-2">
            {onReportOutdated && (
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onReportOutdated(citation);
                }}
                className="px-3 py-1.5 text-xs text-slate-600 hover:text-rose-700 hover:bg-rose-50 rounded-lg font-medium"
              >
                {isTe ? 'పాత సమాచారాన్ని నివేదించండి' : 'Report Outdated Info'}
              </button>
            )}
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-1.5 bg-teal-800 hover:bg-teal-900 text-white text-xs font-semibold rounded-lg shadow-xs"
            >
              {isTe ? 'పూర్తయింది' : 'Done'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
