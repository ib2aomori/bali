let bgmAudio: HTMLAudioElement | null = null;
let bgmStarted = false;
let bgmMuted = false;

export function prepareBgm(): void {
  if (typeof window === "undefined") return;
  if (bgmAudio) return;
  bgmAudio = new Audio("/assets/bgm.mp3");
  bgmAudio.loop = true;
  bgmAudio.volume = 0;
  bgmAudio.preload = "auto";
}

export function startBgm(): void {
  if (bgmStarted || bgmMuted) return;
  if (!bgmAudio) prepareBgm();
  if (!bgmAudio) return;

  bgmAudio.play().then(() => {
    bgmStarted = true;
    fadeBgmIn(bgmAudio!, 0.28, 3000);
  }).catch(() => {});
}

export function setBgmMuted(muted: boolean): void {
  bgmMuted = muted;
  if (!bgmAudio) return;
  if (muted) {
    fadeBgmOut(bgmAudio, 0, 600);
  } else {
    if (!bgmStarted) {
      startBgm();
    } else {
      fadeBgmIn(bgmAudio, 0.28, 600);
    }
  }
}

export function isBgmMuted(): boolean {
  return bgmMuted;
}

function fadeBgmIn(audio: HTMLAudioElement, targetVol: number, durationMs: number): void {
  const steps = 30;
  const interval = durationMs / steps;
  const delta = targetVol / steps;
  let step = 0;
  const timer = setInterval(() => {
    step++;
    audio.volume = Math.min(targetVol, audio.volume + delta);
    if (step >= steps) clearInterval(timer);
  }, interval);
}

function fadeBgmOut(audio: HTMLAudioElement, targetVol: number, durationMs: number): void {
  const steps = 20;
  const interval = durationMs / steps;
  const startVol = audio.volume;
  const delta = (startVol - targetVol) / steps;
  let step = 0;
  const timer = setInterval(() => {
    step++;
    audio.volume = Math.max(targetVol, audio.volume - delta);
    if (step >= steps) clearInterval(timer);
  }, interval);
}

export function prepareAudio(): void {
  prepareBgm();
}

export function playWind(): void {
  try {
    const a = new Audio("/assets/wind.mp3");
    a.volume = 0.4;
    a.play().catch(() => {});
  } catch {}
}

export function playWaves(): void {
  try {
    const a = new Audio("/assets/waves.mp3");
    a.volume = 0.35;
    a.play().catch(() => {});
  } catch {}
}
