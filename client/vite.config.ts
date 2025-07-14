import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@common": path.resolve(__dirname, "./src/common"),
      "@modules": path.resolve(__dirname, "./src/modules"),
      "@components": path.resolve(__dirname, "./src/common/components"),
      "@ui": path.resolve(__dirname, "./src/common/components/ui"),
      "@hooks": path.resolve(__dirname, "./src/common/hooks"),
      "@lib": path.resolve(__dirname, "./src/common/lib"),
      "@api": path.resolve(__dirname, "./src/common/api"),
      "@assets": path.resolve(__dirname, "./src/common/assets"),
    },
  },
});
