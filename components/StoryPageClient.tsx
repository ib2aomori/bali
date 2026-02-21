"use client";

import Story from "@/components/Story";
import { checkStoryAccess } from "@/lib/session";
import { useEffect, useState } from "react";

export function StoryPageClient() {
  const [allowed, setAllowed] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setAllowed(checkStoryAccess());
  }, []);

  if (!mounted) return null;
  if (!allowed) {
    return (
      <div className="flex min-h-dvh flex-col items-center justify-center gap-4 bg-[#0a0a0a] px-6 text-center text-white">
        <p className="text-lg">ストーリーを見るにはパスコードを入力してください。</p>
        <a href="/" className="text-teal-400 underline">トップへ戻る</a>
      </div>
    );
  }
  return <Story />;
}
