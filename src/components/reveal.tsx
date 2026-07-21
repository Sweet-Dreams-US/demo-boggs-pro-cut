"use client";
import { useEffect, useRef, useState } from "react";

export default function Reveal({
  children,
  delay = 0,
  className = "",
  immediate = false,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  immediate?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    if (immediate) {
      setShown(true);
      return;
    }
    const el = ref.current;
    if (!el) return;
    // Safety: if already in view on mount, reveal without waiting for a scroll.
    const r = el.getBoundingClientRect();
    if (r.top < window.innerHeight && r.bottom > 0) setShown(true);
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: shown ? 1 : 0,
        transform: shown ? "translateY(0)" : "translateY(26px)",
        transition: `opacity 0.7s cubic-bezier(0.16,1,0.3,1) ${delay}ms, transform 0.7s cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}
