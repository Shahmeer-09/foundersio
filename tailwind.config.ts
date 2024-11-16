
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
					"100": "#f3e8ff",
					DEFAULT: "rgb(234, 117, 234)",
				},
				secondary: "#FBE843",
				black: {
					"100": "#333333",
					"200": "#141413",
					"300": "#7D8087",
					DEFAULT: "#000000",
				},
				white: {
					"100": "#F7F7F7",
					DEFAULT: "#FFFFFF",
				},
      },
      fontFamily:{
        "work-sans":"var(--font-work-sans)"
      }
    },
  },
  plugins: [ require('@tailwindcss/typography'),require('tailwindcss-animated'),],
};
export default config;