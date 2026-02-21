"use client";

import { forwardRef } from "react";
import type { LetterChapterData } from "@/lib/chapters";

const lineBaseClass =
  "letter-reveal overflow-hidden text-[13px] leading-[1.95] tracking-[0.04em] text-[#3d3530] font-light";

export const LetterChapter = forwardRef<HTMLElement, { data: LetterChapterData }>(
  function LetterChapter({ data }, ref) {
    return (
      <section
        ref={ref as React.RefObject<HTMLElement>}
        className="letter-chapter relative flex min-h-[100svh] w-full items-center justify-center overflow-x-hidden px-4 py-6"
        data-section={data.id}
        style={{ backgroundColor: "#0d0a08" }}
      >
        {/* キャンドル風グロー（flickerアニメーション付き） */}
        <div
          className="letter-glow absolute left-1/2 top-1/2 h-[500px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[40px]"
          data-letter-glow
          style={{
            background: "radial-gradient(ellipse, rgba(120, 60, 20, 0.45) 0%, transparent 70%)",
            animation: "flicker 4s ease-in-out infinite",
          }}
        />

        {/* 手紙ラッパー */}
        <div className="letter-wrapper relative z-10 w-full max-w-[400px]">
          <div
            className="letter-paper relative w-full rounded-sm bg-[#faf9f5] px-7 py-8 pb-10 shadow-2xl sm:px-7 sm:py-8 sm:pb-10"
            data-letter-paper
            style={{
              boxShadow:
                "0 2px 4px rgba(0,0,0,0.08), 0 8px 24px rgba(0,0,0,0.25), 0 24px 64px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.8)",
              position: "relative",
            }}
          >
            {/* 罫線 */}
            <div
              className="absolute inset-0 rounded-sm"
              style={{
                background:
                  "repeating-linear-gradient(transparent, transparent 31px, rgba(180, 170, 150, 0.16) 31px, rgba(180, 170, 150, 0.16) 32px)",
                pointerEvents: "none",
              }}
            />

            {/* 日付 */}
            {data.date ? (
              <p
                className="letter-reveal mb-5 text-[10px] font-light tracking-[0.12em] text-[#bbb]"
                data-line-index={0}
              >
                {data.date}
              </p>
            ) : null}

            {/* タイトル */}
            <p
              className="letter-reveal mb-6 text-center text-[15px] font-normal tracking-[0.3em] text-[#333]"
              data-line-index={1}
              data-letter-lock="title"
            >
              {data.title}
            </p>

            {/* 本文 */}
            <div className="letter-body space-y-[18px]">
              {data.body.map((para, i) => (
                <p
                  key={i}
                  className={`letter-reveal ${lineBaseClass} ${para.highlight ? "text-[#5a3e35] font-normal" : ""}`}
                  data-line-index={2 + i}
                >
                  {para.text}
                </p>
              ))}
            </div>

            {/* 署名 */}
            <p
              className="letter-reveal mt-5 text-[12px] font-light tracking-[0.1em] text-[#999]"
              data-line-index={2 + data.body.length}
            >
              {data.signature}
            </p>
          </div>
        </div>
      </section>
    );
  }
);
