import { useEffect, useRef, useState } from "react";

interface CountUpProps {
  target: string; // e.g. "5,000+"
  duration?: number;
}

const CountUp = ({ target, duration = 2000 }: CountUpProps) => {
  const [display, setDisplay] = useState("0");
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          animate();
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const animate = () => {
    const suffix = target.replace(/[\d,]/g, ""); // e.g. "+"
    const numStr = target.replace(/[^\d]/g, "");  // e.g. "5000"
    const end = parseInt(numStr, 10);
    const startTime = performance.now();

    const tick = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // ease-out
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(eased * end);
      setDisplay(current.toLocaleString() + suffix);
      if (progress < 1) requestAnimationFrame(tick);
    };

    requestAnimationFrame(tick);
  };

  return <div ref={ref}>{display}</div>;
};

export default CountUp;
