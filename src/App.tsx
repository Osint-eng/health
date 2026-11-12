import React, { useState, useEffect } from 'react';
import { Conversation, DocumentSource, Language, UserPreferences, UserProfile } from './types';
import { DEFAULT_USER } from './data/demoPersonas';
import { api } from './services/api';
import { AppHeader } from './components/AppHeader';
import { EmergencyHelpBanner } from './components/EmergencyHelpBanner';
import { Navigation, NavTab } from './components/Navigation';
import { HomePage } from './pages/HomePage';
import { AskPage } from './pages/AskPage';
import { LibraryPage } from './pages/LibraryPage';
import { HistoryPage } from './pages/HistoryPage';
import { SettingsPage } from './pages/SettingsPage';
import { UrgentHelpPage } from './pages/UrgentHelpPage';
import { AdminPage } from './pages/AdminPage';
import { OnboardingModal } from './components/OnboardingModal';
import { AuthModal } from './components/AuthModal';

export default function App() {
  const [currentTab, setCurrentTab] = useState<NavTab>('home');
  const [language, setLanguage] = useState<Language>('en');
  const [currentUser, setCurrentUser] = useState<UserProfile>(() => {
    try {
      const saved = localStorage.getItem('arogya_user_profile');
      return saved ? JSON.parse(saved) : DEFAULT_USER;
    } catch {
      return DEFAULT_USER;
    }
  });

  const [preferences, setPreferences] = useState<UserPreferences>({
    language: 'en',
    playback_speed: 1.0,
    text_size: 'normal',
    save_history: true,
    retain_audio: false,
    contribute_recordings: false,
  });

  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [currentConversation, setCurrentConversation] = useState<Conversation | null>(null);

  // Initial query / auto-voice flag for transitioning to AskPage
  const [initialAskQuery, setInitialAskQuery] = useState('');
  const [autoRecordVoice, setAutoRecordVoice] = useState(false);

  // Modal triggers
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);

  // Initialize app state
  useEffect(() => {
    // Check if onboarding was completed
    const onboarded = localStorage.getItem('arogya_onboarded_v1');
    if (!onboarded) {
      setShowOnboarding(true);
    }

    loadInitialData();
  }, []);

  const loadInitialData = async () => {
    try {
      const me = await api.getMe();
      if (me.preferences) {
        setPreferences(me.preferences);
        setLanguage(me.preferences.language);
      }
      const convList = await api.getConversations();
      setConversations(convList);
    } catch (err) {
      console.warn('Initial load fallback:', err);
    }
  };

  const handleLanguageChange = (newLang: Language) => {
    setLanguage(newLang);
    setPreferences((prev) => ({ ...prev, language: newLang }));
    api.updatePreferences({ language: newLang }).catch(console.error);
  };

  const handleNewConversation = async (title?: string) => {
    try {
      const conv = await api.createConversation(title, 'general', language);
      setConversations((prev) => [conv, ...prev]);
      setCurrentConversation(conv);
      setCurrentTab('ask');
      setInitialAskQuery('');
      setAutoRecordVoice(false);
    } catch (err) {
      console.error(err);
    }
  };

  const handleStartVoice = () => {
    setInitialAskQuery('');
    setAutoRecordVoice(true);
    setCurrentTab('ask');
  };

  const handleStartText = () => {
    setInitialAskQuery('');
    setAutoRecordVoice(false);
    setCurrentTab('ask');
  };

  const handleSelectTopic = (topic: string, sampleQuery?: string) => {
    setInitialAskQuery(sampleQuery || '');
    setAutoRecordVoice(false);
    setCurrentTab('ask');
  };

  const handleAskAboutArticle = (article: DocumentSource) => {
    const prompt =
      language === 'te'
        ? `${article.title} ఆధారంగా ముఖ్య నిబంధనలు మరియు ప్రయోజనాలను వివరించండి.`
        : `Based on ${article.title}, explain the key guidelines and benefits.`;
    setInitialAskQuery(prompt);
    setAutoRecordVoice(false);
    setCurrentTab('ask');
  };

  const handleOpenConversation = (conv: Conversation) => {
    setCurrentConversation(conv);
    setInitialAskQuery('');
    setAutoRecordVoice(false);
    setCurrentTab('ask');
  };

  const handleSelectPersona = (persona: UserProfile) => {
    setCurrentUser(persona);
    setLanguage(persona.preferred_language);
    try {
      localStorage.setItem('arogya_user_profile', JSON.stringify(persona));
    } catch {}
  };

  const handleResetDemoData = async () => {
    try {
      await api.resetDemoData();
      const convList = await api.getConversations();
      setConversations(convList);
      if (convList.length > 0) {
        setCurrentConversation(convList[0]);
      }
      setCurrentTab('ask');
    } catch (e) {
      console.error('Failed to reset demo store:', e);
    }
  };

  const handleClearAllData = async () => {
    try {
      await api.clearAllConversations();
      setConversations([]);
      setCurrentConversation(null);
      setCurrentTab('home');
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8faf9] text-[#132a29] flex flex-col font-sans selection:bg-teal-700 selection:text-white">
      {/* 1. Persistent Top Emergency Banner */}
      <EmergencyHelpBanner
        language={language}
        onNavigateUrgentPage={() => setCurrentTab('urgent')}
      />

      {/* Main Layout Container with Sidebar and Content */}
      <div className="flex flex-1 relative">
        {/* Desktop Left Sidebar & Mobile Bottom Navigation */}
        <Navigation
          currentTab={currentTab}
          language={language}
          onSelectTab={(tab) => {
            setCurrentTab(tab);
            setAutoRecordVoice(false);
            if (tab === 'ask' && !currentConversation) {
              handleNewConversation();
            }
          }}
        />

        {/* Primary Content View Area */}
        <main className="flex-1 flex flex-col min-w-0 pb-16 md:pb-6">
          {/* Top Application Header */}
          <AppHeader
            language={language}
            onLanguageChange={handleLanguageChange}
            onOpenUrgent={() => setCurrentTab('urgent')}
            onOpenAuth={() => setShowAuthModal(true)}
            currentUser={currentUser}
            onResetDemoData={handleResetDemoData}
          />

          {/* Active Screen Routing */}
          <div className="flex-1">
            {currentTab === 'home' && (
              <HomePage
                language={language}
                recentConversations={conversations}
                onStartVoice={handleStartVoice}
                onStartText={handleStartText}
                onSelectTopic={handleSelectTopic}
                onOpenConversation={handleOpenConversation}
                onOpenUrgent={() => setCurrentTab('urgent')}
                onOpenLibrary={() => setCurrentTab('library')}
              />
            )}

            {currentTab === 'ask' && (
              <AskPage
                currentConversation={currentConversation}
                language={language}
                onLanguageChange={handleLanguageChange}
                onNewConversation={() => handleNewConversation()}
                onUpdateConversation={(updated) => {
                  setCurrentConversation(updated);
                  setConversations((prev) => {
                    const idx = prev.findIndex((c) => c.id === updated.id);
                    if (idx >= 0) {
                      const next = [...prev];
                      next[idx] = updated;
                      return next;
                    }
                    return [updated, ...prev];
                  });
                }}
                initialQuery={initialAskQuery}
                autoRecord={autoRecordVoice}
              />
            )}

            {currentTab === 'library' && (
              <LibraryPage
                language={language}
                onAskAboutArticle={handleAskAboutArticle}
              />
            )}

            {currentTab === 'history' && (
              <HistoryPage
                language={language}
                onOpenConversation={handleOpenConversation}
                onNewConversation={() => handleNewConversation()}
              />
            )}

            {currentTab === 'settings' && (
              <SettingsPage
                preferences={preferences}
                onUpdatePreferences={(updates) => {
                  setPreferences((p) => ({ ...p, ...updates }));
                  if (updates.language) setLanguage(updates.language);
                }}
                onClearAllData={handleClearAllData}
                onResetDemoData={handleResetDemoData}
              />
            )}

            {currentTab === 'urgent' && (
              <UrgentHelpPage
                language={language}
                onBack={() => setCurrentTab('home')}
              />
            )}

            {currentTab === 'admin' && (
              <AdminPage language={language} onResetDemoData={handleResetDemoData} />
            )}
          </div>
        </main>
      </div>

      {/* Onboarding Modal */}
      {showOnboarding && (
        <OnboardingModal
          preferences={preferences}
          onSavePreferences={(prefs) => {
            setPreferences((p) => ({ ...p, ...prefs }));
            if (prefs.language) setLanguage(prefs.language);
            api.updatePreferences(prefs).catch(console.error);
          }}
          onComplete={() => {
            localStorage.setItem('arogya_onboarded_v1', 'true');
            setShowOnboarding(false);
          }}
        />
      )}

      {/* Authentication / Persona Switching Dialog */}
      {showAuthModal && (
        <AuthModal
          language={language}
          currentUser={currentUser}
          onClose={() => setShowAuthModal(false)}
          onSelectPersona={handleSelectPersona}
          onResetDemoData={handleResetDemoData}
        />
      )}
    </div>
  );
}
