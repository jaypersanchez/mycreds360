/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
    "./app/**/*.{js,jsx}",
    "./src/**/*.{js,jsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      colors: {
        primary: "#093576",
        secondary: "#4872B0",
      },
      screens: {
        base: "360px",
        mobile: "480px",
        tablet: "768px",
        laptop: "1024px",
        desktop: "1280px",
        lg_desktop: "1440px",
      },
      backgroundImage: {
        login: "url('/images/login-bg.png')",
      },
      boxShadow: {
        "3xl":
          "rgba(0, 0, 0, 0.2) 0px 2px 4px -1px, rgba(0, 0, 0, 0.14) 0px 4px 5px 0px, rgba(0, 0, 0, 0.12) 0px 1px 10px 0px",
        "2.5xl": "1px 1px 8px 2px #00000040",
      },
    },
  },
  plugins: [require("tailwindcss-animate"), require("autoprefixer")],
};
