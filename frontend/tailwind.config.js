/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#FF0000",    
        secondary: "#FFFFFF",  
        dark: "#1F1F1F",       
      },
      fontFamily: {
        sans: ["Poppins", "Arial", "sans-serif"],
        serif: ["Merriweather", "serif"],
      },
    },
  },
  plugins: [],
}
