/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        gray12: "#3E5680",
        gray5: "#BBD2F1",
        metrics_outer: "#FAFCFF",
        metrics_inner: "#F8FBFF",
        gray4: "#CEE0F8",
        logs_inner: "#090F17",
        logs_loading: "#0E1623",
        gray8: "#82A0CE",
        gray10: "#5E7BAA",
        gray6: "#A8C3E8",
      },
    },
  },
  plugins: [],
};
