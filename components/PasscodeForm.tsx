"use client";

import { useRouter } from "next/navigation";
import { useState, useCallback } from "react";
import { setStoryAccess } from "@/lib/session";
import { prepareBgm, startBgm } from "@/lib/audio";

const PASSCODE = "0607";

export function PasscodeForm() {
  const router = useRouter();
  const [value, setValue] = useState("");
  const [error, setError] = useState(false);

  const onSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (value === PASSCODE) {
        setStoryAccess();
        startBgm(); // ユーザー操作の同期タイミングで BGM 開始
        router.push("/story");
        setError(false);
      } else {
        setError(true);
      }
    },
    [value, router]
  );

  return (
    <form onSubmit={onSubmit} className="w-full max-w-xs space-y-4">
      <h1 className="font-subtitle mb-2 text-lg tracking-widest text-white/90">
        私たちの付き合った日を入力
      </h1>
      <input
        type="password"
        inputMode="numeric"
        maxLength={4}
        value={value}
        onFocus={prepareBgm}
        onChange={(e) => {
          setValue(e.target.value.replace(/\D/g, "").slice(0, 4));
          setError(false);
        }}
        className="w-full rounded border border-white/20 bg-white/10 px-4 py-3 text-center text-white placeholder-white/40"
        placeholder="****"
        aria-label="付き合った日（4桁）"
      />
      {error && (
        <p className="text-sm text-red-300">正しい日付を入力してください</p>
      )}
      <button
        type="submit"
        className="w-full rounded bg-white/20 py-2 text-sm text-white hover:bg-white/30"
      >
        送信
      </button>
    </form>
  );
}
