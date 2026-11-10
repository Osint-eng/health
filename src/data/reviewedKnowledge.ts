import { DocumentSource } from '../types';

export const REVIEWED_DOCUMENTS: DocumentSource[] = [
  // ==========================================
  // COLLECTION 1: APPROVED HEALTH KNOWLEDGE
  // ==========================================

  // Topic 1: Mosquito-borne diseases (Dengue, Malaria, etc.)
  {
    id: 'who-mosquito-dengue-malaria-2024',
    title: 'WHO Fact Sheets & Prevention Guidelines: Dengue, Severe Dengue, and Malaria',
    publisher: 'World Health Organization (WHO) & Global Health Observatory',
    category: 'health_education',
    collection_name: 'approved_health_knowledge',
    topic: 'mosquito_borne',
    jurisdiction: 'Global / South-East Asia / WHO GHO',
    original_url: 'https://www.who.int/news-room/fact-sheets/detail/dengue-and-severe-dengue',
    language: 'en',
    current_version: 'v3.2',
    status: 'indexed',
    publication_date: '2024-04-23',
    review_date: '2024-05-10',
    reviewer_name: 'Dr. V. Ramanathan (Vector-Borne Diseases & Public Health Analyst)',
    license_notes: 'Open Access CC BY-NC-SA 3.0 IGO',
    summary: 'Clinical presentation of dengue and malaria, critical warning signs of severe dengue, when to seek emergency hospital care, and vector prevention methods.',
    chunks: [
      {
        id: 'chunk-mosq-01',
        version_id: 'v3.2',
        document_id: 'who-mosquito-dengue-malaria-2024',
        topic: 'mosquito_borne',
        language: 'en',
        title: 'Symptoms of Dengue and Malaria and How to Differentiate Them',
        section: 'Clinical Presentation — Section 1',
        page: 3,
        text: 'Dengue typically manifests with high sudden fever (40°C/104°F) accompanied by at least two symptoms: severe frontal headache, intense pain behind the eyes (retro-orbital pain), muscle and joint pains (breakbone fever), nausea, vomiting, swollen glands, and macular rash. Malaria, transmitted by night-biting Anopheles mosquitoes, presents with paroxysms of high fever preceded by violent chills and rigors, followed by profuse drenching sweats, fatigue, and jaundice.',
        keywords: ['dengue', 'malaria', 'mosquito', 'fever', 'chills', 'headache', 'eye pain', 'body ache', 'symptoms']
      },
      {
        id: 'chunk-mosq-02',
        version_id: 'v3.2',
        document_id: 'who-mosquito-dengue-malaria-2024',
        topic: 'mosquito_borne',
        language: 'en',
        title: 'Severe Dengue Warning Signs: When to Seek Immediate Hospital Care',
        section: 'Emergency Warning Signs — Section 3',
        page: 7,
        text: 'Severe dengue is a life-threatening medical emergency due to plasma leakage, fluid accumulation, respiratory distress, severe bleeding, or organ impairment. Warning signs typically appear 3 to 7 days after first symptoms, often as fever drops: persistent vomiting (more than 3 times in 24 hours), severe abdominal pain, rapid breathing, bleeding gums or nose, blood in vomit or stools, and extreme lethargy or restlessness. Patients showing any warning sign must be hospitalized immediately.',
        keywords: ['severe dengue', 'warning signs', 'bleeding', 'vomiting', 'abdominal pain', 'emergency', 'hospital', 'platelets']
      },
      {
        id: 'chunk-mosq-03',
        version_id: 'v3.2',
        document_id: 'who-mosquito-dengue-malaria-2024',
        topic: 'mosquito_borne',
        language: 'en',
        title: 'Vector Control and Personal Prevention Guidelines',
        section: 'Prevention and Environmental Control — Section 5',
        page: 12,
        text: 'The primary mosquito vector for dengue, Aedes aegypti, bites primarily during daytime (early morning and late afternoon) and breeds in domestic standing water. Prevention requires: 1) Emptying, scrubbing, and covering water storage containers, flower vases, and discarded tyres weekly; 2) Using insect repellent containing DEET, Picaridin, or IR3535 on exposed skin; 3) Wearing long-sleeved light-colored clothing; and 4) Sleeping under insecticide-treated bed nets (ITNs) to prevent nocturnal malaria transmission.',
        keywords: ['prevention', 'mosquito net', 'standing water', 'repellent', 'deet', 'aedes', 'anopheles', 'vector control']
      }
    ]
  },

  // Topic 2: Child health & growth
  {
    id: 'who-child-growth-standards-2024',
    title: 'WHO Child Growth Standards: Guidelines for Growth Assessment and Monitoring',
    publisher: 'World Health Organization (WHO)',
    category: 'health_education',
    collection_name: 'approved_health_knowledge',
    topic: 'child_growth',
    jurisdiction: 'Global / WHO Tools & Regional Repositories',
    original_url: 'https://www.who.int/tools/child-growth-standards',
    language: 'en',
    current_version: 'v2.0',
    status: 'indexed',
    publication_date: '2024-01-18',
    review_date: '2024-03-20',
    reviewer_name: 'Dr. K. Jayasree (Pediatrician & Child Growth Standards Specialist)',
    license_notes: 'Open Access WHO Tools',
    summary: 'Interpretation principles for WHO Child Growth Standards (length/height-for-age, weight-for-age, BMI-for-age), z-scores, and longitudinal growth tracking boundaries.',
    chunks: [
      {
        id: 'chunk-growth-01',
        version_id: 'v2.0',
        document_id: 'who-child-growth-standards-2024',
        topic: 'child_growth',
        language: 'en',
        title: 'Principles and Foundation of the WHO Child Growth Standards',
        section: 'Overview & Principles — Chapter 1',
        page: 5,
        text: 'The WHO Child Growth Standards establish how children worldwide should grow under optimal nutritional, environmental, and healthcare conditions. Developed from the Multicentre Growth Reference Study (MGRS) across six countries, the standards demonstrate that healthy breastfed children from diverse ethnic backgrounds follow identical physiological growth patterns when raised in supportive environments.',
        keywords: ['child growth', 'who standards', 'infant growth', 'growth charts', 'breastfeeding', 'pediatric']
      },
      {
        id: 'chunk-growth-02',
        version_id: 'v2.0',
        document_id: 'who-child-growth-standards-2024',
        topic: 'child_growth',
        language: 'en',
        title: 'Interpreting Growth Curves and Z-Scores: Screening Principles',
        section: 'Z-Scores and Statistical Interpretation — Chapter 3',
        page: 14,
        text: 'Growth charts use standard deviation scores (z-scores) relative to the median. Measurements between -2 and +2 z-scores (3rd to 97th percentiles) encompass normal healthy biological variation. A single plotted point is a screening indicator, not a clinical diagnosis. Health professionals evaluate the growth trajectory over successive monthly visits: crossing two or more major percentile lines downward indicates growth faltering, warranting clinical dietary and developmental evaluation.',
        keywords: ['z-score', 'percentiles', 'growth curve', 'interpretation', 'trajectory', 'screening', 'growth faltering']
      },
      {
        id: 'chunk-growth-03',
        version_id: 'v2.0',
        document_id: 'who-child-growth-standards-2024',
        topic: 'child_growth',
        language: 'en',
        title: 'Understanding Stunting, Wasting, and When to Seek Pediatric Care',
        section: 'Malnutrition Screening Thresholds — Chapter 5',
        page: 28,
        text: 'Stunting (length/height-for-age below -2 z-scores) reflects chronic undernutrition and frequent infections. Wasting (weight-for-length/height below -2 z-scores) indicates acute, severe nutritional deficit requiring urgent supplemental feeding and medical attention. If a child stops gaining weight, shows persistent lack of energy, or crosses below -2 z-scores, consult an accredited pediatrician or anganwadi nutrition worker for tailored clinical assessment.',
        keywords: ['stunting', 'wasting', 'underweight', 'malnutrition', 'pediatrician', 'anganwadi', 'nutrition']
      }
    ]
  },

  // Topic 3: Common symptoms / fever / when to seek care
  {
    id: 'paho-who-fever-symptoms-2024',
    title: 'PAHO / WHO Educational Guide: Managing Fever and Common Symptoms Safely',
    publisher: 'Pan American Health Organization (PAHO/IRIS) & WHO',
    category: 'health_education',
    collection_name: 'approved_health_knowledge',
    topic: 'common_symptoms_fever',
    jurisdiction: 'Pan American (PAHO IRIS) & WHO Global Guidelines',
    original_url: 'https://iris.paho.org/',
    language: 'en',
    current_version: 'v2.5',
    status: 'indexed',
    publication_date: '2024-02-14',
    review_date: '2024-04-12',
    reviewer_name: 'Dr. E. Gomez & Dr. R. Sundaram (Clinical Emergency Reviewers)',
    license_notes: 'Open Access PAHO IRIS Repository',
    summary: 'Evidence-based understanding of acute fever, home comfort measures, safe hydration, explicit boundary against self-diagnosis, and critical danger signs.',
    chunks: [
      {
        id: 'chunk-fever-01',
        version_id: 'v2.5',
        document_id: 'paho-who-fever-symptoms-2024',
        topic: 'common_symptoms_fever',
        language: 'en',
        title: 'Understanding Fever as a Physiological Response and Home Care',
        section: 'Physiological Overview — Module 1',
        page: 4,
        text: 'Fever is an elevated body temperature (above 38.0°C or 100.4°F) that serves as the body\'s natural defense mechanism to fight viral or bacterial pathogens. Basic supportive home care includes: offering ample fluids (clean water, oral rehydration solutions, soups) to prevent dehydration, dressing in lightweight breathable cotton clothing, and keeping room temperature comfortable. Sponging with cold water or alcohol is strictly unsafe and discouraged.',
        keywords: ['fever', 'temperature', 'hydration', 'fluids', 'home care', 'oral rehydration', 'infection']
      },
      {
        id: 'chunk-fever-02',
        version_id: 'v2.5',
        document_id: 'paho-who-fever-symptoms-2024',
        topic: 'common_symptoms_fever',
        language: 'en',
        title: 'Red Flag Symptoms: When Fever Requires Immediate Emergency Evaluation',
        section: 'Emergency Red Flags — Module 3',
        page: 9,
        text: 'Seek immediate emergency medical care if fever is accompanied by: 1) Any fever in an infant under 3 months old; 2) Stiff neck, inability to touch chin to chest, or intense light sensitivity (photophobia); 3) New pinpoint red-purple spots on the skin that do not fade when pressed (petechial rash); 4) Difficulty breathing, rapid grunting respirations; 5) Inconsolable crying, extreme drowsiness, or inability to wake up; or 6) Febrile seizures or confusion.',
        keywords: ['fever red flags', 'stiff neck', 'infant fever', 'rash', 'drowsiness', 'emergency', 'convulsions', 'when to seek care']
      },
      {
        id: 'chunk-fever-03',
        version_id: 'v2.5',
        document_id: 'paho-who-fever-symptoms-2024',
        topic: 'common_symptoms_fever',
        language: 'en',
        title: 'Preparing Questions for Your Doctor Regarding Fever and Symptoms',
        section: 'Doctor Consultation Preparation — Module 5',
        page: 15,
        text: 'Before visiting your doctor, maintain a temperature log noting when fever peaks, fluid intake, urine frequency, and associated symptoms like cough or vomiting. When meeting your clinician, ask: 1) What is the suspected cause of this fever? 2) How many days should we expect it to last? 3) Exactly what red flags would require us to return to the emergency room? 4) What is the safe, age-appropriate dosage for fever relief if discomfort persists?',
        keywords: ['questions for doctor', 'fever log', 'temperature tracking', 'consultation', 'physician']
      }
    ]
  },

  // ==========================================
  // COLLECTION 2: GOVERNMENT SCHEME KNOWLEDGE
  // ==========================================

  // Topic 4: Government schemes (Ayushman Bharat PM-JAY & WHO Universal Health Coverage context)
  {
    id: 'pmjay-official-scheme-2024',
    title: 'Ayushman Bharat PM-JAY & ABHA Health Account Official Guidelines (with WHO UHC Context)',
    publisher: 'National Health Authority (NHA), myScheme India & WHO Universal Health Coverage (UHC)',
    category: 'healthcare_scheme',
    collection_name: 'scheme_knowledge',
    topic: 'scheme_pmjay',
    jurisdiction: 'India (National) / WHO Universal Health Coverage Alignment',
    original_url: 'https://nha.gov.in/PM-JAY',
    language: 'en',
    current_version: 'v4.5',
    status: 'indexed',
    publication_date: '2024-01-01',
    review_date: '2024-05-02',
    reviewer_name: 'Rajesh Sharma & WHO Health Financing Team (Policy Analysts)',
    license_notes: 'Government of India Open Data License & WHO UHC Partnership',
    summary: 'Eligibility criteria, ₹5 lakh health cover, cashless hospitalization, ABHA account creation, required documents, and WHO UHC financial protection context.',
    chunks: [
      {
        id: 'chunk-sch-01',
        version_id: 'v4.5',
        document_id: 'pmjay-official-scheme-2024',
        topic: 'scheme_pmjay',
        language: 'en',
        title: 'Ayushman Bharat PM-JAY Benefits, ₹5 Lakh Cover, and WHO UHC Context',
        section: 'Scheme Overview & UHC Objectives — Clause 1.1',
        page: 4,
        text: 'Ayushman Bharat Pradhan Mantri Jan Arogya Yojana (AB PM-JAY) is aligned with WHO Universal Health Coverage (UHC) goals to shield vulnerable populations from catastrophic healthcare expenditures. The scheme provides a defined health benefit cover of up to ₹5,00,000 (Five Lakh Rupees) per eligible family per year for secondary and tertiary care hospitalization. The scheme is completely cashless and paperless at all empaneled public and private healthcare facilities nationwide.',
        keywords: ['pm-jay', 'ayushman bharat', '5 lakh', 'health cover', 'insurance', 'cashless', 'uhc', 'universal health coverage', 'free treatment']
      },
      {
        id: 'chunk-sch-02',
        version_id: 'v4.5',
        document_id: 'pmjay-official-scheme-2024',
        topic: 'scheme_pmjay',
        language: 'en',
        title: 'Eligibility Verification: SECC 2011 and Official Search Portals',
        section: 'Eligibility Criteria & Verification — Clause 2.4',
        page: 11,
        text: 'PM-JAY eligibility is pre-determined based on Socio-Economic and Caste Census (SECC 2011) deprivation criteria for rural households (categories D1 to D7) and occupational categories for urban households. Citizens can verify eligibility without fees by: 1) Searching the official portal at mera.pmjay.gov.in; 2) Calling the national toll-free helpline 14555; or 3) Meeting an Ayushman Mitra stationed at any empaneled hospital.',
        keywords: ['eligibility', 'check status', 'secc 2011', '14555', 'beneficiary', 'ayushman mitra', 'mera.pmjay.gov.in']
      },
      {
        id: 'chunk-sch-03',
        version_id: 'v4.5',
        document_id: 'pmjay-official-scheme-2024',
        topic: 'scheme_pmjay',
        language: 'en',
        title: 'Mandatory Documents Required to Generate Ayushman Card',
        section: 'Required Documents & Card Issuance — Clause 3.2',
        page: 16,
        text: 'To generate the Ayushman Card (Golden Card) and receive cashless admission, beneficiaries must present: 1) Government photo identity proof (Aadhaar Card or approved government photo ID); 2) Proof of family identification (Ration Card, PM letter, or State Family ID); and 3) An active mobile phone for OTP verification. Generating the Ayushman Card at Common Service Centres (CSCs) or public hospitals is completely free of cost.',
        keywords: ['documents', 'aadhaar', 'ration card', 'ayushman card', 'golden card', 'ekyc', 'photo id', 'free card']
      },
      {
        id: 'chunk-sch-04',
        version_id: 'v4.5',
        document_id: 'pmjay-official-scheme-2024',
        topic: 'scheme_pmjay',
        language: 'en',
        title: 'Creating an ABHA (Ayushman Bharat Health Account) Digital ID',
        section: 'Digital Health Mission & Health Records — Clause 5.1',
        page: 25,
        text: 'The Ayushman Bharat Health Account (ABHA) is a unique 14-digit digital health identification under the Ayushman Bharat Digital Mission (ABDM). Any citizen can create their ABHA number free in minutes at healthid.ndhm.gov.in or through the ABHA mobile app using Aadhaar or driving license. ABHA facilitates secure, consent-based digital storage and sharing of diagnostic lab reports and medical prescriptions across participating hospitals.',
        keywords: ['abha', 'digital health id', '14 digit', 'health record', 'abdm', 'ndhm', 'digital account']
      }
    ]
  },

  // Supporting Existing Reviewed Topics
  {
    id: 'who-diabetes-2023',
    title: 'WHO Guidelines on Diagnosis and Management of Type 2 Diabetes',
    publisher: 'World Health Organization (WHO)',
    category: 'health_education',
    collection_name: 'approved_health_knowledge',
    topic: 'diabetes',
    jurisdiction: 'Global / South-East Asia',
    original_url: 'https://www.who.int/news-room/fact-sheets/detail/diabetes',
    language: 'en',
    current_version: 'v2.1',
    status: 'indexed',
    publication_date: '2023-04-05',
    review_date: '2024-01-15',
    reviewer_name: 'Dr. S. K. Rao (Consultant Diabetologist & Clinical Reviewer)',
    license_notes: 'Open Access CC BY-NC-SA 3.0 IGO',
    summary: 'Evidence-based guidance on dietary management, HbA1c monitoring, regular physical activity, and identification of hypoglycemia.',
    chunks: [
      {
        id: 'chunk-dia-01',
        version_id: 'v2.1',
        document_id: 'who-diabetes-2023',
        topic: 'diabetes',
        language: 'en',
        title: 'Dietary Habits and Blood Sugar Control in Type 2 Diabetes',
        section: 'Lifestyle Interventions — Section 3.1',
        page: 12,
        text: 'A balanced diet rich in dietary fiber—including whole grains, legumes, pulses, vegetables, and low-glycemic fruits—helps moderate postprandial glucose surges. Highly refined carbohydrates, sweetened beverages, and ultra-processed foods should be restricted. Spacing meals consistently throughout the day prevents acute swings in blood sugar.',
        keywords: ['diet', 'food', 'sugar', 'glucose', 'meals', 'fiber', 'carbohydrates', 'fruits']
      },
      {
        id: 'chunk-dia-02',
        version_id: 'v2.1',
        document_id: 'who-diabetes-2023',
        topic: 'diabetes',
        language: 'en',
        title: 'Physical Activity Recommendations for Adults with Diabetes',
        section: 'Physical Activity — Section 4.2',
        page: 18,
        text: 'Adults with type 2 diabetes are advised to engage in at least 150 minutes of moderate-intensity aerobic physical activity per week, such as brisk walking, cycling, or swimming, spread over at least 3 days with no more than two consecutive days without exercise. Muscle-strengthening activities 2 to 3 days weekly provide additional insulin-sensitizing benefits.',
        keywords: ['exercise', 'walking', 'physical activity', 'aerobic', 'workout', 'fitness']
      },
      {
        id: 'chunk-dia-03',
        version_id: 'v2.1',
        document_id: 'who-diabetes-2023',
        topic: 'diabetes',
        language: 'en',
        title: 'Recognizing Hypoglycemia (Low Blood Sugar) and Immediate Care',
        section: 'Acute Complications — Section 6.4',
        page: 29,
        text: 'Hypoglycemia occurs when blood glucose drops below 70 mg/dL (3.9 mmol/L). Early symptoms include cold shakiness, sweating, palpitations, sudden hunger, dizziness, and irritability. Immediate self-care involves the "Rule of 15": ingest 15 grams of fast-acting glucose (e.g., 3-4 glucose tablets, half a cup of fruit juice, or 3 teaspoons of sugar in water), rest for 15 minutes, and re-check blood sugar. If confusion or loss of consciousness occurs, seek immediate emergency care.',
        keywords: ['hypoglycemia', 'low sugar', 'shivering', 'sweating', 'dizziness', 'rule of 15', 'glucose']
      }
    ]
  },
  {
    id: 'who-unicef-maternal-2023',
    title: 'WHO/UNICEF Infant and Young Child Feeding & Maternal Care Guidelines',
    publisher: 'WHO & UNICEF',
    category: 'health_education',
    collection_name: 'approved_health_knowledge',
    topic: 'maternal_care',
    jurisdiction: 'Global / India (MoHFW aligned)',
    original_url: 'https://www.who.int/health-topics/infant-and-young-child-feeding',
    language: 'en',
    current_version: 'v1.4',
    status: 'indexed',
    publication_date: '2023-06-11',
    review_date: '2024-02-10',
    reviewer_name: 'Dr. P. Anitha (Maternal & Child Health Specialist)',
    license_notes: 'Open Access WHO Press',
    summary: 'Exclusive breastfeeding standards, complementary feeding introduction, and maternal postpartum red flags.',
    chunks: [
      {
        id: 'chunk-mat-01',
        version_id: 'v1.4',
        document_id: 'who-unicef-maternal-2023',
        topic: 'maternal_care',
        language: 'en',
        title: 'Exclusive Breastfeeding in the First 6 Months of Life',
        section: 'Infant Nutrition — Chapter 2',
        page: 8,
        text: 'WHO and UNICEF universally recommend exclusive breastfeeding for the first 6 months (180 days) of life. Exclusive breastfeeding means the infant receives only breast milk without additional food, water, tea, or formula, with exceptions only for necessary oral rehydration solution, vitamin/mineral drops, or doctor-prescribed medicine.',
        keywords: ['breastfeeding', 'infant', 'mother', 'milk', 'newborn', 'baby', 'immunity', '6 months']
      }
    ]
  },
  {
    id: 'who-hypertension-2021',
    title: 'WHO Guideline for the Treatment of Hypertension',
    publisher: 'World Health Organization (WHO)',
    category: 'health_education',
    collection_name: 'approved_health_knowledge',
    topic: 'hypertension',
    jurisdiction: 'Global / National Health Mission',
    original_url: 'https://www.who.int/publications/i/item/9789240033986',
    language: 'en',
    current_version: 'v3.0',
    status: 'indexed',
    publication_date: '2021-08-25',
    review_date: '2024-03-01',
    reviewer_name: 'Dr. M. Venkat (Cardiovascular Health Specialist)',
    license_notes: 'Open Access WHO',
    summary: 'Blood pressure benchmarks, dietary sodium reduction, regular monitoring, and lifestyle modifications.',
    chunks: [
      {
        id: 'chunk-hyp-01',
        version_id: 'v3.0',
        document_id: 'who-hypertension-2021',
        topic: 'hypertension',
        language: 'en',
        title: 'Understanding Blood Pressure Readings and Thresholds',
        section: 'Clinical Diagnosis — Section 1.3',
        page: 9,
        text: 'Blood pressure is recorded as systolic over diastolic in mmHg. Normal resting blood pressure is generally under 120/80 mmHg. Hypertension is diagnosed when systolic blood pressure is persistently 140 mmHg or higher and/or diastolic is 90 mmHg or higher across two clinical measurements.',
        keywords: ['blood pressure', 'hypertension', 'systolic', 'diastolic', '120/80', '140/90', 'readings', 'bp']
      },
      {
        id: 'chunk-hyp-02',
        version_id: 'v3.0',
        document_id: 'who-hypertension-2021',
        topic: 'hypertension',
        language: 'en',
        title: 'Dietary Sodium Reduction for High Blood Pressure',
        section: 'Dietary Management — Section 2.1',
        page: 15,
        text: 'WHO strongly recommends reducing daily salt intake to less than 5 grams per day (under 2 grams of sodium, or about 1 level teaspoon of salt). High dietary sodium stiffens blood vessels and elevates pressure. Concurrently increasing dietary potassium through natural foods lowers cardiovascular strain.',
        keywords: ['salt', 'sodium', 'potassium', 'diet', 'bananas', 'greens', 'reduce salt']
      }
    ]
  }
];

