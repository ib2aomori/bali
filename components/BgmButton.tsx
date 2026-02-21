"use client";

import { useEffect, useState } from "react";
import { setBgmMuted, isBgmMuted } from "@/lib/audio";

export function BgmButton() {
  const [muted, setMuted] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // 少し経ってからボタンを表示（プロローグが始まったタイミング）
    const t = setTimeout(() => setVisible(true), 1200);
    return () => clearTimeout(t);
  }, []);

  const toggle = () => {
    const next = !muted;
    setMuted(next);
    setBgmMuted(next);
  };

  if (!visible) return null;

  return (
    <button
      onClick={toggle}
      aria-label={muted ? "BGMをオンにする" : "BGMをオフにする"}
      className="fixed bottom-6 right-5 z-[200] flex h-9 w-9 items-center justify-center rounded-full transition-opacity duration-500"
      style={{
        opacity: visible ? 0.55 : 0,
        background: "rgba(255,255,255,0.08)",
        backdropFilter: "blur(8px)",
        border: "1px solid rgba(255,255,255,0.12)",
      }}
    >
      {muted ? (
        // ミュート中：スラッシュ付きスピーカー
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
          <line x1="23" y1="9" x2="17" y2="15" />
          <line x1="17" y1="9" x2="23" y2="15" />
        </svg>
      ) : (
        // 再生中：スピーカー＋波
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
          <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
          <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
        </svg>
      )}
    </button>
  );
}
