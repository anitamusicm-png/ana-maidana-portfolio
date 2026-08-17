"use client";

import { createContext, useCallback, useContext, useRef, useState, type ReactNode } from "react";
import { Howl } from "howler";

interface AudioContextValue {
  activeSrc: string | null;
  isPlaying: (src: string) => boolean;
  toggle: (src: string) => void;
}

const AudioCtx = createContext<AudioContextValue | null>(null);

export function AudioProvider({ children }: { children: ReactNode }) {
  const [activeSrc, setActiveSrc] = useState<string | null>(null);
  const howlRef = useRef<Howl | null>(null);

  const toggle = useCallback(
    (src: string) => {
      if (activeSrc === src) {
        howlRef.current?.stop();
        howlRef.current = null;
        setActiveSrc(null);
        return;
      }

      howlRef.current?.stop();
      const howl = new Howl({
        src: [src],
        html5: true,
        onend: () => setActiveSrc(null),
      });
      howlRef.current = howl;
      howl.play();
      setActiveSrc(src);
    },
    [activeSrc]
  );

  const isPlaying = useCallback((src: string) => activeSrc === src, [activeSrc]);

  return (
    <AudioCtx.Provider value={{ activeSrc, isPlaying, toggle }}>
      {children}
    </AudioCtx.Provider>
  );
}

export function useAudio() {
  const ctx = useContext(AudioCtx);
  if (!ctx) throw new Error("useAudio must be used within AudioProvider");
  return ctx;
}
