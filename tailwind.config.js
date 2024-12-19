/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        main: "#00695c",
        pri: "#f5f5f5",
        sec: "#e0f2f1",
        outline: "#b2dfdb"
      },
    },
  },
  plugins: [],
};
