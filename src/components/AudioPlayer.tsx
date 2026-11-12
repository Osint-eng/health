import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Square, Volume2, FastForward, Sparkles, Loader2 } from 'lucide-react';
import { speechSynthesizer } from '../services/speech';
import { Language } from '../types';
import { api } from '../services/api';

interface AudioPlayerProps {
  textToSpeak: string;
  language: Language;
  defaultSpeed?: number;
  className?: string;
  preferredEngine?: 'piper' | 'browser';
}

export const AudioPlayer: React.FC<AudioPlayerProps> = ({
  textToSpeak,
  language,
  defaultSpeed = 1.0,
  className = '',
  preferredEngine = 'piper',
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoadingAudio, setIsLoadingAudio] = useState(false);
  const [speed, setSpeed] = useState<number>(defaultSpeed);
  const [activeEngine, setActiveEngine] = useState<'piper' | 'browser'>(preferredEngine);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const speeds = [0.75, 1.0, 1.25];
  const isTe = language === 'te';

  useEffect(() => {
    return () => {
      stopAllAudio();
    };
  }, []);

  const stopAllAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    speechSynthesizer.stop();
    setIsPlaying(false);
  };

  const playPiperAudio = async (currentSpeed: number) => {
    setIsLoadingAudio(true);
    try {
      // Fetch real acoustic WAV binary from server
      const voice = isTe ? 'te_IN-indic-v1' : 'en_US-lessac-medium';
      const data = await api.synthesizePiper(textToSpeak, voice, currentSpeed);

      if (data && data.audio_base64) {
        setAudioUrl(data.audio_base64);

        if (!audioRef.current) {
          audioRef.current = new Audio(data.audio_base64);
        } else {
          audioRef.current.src = data.audio_base64;
        }

        audioRef.current.playbackRate = currentSpeed;
        audioRef.current.onended = () => setIsPlaying(false);
        audioRef.current.onerror = () => {
          // Graceful fallback to browser speech synthesis
          console.warn('Audio element error, falling back to Web Speech API');
          fallbackToBrowserSpeech(currentSpeed);
        };

        await audioRef.current.play();
        setIsPlaying(true);
        setActiveEngine('piper');
      } else {
        fallbackToBrowserSpeech(currentSpeed);
      }
    } catch (err) {
      console.warn('Piper synthesis fetch error, falling back to Web Speech:', err);
      fallbackToBrowserSpeech(currentSpeed);
    } finally {
      setIsLoadingAudio(false);
    }
  };

  const fallbackToBrowserSpeech = (currentSpeed: number) => {
    setActiveEngine('browser');
    setIsPlaying(true);
    speechSynthesizer.speak(
      textToSpeak,
      language,
      currentSpeed,
      () => setIsPlaying(true),
      () => setIsPlaying(false),
      () => setIsPlaying(false)
    );
  };

  const handlePlayToggle = () => {
    if (isPlaying) {
      stopAllAudio();
    } else {
      if (activeEngine === 'piper') {
        playPiperAudio(speed);
      } else {
        fallbackToBrowserSpeech(speed);
      }
    }
  };

  const handleStop = () => {
    stopAllAudio();
  };

  const handleSpeedCycle = () => {
    const nextIdx = (speeds.indexOf(speed) + 1) % speeds.length;
    const newSpeed = speeds[nextIdx];
    setSpeed(newSpeed);

    if (isPlaying) {
      if (activeEngine === 'piper' && audioRef.current) {
        audioRef.current.playbackRate = newSpeed;
      } else {
        speechSynthesizer.stop();
        fallbackToBrowserSpeech(newSpeed);
      }
    }
  };

  const toggleEngine = () => {
    const nextEngine = activeEngine === 'piper' ? 'browser' : 'piper';
    setActiveEngine(nextEngine);
    if (isPlaying) {
      stopAllAudio();
    }
  };

  return (
    <div
      className={`inline-flex flex-wrap items-center gap-1.5 bg-slate-100/90 border border-slate-200/80 rounded-xl px-2.5 py-1.5 shadow-xs ${className}`}
    >
      <button
        type="button"
        disabled={isLoadingAudio}
        onClick={handlePlayToggle}
        aria-label={isPlaying ? 'Pause spoken answer' : 'Listen to answer'}
        className={`flex items-center space-x-1.5 px-3 py-1 rounded-lg text-xs font-semibold transition-all shadow-xs ${
          isLoadingAudio
            ? 'bg-slate-300 text-slate-700 cursor-wait'
            : isPlaying
            ? 'bg-indigo-600 hover:bg-indigo-700 text-white animate-pulse'
            : 'bg-teal-700 hover:bg-teal-800 text-white'
        }`}
      >
        {isLoadingAudio ? (
          <Loader2 className="w-3.5 h-3.5 animate-spin" />
        ) : isPlaying ? (
          <Pause className="w-3.5 h-3.5 fill-current" />
        ) : (
          <Play className="w-3.5 h-3.5 fill-current" />
        )}
        <span>
          {isLoadingAudio
            ? isTe ? 'సిద్ధమవుతోంది...' : 'Synthesizing...'
            : isPlaying
            ? isTe ? 'పాజ్' : 'Pause'
            : isTe ? 'వినండి' : 'Read Aloud'}
        </span>
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

      {/* Engine Switcher Pill */}
      <button
        type="button"
        onClick={toggleEngine}
        title={`Click to switch between Piper Neural TTS (WAV) and Browser Speech. Current: ${activeEngine.toUpperCase()}`}
        className={`px-2 py-0.5 text-[10px] font-bold rounded-md border flex items-center space-x-1 transition-all ${
          activeEngine === 'piper'
            ? 'bg-teal-50 border-teal-300 text-teal-800'
            : 'bg-slate-50 border-slate-200 text-slate-600'
        }`}
      >
        <Volume2 className="w-2.5 h-2.5 text-teal-700" />
        <span>{activeEngine === 'piper' ? 'Piper Neural WAV' : 'WebSpeech'}</span>
      </button>
    </div>
  );
};
