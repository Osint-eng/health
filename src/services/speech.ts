import { Language } from '../types';

export class SpeechRecognitionService {
  private recognition: any = null;
  private isListening = false;

  constructor() {
    if (typeof window !== 'undefined') {
      const SpeechRecognition =
        (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (SpeechRecognition) {
        this.recognition = new SpeechRecognition();
        this.recognition.continuous = false;
        this.recognition.interimResults = true;
      }
    }
  }

  public isSupported(): boolean {
    return this.recognition !== null;
  }

  public startListening(
    language: Language,
    onResult: (transcript: string, isFinal: boolean) => void,
    onError: (err: string) => void,
    onEnd: () => void
  ) {
    if (!this.recognition) {
      onError('Speech recognition is not supported in this browser. You can type your question directly.');
      return;
    }

    try {
      this.recognition.lang = language === 'te' ? 'te-IN' : 'en-IN';
      this.isListening = true;

      this.recognition.onresult = (event: any) => {
        let interim = '';
        let final = '';
        for (let i = event.resultIndex; i < event.results.length; ++i) {
          if (event.results[i].isFinal) {
            final += event.results[i][0].transcript;
          } else {
            interim += event.results[i][0].transcript;
          }
        }
        onResult(final || interim, Boolean(final));
      };

      this.recognition.onerror = (event: any) => {
        this.isListening = false;
        if (event.error === 'no-speech') {
          onError('No speech was detected. Please tap the microphone and speak again.');
        } else if (event.error === 'not-allowed') {
          onError('Microphone access was denied. Please allow microphone permission in your browser.');
        } else {
          onError(`Speech recognition notice: ${event.error}`);
        }
      };

      this.recognition.onend = () => {
        this.isListening = false;
        onEnd();
      };

      this.recognition.start();
    } catch (err: any) {
      this.isListening = false;
      onError(err.message || 'Failed to start speech recognition');
    }
  }

  public stopListening() {
    if (this.recognition && this.isListening) {
      try {
        this.recognition.stop();
      } catch (e) {
        // ignore
      }
      this.isListening = false;
    }
  }
}

export interface SpeechErrorInfo {
  code?: 'NO_TELUGU_VOICE' | 'UNSUPPORTED' | 'SYNTHESIS_ERROR';
  message: string;
}

export function splitTextIntoSpeakableSentences(text: string, maxChunkLength = 160): string[] {
  const cleaned = text.replace(/\s+/g, ' ').trim();
  if (!cleaned) return [];

  // Split by English & Indic sentence terminators
  const rawSentences = cleaned.split(/(?<=[.!?।॥])\s+/).filter(Boolean);
  const chunks: string[] = [];

  for (const sentence of rawSentences) {
    if (sentence.length <= maxChunkLength) {
      chunks.push(sentence);
      continue;
    }
    // Split overly long sentences at clause boundaries or word boundaries
    const clauses = sentence.split(/(?<=[,;:\u2014-])\s+/);
    let buffer = '';
    for (const clause of clauses) {
      if (clause.length > maxChunkLength) {
        if (buffer) {
          chunks.push(buffer.trim());
          buffer = '';
        }
        const words = clause.split(/\s+/);
        let wordBuf = '';
        for (const w of words) {
          if ((wordBuf + ' ' + w).trim().length > maxChunkLength && wordBuf) {
            chunks.push(wordBuf.trim());
            wordBuf = w;
          } else {
            wordBuf = (wordBuf + ' ' + w).trim();
          }
        }
        if (wordBuf) chunks.push(wordBuf.trim());
      } else if ((buffer + ' ' + clause).trim().length > maxChunkLength && buffer) {
        chunks.push(buffer.trim());
        buffer = clause;
      } else {
        buffer = (buffer + ' ' + clause).trim();
      }
    }
    if (buffer) chunks.push(buffer.trim());
  }

  return chunks;
}

export class SpeechSynthesisService {
  private synth: SpeechSynthesis | null = null;
  private voices: SpeechSynthesisVoice[] = [];
  private voicesLoaded = false;
  private voiceWaiters: Array<(voices: SpeechSynthesisVoice[]) => void> = [];
  private currentUtterance: SpeechSynthesisUtterance | null = null;
  private playbackRunId = 0;

