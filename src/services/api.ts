import {
  Conversation,
  DocumentSource,
  FeedbackReport,
  Language,
  Message,
  UserPreferences,
} from '../types';

// Stored strictly in JS memory (never localStorage/sessionStorage)
let inMemorySessionToken: string | null = null;
let inMemoryAdminToken: string | null = null;

function buildHeaders(options: { json?: boolean; admin?: boolean } = {}): Record<string, string> {
  const headers: Record<string, string> = {};
  if (options.json) headers['Content-Type'] = 'application/json';
  if (inMemorySessionToken) headers['X-Session-Token'] = inMemorySessionToken;
  if (options.admin && inMemoryAdminToken) headers['Authorization'] = `Bearer ${inMemoryAdminToken}`;
  return headers;
}

async function apiFetch(url: string, init: RequestInit & { admin?: boolean; jsonBody?: unknown } = {}): Promise<Response> {
  const { admin = false, jsonBody, headers: extraHeaders, ...rest } = init;
  const headers: Record<string, string> = {
    ...buildHeaders({ json: jsonBody !== undefined, admin }),
    ...((extraHeaders as Record<string, string>) || {}),
  };
  const res = await fetch(url, {
    credentials: 'include',
    ...rest,
    headers,
    body: jsonBody !== undefined ? JSON.stringify(jsonBody) : rest.body,
  });
  if (res.status === 401) {
    const err = new Error('ADMIN_AUTH_REQUIRED');
    (err as any).status = 401;
    throw err;
  }
  return res;
}

