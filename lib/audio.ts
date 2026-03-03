let audioCtx: AudioContext | null = null;
let gainNode: GainNode | null = null;
let audioBuffer: AudioBuffer | null = null;
let prefetchPromise: Promise<ArrayBuffer> | null = null;
let sourceNode: AudioBufferSourceNode | null = null;
let bgmStarted = false;
let bgmStarting = false;
let bgmMuted = false;

// タブが非アクティブになると AudioContext が suspend される → 復帰時に resume する
if (typeof document !== "undefined") {
  document.addEventListener("visibilitychange", () => {
    if (!document.hidden && audioCtx && audioCtx.state === "suspended" && bgmStarted && !bgmMuted) {
      audioCtx.resume();
    }
  });
}

// MP3データだけ先にフェッチしておく（AudioContext はまだ作らない）
export function prepareBgm(): void {
  if (typeof window === "undefined" || prefetchPromise) return;
  prefetchPromise = fetch("/assets/bgm.mp3").then((r) => r.arrayBuffer());
}

export async function startBgm(): Promise<void> {
  if (bgmStarted || bgmStarting || bgmMuted) return;
  bgmStarting = true;

  // ユーザー操作の同期タイミングで AudioContext を生成・resume を発火（awaitより前）
  if (!audioCtx) {
    audioCtx = new AudioContext();
    gainNode = audioCtx.createGain();
    gainNode.gain.value = 0;
    gainNode.connect(audioCtx.destination);
  }
  const resumePromise = audioCtx.state === "suspended" ? audioCtx.resume() : Promise.resolve();

  // resume と並行してバッファをデコード
  if (!audioBuffer) {
    try {
      const ab = prefetchPromise
        ? await prefetchPromise
        : await fetch("/assets/bgm.mp3").then((r) => r.arrayBuffer());
      audioBuffer = await audioCtx.decodeAudioData(ab);
    } catch {
      bgmStarting = false;
      return;
    }
  }

  await resumePromise;
  if (!audioCtx || !gainNode || !audioBuffer) { bgmStarting = false; return; }

  sourceNode = audioCtx.createBufferSource();
  sourceNode.buffer = audioBuffer;
  sourceNode.loop = true;
  sourceNode.connect(gainNode);
  sourceNode.start(0);
  bgmStarted = true;
  bgmStarting = false;

  // AudioContext が suspend された場合（タブ切り替えなど）に自動 resume
  audioCtx.onstatechange = () => {
    if (audioCtx && audioCtx.state === "suspended" && bgmStarted && !bgmMuted) {
      audioCtx.resume();
    }
  };

  // フェードイン（1.5秒）
  gainNode.gain.cancelScheduledValues(audioCtx.currentTime);
  gainNode.gain.setValueAtTime(0, audioCtx.currentTime);
  gainNode.gain.linearRampToValueAtTime(0.28, audioCtx.currentTime + 1.5);
}

export function setBgmMuted(muted: boolean): void {
  bgmMuted = muted;
  if (!gainNode || !audioCtx) return;

  gainNode.gain.cancelScheduledValues(audioCtx.currentTime);
  gainNode.gain.setValueAtTime(gainNode.gain.value, audioCtx.currentTime);
  if (muted) {
    gainNode.gain.linearRampToValueAtTime(0, audioCtx.currentTime + 0.6);
  } else {
    if (!bgmStarted) {
      startBgm();
    } else {
      gainNode.gain.linearRampToValueAtTime(0.28, audioCtx.currentTime + 0.6);
    }
  }
}

export function isBgmMuted(): boolean {
  return bgmMuted;
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
