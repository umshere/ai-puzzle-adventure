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
