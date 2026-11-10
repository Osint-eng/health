import React from 'react';
import {
  Home,
  Mic,
  BookOpen,
  Bookmark,
  Settings,
  ShieldAlert,
  Sliders,
  Sparkles,
} from 'lucide-react';
import { Language } from '../types';

export type NavTab = 'home' | 'ask' | 'library' | 'history' | 'settings' | 'admin' | 'urgent';

interface NavigationProps {
  currentTab: NavTab;
  language: Language;
  onSelectTab: (tab: NavTab) => void;
}

export const Navigation: React.FC<NavigationProps> = ({
  currentTab,
  language,
  onSelectTab,
}) => {
  const isTe = language === 'te';

  const navItems = [
    { id: 'home', labelEn: 'Home', labelTe: 'హోమ్', icon: Home },
    { id: 'ask', labelEn: 'Ask Arogya', labelTe: 'ప్రశ్నించండి', icon: Mic, highlight: true },
    { id: 'library', labelEn: 'Health Library', labelTe: 'లైబ్రరీ', icon: BookOpen },
    { id: 'history', labelEn: 'Saved History', labelTe: 'భద్రపరిచినవి', icon: Bookmark },
    { id: 'settings', labelEn: 'Settings', labelTe: 'సెట్టింగ్‌లు', icon: Settings },
  ];

  return (
    <>
      {/* Desktop Left Sidebar */}
      <aside className="hidden md:flex flex-col w-64 bg-white border-r border-slate-200/90 h-screen sticky top-0 shrink-0 z-30 select-none">
        {/* App Title & Brand Header */}
        <div className="p-5 border-b border-slate-100 flex items-center space-x-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-teal-800 to-teal-600 flex items-center justify-center text-white shadow-md shadow-teal-900/10">
            <Sparkles className="w-5 h-5 text-teal-200" />
          </div>
          <div>
            <h1 className="font-extrabold text-slate-900 tracking-tight text-lg">Arogya Voice</h1>
            <p className="text-[11px] font-semibold text-teal-700 uppercase tracking-wider">
              {isTe ? 'అధికారిక ఆరోగ్య వేదిక' : 'Source-Grounded MVP'}
            </p>
          </div>
        </div>

        {/* Primary Navigation Links */}
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = currentTab === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => onSelectTab(item.id as NavTab)}
                className={`w-full flex items-center space-x-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                  active
                    ? 'bg-teal-700 text-white shadow-sm shadow-teal-700/20'
                    : 'text-slate-600 hover:text-teal-900 hover:bg-teal-50/70'
                } ${item.highlight && !active ? 'border border-teal-200/80 bg-teal-50/40 text-teal-900' : ''}`}
              >
                <Icon className={`w-4 h-4 ${active ? 'text-white' : 'text-slate-500'}`} />
                <span className={isTe ? 'font-telugu' : ''}>
                  {isTe ? item.labelTe : item.labelEn}
                </span>
              </button>
            );
          })}

          {/* Urgent Emergency Quick Link */}
          <div className="pt-4 mt-4 border-t border-slate-100">
            <button
              type="button"
              onClick={() => onSelectTab('urgent')}
              className={`w-full flex items-center space-x-3 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                currentTab === 'urgent'
                  ? 'bg-red-700 text-white shadow-xs'
                  : 'text-red-700 hover:bg-red-50 border border-red-200/60'
              }`}
            >
              <ShieldAlert className="w-4 h-4 text-red-600 shrink-0" />
              <span>{isTe ? 'అత్యవసర హెల్ప్‌లైన్లు (108)' : 'Urgent Emergency Helplines'}</span>
            </button>
          </div>
        </nav>

        {/* Admin Navigation Footer */}
        <div className="p-3 border-t border-slate-100 bg-slate-50/80">
          <button
            type="button"
            onClick={() => onSelectTab('admin')}
            className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
              currentTab === 'admin'
                ? 'bg-slate-900 text-white'
                : 'text-slate-600 hover:bg-slate-200/70'
            }`}
          >
            <div className="flex items-center space-x-2">
              <Sliders className="w-3.5 h-3.5 text-slate-500" />
              <span>{isTe ? 'అడ్మిన్ & సమీక్ష పోర్టల్' : 'Admin & Review Portal'}</span>
            </div>
            <span className="text-[10px] bg-slate-200 text-slate-700 px-1.5 py-0.5 rounded font-bold">
              v1.0
            </span>
          </button>
        </div>
      </aside>

      {/* Mobile Bottom Navigation Bar */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 px-2 py-1 shadow-lg select-none">
        <div className="flex items-center justify-around max-w-lg mx-auto">
          {navItems.slice(0, 4).map((item) => {
            const Icon = item.icon;
            const active = currentTab === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => onSelectTab(item.id as NavTab)}
                className={`flex flex-col items-center justify-center py-1.5 px-3 rounded-xl transition-all ${
                  active ? 'text-teal-800' : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                <div
                  className={`p-1 rounded-lg ${
                    active ? 'bg-teal-100/70' : ''
                  }`}
                >
                  <Icon className="w-5 h-5" />
                </div>
                <span className="text-[11px] font-semibold mt-0.5 truncate max-w-[70px]">
                  {isTe ? item.labelTe : item.labelEn}
                </span>
              </button>
            );
          })}

          {/* Mobile Settings tab */}
          <button
            type="button"
            onClick={() => onSelectTab('settings')}
            className={`flex flex-col items-center justify-center py-1.5 px-3 rounded-xl transition-all ${
              currentTab === 'settings' ? 'text-teal-800' : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <div className={`p-1 rounded-lg ${currentTab === 'settings' ? 'bg-teal-100/70' : ''}`}>
              <Settings className="w-5 h-5" />
            </div>
            <span className="text-[11px] font-semibold mt-0.5 truncate">
              {isTe ? 'సెట్టింగ్స్' : 'Settings'}
            </span>
          </button>
        </div>
      </nav>
    </>
  );
};
