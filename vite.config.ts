import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  build: {
    outDir: "dist/client",
    rollupOptions: {
      output: {
        // Découpe le bundle en chunks vendors stables → cache navigateur
        // partagé entre toutes les pages, et 1er chargement plus rapide.
        manualChunks(id) {
          if (!id.includes("node_modules")) return;
          if (id.includes("react-dom")) return "vendor-react-dom";
          if (id.match(/node_modules\/(react|react-router|react-helmet|scheduler)\//))
            return "vendor-react";
          if (id.includes("@radix-ui") || id.includes("cmdk") || id.includes("vaul"))
            return "vendor-radix";
          if (id.includes("@supabase")) return "vendor-supabase";
          if (id.includes("framer-motion") || id.includes("motion-dom") || id.includes("motion-utils"))
            return "vendor-motion";
          if (id.includes("lucide-react")) return "vendor-icons";
          if (id.includes("@tanstack")) return "vendor-query";
          if (id.includes("recharts") || id.includes("d3-")) return "vendor-charts";
          if (id.includes("date-fns")) return "vendor-date";
          if (id.includes("react-hook-form") || id.includes("zod") || id.includes("@hookform"))
            return "vendor-forms";
        },
      },
    },
  },
  ssr: {
    noExternal: true,
    external: ["jsdom"],
  },
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false,
    },
  },
  plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      react: path.resolve(__dirname, "./node_modules/react"),
      "react/jsx-runtime": path.resolve(__dirname, "./node_modules/react/jsx-runtime"),
      "react/jsx-dev-runtime": path.resolve(__dirname, "./node_modules/react/jsx-dev-runtime"),
      "react-dom": path.resolve(__dirname, "./node_modules/react-dom"),
      "react-dom/client": path.resolve(__dirname, "./node_modules/react-dom/client"),
    },
  },
  optimizeDeps: {
    include: [
      "react",
      "react/jsx-runtime",
      "react/jsx-dev-runtime",
      "react-dom",
      "react-dom/client",
    ],
  },
}));
