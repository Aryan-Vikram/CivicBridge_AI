/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ["'Plus Jakarta Sans'", "sans-serif"],
        body: ["Inter", "sans-serif"],
      },
      colors: {
        navy: {
          950: "#060B18",
          900: "#0B1220",
          800: "#111A2E",
          700: "#182541",
        },
        royal: {
          50: "#EEF2FF",
          100: "#E0E7FF",
          400: "#5B7CFA",
          500: "#3A5CF0",
          600: "#2451FF",
          700: "#1B3FCC",
        },
        indigo2: {
          500: "#4F46E5",
          600: "#4338CA",
        },
        emerald2: {
          50: "#ECFDF5",
          500: "#10B981",
          600: "#059669",
        },
        amber2: {
          50: "#FFFBEB",
          500: "#F59E0B",
          600: "#D97706",
        },
        crimson: {
          50: "#FEF2F2",
          500: "#EF4444",
          600: "#DC2626",
        },
        violet2: {
          500: "#8B5CF6",
        },
      },
      boxShadow: {
        soft: "0 1px 2px rgba(15,23,42,0.04), 0 8px 24px -8px rgba(15,23,42,0.08)",
        card: "0 1px 3px rgba(15,23,42,0.06), 0 12px 32px -12px rgba(15,23,42,0.12)",
      },
      borderRadius: {
        xl2: "18px",
      },
      keyframes: {
        pulseDot: {
          "0%,100%": { opacity: 1 },
          "50%": { opacity: 0.35 },
        },
        flowMove: {
          "0%": { strokeDashoffset: 24 },
          "100%": { strokeDashoffset: 0 },
        },
      },
      animation: {
        pulseDot: "pulseDot 1.6s ease-in-out infinite",
        flow: "flowMove 1s linear infinite",
      },
    },
  },
  plugins: [],
};
