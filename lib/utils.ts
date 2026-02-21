export const FALLBACK_LABELS: Record<string, string> = {
  ch1: "01",
  ch2: "02",
  ch3: "03",
  ch4: "04",
  finale: "Bali",
};

export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

let scrollLockTimeout: ReturnType<typeof setTimeout> | null = null;
let isLocked = false;

export function lockScroll(duration: number = 1200): void {
  if (typeof window === "undefined" || isLocked) return;
  isLocked = true;
  document.body.style.overflow = "hidden";
  if (scrollLockTimeout) clearTimeout(scrollLockTimeout);
  scrollLockTimeout = setTimeout(() => {
    document.body.style.overflow = "";
    isLocked = false;
  }, duration);
}

export function unlockScroll(): void {
  if (typeof window === "undefined" || !isLocked) return;
  if (scrollLockTimeout) clearTimeout(scrollLockTimeout);
  document.body.style.overflow = "";
  isLocked = false;
}
