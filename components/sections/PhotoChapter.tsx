"use client";

import Image from "next/image";
import { forwardRef, useState } from "react";
import type { PhotoChapterData } from "@/lib/chapters";
import { FALLBACK_LABELS } from "@/lib/utils";

export const PhotoChapter = forwardRef<HTMLElement, { data: PhotoChapterData }>(
  function PhotoChapter({ data }, ref) {
    const [baseError, setBaseError] = useState(false);
    const [writeError, setWriteError] = useState(false);
    const label = FALLBACK_LABELS[data.id] ?? data.id;

    return (
      <section
        ref={ref as React.RefObject<HTMLElement>}
        className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-[#0a0a0a]"
        data-section={data.id}
      >
        <div className="absolute inset-0 overflow-hidden" data-base-layer data-ken-burns>
          {!baseError ? (
            <Image src={data.baseImage} alt="" fill className="object-cover" sizes="100vw" priority={data.id === "ch1"} onError={() => setBaseError(true)} />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-amber-950/80 to-black" />
          )}
          {baseError && (
            <span className="absolute bottom-1/2 left-1/2 -translate-x-1/2 translate-y-1/2 font-subtitle text-sm tracking-[0.35em] text-white/20">
              — {label} —
            </span>
          )}
        </div>
        <div className="photo-write-layer absolute inset-0 opacity-0">
          {!writeError ? (
            <Image src={data.writeImage} alt="" fill className="object-cover" sizes="100vw" onError={() => setWriteError(true)} />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-amber-900/90 to-black" />
          )}
          {writeError && (
            <span className="absolute bottom-1/2 left-1/2 -translate-x-1/2 translate-y-1/2 font-subtitle text-sm tracking-[0.35em] text-white/28">
              — {label} —
            </span>
          )}
        </div>
        <div className="exposure-mask absolute inset-0 opacity-0" data-exposure-mask />

        {/* 手書きテキストオーバーレイ（フォント統一・ボックスなし） */}
        {data.handwritingTitle && (
          <div className="absolute inset-x-0 top-0 z-10 flex flex-col px-7 pt-[13vh]">
            <p
              className="font-subtitle overflow-hidden text-[21px] font-normal leading-[1.55] tracking-wide text-white"
              data-hw-title
              style={{ textShadow: "0 1px 2px rgba(0,0,0,0.35)" }}
            >
              {data.handwritingTitle}
            </p>
            <div className="mt-4 flex flex-col gap-[9px]">
              {data.handwritingLines?.map((line, i) => (
                <p
                  key={i}
                  className="font-subtitle overflow-hidden text-[14px] font-normal leading-[1.85] tracking-wide text-white/92"
                  data-hw-line
                  style={{ textShadow: "0 1px 2px rgba(0,0,0,0.3)" }}
                >
                  {line}
                </p>
              ))}
            </div>
          </div>
        )}

        <div className="subtitle-block absolute bottom-[12vh] left-0 right-0 z-10 px-6 opacity-0" data-subtitle>
          <p className="subtitle-text text-base text-white/95">{data.subtitle}</p>
        </div>
      </section>
    );
  }
);
