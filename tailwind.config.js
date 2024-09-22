/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        panton: ["Panton", "sans-serif"],
        pantonT: ["Panton-Trial", "sans-serif"],
      },
      keyframes: {
        appear: {
          "0%": {
            opacity: "0",
          },
          "100%": {
            opacity: "1",
          },
        },
      },
      animation: {
        appear: "appear 0.75s ease-in-out",
      },
    },
    plugins: [],
  },
};
