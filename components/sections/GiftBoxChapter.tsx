"use client";

import { forwardRef } from "react";
import type { GiftBoxChapterData } from "@/lib/chapters";

export const GiftBoxChapter = forwardRef<HTMLElement, { data: GiftBoxChapterData }>(
  function GiftBoxChapter({ data }, ref) {
    return (
      <section
        ref={ref as React.RefObject<HTMLElement>}
        className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-[#0a0a0a]"
        data-section={data.id}
      >
        <div className="giftbox-scene relative flex min-h-[70vh] w-full items-center justify-center" data-giftbox-scene style={{ perspective: "1800px" }}>
          <div className="giftbox-wrapper relative" data-giftbox-wrapper>
            <div className="giftbox relative mx-auto origin-center" data-giftbox style={{ transformStyle: "preserve-3d" }}>
              <div className="box relative h-[200px] w-[200px] origin-center rounded-sm" data-box style={{ transformStyle: "preserve-3d", background: "linear-gradient(145deg, #6b2d3c 0%, #4a1c28 100%)", boxShadow: "inset 0 1px 0 rgba(255,255,255,0.08), 0 12px 32px rgba(0,0,0,0.4)" }} />
              <div className="box-lid absolute inset-0 origin-bottom rounded-sm" data-box-lid style={{ transform: "translateZ(100px)", transformStyle: "preserve-3d", background: "linear-gradient(160deg, #7a3545 0%, #5c2432 100%)", boxShadow: "inset 0 2px 0 rgba(255,255,255,0.12)" }} />
              <div className="ribbon-horizontal absolute left-0 top-1/2 h-6 w-full -translate-y-1/2 rounded-full bg-amber-400/90" data-ribbon-h />
              <div className="ribbon-vertical absolute left-1/2 top-0 h-full w-6 -translate-x-1/2 rounded-full bg-amber-400/90" data-ribbon-v />
              <div className="ribbon-knot absolute left-1/2 top-1/2 h-14 w-14 -translate-x-1/2 -translate-y-1/2 rounded-full bg-amber-300 shadow-xl" data-ribbon-knot />
            </div>
            <div className="gift-light absolute left-1/2 top-1/2 h-[28rem] w-[28rem] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-0 blur-[60px] bg-amber-100/70" data-gift-light />
          </div>
        </div>
        <div className="giftbox-text absolute bottom-[14vh] left-0 right-0 z-10 px-8 font-subtitle opacity-0 text-center text-white/95 tracking-widest" data-giftbox-text>
          {data.text}
        </div>
      </section>
    );
  }
);
