import React from 'react';
import { Mic, Square, Loader2 } from 'lucide-react';

interface MicrophoneButtonProps {
  isRecording: boolean;
  isLoading?: boolean;
  recordingDuration?: number; // in seconds
  onClick: () => void;
  label?: string;
  size?: 'normal' | 'large';
  className?: string;
}

export const MicrophoneButton: React.FC<MicrophoneButtonProps> = ({
  isRecording,
  isLoading = false,
  recordingDuration = 0,
  onClick,
  label,
  size = 'large',
  className = '',
}) => {
  const formatTimer = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const isLarge = size === 'large';

  return (
    <div className={`flex flex-col items-center justify-center select-none ${className}`}>
      <div className="relative flex items-center justify-center">
        {/* Pulsing halo when recording */}
        {isRecording && (
          <span className="absolute inline-flex h-full w-full rounded-full bg-teal-500 opacity-35 animate-ping" />
        )}

        <button
          type="button"
          onClick={onClick}
          disabled={isLoading}
          aria-label={isRecording ? 'Stop recording voice question' : 'Start speaking voice question'}
          className={`relative z-10 flex items-center justify-center rounded-full font-semibold transition-all transform active:scale-95 shadow-md focus:outline-none focus:ring-4 focus:ring-teal-500/30 ${
            isRecording
              ? 'bg-rose-600 hover:bg-rose-700 text-white shadow-rose-300'
              : 'bg-teal-700 hover:bg-teal-800 text-white shadow-teal-700/20'
          } ${isLarge ? 'w-16 h-16 md:w-20 md:h-20' : 'w-12 h-12'}`}
        >
          {isLoading ? (
            <Loader2 className={`${isLarge ? 'w-8 h-8' : 'w-6 h-6'} animate-spin`} />
          ) : isRecording ? (
            <Square className={`${isLarge ? 'w-7 h-7' : 'w-5 h-5'} fill-current`} />
          ) : (
            <Mic className={`${isLarge ? 'w-8 h-8' : 'w-6 h-6'}`} />
          )}
        </button>
      </div>

      {/* Recording Timer / State Label */}
      {isRecording && (
        <div className="mt-2.5 flex items-center space-x-2 bg-rose-50 border border-rose-200 px-3 py-1 rounded-full text-xs font-semibold text-rose-700 animate-pulse">
          <span className="w-2 h-2 rounded-full bg-rose-600 animate-ping mr-1" />
          <span>{formatTimer(recordingDuration)}</span>
          <span className="text-slate-400">|</span>
          <span>Tap to stop</span>
        </div>
      )}

      {!isRecording && label && (
        <span className="mt-2 text-xs font-semibold text-slate-600 text-center">{label}</span>
      )}
    </div>
  );
};
