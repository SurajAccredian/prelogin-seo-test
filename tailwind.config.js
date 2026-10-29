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
        primary: {
          50: "#eff6ff",
          100: "#dbeafe",
          200: "#bfdbfe",
          300: "#93c5fd",
          400: "#60a5fa",
          500: "#3b82f6",
          600: "#2563eb",
          700: "#1d4ed8",
          800: "#1e40af",
          900: "#1e3a8a",
        },
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
