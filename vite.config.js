import { defineConfig } from "vite"
import react from "@vitejs/plugin-react-swc"

// https://vite.dev/config/
export default defineConfig({
  base: "./", // ou spécifie le chemin relatif approprié
  plugins: [react()],
  test: {
    globals: true,
    environment: "jsdom", // nécessaire pour tester des composants React
  },
})
