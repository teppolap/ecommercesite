import { Poppins } from "next/font/google";
import type { Config } from "tailwindcss";
import defaultTheme from "tailwindcss/defaultTheme"

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily:{
        sans:["Poppins", ...defaultTheme.fontFamily.sans],
        display:["Poppins", ...defaultTheme.fontFamily.sans],
      },
      colors: {
        primeColor: "#262626",
        lighText: "#6D6D6D",
      },
      boxShadow: {
        testShadow: "0px 0px 54px -13px rgba(0,0,0,0.7)",
      }
    },
  },
  plugins: [],
} satisfies Config;
