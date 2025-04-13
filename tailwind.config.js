export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        biribol: {
          azul: "#0077b6",
          azulClaro: "#00b4d8",
          amarelo: "#ffdd00",
        },
      },
      fontFamily: {
        sans: ["'Segoe UI'", "sans-serif"],
      },
    },
  },
  plugins: [],
}
