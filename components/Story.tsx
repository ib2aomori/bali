"use client";

import { useLayoutEffect, useRef, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SECTIONS } from "@/lib/chapters";
import type { PhotoChapterData, LetterChapterData, GiftBoxChapterData, TicketChapterData, FinChapterData } from "@/lib/chapters";
import { Prologue } from "@/components/sections/Prologue";
import { PhotoChapter } from "@/components/sections/PhotoChapter";
import { LetterChapter } from "@/components/sections/LetterChapter";
import { GiftBoxChapter } from "@/components/sections/GiftBoxChapter";
import { TicketChapter } from "@/components/sections/TicketChapter";
import { FinChapter } from "@/components/sections/FinChapter";
import { prepareAudio, playWind, playWaves, startBgm } from "@/lib/audio";
import { prefersReducedMotion, lockScroll } from "@/lib/utils";
import { BgmButton } from "@/components/BgmButton";

gsap.registerPlugin(ScrollTrigger);

function useScrollTrigger(sectionRefs: React.MutableRefObject<(HTMLElement | null)[]>, deps: unknown[]) {
  const windPlayed = useRef(false);
  const wavesPlayed = useRef(false);

  useLayoutEffect(() => {
    const sections = sectionRefs.current;
    const reduced = prefersReducedMotion();
    if (!sections.length) return;

    const ctx = gsap.context(() => {
      SECTIONS.forEach((sectionData, i) => {
        const el = sections[i];
        if (!el) return;
        const pinHeight = "pinHeightVh" in sectionData ? sectionData.pinHeightVh : 120;
        const pinHeightPx = typeof window !== "undefined" ? (window.innerHeight * pinHeight) / 100 : 1200;

        gsap.set(el, { opacity: i === 0 ? 1 : 0 });
        ScrollTrigger.create({
          trigger: el,
          start: "top 85%",
          end: "top 15%",
          scrub: reduced ? false : 1.2,
          onUpdate: (self) => {
            const p = self.progress;
            if (i > 0) gsap.set(sections[i - 1], { opacity: 1 - p });
            gsap.set(el, { opacity: p });
          },
        });

        if (sectionData.type === "prologue") {
          const prologueContent = el.querySelector("[data-prologue-content]");
          ScrollTrigger.create({
            trigger: el,
            start: "top top",
            end: `+=${pinHeightPx}`,
            pin: true,
            pinSpacing: true,
            onEnter: () => {
              if (!reduced && prologueContent) {
                setTimeout(() => lockScroll(1300), 800);
              }
            },
          });
          return;
        }

        if (sectionData.type === "photo") {
          const data = sectionData as PhotoChapterData;
          const baseLayer = el.querySelector("[data-base-layer]");
          const writeLayer = el.querySelector(".photo-write-layer");
          const exposureMask = el.querySelector("[data-exposure-mask]");
          const subtitle = el.querySelector("[data-subtitle]");
          const kenBurns = el.querySelector("[data-ken-burns]");
          const hwTitle = el.querySelector("[data-hw-title]");
          const hwLines = el.querySelectorAll("[data-hw-line]");
          if (!baseLayer || !writeLayer || !exposureMask || !subtitle) return;

          // 手書きテキストの初期状態（左端からペンで描くように表示）
          if (hwTitle) gsap.set(hwTitle, { clipPath: "inset(0 100% 0 0)" });
          if (hwLines.length) gsap.set(hwLines, { clipPath: "inset(0 100% 0 0)" });

          if (data.id === "ch1") {
            ScrollTrigger.create({ trigger: el, start: "top 80%", onEnter: () => { if (!windPlayed.current) { windPlayed.current = true; playWind(); } } });
          }

          const tl = gsap.timeline({
            scrollTrigger: { trigger: el, start: "top top", end: `+=${pinHeightPx}`, pin: true, pinSpacing: true, scrub: reduced ? false : 1.2 },
          });
          tl.fromTo(kenBurns || baseLayer, { scale: 1 }, { scale: 1.08, ease: "none" }, 0);
          tl.to(exposureMask, { opacity: 1, duration: 0.1 }, 0.4);
          tl.set(writeLayer, { opacity: 1 }, 0.5);
          tl.set(baseLayer, { opacity: 0 }, 0.5);
          tl.to(exposureMask, { opacity: 0, duration: 0.1 }, 0.6);
          // 下部サブタイトル（写真が明るくなると同時にボワっと）
          tl.fromTo(subtitle, { opacity: 0.35, filter: "blur(24px)", y: 10 }, { opacity: 1, filter: "blur(0)", y: 0, duration: 1, ease: "power2.out" }, 0.5);
          // 手書きタイトル（写真が明るくなった直後に左→右へ描かれる）
          if (hwTitle) {
            tl.to(hwTitle, { clipPath: "inset(0 0% 0 0)", duration: 0.13, ease: "none" }, 0.58);
          }
          // 手書き本文（1行ずつスクロールに合わせて順番に描かれる）
          if (hwLines.length) {
            const linesStart = 0.68;
            const linesEnd = 0.95;
            const step = (linesEnd - linesStart) / hwLines.length;
            hwLines.forEach((line, idx) => {
              tl.to(line, { clipPath: "inset(0 0% 0 0)", duration: 0.09, ease: "none" }, linesStart + idx * step);
            });
          }
          tl.call(() => {
            if (!reduced) lockScroll(1300);
          }, [], 0.97);
          return;
        }

        if (sectionData.type === "letter") {
          const paper = el.querySelector("[data-letter-paper]");
          const glow = el.querySelector("[data-letter-glow]");
          const lines = el.querySelectorAll("[data-line-index]");
          if (!paper || !lines.length) return;

          // JSが動く環境ではここで初期状態を隠す（JSが動かない場合は文章が読めるフォールバックになる）
          gsap.set(lines, { clipPath: "inset(0 100% 0 0)", opacity: 0 });

          const step = 1 / (lines.length + 2);
          const tl = gsap.timeline({
            scrollTrigger: { trigger: el, start: "top top", end: `+=${pinHeightPx}`, pin: true, pinSpacing: true, scrub: reduced ? false : 1.5 },
          });
          // 手紙のfadeinアニメーション（HTMLのfadein + floatに合わせる）
          tl.fromTo(paper, { opacity: 0, y: 24, rotation: -0.3 }, { opacity: 1, y: 0, rotation: -0.3, duration: 0.3, ease: "power2.out" }, step * 0.5);
          // グローを表示
          if (glow) tl.to(glow, { opacity: 1, duration: 0.2 }, step * 0.5);
          // fadein完了後にfloatアニメーションを開始
          tl.call(() => {
            if (paper && !reduced) {
              (paper as HTMLElement).style.animation = "float 7s ease-in-out 1.8s infinite";
            }
          }, [], step * 0.5 + 0.3);
          // スクロールで文字を一行ずつ表示
          lines.forEach((line, idx) => {
            const lineStartTime = step * (1 + idx * 0.85);
            tl.to(line, { clipPath: "inset(0 0% 0 0)", opacity: 1, duration: 0.2, ease: "power2.out" }, lineStartTime);
            const shouldLock = line instanceof HTMLElement && line.dataset.letterLock === "title";
            if (shouldLock) {
              tl.call(() => {
                if (!reduced) lockScroll(1300);
              }, [], lineStartTime + 0.2);
            }
          });
          return;
        }

        if (sectionData.type === "giftbox") {
          const boxLid = el.querySelector("[data-box-lid]");
          const ribbonH = el.querySelector("[data-ribbon-h]");
          const ribbonV = el.querySelector("[data-ribbon-v]");
          const ribbonKnot = el.querySelector("[data-ribbon-knot]");
          const light = el.querySelector("[data-gift-light]");
          const text = el.querySelector("[data-giftbox-text]");
          if (!boxLid) return;

          const tl = gsap.timeline({
            scrollTrigger: { trigger: el, start: "top top", end: `+=${pinHeightPx}`, pin: true, pinSpacing: true, scrub: reduced ? false : 1.2 },
          });
          if (ribbonH) tl.to(ribbonH, { scaleX: 0, opacity: 0, duration: 0.15 }, 0.1);
          if (ribbonV) tl.to(ribbonV, { scaleY: 0, opacity: 0, duration: 0.15 }, 0.1);
          if (ribbonKnot) tl.to(ribbonKnot, { scale: 0, opacity: 0, duration: 0.15 }, 0.15);
          tl.to(boxLid, { rotationX: -120, transformOrigin: "bottom center", duration: 0.2, ease: "power2.out" }, 0.3);
          if (light) tl.to(light, { opacity: 0.95, scale: 1.5, duration: 0.35, ease: "power2.out" }, 0.55);
          if (text) {
            tl.fromTo(text, { opacity: 0.3, y: 16, filter: "blur(20px)" }, { opacity: 1, y: 0, filter: "blur(0)", duration: 0.8, ease: "power2.out" }, 0.75);
            tl.call(() => {
              if (!reduced) lockScroll(1300);
            }, [], 0.75 + 0.8);
          }
          return;
        }

        if (sectionData.type === "ticket") {
          const cardWrapper = el.querySelector("[data-ticket-card]");
          const finaleSubtitle = el.querySelector("[data-finale-subtitle]");
          const ticketStage = el.querySelector("[data-ticket-stage]");
          if (!cardWrapper) return;

          if (ticketStage) gsap.set(ticketStage, { opacity: 0 });

          ScrollTrigger.create({ trigger: el, start: "top 70%", onEnter: () => { if (!wavesPlayed.current) { wavesPlayed.current = true; playWaves(); } } });

          const tl = gsap.timeline({
            scrollTrigger: { trigger: el, start: "top top", end: `+=${pinHeightPx}`, pin: true, pinSpacing: true, scrub: reduced ? false : 1.2 },
          });
          if (ticketStage) tl.to(ticketStage, { opacity: 1, duration: 0.5, ease: "power2.inOut" }, 0.2);
          tl.fromTo(cardWrapper, { rotationX: 15, scale: 0.6, opacity: 0 }, { rotationX: 0, scale: 1, opacity: 1, duration: 0.35, ease: "back.out(1.4)" }, 0.28);
          if (finaleSubtitle) {
            tl.fromTo(finaleSubtitle, { opacity: 0.35, filter: "blur(20px)", y: 10 }, { opacity: 1, filter: "blur(0)", y: 0, duration: 0.9, ease: "power2.out" }, 0.55);
            tl.call(() => {
              if (!reduced) lockScroll(1500);
            }, [], 0.55 + 0.9);
          }
          return;
        }

        if (sectionData.type === "fin") {
          const finText = el.querySelector("[data-fin-text]");
          const finParticles = el.querySelector("[data-fin-particles]");
          if (!finText) return;

          const tl = gsap.timeline({
            scrollTrigger: { trigger: el, start: "top top", end: `+=${pinHeightPx}`, pin: true, pinSpacing: true, scrub: reduced ? false : 1.5 },
          });
          // Finテキストのゆっくりとしたフェードイン
          tl.fromTo(
            finText,
            { opacity: 0, filter: "blur(20px)", scale: 0.95 },
            { opacity: 1, filter: "blur(0)", scale: 1, duration: 1.2, ease: "power3.out" },
            0.2
          );
          // 粒子エフェクトもゆっくりと
          if (finParticles) {
            tl.to(finParticles, { opacity: 0.3, duration: 0.8 }, 0.4);
          }
          // Fin表示後にスクロールロック（読む時間を確保）
          tl.call(() => {
            if (!reduced) lockScroll(2500);
          }, [], 0.2 + 1.2);
          return;
        }
      });
    });

    return () => ctx.revert();
  }, deps);
}

