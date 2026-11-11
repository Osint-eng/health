import React, { useState, useEffect, useRef } from 'react';
import {
  Mic,
  Send,
  PlusCircle,
  ShieldCheck,
  AlertCircle,
  Loader2,
  Trash2,
  Sparkles,
  Volume2,
  Lock,
  ArrowDown,
  Info,
  CheckCircle2,
  XCircle,
  X,
} from 'lucide-react';
import { Citation, Conversation, Language, Message } from '../types';
import { api } from '../services/api';
import { speechRecognizer, speechSynthesizer } from '../services/speech';
import { AudioVisualizer } from '../components/AudioVisualizer';
import { MicrophoneButton } from '../components/MicrophoneButton';
import { TranscriptEditor } from '../components/TranscriptEditor';
import { AnswerCard } from '../components/AnswerCard';
import { SourceModal } from '../components/SourceModal';
import { ReportModal } from '../components/ReportModal';
import { TRANSLATIONS } from '../locales/translations';

interface AskPageProps {
  currentConversation: Conversation | null;
  language: Language;
  onLanguageChange: (lang: Language) => void;
  onNewConversation: () => void;
  onUpdateConversation: (conv: Conversation) => void;
  initialQuery?: string;
  autoRecord?: boolean;
}

type AssistantState =
  | 'idle'
  | 'requesting_mic'
  | 'recording'
  | 'transcribing'
  | 'review_transcript'
  | 'searching_sources'
  | 'preparing_answer'
  | 'validating_answer'
  | 'ready_speaking'
  | 'error';

