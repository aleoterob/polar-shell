import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import wails from "@wailsio/runtime/plugins/vite";

export default defineConfig({
  server: {
    // Use 127.0.0.1 — Wails health-check uses FRONTEND_DEVSERVER_URL with this host
    // (localhost can resolve to ::1 on Windows while Vite listens on IPv4 only).
    host: "127.0.0.1",
    port: Number(process.env.WAILS_VITE_PORT) || 9245,
    strictPort: true,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  // Base UI uses deep imports; pre-bundle them up front to avoid stale .vite/deps chunks
  // after HMR reloads (missing useButton-*.js / useIsoLayoutEffect-*.js errors).
  optimizeDeps: {
    holdUntilCrawlEnd: true,
    include: [
      "@base-ui/react/button",
      "@base-ui/react/context-menu",
      "@base-ui/react/dialog",
      "@base-ui/react/input",
      "@base-ui/react/menu",
      "@base-ui/react/separator",
      "@base-ui/react/tabs",
      "@base-ui/react/tooltip",
      "cmdk",
    ],
  },
  plugins: [react(), tailwindcss(), wails("./bindings")],
});
