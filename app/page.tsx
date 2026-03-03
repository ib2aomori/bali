import { PasscodeForm } from "@/components/PasscodeForm";

export default function HomePage() {
  return (
    <main
      className="relative flex min-h-dvh items-center justify-center px-4"
      style={{
        background:
          "radial-gradient(ellipse 100% 80% at 50% 45%, rgba(35, 32, 28, 0.92) 0%, rgba(18, 16, 14, 0.98) 45%, #0d0c0b 100%), radial-gradient(ellipse 70% 50% at 50% 50%, rgba(120, 80, 50, 0.08) 0%, transparent 60%), #0d0c0b",
      }}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.4]"
        style={{
          background:
            "radial-gradient(ellipse 60% 40% at 50% 40%, rgba(200, 180, 140, 0.06) 0%, transparent 50%)",
        }}
        aria-hidden
      />
      <PasscodeForm />
    </main>
  );
}
