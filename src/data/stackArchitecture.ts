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
    part: 'Hearing (ASR)',
    use: 'Speech-to-Text Transcription',
    provider: 'OpenAI Whisper',
    link: 'https://github.com/openai/whisper',
    role: 'Acoustic audio processing and multilingual speech recognition for English and Telugu queries.',
    status: 'active',
  },
  {
    part: 'Multilingual Embeddings',
    use: 'Dense Passage Retrieval Vectors',
    provider: 'BGE-M3 (BAAI)',
    link: 'https://huggingface.co/BAAI/bge-m3',
    role: 'Multi-lingual passage vectorization supporting cross-lingual semantic matching between Telugu queries and English guidelines.',
    status: 'active',
  },
  {
    part: 'Retrieval Store',
    use: 'Approved Chunk Vector Database',
    provider: 'ChromaDB',
    link: 'https://www.trychroma.com',
    role: 'Partitioned semantic vector storage isolating approved medical knowledge from government schemes.',
    status: 'active',
  },
  {
    part: 'Brain (Free Cloud API)',
    use: 'Grounded Answer Generation & Evidence Validation',
    provider: 'Gemini 3.8 Flash (Google AI Studio)',
    link: 'https://aistudio.google.com',
    role: 'Source-grounded clinical generation strictly bound to retrieved passages with citation verification.',
    status: 'active',
  },
  {
    part: 'Brain (Local Alternative)',
    use: 'Air-Gapped & Edge Deployment Fallback',
    provider: 'Ollama',
    link: 'https://ollama.com',
    role: 'Locally run LLMs on user or on-premise hardware for zero-cloud healthcare deployments.',
    status: 'ready',
  },
  {
    part: 'Speaking (TTS)',
    use: 'Spoken Answer Synthesis',
    provider: 'Piper Voices',
    link: 'https://huggingface.co/rhasspy/piper-voices',
    role: 'Fast, lightweight neural text-to-speech engine paired with browser speech synthesis for Telugu & Indian English.',
    status: 'active',
  },
  {
    part: 'Glue Code & Streaming',
    use: 'Real-time Voice & Pipeline Orchestration',
    provider: 'Pipecat',
    link: 'https://github.com/pipecat-ai/pipecat',
    role: 'Low-latency conversational voice pipelines connecting audio frames, ASR, LLM, and TTS with interruptibility.',
    status: 'ready',
  },
  {
    part: 'Evaluation & Free GPU',
    use: 'Evaluation Benchmarks & Tuning',
    provider: 'Google Colab',
    link: 'https://colab.research.google.com',
    role: 'Evaluation runs, retrieval accuracy benchmarking against 50+ test questions, and speech dataset validation.',
    status: 'ready',
  },
];
