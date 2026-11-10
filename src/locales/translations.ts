import { Language } from '../types';

export interface Translations {
  appName: string;
  appTagline: string;
  scopeStatement: string;
  urgentHelpLink: string;
  urgentEmergencyTitle: string;
  urgentNotice: string;
  startAsking: string;
  signIn: string;
  continueAsGuest: string;
  askByVoice: string;
  typeQuestion: string;
  speakReviewListen: string;
  speakStep: string;
  reviewStep: string;
  listenStep: string;
  navHome: string;
  navAsk: string;
  navLibrary: string;
  navHistory: string;
  navSettings: string;
  navAdmin: string;
  exploreReviewedTopics: string;
  topicMosquito: string;
  topicChildGrowth: string;
  topicCommonFever: string;
  topicScheme: string;
  topicDiabetes: string;
  topicMaternal: string;
  topicHypertension: string;
  sampleQuestion1: string;
  sampleQuestion2: string;
  sampleQuestion3: string;
  sampleQuestion4: string;
  sampleQuestionMosquito: string;
  sampleQuestionChildGrowth: string;
  sampleQuestionFever: string;
  composerPlaceholder: string;
  recordingActive: string;
  stopRecording: string;
  clearTranscript: string;
  sendQuestion: string;
  reviewTranscriptPrompt: string;
  boundaryNote: string;
  sourcesLabel: string;
  listenAction: string;
  stopAudioAction: string;
  saveAction: string;
  reportAction: string;
  moreDetail: string;
  questionsForDoctor: string;
  statusSupported: string;
  statusClarification: string;
  statusNoSource: string;
  statusNeedsDoctor: string;
  statusUrgent: string;
  teluguNotice: string;
}

