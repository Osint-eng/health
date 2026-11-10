import React from 'react';
import {
  X,
  ExternalLink,
  Cpu,
  Layers,
  Mic,
  Volume2,
  Database,
  Binary,
  Code2,
  Award,
  CheckCircle2,
  Workflow,
  Sparkles,
} from 'lucide-react';
import { STACK_COMPONENTS, HACKATHON_INFO } from '../data/stackArchitecture';
import { Language } from '../types';

interface StackArchitectureModalProps {
  language: Language;
  onClose: () => void;
}

export const StackArchitectureModal: React.FC<StackArchitectureModalProps> = ({
  language,
  onClose,
}) => {
  const isTe = language === 'te';

  const getIconForPart = (part: string) => {
    switch (part) {
      case 'Hearing (ASR)':
        return Mic;
      case 'Speaking (TTS)':
        return Volume2;
      case 'Brain (Free Cloud API)':
      case 'Brain (Local Alternative)':
        return Cpu;
      case 'Retrieval Store':
        return Database;
      case 'Multilingual Embeddings':
        return Binary;
      case 'Glue Code & Streaming':
        return Workflow;
      case 'Evaluation & Free GPU':
        return Code2;
      case 'Hackathon Track':
      default:
        return Award;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs animate-fade-in">
      <div className="bg-white rounded-3xl max-w-2xl w-full p-5 sm:p-7 shadow-2xl border border-teal-900/15 relative max-h-[92vh] flex flex-col">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-700 rounded-full hover:bg-slate-100"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center space-x-3 mb-4 pb-3 border-b border-slate-100 pr-8">
          <div className="w-10 h-10 rounded-2xl bg-teal-50 border border-teal-200/80 flex items-center justify-center text-teal-800 shrink-0">
            <Layers className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-[10px] font-bold text-teal-800 bg-teal-50 border border-teal-200 px-2 py-0.5 rounded-full uppercase">
                {HACKATHON_INFO.badgeText}
              </span>
              <span className="text-[10px] text-emerald-600 font-bold flex items-center">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-1 animate-pulse" />
                Production Topology
              </span>
            </div>
            <h2 className="text-base sm:text-lg font-bold text-slate-900 mt-0.5">
              System Architecture & Component Registry
            </h2>
          </div>
        </div>

        {/* Hackathon Submission Card */}
        <div className="mb-4 p-3.5 bg-gradient-to-r from-teal-900 via-teal-800 to-indigo-900 text-white rounded-2xl shadow-sm flex items-center justify-between">
          <div className="pr-3">
            <div className="text-xs font-bold flex items-center space-x-1.5 text-teal-200">
              <Award className="w-4 h-4 text-amber-300" />
              <span>{HACKATHON_INFO.name}</span>
            </div>
            <p className="text-[11px] text-slate-200 mt-0.5">
              {HACKATHON_INFO.description}
            </p>
          </div>
          <a
            href={HACKATHON_INFO.rulesLink}
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-1.5 bg-white/20 hover:bg-white/30 text-white rounded-xl text-xs font-bold shrink-0 flex items-center space-x-1 transition-all"
          >
            <span>Rules & Submission</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Pipeline Flow Visualization */}
        <div className="mb-4 p-3 bg-slate-50 border border-slate-200/80 rounded-2xl">
          <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1.5 flex items-center justify-between">
            <span>Interchangeable Provider Pipeline</span>
            <span className="text-teal-700 font-semibold font-mono text-[9px]">Grounded & Transparent</span>
          </div>
          <div className="flex items-center justify-between text-[11px] font-semibold text-slate-700 overflow-x-auto pb-1 space-x-1">
            <span className="bg-white px-2 py-1 rounded border border-slate-200 shrink-0">🎤 Whisper (ASR)</span>
            <span className="text-slate-400">→</span>
            <span className="bg-white px-2 py-1 rounded border border-slate-200 shrink-0">🧬 BGE-M3 (Embed)</span>
            <span className="text-slate-400">→</span>
            <span className="bg-white px-2 py-1 rounded border border-slate-200 shrink-0">🗄️ ChromaDB (Passages)</span>
            <span className="text-slate-400">→</span>
            <span className="bg-white px-2 py-1 rounded border border-teal-300 text-teal-900 font-bold shrink-0">🧠 Gemini 3.8 Flash</span>
            <span className="text-slate-400">→</span>
            <span className="bg-white px-2 py-1 rounded border border-slate-200 shrink-0">🔊 Piper Voices (TTS)</span>
          </div>
        </div>

        {/* Component Table / Grid */}
        <div className="flex-1 overflow-y-auto space-y-2 pr-1">
          {STACK_COMPONENTS.map((item, idx) => {
            const Icon = getIconForPart(item.part);
            return (
              <div
                key={idx}
                className="p-3 bg-white rounded-xl border border-slate-200/90 hover:border-teal-400/80 transition-colors flex items-start justify-between group shadow-2xs"
              >
                <div className="flex items-start space-x-2.5 pr-2">
                  <div className="w-7 h-7 rounded-lg bg-teal-50 border border-teal-200/60 flex items-center justify-center text-teal-800 shrink-0 mt-0.5">
                    <Icon className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="font-bold text-slate-900 text-xs">{item.part}</span>
                      <span className="text-[10px] bg-slate-100 text-slate-600 px-1.5 py-0.2 rounded font-mono">
                        {item.provider}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-600 mt-0.5 leading-snug">{item.role}</p>
                    <span className="text-[10px] text-teal-700 font-medium">{item.use}</span>
                  </div>
                </div>

                <a
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-1.5 text-slate-400 hover:text-teal-800 hover:bg-slate-50 rounded-lg shrink-0 transition-colors"
                  title={`Open ${item.provider}`}
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
          <span>Interchangeable adapter interfaces enabled</span>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 bg-teal-800 hover:bg-teal-900 text-white rounded-xl text-xs font-bold"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
