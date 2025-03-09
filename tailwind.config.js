/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Game-specific colors
        "game-primary": "#3b82f6", // blue-500
        "game-secondary": "#10b981", // emerald-500
        "game-accent": "#8b5cf6", // violet-500
        "game-danger": "#ef4444", // red-500
        "game-warning": "#f59e0b", // amber-500
        "game-success": "#10b981", // emerald-500
      },
      animation: {
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "bounce-slow": "bounce 2s infinite",
        "float": "float 20s ease-in-out infinite",
        "float-reverse": "float-reverse 25s ease-in-out infinite",
        "pulse-once": "pulse-once 0.8s ease-in-out forwards",
        "slide-up": "slide-up 0.6s ease-out forwards",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0) translateX(0)" },
          "25%": { transform: "translateY(-15px) translateX(15px)" },
          "50%": { transform: "translateY(-25px) translateX(5px)" },
          "75%": { transform: "translateY(-10px) translateX(-15px)" },
        },
        "float-reverse": {
          "0%, 100%": { transform: "translateY(0) translateX(0)" },
          "25%": { transform: "translateY(15px) translateX(-15px)" },
          "50%": { transform: "translateY(25px) translateX(-5px)" },
          "75%": { transform: "translateY(10px) translateX(15px)" },
        },
        "pulse-once": {
          "0%": { transform: "scale(1)", opacity: "1" },
          "50%": { transform: "scale(1.05)", opacity: "0.9" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
        "slide-up": {
          "0%": { transform: "translateY(20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
  // Enable dark mode based on class (for manual toggling) or media (for system preference)
  darkMode: "media",
};
