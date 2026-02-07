// const defaultTheme = require('tailwindcss/defaultTheme');
// const colors = require('tailwindcss/colors');
const { heroui } = require("@heroui/react");
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './src/**/*.{js,ts,jsx,tsx,md,mdx}',
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  // theme: {
  //   extend: {},
  // },
  plugins: [
    require('@tailwindcss/typography'),
    require('tailwindcss-animate'),
    heroui({
      themes: {
        light: {
          colors: {
            background: "#FAFAFA",
            foreground: "#0F172A", // Slate 900
            primary: {
              DEFAULT: "#0F2C59", // Deep Navy
              foreground: "#FFFFFF",
            },
            secondary: {
              DEFAULT: "#2B7C85", // Teal Accent
              foreground: "#FFFFFF",
            },
            focus: "#0F2C59",
          },
        },
        dark: {
          colors: {
            background: "#02040A", 
            foreground: "#F8FAFC", // Slate 50
            primary: {
              DEFAULT: "#60A5FA", // Blue 400
              foreground: "#000000",
            },
            secondary: {
              DEFAULT: "#2DD4BF", // Teal 400
              foreground: "#000000",
            },
            focus: "#60A5FA",
          },
        },
      },
      layout: {
        fontSize: {
          tiny: "0.75rem",
          small: "0.875rem",
          medium: "1rem",
          large: "1.125rem"
        },
        lineHeight: {
          tiny: "1rem",
          small: "1.25rem",
          medium: "1.5rem",
          large: "1.75rem"
        },
        radius: {
          small: "0.5rem",
          medium: "0.75rem",
          large: "0.875rem"
        },
        borderWidth: {
          small: "1px",
          medium: "2px",
          large: "3px"
        },
        disabledOpacity: "0.5",
        dividerWeight: "1",
        hoverOpacity: "0.9"
      }
    }),
  ],
  darkMode: 'class',
};
