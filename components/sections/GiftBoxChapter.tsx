"use client";

import { forwardRef } from "react";
import type { GiftBoxChapterData } from "@/lib/chapters";

function Chrysanthemum() {
  const gold = "#c9a84c";
  return (
    <svg width="68" height="68" viewBox="0 0 80 80" fill="none">
      {Array.from({ length: 16 }, (_, i) => (
        <ellipse
          key={`op-${i}`}
          cx={40} cy={15} rx={5} ry={12}
          fill={gold} opacity={0.88}
          transform={`rotate(${i * 22.5} 40 40)`}
        />
      ))}
      {Array.from({ length: 16 }, (_, i) => (
        <ellipse
          key={`ip-${i}`}
          cx={40} cy={24} rx={3} ry={8}
          fill={gold} opacity={0.6}
          transform={`rotate(${i * 22.5 + 11.25} 40 40)`}
        />
      ))}
      <circle cx={40} cy={40} r={11} fill={gold} />
      <circle cx={40} cy={40} r={7} fill="#6e1515" />
      <circle cx={40} cy={40} r={3} fill={gold} />
    </svg>
  );
}

export const GiftBoxChapter = forwardRef<HTMLElement, { data: GiftBoxChapterData }>(
  function GiftBoxChapter({ data }, ref) {
    return (
      <section
        ref={ref as React.RefObject<HTMLElement>}
        className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-[#0a0a0a]"
        data-section={data.id}
      >
        <div
          className="relative flex min-h-[70vh] w-full items-center justify-center"
          data-giftbox-scene
          style={{ perspective: "1800px" }}
        >
          <div className="relative" data-giftbox-wrapper style={{ transformStyle: "preserve-3d" }}>
            <div
              className="relative mx-auto origin-center"
              data-giftbox
              style={{ transformStyle: "preserve-3d" }}
            >
              {/* パスポート内ページ（開いた後に見える） */}
              <div
                data-box
                style={{
                  position: "relative",
                  width: 210,
                  height: 300,
                  background: "linear-gradient(175deg, #f8f3ea 0%, #ede4cf 100%)",
                  borderRadius: "2px 10px 10px 2px",
                  borderLeft: "8px solid #5a1010",
                  boxShadow: "inset -3px 0 8px rgba(0,0,0,0.06), 0 20px 50px rgba(0,0,0,0.6)",
                  transformStyle: "preserve-3d",
                  overflow: "hidden",
                }}
              >
                {/* 内ページのヘッダー */}
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", paddingTop: 22, gap: 0 }}>
                  <p style={{ fontSize: 7, letterSpacing: "0.22em", color: "#9a8060", fontFamily: '"HiraMinProN-W3","Yu Mincho",serif' }}>
                    旅券 · PASSPORT
                  </p>
                  <div style={{ width: 90, height: "0.5px", background: "linear-gradient(90deg, transparent, #c9a84c55, transparent)", margin: "6px 0 0" }} />
                </div>

                {/* 罫線 */}
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: 14 }}>
                  {Array.from({ length: 5 }).map((_, i) => (
                    <div key={i} style={{ width: "75%", height: "0.5px", background: "#8B7355", opacity: 0.18, marginTop: 10 }} />
                  ))}
                </div>

                {/* Next trip テキスト（GSAPでleft→right clipPath reveal） */}
                <div
                  data-passport-inner-text
                  style={{
                    position: "absolute",
                    bottom: 44,
                    left: 0,
                    right: 0,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 6,
                  }}
                >
                  <p
                    className="font-subtitle"
                    style={{
                      fontSize: 28,
                      color: "#2c1a0e",
                      letterSpacing: "0.08em",
                      lineHeight: 1.2,
                    }}
                  >
                    Next trip
                  </p>
                  <div style={{ width: 80, height: "0.5px", background: "linear-gradient(90deg, transparent, #8B7355, transparent)" }} />
                  <p style={{ fontSize: 9, letterSpacing: "0.3em", color: "#9a8060", fontFamily: "serif" }}>
                    2026
                  </p>
                </div>
              </div>

              {/* パスポート表紙（左辺を軸に横回転して開く） */}
              <div
                data-box-lid
                className="absolute inset-0 flex flex-col items-center justify-center"
                style={{
                  borderRadius: "2px 10px 10px 2px",
                  borderLeft: "8px solid #3a0808",
                  transformStyle: "preserve-3d",
                  backfaceVisibility: "hidden",
                  WebkitBackfaceVisibility: "hidden",
                  background: "linear-gradient(155deg, #7a1a1a 0%, #5c1010 50%, #6e1515 100%)",
                  boxShadow: "inset 0 1px 0 rgba(255,255,255,0.06), 2px 0 12px rgba(0,0,0,0.4)",
                  gap: 12,
                }}
              >
                {/* 外枠装飾線 */}
                <div style={{
                  position: "absolute", inset: 10,
                  border: "0.5px solid rgba(201,168,76,0.25)",
                  borderRadius: "1px 8px 8px 1px",
                  pointerEvents: "none",
                }} />
                <Chrysanthemum />
                <p style={{
                  color: "#c9a84c", fontSize: 18,
                  letterSpacing: "0.5em", paddingLeft: "0.5em",
                  fontFamily: '"HiraMinProN-W3","Yu Mincho","游明朝",serif',
                  lineHeight: 1,
                }}>
                  日本国
                </p>
                <div style={{ width: 100, height: "0.5px", background: "linear-gradient(90deg, transparent, rgba(201,168,76,0.6), transparent)" }} />
                <p style={{
                  color: "#c9a84c", fontSize: 10,
                  letterSpacing: "0.35em", paddingLeft: "0.35em",
                  fontFamily: "serif", lineHeight: 1, opacity: 0.85,
                }}>
                  PASSPORT
                </p>
              </div>
            </div>

            {/* グロー */}
            <div
              data-gift-light
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full opacity-0 blur-[60px]"
              style={{ width: "28rem", height: "28rem", background: "rgba(160, 40, 40, 0.3)" }}
            />
          </div>
        </div>

        <div
          data-giftbox-text
          className="absolute bottom-[14vh] left-0 right-0 z-10 px-8 font-subtitle text-center text-white/95 tracking-widest opacity-0"
        >
          {data.text}
        </div>
      </section>
    );
  }
);
