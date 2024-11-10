import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: {
        'xs': '475px',  // Extra small devices
        'sm': '640px',  // Small devices (default Tailwind breakpoint)
        'md': '768px',  // Medium devices (default Tailwind breakpoint)
        'lg': '1024px', // Large devices (default Tailwind breakpoint)
        'xl': '1280px', // Extra large devices (default Tailwind breakpoint)
        '2xl': '1536px',// 2X large devices (default Tailwind breakpoint)
      },
      colors: {
        primary: '#FF0000', // Add your red color here
        secondary: '#fff', // Add your white color here
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
  ],
  safelist:['md:order-1 md:order-2']
};
export default config;