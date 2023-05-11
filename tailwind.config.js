/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./src/features/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        xs: "375px",
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#00a7ff",
          secondary: "#ffffff",
          accent: "#86d6ff",
          neutral: "#0e1721",
          "base-100": "#1c2937",
          info: "#003556",
          success: "#6aff5c",
          warning: "#fab600",
          error: "#ff2c35",
        },
      },
    ],
  },
};
