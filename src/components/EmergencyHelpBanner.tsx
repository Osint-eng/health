import React, { useState } from 'react';
import { AlertTriangle, PhoneCall, X, ShieldAlert, HeartPulse } from 'lucide-react';
import { EMERGENCY_CONTACTS } from '../data/reviewedKnowledge';
import { Language } from '../types';

interface EmergencyHelpBannerProps {
  language: Language;
  onNavigateUrgentPage?: () => void;
}

export const EmergencyHelpBanner: React.FC<EmergencyHelpBannerProps> = ({
  language,
  onNavigateUrgentPage,
}) => {
  const [showModal, setShowModal] = useState(false);
  const isTe = language === 'te';

  return (
    <>
      {/* Persistent Top Emergency Bar */}
      <div className="bg-gradient-to-r from-red-700 via-rose-700 to-red-800 text-white px-4 py-2 text-xs md:text-sm font-medium flex items-center justify-between shadow-sm border-b border-red-900/20">
        <div className="flex items-center space-x-2 truncate mr-2">
          <AlertTriangle className="w-4 h-4 text-amber-300 shrink-0 animate-pulse" />
          <span className="truncate">
            {isTe ? (
              <span className="font-telugu">
                <strong>వైద్య అత్యవసర పరిస్థితి?</strong> వెంటనే <strong>108</strong> (అంబులెన్స్) లేదా <strong>112</strong> కు కాల్ చేయండి.
              </span>
            ) : (
              <span>
                <strong>Medical Emergency?</strong> For severe symptoms, dial <strong>108</strong> (Ambulance) or <strong>112</strong> immediately.
              </span>
            )}
          </span>
        </div>
        <div className="flex items-center space-x-2 shrink-0">
          <button
            onClick={() => setShowModal(true)}
            className="px-2.5 py-1 bg-white/20 hover:bg-white/30 text-white rounded-lg text-xs font-semibold flex items-center space-x-1 transition-colors"
          >
            <PhoneCall className="w-3.5 h-3.5 mr-1" />
            <span>{isTe ? 'అత్యవసర నంబర్లు' : 'Emergency Helplines'}</span>
          </button>
        </div>
      </div>

      {/* Emergency Helplines Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-red-200 overflow-hidden relative">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-700 rounded-full hover:bg-slate-100"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-red-100 flex items-center justify-center text-red-600 shrink-0">
                <ShieldAlert className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900">
                  {isTe ? 'తక్షణ అత్యవసర సహాయం (Emergency)' : 'Immediate Emergency Contacts'}
                </h3>
                <p className="text-xs text-red-700 font-medium">
                  {isTe
                    ? 'ఆరోగ్య వాయిస్ అత్యవసర పరిస్థితులను అంచనా వేయదు. దయచేసి అధికారిక నంబర్లకు సంప్రదించండి.'
                    : 'Arogya Voice cannot assess or handle acute medical emergencies.'}
                </p>
              </div>
            </div>

            <div className="p-3 bg-red-50 border border-red-200 rounded-xl mb-4 text-xs text-red-950">
              <p className="font-semibold mb-1 flex items-center">
                <HeartPulse className="w-4 h-4 text-red-600 mr-1.5 shrink-0" />
                {isTe ? 'కింది లక్షణాలు ఉంటే ఆలస్యం చేయవద్దు:' : 'Seek immediate emergency hospital care for:'}
              </p>
              <ul className="list-disc list-inside space-y-0.5 text-slate-800 ml-1">
                <li>{isTe ? 'తీవ్రమైన ఛాతీ నొప్పి, భుజం లేదా దవడ నొప్పి' : 'Severe crushing chest, jaw, or left-arm pain'}</li>
                <li>{isTe ? 'శ్వాస ఆడకపోవడం లేదా గొంతు బిగుసుకుపోవడం' : 'Acute shortness of breath or choking'}</li>
                <li>{isTe ? 'హఠాత్తుగా ముఖం లేదా కాళ్లు, చేతులు పడిపోవడం (పక్షవాతం)' : 'Sudden facial droop, arm weakness, or slurred speech'}</li>
                <li>{isTe ? 'నిరంతర రక్తస్రావం లేదా స్పృహ తప్పడం' : 'Uncontrolled bleeding or loss of consciousness'}</li>
              </ul>
            </div>

            <div className="space-y-2.5 max-h-64 overflow-y-auto pr-1">
              {EMERGENCY_CONTACTS.map((contact) => (
                <div
                  key={contact.number}
                  className="flex items-center justify-between p-3 rounded-xl border border-slate-200 bg-slate-50/80 hover:bg-slate-100/90 transition-colors"
                >
                  <div className="pr-2">
                    <div className="font-semibold text-slate-900 text-sm">{contact.name}</div>
                    <div className="text-xs text-slate-600">{contact.description}</div>
                  </div>
                  <a
                    href={contact.action}
                    className="flex items-center space-x-1.5 px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white rounded-lg text-xs font-bold shrink-0 transition-transform active:scale-95 shadow-sm"
                  >
                    <PhoneCall className="w-3.5 h-3.5" />
                    <span>{contact.number}</span>
                  </a>
                </div>
              ))}
            </div>

            <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between">
              {onNavigateUrgentPage && (
                <button
                  onClick={() => {
                    setShowModal(false);
                    onNavigateUrgentPage();
                  }}
                  className="text-xs font-semibold text-red-700 hover:underline"
                >
                  {isTe ? 'పూర్తి అత్యవసర గైడ్ చూడండి →' : 'View Full Urgent Help Protocol →'}
                </button>
              )}
              <button
                onClick={() => setShowModal(false)}
                className="ml-auto px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-800 text-xs font-semibold rounded-lg"
              >
                {isTe ? 'మూసివేయి' : 'Close'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
