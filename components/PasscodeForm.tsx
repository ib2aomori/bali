"use client";

import { useRouter } from "next/navigation";
import { useState, useCallback } from "react";
import { setStoryAccess } from "@/lib/session";

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
        パスコードを入力
      </h1>
      <input
        type="password"
        inputMode="numeric"
        maxLength={4}
        value={value}
        onChange={(e) => {
          setValue(e.target.value.replace(/\D/g, "").slice(0, 4));
          setError(false);
        }}
        className="w-full rounded border border-white/20 bg-white/10 px-4 py-3 text-center text-white placeholder-white/40"
        placeholder="****"
        aria-label="4桁パスコード"
      />
      {error && (
        <p className="text-sm text-red-300">パスコードが違います</p>
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
