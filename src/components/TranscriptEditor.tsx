import React from 'react';
import { Send, Trash2, Edit3, CheckCircle2 } from 'lucide-react';
import { Language } from '../types';

interface TranscriptEditorProps {
  transcript: string;
  language: Language;
  onTranscriptChange: (text: string) => void;
  onSubmit: () => void;
  onClear: () => void;
  isLoading?: boolean;
}

export const TranscriptEditor: React.FC<TranscriptEditorProps> = ({
  transcript,
  language,
  onTranscriptChange,
  onSubmit,
  onClear,
  isLoading = false,
}) => {
  const isTe = language === 'te';

  if (!transcript.trim()) return null;

  return (
    <div className="w-full bg-white rounded-2xl p-4 shadow-sm border border-teal-900/15 mb-4 animate-slide-up">
      <div className="flex items-center justify-between mb-2 pb-2 border-b border-slate-100">
        <div className="flex items-center space-x-2 text-xs font-semibold text-teal-900">
          <Edit3 className="w-3.5 h-3.5 text-teal-700" />
          <span>
            {isTe
              ? 'ప్రశ్నను పంపే ముందు సరిచూసుకోండి (Edit Transcript):'
              : 'Review or edit your question before searching:'}
          </span>
        </div>
        <button
          type="button"
          onClick={onClear}
          className="text-xs text-slate-400 hover:text-rose-600 flex items-center space-x-1 transition-colors"
        >
          <Trash2 className="w-3 h-3" />
          <span>{isTe ? 'రద్దు' : 'Clear'}</span>
        </button>
      </div>

      <textarea
        value={transcript}
        onChange={(e) => onTranscriptChange(e.target.value)}
        rows={2}
        className={`w-full p-2.5 text-sm md:text-base text-slate-800 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-600/30 transition-all resize-none ${
          isTe ? 'font-telugu' : ''
        }`}
        placeholder={isTe ? 'మీ ప్రశ్నను ఇక్కడ సరిదిద్దవచ్చు...' : 'You can adjust your transcribed question here...'}
      />

      <div className="mt-3 flex items-center justify-between">
        <div className="text-[11px] text-slate-500 flex items-center space-x-1">
          <CheckCircle2 className="w-3.5 h-3.5 text-teal-600" />
          <span>{isTe ? 'అధికారిక డాక్యుమెంట్లలో మాత్రమే వెతుకుతుంది' : 'Grounded only in reviewed health documents'}</span>
        </div>

        <button
          type="button"
          onClick={onSubmit}
          disabled={isLoading || !transcript.trim()}
          className="inline-flex items-center space-x-2 px-4 py-2 bg-teal-700 hover:bg-teal-800 disabled:bg-slate-300 text-white rounded-xl text-xs md:text-sm font-semibold shadow-sm transition-all active:scale-95"
        >
          <span>{isTe ? 'సమాధానం వెతకండి' : 'Search Guidelines'}</span>
          <Send className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