export const TRANSLATIONS: Record<Language, Translations> = {
  en: {
    appName: 'Arogya Voice',
    appTagline: 'Source-Grounded Healthcare Information & Scheme Guidance',
    scopeStatement: 'General health education from reviewed official WHO, PAHO & National guidelines. Not an AI doctor.',
    urgentHelpLink: 'Urgent medical help: Dial 108 / 112',
    urgentEmergencyTitle: 'Immediate Emergency Assistance',
    urgentNotice: 'If someone is in acute distress (severe chest pain, breathing difficulty, or uncontrolled bleeding), seek immediate emergency care.',
    startAsking: 'Start Asking by Voice',
    signIn: 'Sign In',
    continueAsGuest: 'Continue as Guest',
    askByVoice: 'Ask by Voice',
    typeQuestion: 'Type a Question',
    speakReviewListen: 'Three-Step Verification: Speak → Review Transcript → Listen with Citations',
    speakStep: '1. Speak naturally in English or Telugu',
    reviewStep: '2. Verify or edit your transcribed question',
    listenStep: '3. Receive answers cited from approved guidelines',
    navHome: 'Home',
    navAsk: 'Ask Arogya',
    navLibrary: 'Health Library',
    navHistory: 'Saved History',
    navSettings: 'Settings & Privacy',
    navAdmin: 'Admin Review',
    exploreReviewedTopics: 'Explore Reviewed Official Topics & Datasets',
    topicMosquito: 'Mosquito-borne Diseases (Dengue & Malaria)',
    topicChildGrowth: 'Child Health & WHO Growth Standards',
    topicCommonFever: 'Fever & Common Symptoms (When to Seek Care)',
    topicScheme: 'Government Schemes (Ayushman Bharat & WHO UHC)',
    topicDiabetes: 'Type 2 Diabetes Guidelines',
    topicMaternal: 'Maternal & Infant Feeding',
    topicHypertension: 'Hypertension (Blood Pressure)',
    sampleQuestionMosquito: 'What are the emergency warning signs of severe dengue that require immediate hospitalization?',
    sampleQuestionChildGrowth: 'How should parents interpret WHO Child Growth Standard percentiles and z-scores?',
    sampleQuestionFever: 'What red flags with a fever indicate a patient needs urgent emergency medical evaluation?',
    sampleQuestion1: 'What are the dietary habits and exercise guidelines for type 2 diabetes?',
    sampleQuestion2: 'How long should an infant be exclusively breastfed according to WHO?',
    sampleQuestion3: 'What is the daily salt intake limit for high blood pressure?',
    sampleQuestion4: 'What documents are required to apply for Ayushman Bharat PM-JAY and generate the Golden Card?',
    composerPlaceholder: 'Type your health question or press the microphone to speak...',
    recordingActive: 'Listening... Speak clearly into your microphone',
    stopRecording: 'Stop Recording',
    clearTranscript: 'Clear',
    sendQuestion: 'Send Question',
    reviewTranscriptPrompt: 'Review and edit your question before searching reviewed guidelines:',
    boundaryNote: 'General health information — not a medical diagnosis, personalized treatment, or prescription.',
    sourcesLabel: 'Reviewed Official Sources',
    listenAction: 'Read Aloud',
    stopAudioAction: 'Stop Audio',
    saveAction: 'Save to History',
    reportAction: 'Report an Issue',
    moreDetail: 'Detailed Supporting Evidence',
    questionsForDoctor: 'Suggested Questions to Ask Your Doctor',
    statusSupported: 'Supported by reviewed sources',
    statusClarification: 'More information needed',
    statusNoSource: 'No approved source found',
    statusNeedsDoctor: 'This question needs a healthcare professional',
    statusUrgent: 'Possible urgent situation — seek immediate help',
    teluguNotice: 'Telugu language voice model enabled for tested official passages.',
  },
  te: {
    appName: 'ఆరోగ్య వాయిస్ (Arogya Voice)',
    appTagline: 'అధికారిక ఆరోగ్య మార్గదర్శకాలు మరియు ప్రభుత్వ పథకాల సమాచార వేదిక',
    scopeStatement: 'WHO, PAHO మరియు జాతీయ అధికారిక పత్రాల నుండి సాధారణ సమాచారం. ఇది వైద్యుడికి ప్రత్యామ్నాయం కాదు.',
    urgentHelpLink: 'అత్యవసర వైద్య సహాయం: 108 / 112 కు డయల్ చేయండి',
    urgentEmergencyTitle: 'తక్షణ అత్యవసర వైద్య సహాయం',
    urgentNotice: 'తీవ్రమైన గుండె నొప్పి, శ్వాస ఆడకపోవడం లేదా అధిక రక్తస్రావం ఉంటే వెంటనే అత్యవసర వైద్య విభాగాన్ని సంప్రదించండి.',
    startAsking: 'వాయిస్ ద్వారా అడగండి',
    signIn: 'లాగిన్ చేయండి',
    continueAsGuest: 'అతిథిగా కొనసాగండి (Guest)',
    askByVoice: 'నోటితో మాట్లాడి అడగండి',
    typeQuestion: 'ప్రశ్నను టైప్ చేయండి',
    speakReviewListen: 'మూడు సులభ దశలు: మాట్లాడండి → సమీక్షించండి → అధికారిక ఆధారాలతో వినండి',
    speakStep: '1. తెలుగు లేదా ఇంగ్లీషులో స్పష్టంగా మాట్లాడండి',
    reviewStep: '2. టైప్ అయిన మీ ప్రశ్నను సరిచూసుకోండి',
    listenStep: '3. అధికారిక ఆధారాలతో కూడిన సమాధానాన్ని వినండి',
    navHome: 'హోమ్',
    navAsk: 'ప్రశ్నించండి',
    navLibrary: 'లైబ్రరీ',
    navHistory: 'భద్రపరిచినవి',
    navSettings: 'సెట్టింగ్‌లు',
    navAdmin: 'అడ్మిన్ పోర్టల్',
    exploreReviewedTopics: 'సమీక్షించిన అధికారిక అంశాలు & డేటాసెట్లు',
    topicMosquito: 'దోమల ద్వారా వ్యాపించే వ్యాధులు (డెంగ్యూ, మలేరియా)',
    topicChildGrowth: 'పిల్లల పెరుగుదల ప్రమాణాలు (WHO Child Growth)',
    topicCommonFever: 'జ్వరం & లక్షణాలు (వైద్యుడిని ఎప్పుడు సంప్రదించాలి)',
    topicScheme: 'ప్రభుత్వ పథకాలు (ఆయుష్మాన్ భారత్ & UHC)',
    topicDiabetes: 'టైప్ 2 మధుమేహం (షుగర్)',
    topicMaternal: 'తల్లి & శిశు సంరక్షణ',
    topicHypertension: 'అధిక రక్తపోటు (బీపీ)',
    sampleQuestionMosquito: 'డెంగ్యూ వ్యాధిలో ఆసుపత్రికి వెళ్లాల్సిన అత్యవసర హెచ్చరిక సంకేతాలు ఏమిటి?',
    sampleQuestionChildGrowth: 'WHO పిల్లల పెరుగుదల చార్టులు మరియు Z-స్కోర్లను ఎలా అర్థం చేసుకోవాలి?',
    sampleQuestionFever: 'జ్వరం వచ్చినప్పుడు అత్యవసర ఆసుపత్రి చికిత్స అవసరమయ్యే రెడ్ ఫ్లాగ్ లక్షణాలు ఏవి?',
    sampleQuestion1: 'టైప్ 2 మధుమేహంలో ఆహార నియమాలు మరియు వ్యాయామం ఎలా ఉండాలి?',
    sampleQuestion2: 'శిశువుకు ఎన్ని నెలల వరకు తల్లి పాలు మాత్రమే ఇవ్వాలి?',
    sampleQuestion3: 'రక్తపోటు నియంత్రణ కోసం రోజుకు ఎంత ఉప్పు తీసుకోవాలి?',
    sampleQuestion4: 'ఆయుష్మాన్ భారత్ PM-JAY కార్డు కోసం ఏ ఏ ధ్రువపత్రాలు కావాలి?',
    composerPlaceholder: 'మీ ఆరోగ్య ప్రశ్నను టైప్ చేయండి లేదా మైక్రోఫోన్ నొక్కండి...',
    recordingActive: 'మీ మాట వింటున్నాము... స్పష్టంగా మాట్లాడండి',
    stopRecording: 'రికార్డింగ్ ఆపండి',
    clearTranscript: 'తొలగించు',
    sendQuestion: 'ప్రశ్న పంపండి',
    reviewTranscriptPrompt: 'సమాధానం వెతకడానికి ముందు మీ ప్రశ్నను సరిచూసుకోండి:',
    boundaryNote: 'సాధారణ ఆరోగ్య విద్య సమాచారం మాత్రమే — ఇది రోగ నిర్ధారణ లేదా మందుల ప్రిస్క్రిప్షన్ కాదు.',
    sourcesLabel: 'సమీక్షించిన అధికారిక ఆధారాలు',
    listenAction: 'వాయిస్ వినండి',
    stopAudioAction: 'ఆపండి',
    saveAction: 'భద్రపరచండి',
    reportAction: 'సమస్యను నివేదించండి',
    moreDetail: 'వివరమైన సహాయక సమాచారం',
    questionsForDoctor: 'మీ వైద్యుడిని అడగవలసిన ప్రశ్నలు',
    statusSupported: 'సమీక్షించిన మూలాల ద్వారా ధ్రువీకరించబడింది',
    statusClarification: 'మరింత స్పష్టమైన సమాచారం అవసరం',
    statusNoSource: 'మా లైబ్రరీలో అధికారిక ఆధారం లభించలేదు',
    statusNeedsDoctor: 'ఈ ప్రశ్నకు వైద్య నిపుణుడి సంప్రదింపు అవసరం',
    statusUrgent: 'అత్యవసర పరిస్థితి కావచ్చు — వెంటనే సహాయం పొందండి',
    teluguNotice: 'తెలుగు భాషా వాయిస్ మోడల్ ప్రారంభించబడింది.',
  }
};
