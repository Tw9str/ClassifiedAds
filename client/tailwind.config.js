/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    colors: {
      primaryColor: "#ef5d50",
      secondaryColor: "#f6db27",
      bgPrimaryColor: "#102662",
      bgGray: "#f7f8f9",
      gray: "#888888",
      lightGray: "#e1e1e1",
      borderColor: "#eee",
      black: "#222222",
      white: "#ffffff",
      star: "gold",
    },
    screens: {
      xs: "480px",
      sm: "768px",
      md: "992px",
      lg: "1170px",
    },
    extend: {
      backgroundImage: {
        heroBg: "url('/images/hero.png')",
      },
    },
  },
  plugins: [],
};
