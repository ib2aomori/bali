const STORY_KEY = "bali-story";

export function checkStoryAccess(): boolean {
  if (typeof window === "undefined") return false;
  return sessionStorage.getItem(STORY_KEY) === "1";
}

export function setStoryAccess(): void {
  if (typeof window === "undefined") return;
  sessionStorage.setItem(STORY_KEY, "1");
}

