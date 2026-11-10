import React, { useState, useEffect } from 'react';
import {
  Search,
  BookOpen,
  Filter,
  ArrowRight,
  ExternalLink,
  Calendar,
  Building2,
  FileText,
  Volume2,
  Sparkles,
  Sliders,
  ChevronLeft,
} from 'lucide-react';
import { DocumentSource, Language } from '../types';
import { api } from '../services/api';
import { AudioPlayer } from '../components/AudioPlayer';

interface LibraryPageProps {
  language: Language;
  onAskAboutArticle: (article: DocumentSource) => void;
}

export const LibraryPage: React.FC<LibraryPageProps> = ({
  language,
  onAskAboutArticle,
}) => {
  const [articles, setArticles] = useState<DocumentSource[]>([]);
  const [selectedTopic, setSelectedTopic] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedArticle, setSelectedArticle] = useState<DocumentSource | null>(null);
  const [textSize, setTextSize] = useState<'normal' | 'large'>('normal');
  const [loading, setLoading] = useState(true);

  const isTe = language === 'te';

  useEffect(() => {
    loadArticles();
  }, [selectedTopic, searchQuery]);

  const loadArticles = async () => {
    setLoading(true);
    try {
      const data = await api.getLibraryArticles(selectedTopic, searchQuery);
      setArticles(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const topics = [
    { id: 'all', labelEn: 'All Topics', labelTe: 'అన్ని అంశాలు' },
    { id: 'mosquito_borne', labelEn: 'Dengue & Malaria', labelTe: 'డెంగ్యూ & మలేరియా' },
    { id: 'child_growth', labelEn: 'Child Growth', labelTe: 'పిల్లల పెరుగుదల' },
    { id: 'common_symptoms_fever', labelEn: 'Fever & Symptoms', labelTe: 'జ్వరం & లక్షణాలు' },
    { id: 'scheme_pmjay', labelEn: 'PM-JAY & UHC', labelTe: 'ఆయుష్మాన్ భారత్' },
    { id: 'diabetes', labelEn: 'Diabetes', labelTe: 'మధుమేహం' },
    { id: 'maternal_care', labelEn: 'Maternal Care', labelTe: 'తల్లి సంరక్షణ' },
    { id: 'hypertension', labelEn: 'Hypertension', labelTe: 'రక్తపోటు' },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 md:py-8 space-y-6 animate-fade-in">
      {/* If Article is selected, show Reader View */}
      {selectedArticle ? (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <button
              type="button"
              onClick={() => setSelectedArticle(null)}
              className="inline-flex items-center space-x-1.5 text-xs font-bold text-teal-800 hover:text-teal-900"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>{isTe ? 'లైబ్రరీకి తిరిగి వెళ్లండి' : 'Back to Library'}</span>
            </button>

            <div className="flex items-center space-x-3">
              {/* Text Size Adjuster */}
              <button
                type="button"
                onClick={() => setTextSize(textSize === 'normal' ? 'large' : 'normal')}
                className="px-2.5 py-1 text-xs font-bold rounded-lg border border-slate-200 text-slate-700 hover:bg-slate-50 flex items-center space-x-1"
              >
                <span>A</span>
                <span className="text-sm font-extrabold">A</span>
              </button>

              {/* Audio player */}
              <AudioPlayer
                textToSpeak={selectedArticle.summary + '. ' + selectedArticle.chunks.map(c => c.text).join(' ')}
                language={language}
              />
            </div>
          </div>

          {/* Article Header */}
          <div>
            <div className="flex items-center space-x-2 text-xs text-teal-800 font-semibold mb-2">
              <span className="bg-teal-50 px-2.5 py-0.5 rounded-full border border-teal-200/70">
                {selectedArticle.category === 'healthcare_scheme' ? 'Government Scheme' : 'Official Health Guideline'}
              </span>
              <span>•</span>
              <span>Version {selectedArticle.current_version}</span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight leading-snug">
              {selectedArticle.title}
            </h1>

            <div className="flex flex-wrap items-center gap-4 mt-3 text-xs text-slate-500">
              <span className="flex items-center">
                <Building2 className="w-3.5 h-3.5 mr-1 text-slate-400" />
                {selectedArticle.publisher}
              </span>
              <span className="flex items-center">
                <Calendar className="w-3.5 h-3.5 mr-1 text-slate-400" />
                Reviewed: {selectedArticle.review_date} by {selectedArticle.reviewer_name}
              </span>
            </div>
          </div>

          {/* Short Summary Callout */}
          <div className="p-4 bg-teal-50/60 border border-teal-200/60 rounded-2xl text-sm md:text-base text-slate-800 font-medium leading-relaxed">
            <p className="font-bold text-xs uppercase tracking-wider text-teal-900 mb-1">
              {isTe ? 'ముఖ్య సారాంశం (Summary):' : 'Executive Guideline Summary:'}
            </p>
            {selectedArticle.summary}
          </div>

          {/* Chunks and Content Sections */}
          <div className="space-y-6 pt-2">
            {selectedArticle.chunks.map((chunk, idx) => (
              <div key={chunk.id} className="p-5 rounded-2xl bg-slate-50/70 border border-slate-200/80 space-y-2">
                <div className="flex items-center justify-between text-xs font-bold text-teal-800">
                  <span>{chunk.title}</span>
                  <span className="bg-white px-2 py-0.5 rounded border border-slate-200 text-slate-600">
                    {chunk.section} · p.{chunk.page}
                  </span>
                </div>
                <p
                  className={`text-slate-800 leading-relaxed ${
                    textSize === 'large' ? 'text-lg' : 'text-base'
                  } ${isTe ? 'font-telugu' : ''}`}
                >
                  {chunk.text}
                </p>
              </div>
            ))}
          </div>

          {/* Action: Ask about this article */}
          <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
            <a
              href={selectedArticle.original_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-semibold text-slate-500 hover:text-teal-800 flex items-center space-x-1"
            >
              <span>{isTe ? 'అసలు అధికారిక లింక్' : 'Official Publication Link'}</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>

            <button
              type="button"
              onClick={() => onAskAboutArticle(selectedArticle)}
              className="w-full sm:w-auto px-5 py-3 bg-teal-700 hover:bg-teal-800 text-white rounded-xl text-xs sm:text-sm font-bold shadow-sm flex items-center justify-center space-x-2 transition-transform active:scale-95"
            >
              <Sparkles className="w-4 h-4 text-teal-200" />
              <span>{isTe ? 'ఈ పత్రం గురించి అడగండి' : 'Ask Question About This Article'}</span>
            </button>
          </div>
        </div>
      ) : (
        /* Library List View */
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                {isTe ? 'ఆరోగ్య లైబ్రరీ' : 'Approved Health Library'}
              </h1>
              <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                {isTe
                  ? 'ప్రపంచ ఆరోగ్య సంస్థ (WHO) మరియు భారత ప్రభుత్వ అధికారిక మార్గదర్శకాలు'
                  : 'Reviewed guidelines from WHO, MoHFW, and National Health Authority.'}
              </p>
            </div>
          </div>

          {/* Search & Topic Filters */}
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={isTe ? 'లైబ్రరీలో శోధించండి (ఉదా: ఆహారం, రక్తపోటు)...' : 'Search reviewed publications (e.g. diet, BP, PM-JAY)...'}
                className="w-full text-xs sm:text-sm pl-9 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-600/30"
              />
            </div>

            {/* Filter pills */}
            <div className="flex items-center space-x-1.5 overflow-x-auto pb-1 sm:pb-0">
              {topics.map((top) => (
                <button
                  key={top.id}
                  type="button"
                  onClick={() => setSelectedTopic(top.id)}
                  className={`px-3 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                    selectedTopic === top.id
                      ? 'bg-teal-700 text-white shadow-xs'
                      : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  {isTe ? top.labelTe : top.labelEn}
                </button>
              ))}
            </div>
          </div>

          {/* Article Cards Grid */}
          {loading ? (
            <div className="py-12 text-center text-xs text-slate-400">Loading publications...</div>
          ) : articles.length === 0 ? (
            <div className="py-12 text-center bg-white rounded-3xl border border-slate-200 p-8 space-y-2">
              <BookOpen className="w-10 h-10 text-slate-300 mx-auto" />
              <h3 className="font-bold text-slate-800 text-sm">
                {isTe ? 'ఎలాంటి పత్రాలు లభించలేదు' : 'No approved articles match your filter'}
              </h3>
              <p className="text-xs text-slate-500">
                {isTe ? 'దయచేసి వేరే కీవర్డ్‌తో శోధించండి.' : 'Try a different keyword or reset topic filters.'}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {articles.map((art) => (
                <div
                  key={art.id}
                  onClick={() => setSelectedArticle(art)}
                  className="p-5 bg-white rounded-2xl border border-slate-200/90 hover:border-teal-500/70 hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between text-[11px] text-teal-800 font-semibold mb-2">
                      <span className="bg-teal-50 px-2 py-0.5 rounded border border-teal-200/60">
                        {art.category === 'healthcare_scheme' ? 'Government Scheme' : 'Official Guideline'}
                      </span>
                      <span>v{art.current_version}</span>
                    </div>

                    <h3 className="font-bold text-slate-900 text-sm sm:text-base group-hover:text-teal-900 mb-1.5 leading-snug">
                      {art.title}
                    </h3>
                    <p className="text-xs text-slate-500 line-clamp-3 leading-relaxed mb-3">
                      {art.summary}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                    <span className="truncate pr-2 font-medium">{art.publisher}</span>
                    <span className="text-teal-700 font-semibold group-hover:underline shrink-0 flex items-center">
                      <span>{isTe ? 'చదవండి' : 'Read'}</span>
                      <ArrowRight className="w-3.5 h-3.5 ml-1" />
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
