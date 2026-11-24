import { StackComponent } from '../types';

export const HACKATHON_INFO = {
  name: 'Code for Humanity Hackathon',
  description: 'AI-driven solutions addressing critical public health, emergency access, and healthcare equity.',
  rulesLink: 'https://code-for-humanity.devpost.com/',
  submissionPlatform: 'Devpost',
  badgeText: 'Code for Humanity Track',
};

export const STACK_COMPONENTS: StackComponent[] = [
  {
    part: 'Hackathon Track',
    use: 'Rules & Submission Verification',
    provider: 'Devpost (Code for Humanity)',
    link: 'https://code-for-humanity.devpost.com/',
    role: 'Hackathon evaluation guidelines, judging criteria, and public health impact scope.',
    status: 'active',
  },
  {
    part: 'Brain (Live Cloud LLM + Gateways)',
    use: 'Evidence-Validated Grounded Synthesis',
    provider: 'Gemini 4 Hydrogen (gemini-4-hydrogen)',
    link: 'https://aistudio.google.com',
    role: 'Live cloud generation strictly bounded to retrieved excerpts with pre-answer evidence calibration, abortable timeouts, and post-answer grounding checks.',
    status: 'active',
  },
  {
    part: 'Retrieval Engine (In-Memory)',
    use: 'Hybrid Subword + Synonym Lexical Cosine Index',
    provider: 'In-Memory Subword Hashing + Bilingual Synonym Index',
    link: 'https://aistudio.google.com',
    role: 'Live in-memory subword hashing cosine similarity + English/Telugu synonym expansion + whole-word concept coverage isolating approved WHO/PAHO and PM-JAY collections.',
    status: 'active',
  },
  {
    part: 'Hearing (ASR)',
    use: 'Speech-to-Text Transcription',
    provider: 'Browser Web Speech API + Gemini 3.5 Transcribe',
    link: 'https://aistudio.google.com',
    role: 'Live browser SpeechRecognition with waveform & transcript review, plus Gemini audio transcription (/api/speech/transcribe) when audio payloads are submitted.',
    status: 'active',
  },
  {
    part: 'Speaking (TTS)',
    use: 'Spoken Answer Synthesis',
    provider: 'Browser SpeechSynthesis + Gemini 3.8 Flash Lite TTS',
    link: 'https://aistudio.google.com',
    role: 'Native sentence-chunked browser SpeechSynthesis with optional server-side Gemini TTS WAV playback (/api/speech/synthesize).',
    status: 'active',
  },
  {
    part: 'Brain (Optional Local Adapter)',
    use: 'Local Ollama HTTP Chat Target',
    provider: 'Ollama Local HTTP Adapter',
    link: 'https://ollama.com',
    role: 'Switchable brain_provider option that calls a local Ollama /api/chat endpoint when configured and running locally.',
    status: 'ready',
  },
  {
    part: 'Evaluation Benchmark',
    use: 'Automated Safety & Grounding Suite',
    provider: 'Live 10-Probe Pipeline Benchmark (/api/tools/eval/run)',
    link: 'https://aistudio.google.com',
    role: 'Live runner executing 10 English & Telugu probes through the real safety, retrieval, LLM, and source-matching pipeline.',
    status: 'active',
  },
];