export const AskPage: React.FC<AskPageProps> = ({
  currentConversation,
  language,
  onLanguageChange,
  onNewConversation,
  onUpdateConversation,
  initialQuery = '',
  autoRecord = false,
}) => {
  const t = TRANSLATIONS[language];
  const isTe = language === 'te';

  // Assistant State Machine
  const [assistantState, setAssistantState] = useState<AssistantState>('idle');
  const [inputText, setInputText] = useState('');
  const [transcriptDraft, setTranscriptDraft] = useState('');
  const [recordingSeconds, setRecordingSeconds] = useState(0);
  const [errorMessage, setErrorMessage] = useState('');

  // Modals for Source detail and Reporting
  const [activeCitation, setActiveCitation] = useState<Citation | null>(null);
  const [reportingMessage, setReportingMessage] = useState<Message | null>(null);

  // First-use Clinical Safety Card
  const [showSafetyCard, setShowSafetyCard] = useState<boolean>(() => {
    try {
      return localStorage.getItem('arogya_dismiss_safety_card') !== 'true';
    } catch {
      return true;
    }
  });

  const dismissSafetyCard = () => {
    try {
      localStorage.setItem('arogya_dismiss_safety_card', 'true');
    } catch {}
    setShowSafetyCard(false);
  };

  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const timerRef = useRef<any>(null);

  // Auto-scroll to latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [currentConversation?.messages, assistantState]);

  // Handle Initial query passed from HomePage
  useEffect(() => {
    if (initialQuery) {
      setInputText(initialQuery);
    }
  }, [initialQuery]);

  // Auto start recording if requested
  useEffect(() => {
    if (autoRecord && assistantState === 'idle') {
      startVoiceRecording();
    }
  }, [autoRecord]);

  // Voice Recording Management
  const startVoiceRecording = () => {
    setErrorMessage('');
    setAssistantState('requesting_mic');
    setTranscriptDraft('');
    setRecordingSeconds(0);

    if (!speechRecognizer.isSupported()) {
      setAssistantState('error');
      setErrorMessage(
        isTe
          ? 'మీ బ్రౌజర్ స్పీచ్ రికగ్నిషన్‌కు మద్దతు ఇవ్వడం లేదు. దయచేసి టైప్ చేయండి.'
          : 'Speech recognition is not supported in this browser. Please type your question.'
      );
      return;
    }

    try {
      speechRecognizer.startListening(
        language,
        (text, isFinal) => {
          setTranscriptDraft(text);
          if (isFinal) {
            stopVoiceRecording();
          }
        },
        (err) => {
          stopTimer();
          setAssistantState('error');
          setErrorMessage(err);
        },
        () => {
          stopTimer();
          if (transcriptDraft.trim()) {
            setAssistantState('review_transcript');
          } else {
            setAssistantState('idle');
          }
        }
      );

      setAssistantState('recording');
      timerRef.current = setInterval(() => {
        setRecordingSeconds((prev) => prev + 1);
      }, 1000);
    } catch (e: any) {
      setAssistantState('error');
      setErrorMessage(e.message || 'Microphone access failed');
    }
  };

  const stopVoiceRecording = () => {
    speechRecognizer.stopListening();
    stopTimer();
    setAssistantState('transcribing');
    setTimeout(() => {
      setAssistantState('review_transcript');
    }, 400);
  };

  const stopTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  const handleClearTranscript = () => {
    setTranscriptDraft('');
    setAssistantState('idle');
  };

  // Submit Question to RAG Backend
  const handleSendQuestion = async (queryText?: string) => {
    const textToSend = (queryText || transcriptDraft || inputText).trim();
    if (!textToSend) return;

    if (!currentConversation) {
      try {
        const newConv = await api.createConversation(
          textToSend.substring(0, 36) + '...',
          'general',
          language
        );
        onUpdateConversation(newConv);
        await executeQuery(newConv.id, textToSend);
      } catch (err: any) {
        setAssistantState('error');
        setErrorMessage(err.message || 'Failed to create conversation session');
      }
    } else {
      await executeQuery(currentConversation.id, textToSend);
    }
  };

  const executeQuery = async (convId: string, text: string) => {
    setInputText('');
    setTranscriptDraft('');
    setErrorMessage('');

    // State sequence
    setAssistantState('searching_sources');

    try {
      setTimeout(() => {
        setAssistantState('preparing_answer');
      }, 350);

      const assistantMsg = await api.sendMessage(convId, text, language);

      setAssistantState('validating_answer');
      setTimeout(() => {
        setAssistantState('ready_speaking');
      }, 300);

      // Refresh conversation state
      const updated = await api.getConversation(convId);
      onUpdateConversation(updated);

      // Auto read answer aloud via TTS
      if (assistantMsg.spoken_text) {
        speechSynthesizer.speak(assistantMsg.spoken_text, language);
      }

      setTimeout(() => {
        setAssistantState('idle');
      }, 1200);
    } catch (err: any) {
      setAssistantState('error');
      setErrorMessage(err.message || 'Could not complete grounded answer verification.');
    }
  };

  const messages = currentConversation?.messages || [];

  return (
    <div className="flex flex-col h-[calc(100vh-65px)] max-w-4xl mx-auto w-full px-3 sm:px-4 py-2 sm:py-4">
      {/* Session Action Header */}
      <div className="bg-white rounded-2xl px-4 py-2.5 shadow-xs border border-slate-200/90 flex items-center justify-between mb-3 shrink-0">
        <div className="flex items-center space-x-2 truncate">
          <span className="w-2.5 h-2.5 rounded-full bg-teal-600 shrink-0" />
          <h2 className="text-xs sm:text-sm font-bold text-slate-800 truncate">
            {currentConversation?.title || (isTe ? 'ఆరోగ్య వాయిస్ అసిస్టెంట్' : 'Arogya Voice Assistant')}
          </h2>
          <span className="hidden sm:inline-flex items-center text-[11px] text-slate-400 bg-slate-50 px-2 py-0.5 rounded-md">
            <Lock className="w-3 h-3 mr-1 text-slate-400" />
            {isTe ? 'గోప్యమైన సెషన్' : 'Grounded RAG'}
          </span>
        </div>

        <div className="flex items-center space-x-2 shrink-0">
          <button
            type="button"
            onClick={onNewConversation}
            className="inline-flex items-center space-x-1 px-3 py-1.5 rounded-xl bg-teal-50 hover:bg-teal-100/80 text-teal-800 text-xs font-bold transition-colors"
          >
            <PlusCircle className="w-3.5 h-3.5" />
            <span>{isTe ? 'కొత్త ప్రశ్న' : 'New Session'}</span>
          </button>
        </div>
      </div>

      {/* Main Conversation Stream */}
      <div className="flex-1 overflow-y-auto space-y-4 pr-1 pb-4">
        {/* First-Use Safety Card */}
        {showSafetyCard && (
          <div className="p-4 sm:p-5 bg-gradient-to-br from-teal-50/90 via-white to-slate-50 border border-teal-200/90 rounded-2xl shadow-xs relative animate-fade-in mb-2">
            <button
              type="button"
              onClick={dismissSafetyCard}
              className="absolute top-3.5 right-3.5 p-1.5 text-slate-400 hover:text-slate-700 rounded-full hover:bg-slate-100 transition-colors"
              title="Dismiss safety note"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center space-x-2.5 mb-3">
              <div className="w-7 h-7 rounded-lg bg-teal-800 text-white flex items-center justify-center">
                <ShieldCheck className="w-4 h-4 text-teal-200" />
              </div>
              <div>
                <h4 className="text-xs sm:text-sm font-bold text-slate-900">
                  {isTe ? 'ఆరోగ్య వాయిస్ ఏమి చేస్తుంది & ఏమి చేయదు' : 'What Arogya Voice Will & Will Not Do'}
                </h4>
                <p className="text-[11px] text-slate-500">
                  {isTe
                    ? 'రోగి భద్రత కోసం అధికారిక మార్గదర్శకాలకు మాత్రమే కట్టుబడి ఉంటాము.'
                    : 'Clear clinical boundaries grounded in official WHO, PAHO, and NHA standards.'}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs pt-1">
              {/* What it will do */}
              <div className="p-3 bg-white/90 border border-teal-200/70 rounded-xl space-y-2">
                <div className="font-bold text-teal-900 flex items-center space-x-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-teal-700 shrink-0" />
                  <span>{isTe ? 'ఆరోగ్య వాయిస్ చేస్తుంది (What It Does):' : 'What Arogya Voice WILL Do:'}</span>
                </div>
                <ul className="space-y-1.5 text-[11px] text-slate-700">
                  <li className="flex items-start space-x-1.5">
                    <span className="text-teal-700 font-bold">✓</span>
                    <span>{isTe ? 'సమీక్షించిన WHO, PAHO, NHA పత్రాల నుండి మాత్రమే వాస్తవాలు అందిస్తుంది' : 'Answers only from verified WHO, PAHO, and official scheme guidelines'}</span>
                  </li>
                  <li className="flex items-start space-x-1.5">
                    <span className="text-teal-700 font-bold">✓</span>
                    <span>{isTe ? 'ఖచ్చితమైన కొటేషన్లు, పేజీలు మరియు వెక్టర్ సారూప్యత స్కోర్‌లను చూపుతుంది' : 'Displays exact excerpt quotes, page numbers, and vector similarity scores'}</span>
                  </li>
                  <li className="flex items-start space-x-1.5">
                    <span className="text-teal-700 font-bold">✓</span>
                    <span>{isTe ? 'తీవ్రమైన ప్రమాద హెచ్చరికలను గుర్తించి 108 / 112 కు మళ్లిస్తుంది' : 'Immediately routes acute warning signs to verified 108/112 helplines'}</span>
                  </li>
                  <li className="flex items-start space-x-1.5">
                    <span className="text-teal-700 font-bold">✓</span>
                    <span>{isTe ? 'మీ వైద్యుడిని సంప్రదించడానికి ఉపయోగపడే ప్రశ్నలను సూచిస్తుంది' : 'Suggests specific, actionable questions to take to your healthcare clinician'}</span>
                  </li>
                </ul>
              </div>

              {/* What it will NOT do */}
              <div className="p-3 bg-white/90 border border-rose-200/70 rounded-xl space-y-2">
                <div className="font-bold text-rose-900 flex items-center space-x-1.5">
                  <XCircle className="w-3.5 h-3.5 text-rose-700 shrink-0" />
                  <span>{isTe ? 'ఆరోగ్య వాయిస్ చేయదు (What It Will NOT Do):' : 'What Arogya Voice Will NOT Do:'}</span>
                </div>
                <ul className="space-y-1.5 text-[11px] text-slate-700">
                  <li className="flex items-start space-x-1.5">
                    <span className="text-rose-700 font-bold">✕</span>
                    <span>{isTe ? 'ఎప్పటికీ వ్యాధి నిర్ధారణ చేయదు లేదా మీరు "సురక్షితం" అని చెప్పదు' : 'Never diagnose illnesses or declare a patient "safe"'}</span>
                  </li>
                  <li className="flex items-start space-x-1.5">
                    <span className="text-rose-700 font-bold">✕</span>
                    <span>{isTe ? 'మందుల మోతాదును (డ్రగ్ డోసేజ్) లెక్కించదు లేదా ప్రిస్క్రిప్షన్ రాయదు' : 'Never prescribe medications or calculate personal drug dosages'}</span>
                  </li>
                  <li className="flex items-start space-x-1.5">
                    <span className="text-rose-700 font-bold">✕</span>
                    <span>{isTe ? 'అధికారిక ఆధారాలు లేనప్పుడు ఊహించి సమాధానం చెప్పదు' : 'Never hallucinate unapproved sources or guess medical answers'}</span>
                  </li>
                  <li className="flex items-start space-x-1.5">
                    <span className="text-rose-700 font-bold">✕</span>
                    <span>{isTe ? 'అత్యవసర చికిత్సకు లేదా వైద్యుడి ప్రత్యక్ష పరీక్షకు ప్రత్యామ్నాయం కాదు' : 'Never substitute for emergency hospital triage or licensed clinicians'}</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="mt-3 pt-2.5 border-t border-teal-100 flex items-center justify-between">
              <span className="text-[11px] text-teal-800 font-medium">
                {isTe ? 'కఠినమైన క్లినికల్ భద్రత మరియు ఆధార నిబద్ధత' : 'Strict clinical safety & grounded evidence discipline'}
              </span>
              <button
                type="button"
                onClick={dismissSafetyCard}
                className="px-3 py-1 bg-teal-800 hover:bg-teal-900 text-white text-[11px] font-bold rounded-lg transition-colors"
              >
                {isTe ? 'అర్థమైంది' : 'Understood'}
              </button>
            </div>
          </div>
        )}

        {messages.length === 0 ? (
          /* Empty State Welcome Guidance */
          <div className="py-8 sm:py-12 text-center space-y-4 max-w-lg mx-auto">
            <div className="w-16 h-16 rounded-3xl bg-teal-50 border border-teal-200/80 flex items-center justify-center text-teal-800 mx-auto shadow-xs">
              <Sparkles className="w-8 h-8 text-teal-700 animate-pulse" />
            </div>

            <div className="space-y-1">
              <h3 className="text-lg sm:text-xl font-bold text-slate-900">
                {isTe ? 'మీ ప్రశ్నను అడగండి' : 'Ask Your Healthcare Question'}
              </h3>
              <p className="text-xs sm:text-sm text-slate-500">
                {isTe
                  ? 'మైక్రోఫోన్ నొక్కి మాట్లాడండి లేదా కింద ఉన్న నమూనా ప్రశ్నను ఎంచుకోండి.'
                  : 'Tap the microphone to speak, or select a reviewed sample question below.'}
              </p>
            </div>

            {/* Quick Sample Questions */}
            <div className="grid grid-cols-1 gap-2 pt-2 text-left">
              {[
                isTe ? t.sampleQuestionMosquito : 'What are the emergency warning signs of severe dengue that require immediate hospitalization?',
                isTe ? t.sampleQuestionChildGrowth : 'How should parents interpret WHO Child Growth Standard percentiles and z-scores?',
                isTe ? t.sampleQuestionFever : 'What red flags with a fever indicate a patient needs urgent emergency medical evaluation?',
                isTe ? t.sampleQuestion4 : 'What documents are required to apply for Ayushman Bharat PM-JAY and generate the Golden Card?',
              ].map((sample, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleSendQuestion(sample)}
                  className="p-3 bg-white hover:bg-teal-50/70 border border-slate-200 rounded-xl text-xs font-medium text-slate-800 hover:text-teal-900 transition-all text-left flex items-center justify-between group shadow-2xs"
                >
                  <span className={isTe ? 'font-telugu' : ''}>{sample}</span>
                  <Send className="w-3 h-3 text-slate-300 group-hover:text-teal-700 shrink-0 ml-2" />
                </button>
              ))}
            </div>

            <div className="p-3 bg-amber-50/80 border border-amber-200/70 rounded-xl text-[11px] text-amber-950 flex items-start space-x-2 text-left">
              <Info className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
              <span>
                {isTe
                  ? 'గమనిక: ఆరోగ్య వాయిస్ కేవలం సమీక్షించిన అధికారిక మార్గదర్శకాల ఆధారంగా మాత్రమే సమాధానం ఇస్తుంది. ఇది రోగ నిర్ధారణ లేదా ప్రిస్క్రిప్షన్ అందించదు.'
                  : 'Safety Boundary: Answers are derived strictly from reviewed official documents. We never diagnose conditions, provide dosage, or replace healthcare clinicians.'}
              </span>
            </div>
          </div>
        ) : (
          /* Message History */
          messages.map((msg) => (
            <div key={msg.id} className="space-y-3">
              {msg.role === 'user' ? (
                <div className="flex justify-end">
                  <div className="max-w-[85%] sm:max-w-md bg-teal-800 text-white p-3.5 sm:p-4 rounded-2xl rounded-tr-xs shadow-xs text-sm sm:text-base font-medium">
                    <p className={isTe ? 'font-telugu' : ''}>{msg.text}</p>
                    <div className="text-[10px] text-teal-200/80 mt-1 text-right">
                      {new Date(msg.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </div>
                </div>
              ) : (
                <AnswerCard
                  message={msg}
                  language={language}
                  onViewSource={(cite) => setActiveCitation(cite)}
                  onReportIssue={(m) => setReportingMessage(m)}
                />
              )}
            </div>
          ))
        )}

        {/* State Machine Status Indicator */}
        {assistantState !== 'idle' && assistantState !== 'error' && assistantState !== 'review_transcript' && (
          <div className="p-4 bg-teal-50 border border-teal-200 rounded-2xl flex items-center space-x-3 text-xs sm:text-sm text-teal-900 font-semibold animate-pulse">
            <Loader2 className="w-5 h-5 text-teal-700 animate-spin shrink-0" />
            <div>
              {assistantState === 'requesting_mic' && (isTe ? 'మైక్రోఫోన్ అనుమతి తీసుకుంటోంది...' : 'Requesting microphone access...')}
              {assistantState === 'recording' && (isTe ? 'మీ మాట వింటున్నాము... మాట్లాడండి.' : 'Listening to your voice... Speak clearly.')}
              {assistantState === 'transcribing' && (isTe ? 'మాటను రాతగా మారుస్తోంది (Transcribing)...' : 'Transcribing speech to text...')}
              {assistantState === 'searching_sources' && (isTe ? 'సమీక్షించిన పత్రాలలో ఆధారాలను శోధిస్తోంది...' : 'Searching reviewed guidelines & official evidence...')}
              {assistantState === 'preparing_answer' && (isTe ? 'నిర్ధారించిన ఆధారాలతో సమాధానం రూపొందిస్తోంది...' : 'Generating grounded answer strictly from approved passages...')}
              {assistantState === 'validating_answer' && (isTe ? 'భద్రత మరియు కొటేషన్లను సరిచూస్తోంది...' : 'Validating output safety & citation fidelity...')}
              {assistantState === 'ready_speaking' && (isTe ? 'సమాధానం సిద్ధమైంది.' : 'Answer validated and ready.')}
            </div>
          </div>
        )}

        {/* Error notification */}
        {errorMessage && (
          <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-800 flex items-start space-x-2">
            <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
            <div className="flex-1">
              <strong>Notice:</strong> {errorMessage}
            </div>
            <button
              onClick={() => setErrorMessage('')}
              className="text-xs text-rose-500 hover:text-rose-800 font-bold"
            >
              Dismiss
            </button>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Active Recording Waveform Overlay */}
      {assistantState === 'recording' && (
        <div className="bg-white/95 backdrop-blur-md rounded-2xl p-4 border border-rose-200 shadow-lg mb-3 flex flex-col items-center justify-center space-y-2 animate-slide-up">
          <AudioVisualizer isActive={true} mode="listening" height={48} />
          <MicrophoneButton
            isRecording={true}
            recordingDuration={recordingSeconds}
            onClick={stopVoiceRecording}
          />
        </div>
      )}

      {/* Transcript Reviewer / Editor Before Submission */}
      {assistantState === 'review_transcript' && (
        <TranscriptEditor
          transcript={transcriptDraft}
          language={language}
          onTranscriptChange={setTranscriptDraft}
          onSubmit={() => handleSendQuestion(transcriptDraft)}
          onClear={handleClearTranscript}
        />
      )}

      {/* Bottom Composer Controls */}
      {assistantState !== 'recording' && (
        <div className="pt-2 shrink-0">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendQuestion();
            }}
            className="flex items-center space-x-2 bg-white rounded-2xl p-2 border border-slate-200/90 shadow-sm focus-within:ring-2 focus-within:ring-teal-600/30 transition-all"
          >
            {/* Microphone Trigger */}
            <button
              type="button"
              onClick={startVoiceRecording}
              aria-label="Start Voice Recording"
              className="w-10 h-10 rounded-xl bg-teal-50 hover:bg-teal-100 text-teal-800 flex items-center justify-center shrink-0 transition-transform active:scale-95"
            >
              <Mic className="w-5 h-5" />
            </button>

            {/* Text input field */}
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder={isTe ? t.composerPlaceholder : 'Type your question or tap the mic...'}
              className={`flex-1 text-xs sm:text-sm text-slate-900 placeholder-slate-400 bg-transparent border-none focus:outline-none ${
                isTe ? 'font-telugu' : ''
              }`}
            />

            {/* Send button */}
            <button
              type="submit"
              disabled={!inputText.trim()}
              aria-label="Send Message"
              className="w-10 h-10 rounded-xl bg-teal-700 hover:bg-teal-800 disabled:bg-slate-200 text-white disabled:text-slate-400 flex items-center justify-center shrink-0 transition-all shadow-xs"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>

          {/* Assistant Boundary Footer Note */}
          <div className="mt-1.5 flex items-center justify-between text-[11px] text-slate-400 px-1">
            <span>{isTe ? 'ఆధారం: WHO & myScheme అధికారిక మార్గదర్శకాలు' : 'Reviewed sources: WHO & myScheme official records'}</span>
            <span>{language === 'te' ? 'తెలుగు మోడ్' : 'English v1.0'}</span>
          </div>
        </div>
      )}

      {/* Modals for Source details & Issue reporting */}
      {activeCitation && (
        <SourceModal
          citation={activeCitation}
          language={language}
          onClose={() => setActiveCitation(null)}
          onReportOutdated={(cite) => {
            if (currentConversation && currentConversation.messages.length > 0) {
              const lastMsg = currentConversation.messages[currentConversation.messages.length - 1];
              setReportingMessage(lastMsg);
            }
          }}
        />
      )}

      {reportingMessage && (
        <ReportModal
          messageId={reportingMessage.id}
          questionText="User health question"
          answerText={reportingMessage.text}
          language={language}
          onClose={() => setReportingMessage(null)}
        />
      )}
    </div>
  );
};
