"use client";

import { forwardRef, useState, useCallback } from "react";

const PROLOGUE_BG_VIDEO = "/assets/prologue_bg.mp4";
const PROLOGUE_TEXT_VIDEO = "/assets/prologue_text.mp4";

export const Prologue = forwardRef<HTMLElement>(function Prologue(_, ref) {
  const [textVideoError, setTextVideoError] = useState(false);
  const onTextError = useCallback(() => setTextVideoError(true), []);

  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-[#0a0a0a] px-6"
      data-section="prologue"
    >
      {/* 背景動画 */}
      <video
        src={PROLOGUE_BG_VIDEO}
        className="absolute inset-0 h-full w-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        aria-hidden="true"
      />
      {/* 暗めのオーバーレイ */}
      <div className="absolute inset-0 bg-black/50" />

      {/* テキスト / テキスト動画 */}
      <div className="relative z-10 max-w-md text-center" data-prologue-content>
        {!textVideoError ? (
          <video
            src={PROLOGUE_TEXT_VIDEO}
            className="mx-auto h-auto w-full max-w-md"
            autoPlay
            muted
            loop
            playsInline
            onError={onTextError}
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
