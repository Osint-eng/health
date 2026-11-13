export type Language = 'en' | 'te';

export type EvidenceStatus =
  | 'supported_by_reviewed_sources'
  | 'needs_clarification'
  | 'no_approved_source_found'
  | 'needs_professional'
  | 'urgent_help';

export interface Citation {
  source_id: string;
  document_title: string;
  publisher: string;
  publication_date: string;
  review_date: string;
  document_version_id: string;
  chunk_id: string;
  page_or_section: string;
  supporting_excerpt: string;
  original_url: string;
  is_translated?: boolean;
  similarity_score?: number; // e.g. 0.94 (94% cosine similarity)
  cosine_distance?: number;  // e.g. 0.06
}

export type EvidenceStrength = 'Strong' | 'Moderate' | 'Weak' | 'None';

export interface Message {
  id: string;
  conversation_id: string;
  role: 'user' | 'assistant';
  text: string;
  spoken_text?: string;
  language: Language;
  status: EvidenceStatus;
  evidence_strength?: EvidenceStrength;
  evidence_support_summary?: string;
  limitations?: string;
  consultation_recommendation?: string;
  missing_topics?: string[];
  citations: Citation[];
  detailed_explanation?: string;
  questions_to_ask_doctor?: string[];
  audio_status?: 'ready' | 'pending' | 'unavailable' | 'playing' | 'paused';
  created_at: string;
  is_urgent?: boolean;
  similarity_score?: number;
  retrieval_method?: string;
}

export interface Conversation {
  id: string;
  title: string;
  topic?: string;
  language: Language;
  created_at: string;
  updated_at: string;
  messages: Message[];
  is_guest: boolean;
}

export type KnowledgeTopic =
  | 'mosquito_borne'
  | 'child_growth'
  | 'common_symptoms_fever'
  | 'scheme_pmjay'
  | 'diabetes'
  | 'maternal_care'
  | 'hypertension';

export interface DocumentChunk {
  id: string;
  version_id: string;
  document_id: string;
  topic: KnowledgeTopic;
  language: Language;
  title: string;
  section: string;
  page: number;
  text: string;
  keywords: string[];
}

export interface DocumentSource {
  id: string;
  title: string;
  publisher: string;
  category: 'health_education' | 'healthcare_scheme';
  collection_name: 'approved_health_knowledge' | 'scheme_knowledge';
  topic: KnowledgeTopic;
  jurisdiction: string;
  original_url: string;
  language: Language;
  current_version: string;
  status: 'draft' | 'needs_review' | 'approved' | 'indexed' | 'archived';
  publication_date: string;
  review_date: string;
  reviewer_name: string;
  license_notes: string;
  summary: string;
  chunks: DocumentChunk[];
}

export type UserRole = 'patient' | 'asha_worker' | 'clinical_reviewer' | 'admin';

export interface EmergencyMedicalId {
  blood_group?: string;
  allergies?: string;
  chronic_conditions?: string;
  emergency_contact_name?: string;
  emergency_contact_phone?: string;
  abha_id?: string;
}

export interface UserProfile {
  id: string;
  name: string;
  email?: string;
  phone?: string;
  role: UserRole;
  badge: string;
  organization?: string;
  preferred_language: Language;
  avatar_color: string;
  medical_id?: EmergencyMedicalId;
  permissions: {
    can_ask: boolean;
    can_browse_library: boolean;
    can_submit_feedback: boolean;
    can_ingest_documents: boolean;
    can_approve_documents: boolean;
    can_resolve_reviews: boolean;
    can_run_evals: boolean;
  };
}

export interface UserPreferences {
  language: Language;
  playback_speed: number; // 0.75 | 1.0 | 1.25
  text_size: 'normal' | 'large' | 'extra_large';
  save_history: boolean;
  retain_audio: boolean;
  contribute_recordings: boolean;
  speech_engine?: 'piper_stream' | 'browser_native';
}

export interface FeedbackReport {
  id: string;
  message_id: string;
  question_text: string;
  answer_text: string;
  category:
    | 'wrong_retrieval'
    | 'unsupported_claim'
    | 'incorrect_translation'
    | 'speech_recognition_error'
    | 'unsafe_response'
    | 'outdated_source'
    | 'broken_citation';
  user_comment?: string;
  status: 'pending' | 'investigating' | 'resolved' | 'regression_test_added';
  created_at: string;
}

export interface IngestionJob {
  id: string;
  document_title: string;
  publisher: string;
  status: 'draft' | 'extracted' | 'needs_review' | 'approved' | 'indexed' | 'failed';
  chunks_count: number;
  error?: string;
  created_at: string;
}

export interface StackComponent {
  part: string;
  use: string;
  provider: string;
  link: string;
  role: string;
  status: 'active' | 'integrated' | 'ready';
}

export interface ToolEngineConfig {
  brain_provider: 'gemini' | 'ollama';
  hearing_provider: 'whisper' | 'browser' | 'webspeech';
  speaking_provider: 'piper' | 'browser';
  retrieval_store: 'chromadb';
  embeddings_engine: 'bge_m3';
  pipeline_orchestrator: 'pipecat';
  piper_voice: 'en_US-lessac-medium' | 'en_GB-alan-low' | 'te_IN-indic-v1';
  ollama_endpoint?: string;
  gemini_model?: string;
}

export interface EvaluationResult {
  total_tests: number;
  passed_tests: number;
  groundedness_score: number;
  retrieval_precision: number;
  abstention_accuracy: number;
  avg_latency_ms: number;
  completed_at: string;
  test_runs: Array<{
    question: string;
    expected_status: string;
    actual_status: string;
    passed: boolean;
    source: string;
    latency_ms: number;
  }>;
}
