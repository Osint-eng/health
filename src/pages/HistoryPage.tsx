import React, { useState, useEffect } from 'react';
import {
  Bookmark,
  Trash2,
  Search,
  MessageSquare,
  ArrowRight,
  AlertTriangle,
  Info,
} from 'lucide-react';
import { Conversation, Language } from '../types';
import { api } from '../services/api';

interface HistoryPageProps {
  language: Language;
  onOpenConversation: (conv: Conversation) => void;
  onNewConversation: () => void;
}

export const HistoryPage: React.FC<HistoryPageProps> = ({
  language,
  onOpenConversation,
  onNewConversation,
}) => {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [search, setSearch] = useState('');
  const [showClearConfirm, setShowClearConfirm] = useState(false);
  const [loading, setLoading] = useState(true);

  const isTe = language === 'te';

  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = async () => {
    setLoading(true);
    try {
      const data = await api.getConversations();
      setConversations(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteOne = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      await api.deleteConversation(id);
      setConversations((prev) => prev.filter((c) => c.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  const handleClearAll = async () => {
    try {
      await api.clearAllConversations();
      setConversations([]);
      setShowClearConfirm(false);
    } catch (err) {
      console.error(err);
    }
  };

  const filtered = conversations.filter((c) =>
    c.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 md:py-8 space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight flex items-center space-x-2">
            <Bookmark className="w-6 h-6 text-teal-700" />
            <span>{isTe ? 'భద్రపరిచిన సంభాషణలు' : 'Saved Inquiries & History'}</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            {isTe
              ? 'గత ప్రశ్నలు మరియు వాటి అధికారిక ఆధారాలను ఇక్కడ చూడవచ్చు.'
              : 'Review your previously grounded health questions and citations.'}
          </p>
        </div>

        {conversations.length > 0 && (
          <button
            type="button"
            onClick={() => setShowClearConfirm(true)}
            className="px-3.5 py-2 text-xs font-bold text-rose-700 hover:bg-rose-50 border border-rose-200 rounded-xl transition-colors flex items-center space-x-1.5 self-start sm:self-auto"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>{isTe ? 'అన్నింటినీ తొలగించు' : 'Clear All History'}</span>
          </button>
        )}
      </div>

      {/* Guest Notice */}
      <div className="p-3.5 bg-amber-50/80 border border-amber-200/70 rounded-2xl text-xs text-amber-950 flex items-start space-x-2">
        <Info className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
        <span>
          {isTe
            ? 'అతిథి మోడ్‌లో (Guest) చరిత్ర మీ ప్రస్తుత బ్రౌజర్‌లో మాత్రమే భద్రపరచబడుతుంది. మీరు డేటాను క్లియర్ చేస్తే పూర్తిగా తొలగించబడుతుంది.'
            : 'For guest access, conversations are retained locally in your active session. You can permanently delete them at any time.'}
        </span>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder={isTe ? 'సంభాషణలను శోధించండి...' : 'Search past inquiries...'}
          className="w-full text-xs sm:text-sm pl-9 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-600/30"
        />
      </div>

      {/* List */}
      {loading ? (
        <div className="py-12 text-center text-xs text-slate-400">Loading history...</div>
      ) : filtered.length === 0 ? (
        <div className="py-12 text-center bg-white rounded-3xl border border-slate-200 p-8 space-y-3">
          <MessageSquare className="w-10 h-10 text-slate-300 mx-auto" />
          <h3 className="font-bold text-slate-800 text-sm">
            {isTe ? 'భద్రపరిచిన సంభాషణలు లేవు' : 'No saved conversations found'}
          </h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            {isTe
              ? 'వాయిస్ లేదా టెక్స్ట్ ద్వారా ప్రశ్న అడిగినప్పుడు మీ సంభాషణలు ఇక్కడ కనిపిస్తాయి.'
              : 'Ask a question in Arogya Voice to start your grounded consultation record.'}
          </p>
          <button
            type="button"
            onClick={onNewConversation}
            className="px-4 py-2 bg-teal-700 hover:bg-teal-800 text-white rounded-xl text-xs font-bold transition-all shadow-xs"
          >
            {isTe ? 'ఇప్పుడే అడగండి' : 'Start a Health Inquiry'}
          </button>
        </div>
      ) : (
        <div className="space-y-2.5">
          {filtered.map((conv) => (
            <div
              key={conv.id}
              onClick={() => onOpenConversation(conv)}
              className="p-4 bg-white rounded-2xl border border-slate-200/90 hover:border-teal-400/80 hover:shadow-xs transition-all cursor-pointer flex items-center justify-between group"
            >
              <div className="pr-4 truncate flex-1">
                <h4 className="font-bold text-xs sm:text-sm text-slate-900 group-hover:text-teal-900 truncate">
                  {conv.title}
                </h4>
                <div className="text-[11px] text-slate-400 mt-0.5 flex items-center space-x-2">
                  <span>{new Date(conv.updated_at).toLocaleDateString()}</span>
                  <span>•</span>
                  <span>{conv.messages.length} messages</span>
                  <span>•</span>
                  <span className="uppercase text-[10px] font-semibold text-teal-700 bg-teal-50 px-1.5 py-0.2 rounded">
                    {conv.language}
                  </span>
                </div>
              </div>

              <div className="flex items-center space-x-2 shrink-0">
                <button
                  type="button"
                  onClick={(e) => handleDeleteOne(conv.id, e)}
                  title="Delete conversation"
                  className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
                <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-teal-700 transition-colors" />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Confirmation Dialog for Clear All */}
      {showClearConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 shadow-2xl border border-slate-200">
            <div className="flex items-center space-x-3 text-rose-600 mb-3">
              <AlertTriangle className="w-6 h-6 shrink-0" />
              <h3 className="font-bold text-base text-slate-900">
                {isTe ? 'అన్ని సంభాషణలను తొలగించాలా?' : 'Delete All Conversation Data?'}
              </h3>
            </div>
            <p className="text-xs text-slate-600 mb-5">
              {isTe
                ? 'ఈ చర్య రద్దు చేయబడదు. భద్రపరిచిన అన్ని ప్రశ్నలు మరియు సమాధానాలు తొలగించబడతాయి.'
                : 'This action cannot be undone. All saved question threads and citations will be permanently erased.'}
            </p>
            <div className="flex justify-end space-x-2">
              <button
                type="button"
                onClick={() => setShowClearConfirm(false)}
                className="px-3 py-1.5 text-xs text-slate-600 hover:bg-slate-100 rounded-lg"
              >
                {isTe ? 'రద్దు' : 'Cancel'}
              </button>
              <button
                type="button"
                onClick={handleClearAll}
                className="px-4 py-1.5 bg-rose-600 hover:bg-rose-700 text-white rounded-lg text-xs font-bold"
              >
                {isTe ? 'అవును, తొలగించు' : 'Yes, Erase All'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
