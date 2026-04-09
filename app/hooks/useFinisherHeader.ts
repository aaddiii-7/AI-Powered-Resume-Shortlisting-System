import { useEffect } from 'react';

interface FinisherHeaderConfig {
  count?: number;
  size?: {
    min: number;
    max: number;
    pulse: number;
  };
  speed?: {
    x: { min: number; max: number };
    y: { min: number; max: number };
  };
  colors?: {
    background: string;
    particles: string[];
  };
  blending?: string;
  opacity?: {
    center: number;
    edge: number;
  };
  skew?: number;
  shapes?: string[];
  className?: string;
}

const defaultConfig: FinisherHeaderConfig = {
  count: 6,
  size: {
    min: 1100,
    max: 1300,
    pulse: 1,
  },
  speed: {
    x: { min: 0.5, max: 1.0 },
    y: { min: 0.5, max: 1.0 },
  },
  colors: {
    background: '#9138e5',
    particles: ['#6bd6ff', '#ffcb57', '#ff333d'],
  },
  blending: 'overlay',
  opacity: {
    center: 1,
    edge: 0.1,
  },
  skew: 0,
  shapes: ['c'],
  className: 'finisher-header',
};

export const useFinisherHeader = (customConfig?: Partial<FinisherHeaderConfig>) => {
  const config = { ...defaultConfig, ...customConfig };

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const script = document.createElement('script');
    script.src = '/finisher-header.es5.min.js';
    script.onload = () => {
      const FinisherHeader = (window as any).FinisherHeader;
      if (FinisherHeader) {
        new FinisherHeader(config);
      }
    };

    document.head.appendChild(script);

    return () => {
      // Cleanup if needed
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, [config]);
};
