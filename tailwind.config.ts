import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#0B0A14", 
        surface: "#141221",    
        primary: "#A855F7",   
        secondary: "#38BDF8",  
      },
    },
  },
  plugins: [],
};
export default config;