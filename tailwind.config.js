/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#00a7ff",
          secondary: "#ffffff",
          accent: "#1FB2A6",
          neutral: "#103142",
          "base-100": "#1f2936",
          info: "#00b5ff",
          success: "#6aff5c",
          warning: "#fab600",
          error: "#ff2c35",
        },
      },
    ],
  },
};
