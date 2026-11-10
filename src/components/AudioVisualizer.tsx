import React, { useEffect, useRef } from 'react';

interface AudioVisualizerProps {
  isActive: boolean;
  mode?: 'listening' | 'speaking' | 'idle';
  height?: number;
  className?: string;
}

export const AudioVisualizer: React.FC<AudioVisualizerProps> = ({
  isActive,
  mode = 'listening',
  height = 56,
  className = '',
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let phase = 0;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const numBars = 32;
      const barWidth = 4;
      const gap = (canvas.width - numBars * barWidth) / (numBars - 1);
      const centerY = canvas.height / 2;

      for (let i = 0; i < numBars; i++) {
        const x = i * (barWidth + gap);

        // Sinusoidal waveform modulation
        let barHeight = 6;
        if (isActive) {
          const frequency = mode === 'speaking' ? 0.35 : 0.45;
          const amplitude = mode === 'speaking' ? centerY * 0.75 : centerY * 0.9;
          const distanceToCenter = 1 - Math.abs((i - numBars / 2) / (numBars / 2));
          barHeight =
            8 +
            Math.abs(Math.sin(phase + i * frequency)) * amplitude * distanceToCenter;
        }

        const gradient = ctx.createLinearGradient(0, centerY - barHeight / 2, 0, centerY + barHeight / 2);
        if (mode === 'speaking') {
          gradient.addColorStop(0, '#4338ca'); // Indigo
          gradient.addColorStop(0.5, '#0d9488'); // Teal
          gradient.addColorStop(1, '#0f766e');
        } else {
          gradient.addColorStop(0, '#0f766e'); // Deep Teal
          gradient.addColorStop(0.5, '#14b8a6'); // Bright Teal
          gradient.addColorStop(1, '#042f2e');
        }

        ctx.fillStyle = isActive ? gradient : '#cbd5e1';
        ctx.beginPath();
        ctx.roundRect(x, centerY - barHeight / 2, barWidth, Math.max(4, barHeight), 2);
        ctx.fill();
      }

      phase += isActive ? 0.12 : 0.02;
      animationId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, [isActive, mode]);

  return (
    <div className={`flex items-center justify-center w-full max-w-md ${className}`}>
      <canvas
        ref={canvasRef}
        width={320}
        height={height}
        className="w-full h-auto rounded-xl"
      />
    </div>
  );
};
