import { defineConfig } from "vite";

export default defineConfig({
  server: {
    host: "0.0.0.0",
    port: 4173,
    strictPort: false,
    proxy: {
      "/api": "http://localhost:3001",
      "/health": "http://localhost:3001",
    },
  },
  preview: {
    host: "0.0.0.0",
    port: 4173,
    strictPort: false,
  },
});
