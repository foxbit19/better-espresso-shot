import { nextui } from "@nextui-org/theme";

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "coffee-cream": "#E4C59E",
        "coffee-under-extracted": "#e4cfb5",
        "coffee-over-extracted": "#181319",
        "coffee-espresso": "#966233",
      },
    },
  },
  darkMode: "class",
  plugins: [
    nextui({
      themes: {
        dark: {
          colors: {
            background: "#322C2B",
            primary: {
              DEFAULT: "#E4C59E",
              foreground: "#322C2B",
            },
            focus: "#E4C59E",
          },
        },
      },
    }),
  ],
};
