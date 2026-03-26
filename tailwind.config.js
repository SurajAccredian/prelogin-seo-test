/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{html,jsx,js,tsx,ts}",
  ],
  theme: {
    extend: {
      colors: {
        universal: "#1A73E8",
        darkBlue: "#1B66C9",
        paleBlack: "#343434",
        lightBackground: "#EEF5FF",
        tableBackground: "#1A73E859",
        formGray: "#0000000A",
      },
      fontFamily: {
        popins: ["Poppins", "sans-serif"],
        circular: ["circular", "Inter", "sans-serif"],
        roboto: ["Roboto", "sans-serif"],
      },
      borderRadius: {
        customSm: "0.375rem",
      },
    },
    screens: {
      sm: "640px",
      md: "768px",
      lg: "1025px",
      xl: "1280px",
      "2xl": "1440px",
      "3xl": "1660px",
    },
  },
  plugins: [],
};
