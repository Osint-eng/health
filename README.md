# Arogya Voice — Source-Grounded Multilingual Healthcare & Scheme Navigator

> **Problem Statement:**  
> Arogya Voice is an open, source-grounded multilingual (English & Telugu) voice health navigator that delivers zero-hallucination operational guidance from WHO and national health scheme documents while strictly abstaining from medical prescribing or diagnosis and routing emergencies to verified helplines (108/112).

---

## 🚀 Quick Start & Run Commands

You can run Arogya Voice with either **npm** or **bun**:

### Using npm (Node.js 20+)
```bash
# 1. Install dependencies
npm install

# 2. Configure environment
# Copy the example environment file
cp .env.example .env

# 3. Start development server with Gemini API Key
GEMINI_API_KEY="YOUR_GEMINI_API_KEY" npm run dev

# 4. Production build & verification
npm run build
npm run lint
```

### Using bun
```bash
# 1. Install dependencies
bun install

# 2. Run full-stack dev server (Express + Vite)
GEMINI_API_KEY="YOUR_GEMINI_API_KEY" bun run dev

# 3. Build for production
bun run build
```

The application runs locally on **http://localhost:3000**.

---

## 🛠️ Complete Tech Stack

| Component | Technology | Source / Reference | Role in Arogya Voice |
| :--- | :--- | :--- | :--- |
| **Hearing (ASR)** | **OpenAI Whisper** | [openai/whisper](https://github.com/openai/whisper) | Transcribes speech in English and Indic accents (Telugu) with word-level timestamps and acoustic confidence; falls back to browser Web Speech API. |
| **Speaking (TTS)** | **Piper Neural Voices** | [rhasspy/piper-voices](https://huggingface.co/rhasspy/piper-voices) | Low-latency neural speech synthesis (`en_US-lessac-medium`, `en_GB-alan-low`, `te_IN-indic-v1`) with native audio playback controls. |
| **Brain (Cloud)** | **Gemini 3.8 Flash** | [Google AI Studio](https://aistudio.google.com) | `@google/genai` server-side client enforcing source-only synthesis, zero hallucination, and deterministic emergency triage. |
| **Brain (Local)** | **Ollama** | [ollama.com](https://ollama.com) | Edge-compatible local LLM adapter (e.g. Llama 3.2) for 100% offline clinics. |
| **Retrieval Store** | **ChromaDB** | [trychroma.com](https://www.trychroma.com) | Partitioned vector store (`approved_health_knowledge` vs `scheme_knowledge`) with cosine similarity scoring. |
| **Embeddings** | **BGE-M3 & Gemini Embeddings** | [BAAI/bge-m3](https://huggingface.co/BAAI/bge-m3) | 1024-dimension cross-lingual embeddings for English & Telugu semantic search. |
| **Glue Code** | **Pipecat** | [pipecat-ai/pipecat](https://github.com/pipecat-ai/pipecat) | Real-time audio streaming architecture with Silero VAD (Voice Activity Detection). |
| **Evaluation GPU** | **Google Colab** | [colab.research.google.com](https://colab.research.google.com) | Automated regression test runner measuring groundedness %, retrieval precision, and abstention compliance. |
| **Hackathon Track** | **Code for Humanity** | [Devpost Hackathon](https://code-for-humanity.devpost.com/) | Built for the Code for Humanity Track addressing healthcare accessibility and transparency. |

---

## 📚 Verified Official Datasets & Ingestion Sources

Arogya Voice indexes only peer-reviewed, official government and multilateral health documents:

| Topic | Source Publisher & URL | Example Focus & Guidelines |
| :--- | :--- | :--- |
| **Mosquito-borne diseases** *(Dengue, Severe Dengue, Malaria)* | **WHO Global Health Observatory (GHO)**<br>🔗 [https://www.who.int/data/gho](https://www.who.int/data/gho)<br>🔗 [WHO Dengue Fact Sheet](https://www.who.int/news-room/fact-sheets/detail/dengue-and-severe-dengue) | High sudden fever, retro-orbital eye pain, breakbone joint pain, mosquito prevention (Aedes daytime vs Anopheles nocturnal), and **critical warning signs** of plasma leakage. |
| **Child Health & Growth** | **WHO Child Growth Standards**<br>🔗 [https://www.who.int/tools/child-growth-standards](https://www.who.int/tools/child-growth-standards)<br>🔗 [WHO Europe Regional Library](https://www.who.int/europe/publications) | Length/height-for-age, weight-for-age, BMI-for-age percentiles, z-score interpretation principles (screening indicators vs diagnosis), stunting and wasting thresholds. |
| **Common Symptoms & Fever** | **PAHO IRIS Repository**<br>🔗 [https://iris.paho.org/](https://iris.paho.org/) | Evidence-based understanding of acute fever, safe hydration, comfort measures, explicit boundary against self-diagnosis, and infant red-flag thresholds. |
| **Government Schemes** | **National Health Authority (NHA) & WHO UHC**<br>🔗 [https://nha.gov.in/PM-JAY](https://nha.gov.in/PM-JAY)<br>🔗 [mera.pmjay.gov.in](https://mera.pmjay.gov.in)<br>🔗 [WHO Universal Health Coverage](https://www.who.int/health-topics/universal-health-coverage) | Ayushman Bharat PM-JAY ₹5 lakh cashless hospital cover, SECC 2011 eligibility check, Golden Card generation documents (Aadhaar + Ration Card), ABHA 14-digit digital health ID. |

---

## 🧪 Sample Questions Demonstrating Grounding & Clinical Safety

### 1. Grounded Disease Education & Warning Signs (WHO GHO)
- **Question:** *"What are the emergency warning signs of severe dengue that require immediate hospitalization?"*
- **Arogya Voice Response:** Cites WHO GHO Document `who-mosquito-dengue-malaria-2024` (Page 7, Section 3). Details warning signs appearing 3 to 7 days after onset (persistent vomiting >3 times/24h, severe abdominal pain, bleeding gums, fluid accumulation, extreme lethargy) and instructs immediate emergency hospital transport.

### 2. Child Growth Standard Interpretation (WHO Standards)
- **Question:** *"How should parents interpret WHO Child Growth Standard percentiles and z-scores?"*
- **Arogya Voice Response:** Cites `who-child-growth-standards-2024` (Page 14, Chapter 3). Explains that measurements between -2 and +2 z-scores (3rd to 97th percentiles) represent normal biological variation; emphasizes that a single point is a screening indicator rather than a medical diagnosis; instructs observing trajectory across visits.

### 3. Acute Fever Emergency Red Flags (PAHO IRIS)
- **Question:** *"What red flags with a fever indicate a patient needs urgent emergency medical evaluation?"*
- **Arogya Voice Response:** Cites PAHO/WHO IRIS Document `paho-who-fever-symptoms-2024` (Page 9, Module 3). Identifies immediate emergency criteria: any fever in infants under 3 months, stiff neck with photophobia, non-blanching petechial rash, rapid grunting respirations, inconsolable drowsiness, or seizures.

### 4. Government Scheme Navigation (Ayushman Bharat PM-JAY)
- **Question:** *"What documents are required to apply for Ayushman Bharat PM-JAY and generate the Golden Card?"*
- **Arogya Voice Response:** Cites `pmjay-official-scheme-2024` (Clause 3.2, Page 16). Lists mandatory documents: Aadhaar card or government photo ID, Ration Card or State Family ID, and active mobile number for OTP verification. Notes that card generation at CSCs is free.

### 5. Strict Medical Abstention (Clinical Safety Boundary)
- **Question:** *"Can I take 1000mg Paracetamol every 2 hours without a doctor prescription?"*
- **Arogya Voice Response:** **Strict Abstention.** *"Arogya Voice cannot prescribe medications, calculate dosages, or approve self-medication schedules. Exceeding recommended paracetamol intervals carries severe risks of hepatotoxicity. Please consult a licensed medical clinician or pharmacist immediately."*

### 6. Emergency Helpline Triage (Urgent Help)
- **Question:** *"Someone collapsed with sudden chest crushing pain and left arm numbness. What should I do?"*
- **Arogya Voice Response:** **Immediate Emergency Red Flag.** Dispatches prominent callout cards for **108 (National Emergency Ambulance)** and **112 (Unified Emergency Response)** with FAST stroke/cardiac guidelines.

---

## 🎙️ Speech Pipeline & Fallbacks

Arogya Voice implements a multi-tier speech loop designed to work reliably across desktop, mobile, and low-connectivity environments:

```
[User Voice] ──> 🎤 Whisper ASR / WebSpeech ──> [Text Transcript]
                                                        │
                                                        ▼
                                            [BGE-M3 + ChromaDB]
                                            Dense Vector Retrieval
                                                        │
                                                        ▼
                                            [Gemini 3.8 Flash]
                                            Grounded Clinical RAG
                                                        │
                                                        ▼
[Spoken Answer] <── 🔊 Piper Neural Voices <── [Synthesized Text]
```

1. **Hearing Fallback:** If browser `SpeechRecognition` is supported and permitted, it streams speech in real time with audio waveform visualizers. If unsupported or denied, users seamlessly type in English or Telugu.
2. **Speaking Fallback:** Answers are read aloud using neural voice models (`en_US-lessac-medium` and `te_IN-indic-v1`). If server-side Piper synthesis is offline, the client seamlessly falls back to high-fidelity browser SpeechSynthesis.

---

## 💾 Persistent Storage Architecture

All user sessions, conversations, feedback reports, and admin document versions are automatically persisted to disk in **`data/arogya_store.json`**:
- **Atomic File Writes:** Avoids database locking issues while preserving state across dev server restarts and deployments.
- **Audit Queue:** User reports (e.g. flagged outdated guidance or unsupported claims) are stored permanently in the admin review queue.
- **Zero Cloud Telemetry of Audio:** Voice recordings are never stored on disk unless the user explicitly opts into data contribution in Settings.

---

## 🛡️ "What Arogya Voice Will & Will Not Do"

| ✅ What Arogya Voice DOES | ❌ What Arogya Voice NEVER Does |
| :--- | :--- |
| Provides exact quotes, chapter citations, and verified excerpts from approved WHO and national health scheme records. | **Never diagnoses** diseases, conditions, or symptoms. |
| Explains official eligibility criteria, required documents, and toll-free portals for health schemes like Ayushman Bharat PM-JAY. | **Never prescribes** medications, calculates personal drug dosages, or recommends self-treatment. |
| Clarifies statistical principles behind WHO Child Growth Standards (percentiles, z-scores). | **Never confirms** a patient is "healthy" or "out of danger". |
| Immediately identifies red-flag emergency symptoms and routes users to verified emergency helplines (108, 112, 102). | **Never replaces** clinical judgment, triage nurses, or licensed medical doctors. |

---

## 📸 Screenshots & Architecture

- **Ask Workspace:** Audio visualizer canvas, live recording waveform, transcript review editor pill, answer card with exact source citation chips and cosine similarity percentage badges.
- **Verified Health Library:** Categorized catalog of all 7 approved documents across WHO GHO, WHO Standards, PAHO IRIS, and NHA India.
- **Urgent Emergency Help:** One-tap calling for national helplines: 108 (Ambulance), 112 (Emergency), 102 (Pregnancy/Child), 1075 (Health Info), 14555 (PM-JAY), and 14416 (Tele-MANAS Mental Health).
- **Admin Review Portal:** Audit queue for user-submitted feedback, document ingestion pipeline, and chunk preview inspector.

---

## 📄 License & Attribution

- Built for the **Code for Humanity** Hackathon track.
- Content derived from official open-access publications by the **World Health Organization (WHO)**, the **Pan American Health Organization (PAHO IRIS)**, and the **National Health Authority (NHA India)**.
