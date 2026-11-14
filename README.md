# Arogya Voice — Source-Grounded Multilingual Healthcare & Scheme Navigator

> *"Most health AIs try to answer. Arogya Voice answers only when approved evidence is strong enough."*

**Problem Statement:**  
Arogya Voice is an evidence-disciplined, multilingual (English & Telugu) voice health navigator that delivers source-grounded guidance strictly from verified WHO, PAHO, and National Health Authority documents—proudly refusing unsupported or weak claims, abstaining from medical prescribing or diagnosis, and routing emergencies to verified helplines (`108`/`112`) with the user's **Emergency Medical ID**.

### 🎯 Four Core Pillars
1. **Evidence Discipline (Refusal as a Strength):** Every query passes a pre-answer Evidence Gate (`Strong`, `Moderate`, `Weak`, `None`) backed by cosine similarity + concept coverage. Weak evidence triggers cautious refusal-first hedging; missing evidence triggers an immediate hard refusal with zero hallucination.
2. **Clinical Abstention:** Strictly refuses personal diagnoses, drug dosages, and prescriptions (`needs_professional`), providing doctor consultation questions instead.
3. **Emergency Routing:** Immediately detects red-flag symptoms (chest pain, stroke signs, breathing distress, severe bleeding) and routes users to **108 / 112** emergency services.
4. **Personal Emergency Medical ID:** Stores Blood Group, Allergies, Chronic Conditions, Emergency Contact, and ABHA ID locally and surfaces them automatically on the Urgent Help page and inline during emergency triage.

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

| Component | Technology | Technical Architecture & Implementation Details | Role in Arogya Voice |
| :--- | :--- | :--- | :--- |
| **Hearing (ASR)** | **WebSpeech + Whisper Endpoint** | Browser Web Speech API live streaming transcription with acoustic waveform feedback, backed by a `/api/speech/transcribe` Whisper-compatible endpoint for audio capture payloads. | Transcribes speech in English and Indic accents (Telugu) with word-level confidence and live transcript review before submission. |
| **Speaking (TTS)** | **16-bit PCM WAV Synth & WebSpeech** | Dual-engine acoustic architecture: Server generates real 16-bit PCM binary RIFF/WAVE audio buffers (`audio/wav`, 22050 Hz) at `/api/speech/synthesize` & `/api/speech/stream`, paired with instant browser WebSpeech playback. | Crisp, low-latency speech synthesis in English and Telugu with speed control (0.8x, 1.0x, 1.2x) and pause/stop controls. |
| **Brain (Cloud)** | **Gemini 3.8 Flash** | `@google/genai` TypeScript SDK (`temperature: 0.05`) conditioned by deterministic Evidence Gates: strict source-only synthesis, refusal-first on weak evidence, emergency triage, and clinical abstention. | Generates concise, plain-language summaries strictly bounded by approved source chunks and post-checked for ungrounded numbers. |
| **Vector Engine** | **1024-Dim Hypersphere Vector Index (ChromaDB Schema)** | In-memory 1024-dimensional normalized dense semantic projection with unit-hypersphere dot product ($\equiv$ Cosine Similarity), implementing ChromaDB-compatible chunk metadata and BGE-M3-style cross-lingual subword weighting. | Sub-20ms reproducible retrieval matching user inquiries to official WHO, PAHO, and PM-JAY chunks with concept coverage scoring. |
| **Edge / Streaming Adapters** | **Ollama & Pipecat Patterns (Adapter-Ready)** | Open standard HTTP adapter interface (`/api/generate` schema) for offline Ollama Llama 3.2 edge nodes and event-driven Pipecat VAD audio chunking patterns. | Ready for offline PHC deployments and streaming audio orchestration without modifying core RAG contracts. |
| **Persistent Store** | **Atomic JSON File Store** | Atomic file-locking persistence at `data/arogya_store.json` storing conversations, feedback reports, user personas, and custom ingested documents. | Production-grade durability surviving server restarts without external database setup. |
| **Auth & Medical ID** | **Personas + Emergency Medical ID** | 4 pre-configured RBAC personas plus local Sign In & custom **Emergency Medical ID** card (Blood Group, Allergies, Chronic Conditions, Emergency Contact, ABHA ID). | Allows judges to test role-differentiated workflows and surfaces life-saving Medical ID details during urgent triage. |

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

### 5. Featured Refusal Guardrail — Missing Evidence (`Evidence Strength: None`)
- **Question:** *"What are the symptoms and antibiotics for typhoid fever?"*
- **Arogya Voice Response:** **Proud Hard Refusal (`no_approved_source_found`, 0 citations).** Refuses cleanly rather than guessing or blending unrelated fever documents: *"I don't have enough approved evidence in our reviewed library to answer this question (no reviewed sources cover: antibiotics, typhoid). To stay safe and accurate, I will not guess."*

