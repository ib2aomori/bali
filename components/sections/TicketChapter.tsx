"use client";

import Image from "next/image";
import { forwardRef, useState } from "react";
import type { TicketChapterData } from "@/lib/chapters";

export const TicketChapter = forwardRef<HTMLElement, { data: TicketChapterData }>(
  function TicketChapter({ data }, ref) {
    const [bgError, setBgError] = useState(false);

    return (
      <section
        ref={ref as React.RefObject<HTMLElement>}
        className="ticket-section relative flex min-h-[100svh] w-full flex-col overflow-hidden bg-[#0a0a0a]"
        data-section={data.id}
      >
        {/* 背景レイヤー（画像 + グラデ） */}
        <div className="absolute inset-0" aria-hidden>
          <Image
            src="/assets/finale_bg.png"
            alt=""
            fill
            className="object-cover"
            sizes="100vw"
            onError={() => setBgError(true)}
          />
          <div
            className="absolute inset-0 bg-gradient-to-b from-sky-400/85 via-teal-500/75 to-emerald-600/85"
            style={{ zIndex: bgError ? 1 : -1 }}
          />
        </div>

        {/* チケット表示ゾーン：暗いオーバーレイで背景と分離し、その上にカードを置く */}
        <div
          className="ticket-scene relative z-10 flex min-h-0 flex-1 flex-col items-center justify-center px-4 py-6"
          data-ticket-scene
          style={{ perspective: "1600px" }}
        >
          <div
            className="ticket-stage absolute inset-0 flex items-center justify-center px-4"
            style={{
              background:
                "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(0,0,0,0.25) 0%, rgba(0,0,0,0.45) 100%)",
            }}
          />
          <div
            className="ticket-card-wrapper relative z-10 w-full max-w-[min(92vw,400px)]"
            data-ticket-card
            style={{ transformStyle: "preserve-3d", opacity: 0 }}
          >
            <div
              className="ticket-paper flex flex-col overflow-hidden rounded-xl bg-white md:flex-row md:rounded-lg"
              data-card-inner
              style={{
                border: "2px solid #c4b8a8",
                boxShadow:
                  "0 0 0 1px rgba(0,0,0,0.06), 0 16px 48px rgba(0,0,0,0.45), 0 32px 80px rgba(0,0,0,0.35)",
              }}
            >
              {/* 左ブロック：便名・乗客・路線 */}
              <div className="flex flex-col border-b border-dashed border-stone-400 py-5 pl-5 pr-4 md:w-[70%] md:border-b-0 md:border-r md:border-stone-400 md:py-4 md:pr-4">
                <p className="text-[11px] font-bold uppercase tracking-widest text-[#0d9488] md:text-[10px]">
                  BALI AIR
                </p>
                <p className="mt-2 text-[11px] font-semibold uppercase text-stone-700 md:text-[11px]">
                  Passenger
                </p>
                <p className="mt-0.5 text-lg font-bold text-stone-900 md:text-base">Yuma & Yuki</p>
                <div className="mt-3 flex items-baseline gap-2">
                  <span className="text-xl font-bold text-stone-900 md:text-lg">NRT</span>
                  <span className="text-stone-600">→</span>
                  <span className="text-2xl font-bold text-[#0f766e] md:text-xl">DPS</span>
                </div>
                <p className="mt-0.5 text-[10px] font-semibold uppercase text-stone-600 md:text-[10px]">
                  Tokyo → Bali
                </p>
                <div className="mt-4 flex flex-wrap gap-x-4 gap-y-1 pt-3 text-[11px] font-semibold text-stone-800 md:mt-auto md:pt-3 md:text-[10px]">
                  <span>Date: 2026</span>
                  <span>Seat: 窓側</span>
                  <span>Gate: —</span>
                </div>
              </div>
              {/* 右ブロック：Boarding Pass / BALI / ドット */}
              <div className="flex flex-row items-center justify-between gap-4 py-4 pl-5 pr-4 md:w-[30%] md:flex-col md:justify-between md:py-4 md:pr-4 md:pl-3">
                <p className="text-[9px] font-bold uppercase tracking-wide text-stone-600 md:text-[8px]">
                  Boarding Pass
                </p>
                <p
                  className="text-3xl font-bold tracking-widest text-[#0f766e] md:text-2xl"
                  style={{ writingMode: "vertical-rl" }}
                >
                  BALI
                </p>
                <div className="grid grid-cols-4 gap-0.5">
                  {Array.from({ length: 16 }).map((_, i) => (
                    <div
                      key={i}
                      className="h-1.5 w-1.5 rounded-sm bg-stone-800 md:h-1.5 md:w-1.5"
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* フレーズ表示エリア（Apple風・ミニマル） */}
        <div
          className="finale-subtitle pointer-events-none absolute bottom-0 left-0 right-0 z-20 flex min-h-[36svh] flex-col items-center justify-end pb-[max(2rem,10svh)] pt-16 text-center opacity-0 md:min-h-[28vh] md:pb-[16vh] md:pt-20"
          data-finale-subtitle
        >
          <div
            className="min-h-[14svh] w-full flex-1"
            style={{
              background:
                "linear-gradient(to top, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.08) 50%, transparent 100%)",
            }}
          />
          <p
            className="font-subtitle max-w-[90vw] text-[17px] font-normal tracking-[0.12em] text-white/98 md:text-[19px] md:tracking-[0.14em]"
            style={{
              textShadow: "0 1px 2px rgba(0,0,0,0.4)",
            }}
          >
            {data.subtitle}
          </p>
        </div>
      </section>
    );
  }
);
