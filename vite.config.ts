import { defineConfig } from "vite";

import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],

  build: {
    chunkSizeWarningLimit: 1000,

    rollupOptions: {
      output: [
        {
          manualChunks(id) {
            if (id.includes("node_modules/react") || id.includes("node_modules/react-dom")) {
              return "vendor";
            }

            if (id.includes("@tanstack/react-query")) {
              return "query";
            }

            if (id.includes("framer-motion")) {
              return "motion";
            }
          },
        },
      ],
    },
  },
});