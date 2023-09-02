/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
    colors: {
      darkpink: "#FF6666",
      hr: "#d3d3d3",
      white: "#fff",
      black: "#222831",
      lightgrey: "#EEEEEE",
      teal: "#00ADB5",
      navy: "#1D2786",
      red: "#F73859",
      orange: "#F87D09",
      blue: "#068FFF",
      facebook: "#1877f2",
      github: "#172b4d",
      google: "#e94134",
      purple: "#6528F7",
      grey: "gray",
      green: "#00DFA2",
    },
    screens: {
      sm: "640px",
      // => @media (min-width: 640px) { ... }

      md: "768px",
      // => @media (min-width: 768px) { ... }

      lg: "1024px",
      // => @media (min-width: 1024px) { ... }

      xl: "1280px",
      // => @media (min-width: 1280px) { ... }

      "2xl": "1536px",
      // => @media (min-width: 1536px) { ... }
    },
  },
  plugins: [],
};
