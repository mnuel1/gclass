/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        primary: ["Inter var", "sans-serif"]        
      },
      colors: {
        primary: "#003554",
        secondary: "#357ae6", 
        onMouse: "#ececed",
        optional: "#10496b",
        optional2: "#b9e4fd",
      }
    },
  },
  plugins: [
  
  ],
}

