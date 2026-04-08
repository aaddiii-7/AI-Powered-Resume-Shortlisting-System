import { useEffect, useRef } from "react";

declare global {
  interface Window {
    FinisherHeader: new (config: Record<string, unknown>) => unknown;
  }
}

export default function FinisherBackground({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current || !ref.current) return;

    const init = () => {
      if (!window.FinisherHeader || !ref.current || initialized.current) return;
      initialized.current = true;
      new window.FinisherHeader({
        count: 5,
        size: { min: 900, max: 1500, pulse: 0 },
        speed: { x: { min: 0, max: 0.3 }, y: { min: 0, max: 0 } },
        colors: {
          background: "#f0f4ff",
          particles: ["#a7bff1", "#8e98ff", "#fa7185", "#c1d3f8"],
        },
        blending: "overlay",
        opacity: { center: 1, edge: 0.1 },
        skew: 0,
        shapes: ["c"],
        className: "finisher-header",
      });
    };

    if (window.FinisherHeader) {
      init();
      return;
    }

    // Script may not be loaded yet — poll briefly then fall back to load event
    const interval = setInterval(() => {
      if (window.FinisherHeader) {
        clearInterval(interval);
        init();
      }
    }, 50);

    return () => clearInterval(interval);
  }, []);

  return (
    <div ref={ref} className={`finisher-header relative ${className}`}>
      {children}
    </div>
  );
}
