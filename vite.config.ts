import { defineConfig } from "vite";
import path from "path";

export default defineConfig({
  resolve: {
    alias: {
      "@calc": path.resolve(__dirname, "src/calc"),
      "@observable": path.resolve(__dirname, "src/observable"),
    },
  },
});
