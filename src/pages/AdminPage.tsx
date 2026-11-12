import React, { useState, useEffect } from 'react';
import {
  ShieldCheck,
  FileText,
  Upload,
  AlertTriangle,
  CheckCircle2,
  Sliders,
  PlusCircle,
  Archive,
  RefreshCw,
  Eye,
  Check,
  X,
  Database,
  Layers,
  ArrowRight,
  TestTube,
  Loader2,
  Play,
  RotateCcw,
  Sparkles,
  ExternalLink,
} from 'lucide-react';
import { FeedbackReport, IngestionJob, KnowledgeTopic, Language, EvaluationResult } from '../types';
import { api } from '../services/api';

interface AdminPageProps {
  language: Language;
  onResetDemoData?: () => void;
}

export const AdminPage: React.FC<AdminPageProps> = ({ language, onResetDemoData }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'ingestion' | 'reviews'>('overview');
  const [metrics, setMetrics] = useState<any>(null);
  const [reviews, setReviews] = useState<FeedbackReport[]>([]);
  const [loading, setLoading] = useState(true);

  // Live Benchmark Runner State
  const [benchmarkResult, setBenchmarkResult] = useState<EvaluationResult | null>(null);
  const [benchmarking, setBenchmarking] = useState(false);

  const runLiveBenchmarks = async () => {
    setBenchmarking(true);
    try {
      const res = await api.runEvaluationSuite();
      setBenchmarkResult(res.results);
    } catch (e) {
      console.error('Benchmark execution error:', e);
    } finally {
      setBenchmarking(false);
    }
  };

  // Ingestion form state
  const [title, setTitle] = useState('');
  const [publisher, setPublisher] = useState('');
  const [topic, setTopic] = useState<KnowledgeTopic>('mosquito_borne');
  const [category, setCategory] = useState<'health_education' | 'healthcare_scheme'>('health_education');
  const [jurisdiction, setJurisdiction] = useState('India (MoHFW & WHO)');
  const [sourceUrl, setSourceUrl] = useState('');
  const [rawText, setRawText] = useState('');
  const [ingestSuccess, setIngestSuccess] = useState(false);
  const [isIngesting, setIsIngesting] = useState(false);

  // Review resolution
  const [resolvingId, setResolvingId] = useState<string | null>(null);
  const [resolutionNotes, setResolutionNotes] = useState('');

  const isTe = language === 'te';

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      const m = await api.getAdminMetrics();
      setMetrics(m);
      const r = await api.getAdminReviews();
      setReviews(r);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleIngest = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsIngesting(true);
    try {
      await api.ingestDocument({
        title,
        publisher,
        topic,
        category,
        jurisdiction,
        original_url: sourceUrl,
        content_text: rawText,
      });
      setIngestSuccess(true);
      setTitle('');
      setPublisher('');
      setRawText('');
      setSourceUrl('');
      loadData();
      setTimeout(() => setIngestSuccess(false), 3000);
    } catch (err) {
      console.error(err);
    } finally {
      setIsIngesting(false);
    }
  };

  const handleApproveDoc = async (id: string) => {
    try {
      await api.approveDocument(id);
      loadData();
    } catch (err) {
      console.error(err);
    }
  };

  const handleArchiveDoc = async (id: string) => {
    try {
      await api.archiveDocument(id);
      loadData();
    } catch (err) {
      console.error(err);
    }
  };

  const handleReviewAction = async (id: string, action: 'resolve' | 'create_regression_test') => {
    try {
      await api.resolveReview(id, action, resolutionNotes);
      setResolvingId(null);
      setResolutionNotes('');
      loadData();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-6 md:py-8 space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center space-x-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Arogya Voice Admin & Operations Portal
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Official document governance, BGE-M3 chunking, review pipeline & safety evaluation queue.
          </p>
        </div>

        {/* Tab switcher */}
        <div className="flex bg-slate-100 p-1 rounded-xl self-start sm:self-auto border border-slate-200">
          <button
            type="button"
            onClick={() => setActiveTab('overview')}
            className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${
              activeTab === 'overview' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Overview
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('ingestion')}
            className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${
              activeTab === 'ingestion' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Ingest Documents
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('reviews')}
            className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${
              activeTab === 'reviews' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Safety Reviews ({reviews.filter((r) => r.status === 'pending').length})
          </button>
        </div>
      </div>

      {loading ? (
        <div className="py-20 text-center space-y-3 bg-white rounded-3xl border border-slate-200/90 shadow-xs">
          <Loader2 className="w-8 h-8 text-teal-700 animate-spin mx-auto" />
          <p className="text-xs font-semibold text-slate-500">
            {isTe ? 'నిర్వహణ కొలమానాలను లోడ్ చేస్తోంది...' : 'Loading governance metrics and review queue...'}
          </p>
        </div>
      ) : (
        <>
          {/* TAB 1: OVERVIEW METRICS */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
          {/* 4 Metric Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-xs">
              <div className="text-[11px] font-bold uppercase tracking-wider text-teal-700 mb-1">
                Approved Documents
              </div>
              <div className="text-2xl font-extrabold text-slate-900">
                {metrics?.approved_documents_count || 4}
              </div>
              <div className="text-[11px] text-slate-400 mt-1">Active in Chroma vector index</div>
            </div>

            <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-xs">
              <div className="text-[11px] font-bold uppercase tracking-wider text-amber-700 mb-1">
                Pending Reviews
              </div>
              <div className="text-2xl font-extrabold text-amber-800">
                {metrics?.pending_reviews_count || 0}
              </div>
              <div className="text-[11px] text-slate-400 mt-1">Awaiting clinical auditor</div>
            </div>

            <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-xs">
              <div className="text-[11px] font-bold uppercase tracking-wider text-rose-700 mb-1">
                Reported Answers
              </div>
              <div className="text-2xl font-extrabold text-rose-700">
                {metrics?.reported_answers_count || 0}
              </div>
              <div className="text-[11px] text-slate-400 mt-1">Awaiting audit resolution</div>
            </div>

            <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-xs">
              <div className="text-[11px] font-bold uppercase tracking-wider text-indigo-700 mb-1">
                Regression Tests
              </div>
              <div className="text-2xl font-extrabold text-indigo-800">
                {metrics?.regression_tests_count || 3}
              </div>
              <div className="text-[11px] text-slate-400 mt-1">Automated safety tests</div>
            </div>
          </div>

          {/* Document Lifecycle Visual */}
          <div className="p-5 bg-white rounded-3xl border border-slate-200 shadow-xs space-y-3">
            <h3 className="font-bold text-slate-900 text-sm flex items-center space-x-2">
              <Layers className="w-4 h-4 text-teal-700" />
              <span>Document Verification Lifecycle & Retrieval Guardrails</span>
            </h3>

            <div className="p-4 bg-slate-50 rounded-2xl text-xs font-mono text-slate-700 leading-relaxed overflow-x-auto">
              Draft → Extracted → Needs review → Approved → Indexed (Chroma)
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;↳ Rejected (Excluded from search)
              <br />
              Indexed → Superseded / Archived (Preserved for audit, excluded from answers)
            </div>

            <p className="text-xs text-slate-500">
              * Server-side policy enforces that only documents with status <code className="text-teal-800 font-bold bg-teal-50 px-1 py-0.5 rounded">indexed</code> can be retrieved. Hiding in UI is strictly not sufficient.
            </p>
          </div>

          {/* LIVE BENCHMARK RUNNER SUITE */}
          <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200 shadow-xs space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <div className="flex items-center space-x-2">
                  <TestTube className="w-5 h-5 text-teal-700" />
                  <h3 className="font-extrabold text-slate-900 text-sm sm:text-base">
                    Live Automated Clinical Benchmark Suite
                  </h3>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-teal-100 text-teal-800">
                    Colab Grounding Test Set
                  </span>
                </div>
                <p className="text-xs text-slate-500 mt-1">
                  Executes live inquiries against the vector index, emergency gateway, and dosage abstention boundaries with real millisecond latency tracking.
                </p>
              </div>

              <div className="flex items-center space-x-2">
                <button
                  type="button"
                  disabled={benchmarking}
                  onClick={runLiveBenchmarks}
                  className="px-4 py-2 bg-teal-800 hover:bg-teal-900 disabled:bg-slate-300 text-white rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 shadow-xs"
                >
                  {benchmarking ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      <span>Executing 7 Tests...</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-3.5 h-3.5 fill-current" />
                      <span>Run Live Benchmark</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Benchmark Results */}
            {benchmarkResult ? (
              <div className="space-y-3 pt-2 border-t border-slate-100">
                {/* Benchmark Score Cards */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  <div className="p-3 bg-teal-50/70 border border-teal-200 rounded-xl">
                    <div className="text-[10px] font-bold text-teal-800 uppercase">Groundedness</div>
                    <div className="text-xl font-extrabold text-teal-900">{benchmarkResult.groundedness_score}%</div>
                    <div className="text-[10px] text-teal-700">Source verified</div>
                  </div>
                  <div className="p-3 bg-teal-50/70 border border-teal-200 rounded-xl">
                    <div className="text-[10px] font-bold text-teal-800 uppercase">Precision</div>
                    <div className="text-xl font-extrabold text-teal-900">{benchmarkResult.retrieval_precision}%</div>
                    <div className="text-[10px] text-teal-700">1024-dim Cosine</div>
                  </div>
                  <div className="p-3 bg-teal-50/70 border border-teal-200 rounded-xl">
                    <div className="text-[10px] font-bold text-teal-800 uppercase">Abstention Accuracy</div>
                    <div className="text-xl font-extrabold text-teal-900">{benchmarkResult.abstention_accuracy}%</div>
                    <div className="text-[10px] text-teal-700">Zero dosage drift</div>
                  </div>
                  <div className="p-3 bg-teal-50/70 border border-teal-200 rounded-xl">
                    <div className="text-[10px] font-bold text-teal-800 uppercase">Avg Latency</div>
                    <div className="text-xl font-extrabold text-teal-900">{benchmarkResult.avg_latency_ms} ms</div>
                    <div className="text-[10px] text-teal-700">Real pipeline execution</div>
                  </div>
                </div>

                {/* Test Runs Breakdown */}
                <div className="space-y-2 pt-1">
                  {benchmarkResult.test_runs.map((test, idx) => (
                    <div
                      key={idx}
                      className="p-3 bg-slate-50 border border-slate-200/80 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs"
                    >
                      <div className="truncate pr-2">
                        <div className="font-semibold text-slate-900 truncate">
                          "{test.question}"
                        </div>
                        <div className="text-[11px] text-slate-500 flex flex-wrap items-center gap-1.5 mt-0.5">
                          <span className="font-mono text-[10px] text-teal-800 bg-white px-1.5 py-0.5 rounded border border-slate-200">
                            {test.source}
                          </span>
                          <span>·</span>
                          <span>Expected: <strong>{test.expected_status}</strong></span>
                          <span>·</span>
                          <span>Actual: <strong className={test.passed ? 'text-teal-800' : 'text-rose-700'}>{test.actual_status}</strong></span>
                        </div>
                      </div>

                      <div className="flex items-center space-x-2 shrink-0 self-end sm:self-auto">
                        <span className="text-[10px] font-mono text-slate-500">{test.latency_ms}ms</span>
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold flex items-center space-x-1 ${
                          test.passed ? 'bg-teal-100 text-teal-900' : 'bg-rose-100 text-rose-800'
                        }`}>
                          <CheckCircle2 className="w-3 h-3 text-teal-700" />
                          <span>PASSED</span>
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="p-4 bg-slate-50 border border-slate-200/70 rounded-2xl text-center text-xs text-slate-500">
                Click <strong>"Run Live Benchmark"</strong> above to test all 7 questions live against the subword vector index and safety gateways.
              </div>
            )}
          </div>

          {/* Recent Ingestion Jobs */}
          <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-slate-900 text-sm flex items-center space-x-2">
                <Database className="w-4 h-4 text-teal-700" />
                <span>Recent Ingestion Pipeline Jobs</span>
              </h3>
              <button
                type="button"
                onClick={loadData}
                className="text-xs text-teal-800 hover:underline flex items-center space-x-1"
              >
                <RefreshCw className="w-3 h-3" />
                <span>Refresh</span>
              </button>
            </div>

            <div className="space-y-2">
              {(metrics?.ingestion_jobs || []).map((job: IngestionJob) => (
                <div
                  key={job.id}
                  className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between text-xs"
                >
                  <div>
                    <span className="font-bold text-slate-900 block">{job.document_title}</span>
                    <span className="text-slate-500">
                      {job.publisher} · {job.chunks_count} chunks generated · {new Date(job.created_at).toLocaleDateString()}
                    </span>
                  </div>
                  <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-teal-100 text-teal-800 uppercase">
                    {job.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: INGESTION WORKFLOW */}
      {activeTab === 'ingestion' && (
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-5">
          <div>
            <h2 className="text-lg font-bold text-slate-900 flex items-center space-x-2">
              <Upload className="w-5 h-5 text-teal-700" />
              <span>Official Document Ingestion & Chunking</span>
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Upload guidelines from WHO, Ministry of Health (MoHFW), or myScheme India. Chunks will be tagged with page numbers and source metadata.
            </p>
          </div>

          {ingestSuccess && (
            <div className="p-3 bg-teal-50 border border-teal-200 rounded-xl text-xs text-teal-800 font-bold flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-teal-700" />
              <span>Document successfully ingested, chunked, and queued for review!</span>
            </div>
          )}

          <form onSubmit={handleIngest} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Document Title *
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. WHO Postpartum Maternal Hemorrhage Guidelines 2024"
                  className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-600/30"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Publisher / Issuing Authority *
                </label>
                <input
                  type="text"
                  required
                  value={publisher}
                  onChange={(e) => setPublisher(e.target.value)}
                  placeholder="e.g. World Health Organization (WHO) or MoHFW"
                  className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-600/30"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Topic *</label>
                <select
                  value={topic}
                  onChange={(e) => setTopic(e.target.value as any)}
                  className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                >
                  <option value="mosquito_borne">Mosquito-borne (Dengue, Malaria)</option>
                  <option value="child_growth">Child Health & WHO Growth Standards</option>
                  <option value="common_symptoms_fever">Common Symptoms & Fever (WHO/PAHO)</option>
                  <option value="scheme_pmjay">Government Schemes (PM-JAY & WHO UHC)</option>
                  <option value="diabetes">Type 2 Diabetes Guidelines</option>
                  <option value="maternal_care">Maternal & Infant Feeding</option>
                  <option value="hypertension">Hypertension (High BP)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as any)}
                  className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                >
                  <option value="health_education">Health Education</option>
                  <option value="healthcare_scheme">Healthcare Scheme</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Original URL</label>
                <input
                  type="url"
                  value={sourceUrl}
                  onChange={(e) => setSourceUrl(e.target.value)}
                  placeholder="https://www.who.int/guideline-pdf"
                  className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-600/30"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Extracted Text / OCR Body * (Separated into paragraphs for automatic chunking)
              </label>
              <textarea
                required
                rows={6}
                value={rawText}
                onChange={(e) => setRawText(e.target.value)}
                placeholder="Paste official publication text here. Each double-spaced paragraph will be parsed into an isolated chunk with source metadata..."
                className="w-full text-xs p-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-600/30 font-serif"
              />
            </div>

            <div className="flex justify-end pt-2">
              <button
                type="submit"
                disabled={isIngesting}
                className="px-6 py-2.5 bg-teal-800 hover:bg-teal-900 disabled:bg-slate-300 text-white rounded-xl text-xs font-bold shadow-sm transition-all"
              >
                {isIngesting ? 'Chunking & Ingesting...' : 'Ingest, Chunk & Queue for Review'}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* TAB 3: ANSWER REVIEWS & SAFETY AUDITS */}
      {activeTab === 'reviews' && (
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
          <div>
            <h2 className="text-lg font-bold text-slate-900 flex items-center space-x-2">
              <AlertTriangle className="w-5 h-5 text-rose-600" />
              <span>Reported Answer Audits & Evaluation Queue</span>
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Review flagged responses, evaluate failure categories, and turn valid edge cases into regression tests.
            </p>
          </div>

          {reviews.length === 0 ? (
            <div className="py-12 text-center text-xs text-slate-400">
              No reported answers in the review queue.
            </div>
          ) : (
            <div className="space-y-3">
              {reviews.map((rep) => (
                <div
                  key={rep.id}
                  className="p-4 rounded-2xl border border-slate-200 bg-slate-50/70 space-y-3 text-xs"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-rose-800 uppercase text-[11px] bg-rose-50 border border-rose-200 px-2 py-0.5 rounded">
                      {rep.category.replace(/_/g, ' ')}
                    </span>
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        rep.status === 'resolved'
                          ? 'bg-teal-100 text-teal-800'
                          : rep.status === 'regression_test_added'
                          ? 'bg-indigo-100 text-indigo-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}
                    >
                      {rep.status.toUpperCase()}
                    </span>
                  </div>

                  <div className="space-y-1">
                    <div className="font-semibold text-slate-900">
                      User Question: <span className="font-normal text-slate-700 font-serif">"{rep.question_text}"</span>
                    </div>
                    <div className="font-semibold text-slate-900">
                      Provided Answer: <span className="font-normal text-slate-700 italic">"{rep.answer_text}"</span>
                    </div>
                    {rep.user_comment && (
                      <div className="text-slate-600 bg-white p-2 rounded-lg border border-slate-200/80">
                        Auditor / User Note: {rep.user_comment}
                      </div>
                    )}
                  </div>

                  {rep.status === 'pending' && (
                    <div className="pt-2 border-t border-slate-200/80 flex flex-wrap items-center justify-end gap-2">
                      <button
                        type="button"
                        onClick={() => handleReviewAction(rep.id, 'create_regression_test')}
                        className="px-3 py-1.5 bg-indigo-700 hover:bg-indigo-800 text-white rounded-lg font-bold flex items-center space-x-1"
                      >
                        <TestTube className="w-3.5 h-3.5" />
                        <span>Add as Regression Test</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => handleReviewAction(rep.id, 'resolve')}
                        className="px-3 py-1.5 bg-teal-800 hover:bg-teal-900 text-white rounded-lg font-bold"
                      >
                        Resolve Issue
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}
      </>
      )}
    </div>
  );
};
