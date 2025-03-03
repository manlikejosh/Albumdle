/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        lora: ["Lora", "serif"],
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
      screens: {
        single: "470px",
        double: "940px",
      },
      colors: {
        darkBlueBackground: "#3160a6",
        lightGray: "#ebebeb",
      },
    },
    plugins: [],
  },
};
