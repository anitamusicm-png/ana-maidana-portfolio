"use client";

import { useEffect, useRef, useState } from "react";

export function SketchfabEmbed() {
  const ref = useRef<HTMLDivElement>(null);
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
      { rootMargin: "200px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="sketchfab-embed-wrapper w-full max-w-[220px] aspect-square md:ml-auto">
      {visible && (
        <iframe
          title="Bluetooth Headphones"
          className="w-full h-full"
          frameBorder="0"
          allowFullScreen
          loading="lazy"
          allow="autoplay; fullscreen; xr-spatial-tracking"
          {...{
            "execution-while-out-of-viewport": "",
            "execution-while-not-rendered": "",
            "web-share": "",
          }}
          src="https://sketchfab.com/models/e1584a5d42bf47599a37e8fa39375d80/embed?autospin=1&autostart=1&transparent=1&ui_infos=0&ui_controls=0&ui_watermark=0&ui_ar=0&ui_help=0&ui_settings=0&ui_vr=0&ui_fullscreen=0&ui_annotations=0"
        />
      )}
    </div>
  );
}
