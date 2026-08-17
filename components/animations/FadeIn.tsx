"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import clsx from "clsx";

interface FadeInProps {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: "div" | "section" | "li";
}

export function FadeIn({ children, delay = 0, className, as = "div" }: FadeInProps) {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const Tag = as;

  return (
    <Tag
      ref={ref as never}
      className={clsx(
        "transition-all duration-700 ease-out motion-reduce:transition-none",
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
        className
      )}
      style={{ transitionDelay: visible ? `${delay}ms` : "0ms" }}
    >
      {children}
    </Tag>
  );
}