export const TELUGU_APPROVED_PASSAGES = [
  {
    topic: 'mosquito_borne',
    title: 'డెంగ్యూ మరియు మలేరియా వ్యాధుల లక్షణాలు, నివారణ మరియు అత్యవసర జాగ్రత్తలు',
    short_answer: 'డెంగ్యూలో అకస్మాత్తుగా అధిక జ్వరం, తీవ్రమైన తలనొప్పి, కళ్ళ వెనుక నొప్పి, కండరాల నొప్పులు మరియు వాంతులు ఉంటాయి. మలేరియాలో తీవ్రమైన చలి, వణుకుతో కూడిన జ్వరం మరియు చెమటలు పడతాయి. నిలిచి ఉన్న నీటిని తొలగించడం మరియు దోమల తెరలు వాడటం ద్వారా నివారించవచ్చు.',
    detail: 'తీవ్రమైన డెంగ్యూ హెచ్చరిక సంకేతాలు: ఆగకుండా వాంతులు కావడం, తీవ్రమైన కడుపు నొప్పి, చిగుళ్ళు లేదా ముక్కు నుండి రక్తస్రావం కావడం, మరియు విపరీతమైన నీరసం. ఈ లక్షణాలు కనిపిస్తే ఆలస్యం చేయకుండా వెంటనే ఆసుపత్రి అత్యవసర విభాగానికి (Emergency/Casualty) వెళ్లాలి.',
    source: 'WHO డెంగ్యూ & మలేరియా మార్గదర్శకాలు (2024)'
  },
  {
    topic: 'child_growth',
    title: 'పిల్లల పెరుగుదల ప్రమాణాలు (WHO Child Growth Standards) మరియు పోషకాహారం',
    short_answer: 'WHO పిల్లల పెరుగుదల చార్టులు పిల్లలు ఆరోగ్యకరమైన వాతావరణంలో ఎలా ఎదగాలో తెలుపుతాయి. ఎత్తుకు తగ్గ బరువు, వయస్సుకు తగ్గ బరువును Z-స్కోర్ ద్వారా లెక్కిస్తారు. ఇది కేవలం పరిశీలనా సాధనం మాత్రమే, వ్యక్తిగత రోగ నిర్ధారణ కాదు.',
    detail: 'పిల్లల పెరుగుదల రేఖను ప్రతి నెలా పరిశీలించాలి. బరువు పెరగకపోవడం లేదా వరుసగా తగ్గడం జరిగితే అంగన్‌వాడీ లేదా పిల్లల వైద్యుడిని సంప్రదించాలి. పిల్లలకు పోషకాహార లోపం రాకుండా తల్లి పాలు మరియు 6 నెలల తర్వాత సమతుల్య ఆహారం అందించాలి.',
    source: 'WHO పిల్లల పెరుగుదల మార్గదర్శకాలు'
  },
  {
    topic: 'common_symptoms_fever',
    title: 'జ్వరం మరియు సాధారణ లక్షణాలు వచ్చినప్పుడు తీసుకోవాల్సిన జాగ్రత్తలు (PAHO/WHO)',
    short_answer: 'జ్వరం (38°C లేదా 100.4°F కంటే ఎక్కువ) అనేది శరీరం ఇన్ఫెక్షన్‌తో పోరాడే సహజ రక్షణ ప్రక్రియ. పుష్కలంగా నీరు, ఓఆర్ఎస్ ద్రవాలు తాగించడం, వదులుగా ఉండే నూలు బట్టలు వేయడం మంచిది. చల్లని నీటితో స్పాంజ్ చేయడం ప్రమాదకరం.',
    detail: 'అత్యవసర హెచ్చరిక సంకేతాలు: 3 నెలల లోపు శిశువులకు జ్వరం వచ్చినా, మెడ బిగుసుకుపోయినా, ఒంటిపై ఎర్రటి దద్దుర్లు వచ్చినా, శ్వాస తీసుకోవడంలో తీవ్రమైన ఇబ్బంది ఉన్నా లేదా స్పృహ తప్పినా వెంటనే అత్యవసర వైద్య సహాయం పొందాలి.',
    source: 'PAHO IRIS & WHO జ్వర నిర్వహణ మార్గదర్శకాలు'
  },
  {
    topic: 'scheme_pmjay',
    title: 'ఆయుష్మాన్ భారత్ పిఎం-జేవై మరియు ఆభా కార్డ్ మార్గదర్శకాలు',
    short_answer: 'ఆయుష్మాన్ భారత్ PM-JAY పథకం ద్వారా అర్హత గల ప్రతి కుటుంబానికి ఏటా ₹5,00,000 (ఐదు లక్షల రూపాయలు) వరకు ఉచిత మరియు నగదు రహిత ఆసుపత్రి చికిత్స లభిస్తుంది. అర్హతను 14555 నంబర్‌కు ఫోన్ చేసి లేదా mera.pmjay.gov.in లో పరిశీలించవచ్చు.',
    detail: 'ఆయుష్మాన్ కార్డ్ పొందడానికి ఆధార్ కార్డ్, రేషన్ కార్డ్ మరియు రిజిస్టర్డ్ మొబైల్ నంబర్ అవసరం. ప్రభుత్వ కేంద్రాలు మరియు ఆసుపత్రులలోని ఆయుష్మాన్ మిత్ర వద్ద ఈ కార్డ్ ఉచితంగా తీసుకోవచ్చు. అలాగే 14 అంకెల ఆభా (ABHA) డిజిటల్ హెల్త్ ఐడీ ద్వారా మీ వైద్య రికార్డులను సురక్షితంగా ఫోన్‌లో భద్రపరుచుకోవచ్చు.',
    source: 'నేషనల్ హెల్త్ అథారిటీ (NHA) & myScheme ఇండియా'
  },
  {
    topic: 'diabetes',
    title: 'టైప్ 2 మధుమేహం (షుగర్ వ్యాధి) ఆహార మరియు జీవనశైలి మార్గదర్శకాలు',
    short_answer: 'పీచు పదార్థాలు (ఫైబర్) ఎక్కువగా ఉండే తృణధాన్యాలు, కూరగాయలు మరియు పప్పుదినుసులు తినడం ద్వారా రక్తంలో గ్లూకోజ్ స్థాయిలను అదుపులో ఉంచుకోవచ్చు. తీపి పానీయాలు మరియు శుద్ధి చేసిన పిండి పదార్థాలను తగ్గించాలి.',
    detail: 'రక్తంలో గ్లూకోజ్ 70 mg/dL కంటే తగ్గితే అది హైపోగ్లైసీమియా (తక్కువ షుగర్). వణుకు, చమటలు ఉంటే వెంటనే 15 గ్రాముల గ్లూకోజ్ లేదా 3 చెంచాల పంచదార నీటిలో కలుపుకొని తాగాలి.',
    source: 'WHO టైప్ 2 మధుమేహ మార్గదర్శకాలు (2023)'
  },
  {
    topic: 'maternal_care',
    title: 'శిశు సంరక్షణ మరియు తల్లి పాలిచ్చే విధానం',
    short_answer: 'శిశువు పుట్టిన మొదటి 6 నెలల పాటు కేవలం తల్లి పాలు మాత్రమే ఇవ్వాలి. నీరు లేదా ఇతర ద్రవాలు అవసరం లేదు. తల్లి పాలు శిశువుకు వ్యాధి నిరోధక శక్తిని అందిస్తాయి.',
    detail: '6 నెలలు పూర్తయిన తర్వాత తల్లి పాలతో పాటు శుభ్రమైన, పోషక విలువలు గల ఉడికించిన మెత్తని ఆహారం ప్రారంభించాలి.',
    source: 'WHO & UNICEF శిశు ఆహార మార్గదర్శకాలు'
  },
  {
    topic: 'hypertension',
    title: 'రక్తపోటు (బీపీ) నియంత్రణ మరియు ఉప్పు వినియోగం',
    short_answer: 'సాధారణ రక్తపోటు 120/80 mmHg లోపు ఉంటుంది. నిరంతరం 140/90 mmHg లేదా అంతకంటే ఎక్కువ ఉంటే అది అధిక రక్తపోటు (హైపర్‌టెన్షన్). రోజూ తినే ఉప్పును రోజుకు 5 గ్రాముల కంటే తక్కువగా పరిమితం చేయాలి.',
    detail: 'పొటాషియం సమృద్ధిగా ఉండే ఆకుకూరలు తినడం, రోజూ కనీసం 30 నిమిషాల వ్యాయామం చేయడం వల్ల రక్తపోటు అదుపులో ఉంటుంది.',
    source: 'WHO రక్తపోటు చికిత్సా మార్గదర్శకాలు (2021)'
  }
];

