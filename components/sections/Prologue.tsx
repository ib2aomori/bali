"use client";

import { forwardRef, useState, useCallback } from "react";

const PROLOGUE_TEXT_VIDEO = "/assets/prologue_text.mp4";

export const Prologue = forwardRef<HTMLElement>(function Prologue(_, ref) {
  const [videoError, setVideoError] = useState(false);
  const onError = useCallback(() => setVideoError(true), []);

  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-[#0a0a0a] px-6"
      data-section="prologue"
    >
      <div className="relative z-10 max-w-md text-center" data-prologue-content>
        {!videoError ? (
          <video
            src={PROLOGUE_TEXT_VIDEO}
            className="mx-auto h-auto w-full max-w-md"
            autoPlay
            muted
            loop
            playsInline
            onError={onError}
            aria-label="2025の思い出 — Prologue"
          />
        ) : (
          <>
            <p className="font-subtitle text-2xl tracking-wider text-white/95">2025の思い出</p>
            <p className="mt-4 text-sm text-white/60">— Prologue —</p>
          </>
        )}
      </div>
    </section>
  );
});