export const api = {
  // Admin Auth (in-memory Bearer token)
  hasAdminToken(): boolean {
    return Boolean(inMemoryAdminToken);
  },

  logoutAdmin() {
    inMemoryAdminToken = null;
  },

  async getAdminAuthStatus(): Promise<{
    authenticated: boolean;
    configured_via_env: boolean;
    bootstrap_required: boolean;
  }> {
    const res = await fetch('/api/admin/auth/status', {
      credentials: 'include',
      headers: buildHeaders({ admin: true }),
    });
    if (!res.ok) throw new Error('Failed to check admin auth status');
    return res.json();
  },

  async loginAdmin(token: string): Promise<void> {
    const res = await fetch('/api/admin/auth/login', {
      method: 'POST',
      credentials: 'include',
      headers: buildHeaders({ json: true }),
      body: JSON.stringify({ token }),
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      throw new Error(data.error || 'Invalid ADMIN_TOKEN');
    }
    inMemoryAdminToken = data.admin_token;
  },

  async bootstrapAdmin(token: string): Promise<void> {
    const res = await fetch('/api/admin/auth/bootstrap', {
      method: 'POST',
      credentials: 'include',
      headers: buildHeaders({ json: true }),
      body: JSON.stringify({ token }),
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      throw new Error(data.error || 'Failed to claim initial admin credential');
    }
    inMemoryAdminToken = data.admin_token;
  },

  // User & Preferences (Session-scoped)
  async getMe(): Promise<{
    user_id: string;
    session_token?: string;
    is_guest: boolean;
    preferences: UserPreferences;
    processing_mode: string;
    audio_retention: string;
    conversation_history: string;
  }> {
    const res = await apiFetch('/api/me');
    if (!res.ok) throw new Error('Failed to load profile');
    const data = await res.json();
    if (data.session_token) inMemorySessionToken = data.session_token;
    return data;
  },

  async updatePreferences(updates: Partial<UserPreferences>): Promise<{ success: boolean; preferences: UserPreferences }> {
    const res = await apiFetch('/api/me/preferences', {
      method: 'PATCH',
      jsonBody: updates,
    });
    if (!res.ok) throw new Error('Failed to update preferences');
    const data = await res.json();
    if (data.session_token) inMemorySessionToken = data.session_token;
    return data;
  },

  // Conversations (Session-scoped)
  async createConversation(title?: string, topic?: string, language?: Language): Promise<Conversation> {
    const res = await apiFetch('/api/conversations', {
      method: 'POST',
      jsonBody: { title, topic, language },
    });
    if (!res.ok) throw new Error('Failed to create conversation');
    return res.json();
  },

  async getConversations(): Promise<Conversation[]> {
    const res = await apiFetch('/api/conversations');
    if (!res.ok) throw new Error('Failed to load conversations');
    return res.json();
  },

  async getConversation(id: string): Promise<Conversation> {
    const res = await apiFetch(`/api/conversations/${id}`);
    if (!res.ok) throw new Error('Conversation not found');
    return res.json();
  },

  async deleteConversation(id: string): Promise<{ success: boolean }> {
    const res = await apiFetch(`/api/conversations/${id}`, { method: 'DELETE' });
    if (!res.ok) throw new Error('Failed to delete conversation');
    return res.json();
  },

  async clearAllConversations(): Promise<{ success: boolean; message: string }> {
    const res = await apiFetch('/api/conversations', { method: 'DELETE' });
    if (!res.ok) throw new Error('Failed to clear conversations');
    return res.json();
  },

  // Messages & RAG Query
  async sendMessage(conversationId: string, text: string, language: Language): Promise<Message> {
    const res = await apiFetch(`/api/conversations/${conversationId}/messages`, {
      method: 'POST',
      jsonBody: { text, language },
    });
    if (!res.ok) throw new Error('Failed to process message');
    return res.json();
  },

  // Speech Output Metadata
  async getSpeechMetadata(messageId: string, speed: number, language: Language) {
    const res = await apiFetch(`/api/messages/${messageId}/speech`, {
      method: 'POST',
      jsonBody: { speed, language },
    });
    if (!res.ok) throw new Error('Failed to fetch speech metadata');
    return res.json();
  },

  // Feedback & Reporting
  async reportIssue(
    messageId: string,
    category: FeedbackReport['category'],
    userComment: string,
    questionText: string,
    answerText: string
  ): Promise<{ success: boolean; report: FeedbackReport }> {
    const res = await apiFetch(`/api/messages/${messageId}/feedback`, {
      method: 'POST',
      jsonBody: {
        category,
        user_comment: userComment,
        question_text: questionText,
        answer_text: answerText,
      },
    });
    if (!res.ok) throw new Error('Failed to submit report');
    return res.json();
  },

  // Health Library
  async getLibraryArticles(topic?: string, search?: string): Promise<DocumentSource[]> {
    const params = new URLSearchParams();
    if (topic && topic !== 'all') params.append('topic', topic);
    if (search) params.append('search', search);

    const res = await apiFetch(`/api/library?${params.toString()}`);
    if (!res.ok) throw new Error('Failed to load library articles');
    return res.json();
  },

  async getArticle(id: string): Promise<DocumentSource> {
    const res = await apiFetch(`/api/library/${id}`);
    if (!res.ok) throw new Error('Article not found');
    return res.json();
  },

  async getSource(id: string): Promise<DocumentSource> {
    const res = await apiFetch(`/api/sources/${id}`);
    if (!res.ok) throw new Error('Source document not found');
    return res.json();
  },

  // Emergency Contacts
  async getEmergencyContacts() {
    const res = await apiFetch('/api/emergency/contacts');
    if (!res.ok) throw new Error('Failed to load emergency contacts');
    return res.json();
  },

  // Admin Portal (Protected by ADMIN_TOKEN)
  async getAdminMetrics() {
    const res = await apiFetch('/api/admin/metrics', { admin: true });
    if (!res.ok) throw new Error('Failed to load admin metrics');
    return res.json();
  },

  async ingestDocument(doc: {
    title: string;
    publisher: string;
    category: string;
    topic: string;
    jurisdiction?: string;
    original_url?: string;
    content_text: string;
  }) {
    const res = await apiFetch('/api/admin/documents', {
      method: 'POST',
      admin: true,
      jsonBody: doc,
    });
    if (!res.ok) throw new Error('Failed to ingest document');
    return res.json();
  },

  async approveDocument(id: string, reviewerName?: string) {
    const res = await apiFetch(`/api/admin/document-versions/${id}/approve`, {
      method: 'POST',
      admin: true,
      jsonBody: reviewerName ? { reviewer_name: reviewerName } : {},
    });
    if (!res.ok) throw new Error('Failed to approve document');
    return res.json();
  },

  async archiveDocument(id: string) {
    const res = await apiFetch(`/api/admin/document-versions/${id}/archive`, {
      method: 'POST',
      admin: true,
    });
    if (!res.ok) throw new Error('Failed to archive document');
    return res.json();
  },

  async getAdminReviews(): Promise<FeedbackReport[]> {
    const res = await apiFetch('/api/admin/reviews', { admin: true });
    if (!res.ok) throw new Error('Failed to load reviews');
    return res.json();
  },

  async resolveReview(id: string, action: 'resolve' | 'create_regression_test', resolutionNotes?: string) {
    const res = await apiFetch(`/api/admin/reviews/${id}/action`, {
      method: 'POST',
      admin: true,
      jsonBody: { action, resolution_notes: resolutionNotes },
    });
    if (!res.ok) throw new Error('Failed to update review');
    return res.json();
  },

  // Interactive Tools Workbench API
  async getSystemStack() {
    const res = await apiFetch('/api/system/stack');
    if (!res.ok) throw new Error('Failed to load system stack');
    return res.json();
  },

  async getToolConfig() {
    const res = await apiFetch('/api/tools/config', { admin: true });
    if (!res.ok) throw new Error('Failed to load tool config');
    return res.json();
  },

  async updateToolConfig(updates: any) {
    const res = await apiFetch('/api/tools/config', {
      method: 'PATCH',
      admin: true,
      jsonBody: updates,
    });
    if (!res.ok) throw new Error('Failed to update tool config');
    return res.json();
  },

  async queryChroma(query: string, collection: string = 'all', top_k: number = 4) {
    const res = await apiFetch('/api/tools/chroma/query', {
      method: 'POST',
      jsonBody: { query, collection, top_k },
    });
    if (!res.ok) throw new Error('Failed to query ChromaDB');
    return res.json();
  },

  async embedBgeM3(text: string, language: string = 'en') {
    const res = await apiFetch('/api/tools/bge-m3/embed', {
      method: 'POST',
      jsonBody: { text, language },
    });
    if (!res.ok) throw new Error('Failed to run BGE-M3 embedder');
    return res.json();
  },

  async testWhisper(sampleInput?: string, language: string = 'en') {
    const res = await apiFetch('/api/tools/whisper/transcribe', {
      method: 'POST',
      jsonBody: { sample_input: sampleInput, language },
    });
    if (!res.ok) throw new Error('Failed to run Whisper ASR');
    return res.json();
  },

  async synthesizePiper(text: string, voice?: string, speed?: number) {
    const res = await apiFetch('/api/tools/piper/synthesize', {
      method: 'POST',
      jsonBody: { text, voice, speed },
    });
    if (!res.ok) throw new Error('Failed to synthesize with Piper');
    return res.json();
  },

  async testPipecatSession() {
    const res = await apiFetch('/api/tools/pipecat/session', {
      method: 'POST',
    });
    if (!res.ok) throw new Error('Failed to start Pipecat session');
    return res.json();
  },

  async runEvaluationSuite() {
    const res = await apiFetch('/api/tools/eval/run', {
      method: 'POST',
    });
    if (!res.ok) throw new Error('Failed to run evaluation suite');
    return res.json();
  },

  async resetDemoData(): Promise<{ success: boolean; message: string; active_documents: number; conversations_count: number }> {
    const res = await apiFetch('/api/demo/reset', {
      method: 'POST',
      admin: true,
    });
    if (!res.ok) throw new Error('Failed to reset demo data');
    return res.json();
  },
};

