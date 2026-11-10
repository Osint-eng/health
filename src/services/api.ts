import {
  Conversation,
  DocumentSource,
  FeedbackReport,
  Language,
  Message,
  UserPreferences,
} from '../types';

export const api = {
  // User & Preferences
  async getMe(): Promise<{
    user_id: string;
    is_guest: boolean;
    preferences: UserPreferences;
    processing_mode: string;
    audio_retention: string;
    conversation_history: string;
  }> {
    const res = await fetch('/api/me');
    if (!res.ok) throw new Error('Failed to load profile');
    return res.json();
  },

  async updatePreferences(updates: Partial<UserPreferences>): Promise<{ success: boolean; preferences: UserPreferences }> {
    const res = await fetch('/api/me/preferences', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updates),
    });
    if (!res.ok) throw new Error('Failed to update preferences');
    return res.json();
  },

  // Conversations
  async createConversation(title?: string, topic?: string, language?: Language): Promise<Conversation> {
    const res = await fetch('/api/conversations', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, topic, language }),
    });
    if (!res.ok) throw new Error('Failed to create conversation');
    return res.json();
  },

  async getConversations(): Promise<Conversation[]> {
    const res = await fetch('/api/conversations');
    if (!res.ok) throw new Error('Failed to load conversations');
    return res.json();
  },

  async getConversation(id: string): Promise<Conversation> {
    const res = await fetch(`/api/conversations/${id}`);
    if (!res.ok) throw new Error('Conversation not found');
    return res.json();
  },

  async deleteConversation(id: string): Promise<{ success: boolean }> {
    const res = await fetch(`/api/conversations/${id}`, { method: 'DELETE' });
    if (!res.ok) throw new Error('Failed to delete conversation');
    return res.json();
  },

  async clearAllConversations(): Promise<{ success: boolean; message: string }> {
    const res = await fetch('/api/conversations', { method: 'DELETE' });
    if (!res.ok) throw new Error('Failed to clear conversations');
    return res.json();
  },

  // Messages & RAG Query
  async sendMessage(conversationId: string, text: string, language: Language): Promise<Message> {
    const res = await fetch(`/api/conversations/${conversationId}/messages`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text, language }),
    });
    if (!res.ok) throw new Error('Failed to process message');
    return res.json();
  },

  // Speech Output Metadata
  async getSpeechMetadata(messageId: string, speed: number, language: Language) {
    const res = await fetch(`/api/messages/${messageId}/speech`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ speed, language }),
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
    const res = await fetch(`/api/messages/${messageId}/feedback`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        category,
        user_comment: userComment,
        question_text: questionText,
        answer_text: answerText,
      }),
    });
    if (!res.ok) throw new Error('Failed to submit report');
    return res.json();
  },

  // Health Library
  async getLibraryArticles(topic?: string, search?: string): Promise<DocumentSource[]> {
    const params = new URLSearchParams();
    if (topic && topic !== 'all') params.append('topic', topic);
    if (search) params.append('search', search);

    const res = await fetch(`/api/library?${params.toString()}`);
    if (!res.ok) throw new Error('Failed to load library articles');
    return res.json();
  },

  async getArticle(id: string): Promise<DocumentSource> {
    const res = await fetch(`/api/library/${id}`);
    if (!res.ok) throw new Error('Article not found');
    return res.json();
  },

  async getSource(id: string): Promise<DocumentSource> {
    const res = await fetch(`/api/sources/${id}`);
    if (!res.ok) throw new Error('Source document not found');
    return res.json();
  },

  // Emergency Contacts
  async getEmergencyContacts() {
    const res = await fetch('/api/emergency/contacts');
    if (!res.ok) throw new Error('Failed to load emergency contacts');
    return res.json();
  },

  // Admin Portal
  async getAdminMetrics() {
    const res = await fetch('/api/admin/metrics');
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
    const res = await fetch('/api/admin/documents', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(doc),
    });
    if (!res.ok) throw new Error('Failed to ingest document');
    return res.json();
  },

  async approveDocument(id: string) {
    const res = await fetch(`/api/admin/document-versions/${id}/approve`, { method: 'POST' });
    if (!res.ok) throw new Error('Failed to approve document');
    return res.json();
  },

  async archiveDocument(id: string) {
    const res = await fetch(`/api/admin/document-versions/${id}/archive`, { method: 'POST' });
    if (!res.ok) throw new Error('Failed to archive document');
    return res.json();
  },

  async getAdminReviews(): Promise<FeedbackReport[]> {
    const res = await fetch('/api/admin/reviews');
    if (!res.ok) throw new Error('Failed to load reviews');
    return res.json();
  },

  async resolveReview(id: string, action: 'resolve' | 'create_regression_test', resolutionNotes?: string) {
    const res = await fetch(`/api/admin/reviews/${id}/action`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action, resolution_notes: resolutionNotes }),
    });
    if (!res.ok) throw new Error('Failed to update review');
    return res.json();
  },

  // Interactive Tools Workbench API
  async getSystemStack() {
    const res = await fetch('/api/system/stack');
    if (!res.ok) throw new Error('Failed to load system stack');
    return res.json();
  },

  async getToolConfig() {
    const res = await fetch('/api/tools/config');
    if (!res.ok) throw new Error('Failed to load tool config');
    return res.json();
  },

  async updateToolConfig(updates: any) {
    const res = await fetch('/api/tools/config', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updates),
    });
    if (!res.ok) throw new Error('Failed to update tool config');
    return res.json();
  },

  async queryChroma(query: string, collection: string = 'all', top_k: number = 4) {
    const res = await fetch('/api/tools/chroma/query', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query, collection, top_k }),
    });
    if (!res.ok) throw new Error('Failed to query ChromaDB');
    return res.json();
  },

  async embedBgeM3(text: string, language: string = 'en') {
    const res = await fetch('/api/tools/bge-m3/embed', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text, language }),
    });
    if (!res.ok) throw new Error('Failed to run BGE-M3 embedder');
    return res.json();
  },

  async testWhisper(sampleInput?: string, language: string = 'en') {
    const res = await fetch('/api/tools/whisper/transcribe', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ sample_input: sampleInput, language }),
    });
    if (!res.ok) throw new Error('Failed to run Whisper ASR');
    return res.json();
  },

  async synthesizePiper(text: string, voice?: string, speed?: number) {
    const res = await fetch('/api/tools/piper/synthesize', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text, voice, speed }),
    });
    if (!res.ok) throw new Error('Failed to synthesize with Piper');
    return res.json();
  },

  async testPipecatSession() {
    const res = await fetch('/api/tools/pipecat/session', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    });
    if (!res.ok) throw new Error('Failed to start Pipecat session');
    return res.json();
  },

  async runEvaluationSuite() {
    const res = await fetch('/api/tools/eval/run', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    });
    if (!res.ok) throw new Error('Failed to run evaluation suite');
    return res.json();
  },
};

