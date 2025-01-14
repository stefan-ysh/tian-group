// const defaultTheme = require('tailwindcss/defaultTheme');
// const colors = require('tailwindcss/colors');
const { nextui } = require('@nextui-org/react');
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './src/**/*.{js,ts,jsx,tsx,md,mdx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
  ],
  // theme: {
  //   extend: {
  //     colors: {
  //       primary: {
  //         DEFAULT: 'hsl(var(--primary))',
  //         foreground: 'hsl(var(--primary-foreground))',
  //       },
  //       secondary: {
  //         DEFAULT: 'hsl(var(--secondary))',
  //         foreground: 'hsl(var(--secondary-foreground))',
  //       },
  //       background: 'hsl(var(--background))',
  //       foreground: 'hsl(var(--foreground))',
  //       card: {
  //         DEFAULT: 'hsl(var(--card))',
  //         foreground: 'hsl(var(--card-foreground))',
  //       },
  //       popover: {
  //         DEFAULT: 'hsl(var(--popover))',
  //         foreground: 'hsl(var(--popover-foreground))',
  //       },
  //       muted: {
  //         DEFAULT: 'hsl(var(--muted))',
  //         foreground: 'hsl(var(--muted-foreground))',
  //       },
  //       accent: {
  //         DEFAULT: 'hsl(var(--accent))',
  //         foreground: 'hsl(var(--accent-foreground))',
  //       },
  //       destructive: {
  //         DEFAULT: 'hsl(var(--destructive))',
  //         foreground: 'hsl(var(--destructive-foreground))',
  //       },
  //       border: 'hsl(var(--border))',
  //       input: 'hsl(var(--input))',
  //       ring: 'hsl(var(--ring))',
  //       chart: {
  //         1: 'hsl(var(--chart-1))',
  //         2: 'hsl(var(--chart-2))',
  //         3: 'hsl(var(--chart-3))',
  //         4: 'hsl(var(--chart-4))',
  //         5: 'hsl(var(--chart-5))',
  //       },
  //     },
  //     fontFamily: {
  //       sans: ['var(--font-custom)', ...defaultTheme.fontFamily.sans],
  //     },
  //     borderRadius: {
  //       lg: 'var(--radius)',
  //       md: 'calc(var(--radius) - 2px)',
  //       sm: 'calc(var(--radius) - 4px)',
  //     },
  //   },
  // },
  plugins: [
    require('@tailwindcss/typography'),
    require('tailwindcss-animate'),
    nextui({
      "themes": {
      //   "light": {
      //     "colors": {
      //       "default": {
      //         "50": "#f6f8f7",
      //         "100": "#eaefec",
      //         "200": "#dee5e0",
      //         "300": "#d2dcd5",
      //         "400": "#c5d2c9",
      //         "500": "#b9c9be",
      //         "600": "#99a69d",
      //         "700": "#78837c",
      //         "800": "#585f5a",
      //         "900": "#383c39",
      //         "foreground": "#000",
      //         "DEFAULT": "#b9c9be"
      //       },
      //       "primary": {
      //         "50": "#ecf9f0",
      //         "100": "#d1f0dc",
      //         "200": "#b6e7c7",
      //         "300": "#9cdeb3",
      //         "400": "#81d59e",
      //         "500": "#66cc8a",
      //         "600": "#54a872",
      //         "700": "#42855a",
      //         "800": "#306142",
      //         "900": "#1f3d29",
      //         "foreground": "#000",
      //         "DEFAULT": "#66cc8a"
      //       },
      //       "secondary": {
      //         "50": "#e6efff",
      //         "100": "#c3d8fe",
      //         "200": "#a0c1fd",
      //         "300": "#7daafc",
      //         "400": "#5a93fc",
      //         "500": "#377cfb",
      //         "600": "#2d66cf",
      //         "700": "#2451a3",
      //         "800": "#1a3b77",
      //         "900": "#11254b",
      //         "foreground": "#000",
      //         "DEFAULT": "#377cfb"
      //       },
      //       "success": {
      //         "50": "#dff4ed",
      //         "100": "#b3e5d4",
      //         "200": "#86d6ba",
      //         "300": "#59c7a1",
      //         "400": "#2db887",
      //         "500": "#00a96e",
      //         "600": "#008b5b",
      //         "700": "#006e48",
      //         "800": "#005034",
      //         "900": "#003321",
      //         "foreground": "#000",
      //         "DEFAULT": "#00a96e"
      //       },
      //       "warning": {
      //         "50": "#fff7df",
      //         "100": "#ffecb3",
      //         "200": "#ffe086",
      //         "300": "#ffd559",
      //         "400": "#ffc92d",
      //         "500": "#ffbe00",
      //         "600": "#d29d00",
      //         "700": "#a67c00",
      //         "800": "#795a00",
      //         "900": "#4d3900",
      //         "foreground": "#000",
      //         "DEFAULT": "#ffbe00"
      //       },
      //       "danger": {
      //         "50": "#ffeaeb",
      //         "100": "#ffcdd0",
      //         "200": "#ffb0b4",
      //         "300": "#ff9298",
      //         "400": "#ff757d",
      //         "500": "#ff5861",
      //         "600": "#d24950",
      //         "700": "#a6393f",
      //         "800": "#792a2e",
      //         "900": "#4d1a1d",
      //         "foreground": "#000",
      //         "DEFAULT": "#ff5861"
      //       },
      //       "background": "#f6fffa",
      //       "foreground": {
      //         "50": "#dfe9e3",
      //         "100": "#b3c9bb",
      //         "200": "#86aa93",
      //         "300": "#598b6b",
      //         "400": "#2d6b43",
      //         "500": "#004c1b",
      //         "600": "#003f16",
      //         "700": "#003112",
      //         "800": "#00240d",
      //         "900": "#001708",
      //         "foreground": "#fff",
      //         "DEFAULT": "#004c1b"
      //       },
      //       "content1": {
      //         "DEFAULT": "#e0f5e8",
      //         "foreground": "#000"
      //       },
      //       "content2": {
      //         "DEFAULT": "#c2ebd0",
      //         "foreground": "#000"
      //       },
      //       "content3": {
      //         "DEFAULT": "#a3e0b9",
      //         "foreground": "#000"
      //       },
      //       "content4": {
      //         "DEFAULT": "#85d6a1",
      //         "foreground": "#000"
      //       },
      //       "focus": "#66cc8a",
      //       "overlay": "#000000",
      //       "divider": "#111111"
      //     }
      //   },
        "dark": {
          "colors": {
            "default": {
              "50": "#171b17",
              "100": "#282d28",
              "200": "#384038",
              "300": "#485248",
              "400": "#717971",
              "500": "#9aa09a",
              "600": "#c4c7c4",
              "700": "#edeeed",
              "foreground": "#fff",
              "DEFAULT": "#384038"
            },
            "primary": {
              "50": "#21422d",
              "100": "#38704c",
              "200": "#4f9e6b",
              "300": "#66cc8a",
              "400": "#88d7a4",
              "500": "#abe3bf",
              "600": "#cdeed9",
              "700": "#f0faf3",
              "foreground": "#000",
              "DEFAULT": "#4f9e6b"
            },
            "secondary": {
              "50": "#122852",
              "100": "#1e448a",
              "200": "#2b60c3",
              "300": "#377cfb",
              "400": "#6499fc",
              "500": "#91b7fd",
              "600": "#bed4fe",
              "700": "#ebf2ff",
              "foreground": "#fff",
              "DEFAULT": "#2b60c3"
            },
            "success": {
              "50": "#003724",
              "100": "#005d3d",
              "200": "#008355",
              "300": "#00a96e",
              "400": "#39bc8f",
              "500": "#73d0af",
              "600": "#ace3d0",
              "700": "#e6f6f1",
              "foreground": "#fff",
              "DEFAULT": "#008355"
            },
            "warning": {
              "50": "#533e00",
              "100": "#8c6900",
              "200": "#c69300",
              "300": "#ffbe00",
              "400": "#ffcd39",
              "500": "#ffdb73",
              "600": "#ffeaac",
              "700": "#fff9e6",
              "foreground": "#000",
              "DEFAULT": "#c69300"
            },
            "danger": {
              "50": "#531d20",
              "100": "#8c3035",
              "200": "#c6444b",
              "300": "#ff5861",
              "400": "#ff7e85",
              "500": "#ffa3a8",
              "600": "#ffc9cc",
              "700": "#ffeeef",
              "foreground": "#fff",
              "DEFAULT": "#c6444b"
            },
            "background": "#010b06",
            "foreground": {
              "50": "#324438",
              "100": "#54745f",
              "200": "#77a386",
              "300": "#99d2ad",
              "400": "#b0dcbf",
              "500": "#c7e6d2",
              "600": "#def0e4",
              "700": "#f5fbf7",
              "foreground": "#000",
              "DEFAULT": "#77a386"
            },
            "content1": {
              "DEFAULT": "#14291c",
              "foreground": "#fff"
            },
            "content2": {
              "DEFAULT": "#295237",
              "foreground": "#fff"
            },
            "content3": {
              "DEFAULT": "#3d7a53",
              "foreground": "#fff"
            },
            "content4": {
              "DEFAULT": "#52a36e",
              "foreground": "#000"
            },
            "focus": "#66cc8a",
            "overlay": "#ffffff",
            "divider": "#ffffff"
          }
        }
      },
      "layout": {
        "fontSize": {
          "tiny": "0.75rem",
          "small": "0.875rem",
          "medium": "1rem",
          "large": "1.125rem"
        },
        "lineHeight": {
          "tiny": "1rem",
          "small": "1.25rem",
          "medium": "1.5rem",
          "large": "1.75rem"
        },
        "radius": {
          "small": "0.5rem",
          "medium": "0.75rem",
          "large": "0.875rem"
        },
        "borderWidth": {
          "small": "1px",
          "medium": "2px",
          "large": "3px"
        },
        "disabledOpacity": "0.5",
        "dividerWeight": "1",
        "hoverOpacity": "0.9"
      }
    }),
  ],
  darkMode: 'class',
};