  constructor() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      this.synth = window.speechSynthesis;
      this.refreshVoices();
      if (typeof this.synth.addEventListener === 'function') {
        this.synth.addEventListener('voiceschanged', this.handleVoicesChanged);
      } else {
        this.synth.onvoiceschanged = this.handleVoicesChanged;
      }
    }
  }

  private handleVoicesChanged = () => {
    this.refreshVoices();
  };

  private refreshVoices() {
    if (!this.synth) return;
    const loaded = this.synth.getVoices();
    if (loaded && loaded.length > 0) {
      this.voices = loaded;
      this.voicesLoaded = true;
      const waiters = this.voiceWaiters.splice(0, this.voiceWaiters.length);
      for (const resolve of waiters) {
        resolve(this.voices);
      }
    }
  }

  private async waitForVoices(timeoutMs = 700): Promise<SpeechSynthesisVoice[]> {
    if (!this.synth) return [];
    this.refreshVoices();
    if (this.voicesLoaded && this.voices.length > 0) {
      return this.voices;
    }
    return new Promise((resolve) => {
      let settled = false;
      const timer = setTimeout(() => {
        if (settled) return;
        settled = true;
        const idx = this.voiceWaiters.indexOf(onVoices);
        if (idx >= 0) this.voiceWaiters.splice(idx, 1);
        this.refreshVoices();
        resolve(this.voices);
      }, timeoutMs);

      const onVoices = (voices: SpeechSynthesisVoice[]) => {
        if (settled) return;
        settled = true;
        clearTimeout(timer);
        resolve(voices);
      };

      this.voiceWaiters.push(onVoices);
    });
  }

  private pickVoice(language: Language, voices: SpeechSynthesisVoice[]): SpeechSynthesisVoice | undefined {
    if (language === 'te') {
      return voices.find(
        (v) =>
          v.lang.toLowerCase().startsWith('te') ||
          v.name.toLowerCase().includes('telugu')
      );
    }
    return (
      voices.find((v) => v.lang.toLowerCase().startsWith('en-in')) ||
      voices.find((v) => v.lang.toLowerCase().startsWith('en-gb')) ||
      voices.find((v) => v.lang.toLowerCase().startsWith('en'))
    );
  }

  public isSupported(): boolean {
    return this.synth !== null;
  }

  public hasVoiceForLanguage(language: Language): boolean {
    this.refreshVoices();
    return Boolean(this.pickVoice(language, this.voices));
  }

  public async speak(
    text: string,
    language: Language,
    speed: number = 1.0,
    onStart?: () => void,
    onEnd?: () => void,
    onError?: (err: SpeechErrorInfo | any) => void
  ) {
    if (!this.synth) {
      if (onError) {
        onError({
          code: 'UNSUPPORTED',
          message: 'Speech synthesis is not supported in this browser. Showing text-only response.',
        });
      }
      return;
    }

    // Cancel any previous playback run cleanly
    this.stop();
    const runId = ++this.playbackRunId;

    if (this.synth.paused) {
      this.synth.resume();
    }

    const voices = await this.waitForVoices();
    if (runId !== this.playbackRunId) return;

    const matchingVoice = this.pickVoice(language, voices);

    // Many desktop browsers have no Telugu system voice; avoid silent failure
    if (language === 'te' && !matchingVoice) {
      if (onError) {
        onError({
          code: 'NO_TELUGU_VOICE',
          message:
            'ఈ బ్రౌజర్‌లో తెలుగు వాయిస్ అందుబాటులో లేదు — సమాధానం టెక్స్ట్ రూపంలో చూపబడింది. (No Telugu speech voice is installed on this browser — displaying text-only.)',
        });
      }
      return;
    }

    const chunks = splitTextIntoSpeakableSentences(text, 160);
    if (chunks.length === 0) {
      if (onEnd) onEnd();
      return;
    }

    let started = false;

    const speakChunk = (index: number) => {
      if (!this.synth || runId !== this.playbackRunId) return;
      if (index >= chunks.length) {
        this.currentUtterance = null;
        if (onEnd) onEnd();
        return;
      }

      const utterance = new SpeechSynthesisUtterance(chunks[index]);
      utterance.rate = speed;
      utterance.pitch = 1.0;
      utterance.lang = language === 'te' ? 'te-IN' : 'en-IN';
      if (matchingVoice) {
        utterance.voice = matchingVoice;
      }

      utterance.onstart = () => {
        if (runId !== this.playbackRunId) return;
        if (!started) {
          started = true;
          if (onStart) onStart();
        }
      };

      utterance.onend = () => {
        if (runId !== this.playbackRunId) return;
        speakChunk(index + 1);
      };

      utterance.onerror = (e: any) => {
        if (runId !== this.playbackRunId) return;
        this.currentUtterance = null;
        // Ignore expected 'interrupted'/'canceled' from user stop()
        if (e?.error === 'interrupted' || e?.error === 'canceled') {
          if (onEnd) onEnd();
          return;
        }
        if (onError) {
          onError({
            code: 'SYNTHESIS_ERROR',
            message: `Browser speech playback unavailable (${e?.error || 'error'}). Text response remains visible.`,
          });
        }
      };

      this.currentUtterance = utterance;
      this.synth.speak(utterance);
    };

    speakChunk(0);
  }

  public pause() {
    if (this.synth && this.synth.speaking) {
      this.synth.pause();
    }
  }

  public resume() {
    if (this.synth && this.synth.paused) {
      this.synth.resume();
    }
  }

  public stop() {
    this.playbackRunId++;
    if (this.synth) {
      this.synth.cancel();
      this.currentUtterance = null;
    }
  }
}

export const speechRecognizer = new SpeechRecognitionService();
export const speechSynthesizer = new SpeechSynthesisService();
