"use client";

import { forwardRef } from "react";

export const FinChapter = forwardRef<HTMLElement>(function FinChapter(_, ref) {
  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      className="fin-section relative flex min-h-[100svh] w-full items-center justify-center overflow-hidden bg-[#0a0a0a]"
      data-section="fin"
    >
      {/* 背景の微細なグラデーション（完全な黒ではなく、わずかな深みを） */}
      <div
        className="absolute inset-0"
        style={{
          background: "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(10, 10, 10, 0.98) 0%, #0a0a0a 100%)",
        }}
      />

      {/* Fin テキスト */}
      <div
        className="fin-text relative z-10 text-center opacity-0"
        data-fin-text
        style={{
          fontFamily: "var(--font-subtitle), Georgia, serif",
        }}
      >
        <div
          className="fin-main text-[clamp(3rem,12vw,8rem)] font-light tracking-[0.15em] text-white"
          style={{
            textShadow: "0 0 40px rgba(255,255,255,0.1), 0 0 80px rgba(255,255,255,0.05)",
            letterSpacing: "0.2em",
          }}
        >
          Fin
        </div>
        <div
          className="fin-subtitle mt-8 text-[clamp(0.875rem,2vw,1.125rem)] font-light tracking-[0.3em] text-white/40"
          style={{
            letterSpacing: "0.4em",
          }}
        >
          2025の思い出
        </div>
      </div>

      {/* 微細な光の粒子エフェクト（オプション） */}
      <div
        className="fin-particles absolute inset-0 opacity-0"
        data-fin-particles
        style={{
          backgroundImage: `radial-gradient(2px 2px at 20% 30%, rgba(255,255,255,0.15), transparent),
                            radial-gradient(2px 2px at 60% 70%, rgba(255,255,255,0.1), transparent),
                            radial-gradient(1px 1px at 50% 50%, rgba(255,255,255,0.2), transparent),
                            radial-gradient(1px 1px at 80% 10%, rgba(255,255,255,0.15), transparent),
                            radial-gradient(2px 2px at 90% 80%, rgba(255,255,255,0.1), transparent)`,
          backgroundSize: "200% 200%",
          backgroundPosition: "0% 0%",
          animation: "finParticles 20s ease-in-out infinite",
        }}
      />
    </section>
  );
});
