import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react-swc";
import path from "path";

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/__tests__/setup.ts",
  },
  resolve: {
    alias: {
      "@/components": path.resolve(__dirname, "src/components"),
      "@/hooks": path.resolve(__dirname, "src/hooks"),
      "@/pages": path.resolve(__dirname, "src/pages"),
      "@/styles": path.resolve(__dirname, "src/styles"),
      "@/resources": path.resolve(__dirname, "src/resources"),
      "@/assets": path.resolve(__dirname, "src/assets"),
      "@/stores": path.resolve(__dirname, "src/stores"),
    },
  },
});