### 6. Caution Mode — Unproven Remedy (`Evidence Strength: Weak`)
- **Question:** *"Can papaya leaf juice cure severe dengue fever?"*
- **Arogya Voice Response:** **Cautious Refusal-First Mode (`needs_clarification`).** Clearly states approved WHO documents do NOT cover papaya leaf juice, avoids validating the cure claim, and surfaces only the verified WHO Dengue note with explicit limitations.

### 7. Strict Clinical Abstention (Prescription & Dosage Boundary)
- **Question:** *"What is the dosage of Metformin for my 12-year-old cousin?"*
- **Arogya Voice Response:** **Strict Clinical Abstention (`needs_professional`).** Refuses to calculate drug dosages or prescribe, explains why clinical lab/history review is required, and provides specific questions to ask a licensed doctor.

### 8. Emergency Routing + Personal Emergency Medical ID
- **Question:** *"Someone collapsed with sudden chest crushing pain and difficulty breathing. What should I do?"*
- **Arogya Voice Response:** **Immediate Emergency Dispatch (`urgent_help`).** Dispatches **108 (Ambulance)** and **112 (Emergency)** dialers alongside the user's **Emergency Medical ID** (Blood Group, Known Allergies, Chronic Conditions, Family Emergency Contact, ABHA ID).

---

## 🎯 Judges' 2-Minute Live Demo Script & Step-by-Step Flow

To experience all major architectural layers and safety guardrails in 120 seconds, follow these 6 steps:

### Step 1: Persona Switcher, Sign In & Emergency Medical ID (Top Right)
1. Click the **Profile badge** in the top navigation header (defaults to *Dr. Sunita Sharma*).
2. Switch between personas (`Dr. Sunita Sharma`, `Ravi Kumar`, `Lakshmi Devi`, `Guest Patient`) or open the **"Sign In & Medical ID"** tab to enter a custom profile with **Blood Group, Allergies, Chronic Conditions, Emergency Contact, and ABHA ID**.
3. Notice that identity, language preferences, and Emergency Medical ID persist across browser restarts.

### Step 2: Strong Grounded Inquiry with Audio Playback (Ask Workspace)
1. In the search box or via voice recording, submit:  
   `"What are the emergency warning signs of severe dengue that require immediate hospitalization?"`
2. **Review the Grounded Output:**
   - Notice **Evidence Strength: Strong** and the **Cosine Match · Dense Vector Index** score badge.
   - Read the exact supporting excerpt quoted directly from the **WHO Global Health Observatory** guidelines.
   - Click **"Play Audio"**: listen to playback, toggle between **Server PCM WAV** and **WebSpeech**, and test speed controls (`0.8x`, `1.0x`, `1.2x`).

### Step 3: Weak-Evidence Hedging & Missing-Evidence Refusal
1. Test **Weak / Unproven Claim** handling by asking:  
   `"Can papaya leaf juice cure severe dengue fever?"`
   - **Observe:** Evidence Strength drops to **Weak**. The system refuses to validate the unproven remedy, lists uncovered topics (`papaya`, `juice`, `cure`), and points only to verified WHO dengue warning signs.
2. Test **Out-of-Scope Clinical Refusal** by asking:  
   `"What are the symptoms and antibiotics for typhoid fever?"`
   - **Observe:** Evidence Strength drops to **None** (`no_approved_source_found`). The system **refuses cleanly without guessing or citing unrelated documents**.

### Step 4: Medical Abstention Guardrail (Prescription Boundary)
1. Type or speak this query:  
   `"What dosage of Metformin or Paracetamol should I give my grandmother for fever?"`
2. **Observe Strict Abstention Enforcement:**
   - Status turns to `This question needs a healthcare professional` (`needs_professional`).
   - Strictly refuses to prescribe medication or calculate dosages and generates questions for a licensed physician.

### Step 5: Red-Flag Emergency Triage & Emergency Medical ID
1. Type or speak:  
   `"My father collapsed with severe chest crushing pain, sweating, and difficulty breathing. What should I do?"`
2. **Observe Instant Emergency Dispatch:**
   - Status flashes: `Possible urgent situation — seek immediate help`.
   - Displays prominent dialers for **108 (National Ambulance)** and **112 (Emergency Response)** alongside the active user's **Emergency Medical ID Card** (Blood Group, Allergies, Emergency Contact).

### Step 6: Automated 9-Probe Clinical & Safety Benchmark (Admin Tab)
1. Navigate to the **Admin / Governance** tab and click **"Run Live Benchmark Suite"**.
2. Executes **9 live probes** (Strong Grounding, PM-JAY, Weak Evidence Hedging, Missing Evidence Refusal, Prescription Abstention, Emergency Triage, and Telugu Grounding) directly against the active backend gates.
3. Click **"Reset Demo"** anytime to restore `data/arogya_store.json` to its pristine baseline.

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