export default function Story() {
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);
  const setRef = useCallback((i: number) => (el: HTMLElement | null) => { sectionRefs.current[i] = el; }, []);
  useScrollTrigger(sectionRefs, [SECTIONS.length]);

  // パスコードページで BGM は既に開始済み。
  // 直接 /story にアクセスした場合のフォールバック：クリック/タップで開始
  useLayoutEffect(() => {
    const onInteract = () => { startBgm(); };
    window.addEventListener("click", onInteract, { once: true });
    window.addEventListener("touchend", onInteract, { once: true });
    return () => {
      window.removeEventListener("click", onInteract);
      window.removeEventListener("touchend", onInteract);
    };
  }, []);

  return (
    <>
      <div className="vignette" aria-hidden />
      <div className="grain-overlay" aria-hidden />
      <div className="relative z-0">
        {SECTIONS.map((section, i) => {
          if (section.type === "prologue") return <Prologue key={section.id} ref={setRef(i) as React.Ref<HTMLElement>} />;
          if (section.type === "photo") return <PhotoChapter key={section.id} data={section as PhotoChapterData} ref={setRef(i) as React.Ref<HTMLElement>} />;
          if (section.type === "letter") return <LetterChapter key={section.id} data={section as LetterChapterData} ref={setRef(i) as React.Ref<HTMLElement>} />;
          if (section.type === "giftbox") return <GiftBoxChapter key={section.id} data={section as GiftBoxChapterData} ref={setRef(i) as React.Ref<HTMLElement>} />;
          if (section.type === "ticket") return <TicketChapter key={section.id} data={section as TicketChapterData} ref={setRef(i) as React.Ref<HTMLElement>} />;
          if (section.type === "fin") return <FinChapter key={section.id} ref={setRef(i) as React.Ref<HTMLElement>} />;
          return null;
        })}
      </div>
      <BgmButton />
    </>
  );
}
