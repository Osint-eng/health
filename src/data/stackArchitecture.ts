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
    provider: 'Gemini 3.8 Flash (Google AI Studio)',
    link: 'https://aistudio.google.com',
    role: 'Live cloud generation strictly bounded to retrieved excerpts with pre-answer evidence calibration and post-answer grounding checks.',
    status: 'active',
  },
  {
    part: 'Vector Retrieval (Live In-App Engine)',
    use: 'Dense Subword Cosine Similarity',
    provider: '1024-Dim Hypersphere Vector Index (BGE-M3 / ChromaDB-Compatible Schema)',
    link: 'https://huggingface.co/BAAI/bge-m3',
    role: 'Live in-memory 1024-dim subword cosine similarity + concept coverage analyzer isolating approved WHO/PAHO and PM-JAY collections.',
    status: 'active',
  },
  {
    part: 'Hearing (ASR)',
    use: 'Speech-to-Text Transcription',
    provider: 'Web Speech Streaming ASR + Whisper Endpoint',
    link: 'https://github.com/openai/whisper',
    role: 'Live browser SpeechRecognition with waveform & transcript review, plus Whisper-compatible server endpoint (/api/speech/transcribe).',
    status: 'active',
  },
  {
    part: 'Speaking (TTS)',
    use: 'Spoken Answer Synthesis',
    provider: '16-bit PCM WAV Synth + Web Speech TTS (Piper-Compatible)',
    link: 'https://huggingface.co/rhasspy/piper-voices',
    role: 'Live server-synthesized binary RIFF/WAVE stream (/api/speech/synthesize) paired with native browser SpeechSynthesis fallback.',
    status: 'active',
  },
  {
    part: 'Brain (Offline Edge Adapter)',
    use: 'Air-Gapped & Edge Deployment Target',
    provider: 'Ollama Adapter (Ready)',
    link: 'https://ollama.com',
    role: 'Adapter configuration ready for locally run LLMs in zero-cloud clinic deployments.',
    status: 'ready',
  },
  {
    part: 'Streaming Orchestrator (Target)',
    use: 'Real-time Voice Frame Transport',
    provider: 'Pipecat Architecture Pattern (Ready)',
    link: 'https://github.com/pipecat-ai/pipecat',
    role: 'Turn-based streaming state machine modeled on Pipecat VAD/audio pipelines for future WebRTC deployment.',
    status: 'ready',
  },
  {
    part: 'Evaluation Benchmark',
    use: 'Automated Safety & Grounding Suite',
    provider: 'Live Server Benchmark Runner (/api/tools/eval/run)',
    link: 'https://colab.research.google.com',
    role: 'Live regression runner executing grounded, weak-evidence, abstention, and emergency safety probes in real time.',
    status: 'active',
  },
];