export const EMERGENCY_CONTACTS = [
  {
    name: 'National Emergency Response (Police, Fire, Ambulance)',
    number: '112',
    description: 'All-in-one national unified emergency helpline across India.',
    action: 'tel:112'
  },
  {
    name: 'Emergency Medical & Ambulance Service',
    number: '108',
    description: '24/7 Free emergency ambulance dispatch for medical and trauma emergencies.',
    action: 'tel:108'
  },
  {
    name: 'Maternal & Child Health Ambulance',
    number: '102',
    description: 'Dedicated transport for pregnant women, mothers, and sick infants.',
    action: 'tel:102'
  },
  {
    name: 'National Health Helpline (MoHFW)',
    number: '1075',
    description: 'Toll-free national health information, public health alerts, and hospital guidance.',
    action: 'tel:1075'
  },
  {
    name: 'Ayushman Bharat PM-JAY Official Helpline',
    number: '14555',
    description: 'Check eligibility, empaneled hospital locations, and grievance support.',
    action: 'tel:14555'
  },
  {
    name: 'Tele-MANAS Mental Health Support',
    number: '14416',
    description: '24/7 Free and confidential psychological support and crisis counseling in regional languages.',
    action: 'tel:14416'
  }
];

export const EVALUATION_BENCHMARK_QUESTIONS = [
  {
    topic: 'mosquito_borne',
    question: 'What are the emergency warning signs of severe dengue that require immediate hospitalization?',
    expected_status: 'supported_by_reviewed_sources',
    expected_source_id: 'who-mosquito-dengue-malaria-2024',
    expected_chunk_id: 'chunk-mosq-02',
    collection: 'approved_health_knowledge'
  },
  {
    topic: 'child_growth',
    question: 'How should parents interpret WHO Child Growth Standard percentiles and z-scores?',
    expected_status: 'supported_by_reviewed_sources',
    expected_source_id: 'who-child-growth-standards-2024',
    expected_chunk_id: 'chunk-growth-02',
    collection: 'approved_health_knowledge'
  },
  {
    topic: 'common_symptoms_fever',
    question: 'When does a fever in a child require immediate emergency medical care?',
    expected_status: 'supported_by_reviewed_sources',
    expected_source_id: 'paho-who-fever-symptoms-2024',
    expected_chunk_id: 'chunk-fever-02',
    collection: 'approved_health_knowledge'
  },
  {
    topic: 'scheme_pmjay',
    question: 'What documents are required to apply for Ayushman Bharat PM-JAY and generate the Golden Card?',
    expected_status: 'supported_by_reviewed_sources',
    expected_source_id: 'pmjay-official-scheme-2024',
    expected_chunk_id: 'chunk-sch-03',
    collection: 'scheme_knowledge'
  }
];
