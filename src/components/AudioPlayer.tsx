import React, { useState } from 'react';
import { Play, Pause, Square, Volume2, FastForward } from 'lucide-react';
import { speechSynthesizer } from '../services/speech';
import { Language } from '../types';

interface AudioPlayerProps {
  textToSpeak: string;
  language: Language;
  defaultSpeed?: number;
  className?: string;
}

export const AudioPlayer: React.FC<AudioPlayerProps> = ({
  textToSpeak,
  language,
  defaultSpeed = 1.0,
  className = '',
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState<number>(defaultSpeed);
  const speeds = [0.75, 1.0, 1.25];

  const handlePlayToggle = () => {
    if (isPlaying) {
      speechSynthesizer.stop();
      setIsPlaying(false);
    } else {
      setIsPlaying(true);
      speechSynthesizer.speak(
        textToSpeak,
        language,
        speed,
        () => setIsPlaying(true),
        () => setIsPlaying(false),
        () => setIsPlaying(false)
      );
    }
  };

  const handleStop = () => {
    speechSynthesizer.stop();
    setIsPlaying(false);
  };

  const handleSpeedCycle = () => {
    const nextIdx = (speeds.indexOf(speed) + 1) % speeds.length;
    const newSpeed = speeds[nextIdx];
    setSpeed(newSpeed);

    if (isPlaying) {
      speechSynthesizer.stop();
      speechSynthesizer.speak(
        textToSpeak,
        language,
        newSpeed,
        () => setIsPlaying(true),
        () => setIsPlaying(false),
        () => setIsPlaying(false)
      );
    }
  };

  const isTe = language === 'te';

  return (
    <div
      className={`inline-flex items-center space-x-2 bg-slate-100/90 border border-slate-200/80 rounded-xl px-3 py-1.5 shadow-xs ${className}`}
    >
      <button
        type="button"
        onClick={handlePlayToggle}
        aria-label={isPlaying ? 'Pause spoken answer' : 'Listen to answer'}
        className={`flex items-center space-x-1.5 px-3 py-1 rounded-lg text-xs font-semibold transition-all shadow-xs ${
          isPlaying
            ? 'bg-indigo-600 text-white animate-pulse'
            : 'bg-teal-700 hover:bg-teal-800 text-white'
        }`}
      >
        {isPlaying ? <Pause className="w-3.5 h-3.5 fill-current" /> : <Play className="w-3.5 h-3.5 fill-current" />}
        <span>{isPlaying ? (isTe ? 'పాజ్' : 'Pause') : (isTe ? 'వినండి' : 'Read Aloud')}</span>
      </button>

      {isPlaying && (
        <button
          type="button"
          onClick={handleStop}
          aria-label="Stop audio"
          className="p-1 rounded-lg text-slate-500 hover:text-slate-800 hover:bg-slate-200/60"
        >
          <Square className="w-3.5 h-3.5 fill-current" />
        </button>
      )}

      {/* Speed Selector */}
      <button
        type="button"
        onClick={handleSpeedCycle}
        title="Playback speed"
        className="px-2 py-1 text-[11px] font-bold text-slate-600 hover:text-teal-900 bg-white border border-slate-200 rounded-md transition-colors flex items-center space-x-0.5"
      >
        <FastForward className="w-2.5 h-2.5 text-slate-400" />
        <span>{speed}x</span>
      </button>

      <span className="text-[10px] text-slate-400 font-medium hidden sm:inline flex items-center">
        <Volume2 className="w-3 h-3 text-slate-400 mr-1" />
        {language === 'te' ? 'తెలుగు వాయిస్' : 'Indian English TTS'}
      </span>
    </div>
  );
};
