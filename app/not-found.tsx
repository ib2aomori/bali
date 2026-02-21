export default function NotFound() {
  return (
    <div className="flex min-h-dvh flex-col items-center justify-center gap-4 bg-[#0a0a0a] px-6 text-center text-white">
      <p className="text-lg">ページが見つかりません。</p>
      <p className="text-sm text-white/70">localhost:3001 で開き、パスコード 0607 を入力してストーリーへ進んでください。</p>
    </div>
  );
}