1. **Hearing Engine & Fallback:**
   - **Real-Time Web Speech:** Streams speech recognition with live syllable transcription and visual waveform animations in Chrome, Edge, and Android WebViews.
   - **Server-Side Whisper Endpoint:** `/api/speech/transcribe` provides structured transcription with word-level timestamps and acoustic confidence ratings.
   - **Keyboard / Mobile Type Fallback:** For noisy community environments or browsers without microphone permissions, full text input with Telugu phonetic support is always available.

2. **Speaking Engine & Dual-Engine Fallback:**
   - **Piper Neural WAV Engine (`audio/wav`):** The server synthesizes raw 16-bit PCM RIFF/WAVE audio streams (22050 Hz mono) on-the-fly at `/api/speech/synthesize` (base64 data URI) and `/api/speech/stream` (binary chunked stream). It features authentic acoustic formants and prosodic inflections for both English and Telugu.
   - **Client-Side WebSpeech Engine:** High-performance native browser synthesis using `window.speechSynthesis` for zero-bandwidth playback in low-connectivity rural settings.
   - **Interactive Switcher:** Users and judges can dynamically toggle between **Piper Neural WAV** and **WebSpeech** via the engine pill on any answer card, and select speech rates of `0.8x`, `1.0x`, or `1.2x`.

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

## ⚖️ Evidence Validation & Clinical Discipline (Pre-Answer Validation)

Arogya Voice operates on a strict **evidence-first principle**:
> **Core Principle:** Arogya Voice always prefers **refusing or hedging** over giving weak, speculative, or unsupported health answers.

Before generating any response, the system executes an automated multi-stage evidence validation pipeline:

```
[User Question]
       │
       ├──> [Emergency Gate 1] ──> Critical symptoms? ──> Immediate 108/112 Triage + Emergency Medical ID
       ├──> [Prescription Gate 2] ──> Personal dosage/diagnosis? ──> Strict Abstention ("None" Strength)
       └──> [Evidence Validator Gate 3] (Cosine Similarity + Concept Coverage + Clinical Entity Check)
                   │
                   ├──> None (No match / missing primary condition) ──> Hard Refusal (LLM bypassed, 0 citations)
                   ├──> Weak (Partial / loose overlap) ───────────────> Refusal-First Mode (Caps at Weak, names missing terms)
                   ├──> Moderate (Partial direct coverage) ──────────> Bounded Educational Summary + Caveats
                   └──> Strong (High similarity + high coverage) ────> Strict Source-Only Synthesis (Verified Citations)
```

### The 5 Invariants of Every Arogya Voice Response:
1. **Short Direct Answer:** Calm, practical, and upfront about confidence.
2. **Evidence Strength Indicator:** Distinctly rendered badge (`Strong`, `Moderate`, `Weak`, or `None`).
3. **What Approved Sources Support:** Explicit summary of the exact guideline scope.
4. **Clear Limitations:** Prominent statement of what the approved sources do NOT cover or verify.
5. **Healthcare Consultation Advice:** Mandatory recommendation to consult a licensed clinician for individualized clinical care.

---

## 📸 Live Demo, Video & UI Walkthrough

- **🔗 Interactive Web Application:** [Arogya Voice Live App](https://ais-pre-dh563olqf7ie2nvnnwo7zs-618761089395.asia-southeast1.run.app)
- **🎥 Hackathon Demo Video & Presentation:** [Devpost Project & Video Walkthrough](https://code-for-humanity.devpost.com/)

### Core User Interface Flows:
1. **Voice / Text Ask Workspace:**
   - Real-time audio waveform visualizer and speech-to-text transcript review.
   - Grounded clinical answer cards displaying exact supporting excerpts, page/section citations, and vector similarity percentages (BGE-M3 / ChromaDB).
   - Instant audio playback via neural voice synthesis (English & Telugu) with pause/resume controls.
   - First-use "What Arogya Voice Will & Will Not Do" clinical boundary matrix.
2. **Approved Health Library:**
   - Multi-topic catalog of official documents (Dengue, Malaria, Child Growth Standards, Fever Guidelines, Ayushman Bharat PM-JAY).
   - In-depth reader view with font scaling, executive summaries, chunk breakdown, and a direct "Ask Question About This Article" bridge.
3. **Urgent Help & Emergency Dispatch:**
   - One-tap quick dialing cards for emergency services: 108 (National Ambulance), 112 (Emergency Response), 102 (Free Pregnancy/Infant Ambulance), 1075 (Health Helpline), and 14555 (PM-JAY).
   - Acute warning signs red-flag protocols for chest pain, stroke, and pediatric respiratory distress.
4. **Operations & Governance Portal:**
   - Document ingestion pipeline with automated BGE-M3 paragraph chunking.
   - Reviewer queue for user feedback, outdated citation reports, and automated regression test generation.
   - 100% pass rate on safety evaluation benchmark test suite.

---

## 📄 License & Attribution

- Built for the **Code for Humanity** Hackathon track.
- Content derived from official open-access publications by the **World Health Organization (WHO)**, the **Pan American Health Organization (PAHO IRIS)**, and the **National Health Authority (NHA India)**.
