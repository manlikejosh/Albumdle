/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        panton: ["Panton", "sans-serif"],
        pantonT: ["Panton-Trial", "sans-serif"],
      },
    },
    plugins: [],
  },
};
