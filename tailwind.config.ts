import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: { cinema: { black: "#0a0a0a", dark: "#111" } },
      fontFamily: { subtitle: ["var(--font-subtitle)", "serif"], klee: ['"Klee One"', "cursive"] },
    },
  },
  plugins: [],
};
export default config;
