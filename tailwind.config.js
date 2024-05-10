/** @type {import('tailwindcss').Config} */
const plugin = require('tailwindcss/plugin');
module.exports = {
  darkMode: ["class"],
  content: [
    './index.html',
    './pages/**/*.{js,jsx,ts,tsx}',
    './src/components/**/**/**/**/*.{js,jsx,ts,tsx,svg}', //C:\Users\Aniket\Desktop\timepass2\src\components\ui\landingPage\assets\images\wrapperBackground.svg
    './app/**/*.{js,jsx,ts,tsx}',
      // './src/css/*.{js,jsx,ts,tsx,svg}',
    './src/**/*.{js,jsx,ts,tsx,svg}', // Ensure you include all possible extensions
    // './src/*.{svg}'
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
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
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
      backgroundImage: { //C:\Users\Aniket\Desktop\timepass2\src\components\ui\landingPage\assets\images\wrapperBackground.svg
        wrapperBg: "url('img/wrapperBackground.svg')", // Corrected pathsrc\components\ui\landingPage\assets\images\wrapperBackground.svg
        wrapperDark: "url('img/wrapperDark.svg')",  // Corrected path
      },
      container: {
        screens: {
          sm: "640px",
          md: "767px",
          lg: "1140px",
          xl: "1400px",
          xs: '480px',
          "2xl": "1800px",
        },
      },
      screens: {
        "2xl": { max: "1535px" },
        // => @media (max-width: 1535px) { ... }
        xl: { max: "1279px" },
        // => @media (max-width: 1279px) { ... }
        lg: { max: "1023px" },
        // => @media (max-width: 1023px) { ... }
        md: { max: "767px" },
        // => @media (max-width: 767px) { ... }
        sm: { max: "639px" },
        // => @media (max-width: 639px) { ... }
        xs: '480px',
      },
      fontFamily: {
        inter: ["Inter"],
        petitFormal: ["Petit Formal Script"],
        russonOne: ["Russon One"],
      },
      borderWidth: {
        3: '3px',
      },
      minWidth: {
        36: '9rem',
        44: '11rem',
        56: '14rem',
        60: '15rem',
        72: '18rem',
        80: '20rem',
      },
      maxWidth: {
        '8xl': '88rem',
        '9xl': '96rem',
      },
      zIndex: {
        60: '60',
      },
    },
  },
  plugins: [require("tailwindcss-animate"),
    plugin(({ addVariant, e }) => {
      addVariant('sidebar-expanded', ({ modifySelectors, separator }) => {
        modifySelectors(({ className }) => `.sidebar-expanded .${e(`sidebar-expanded${separator}${className}`)}`);
      });
    }),
  ],
};
