import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// Project is served from GitHub Pages at /<repo>/.
// Build output goes to ../docs so Pages can serve from the docs folder.
export default defineConfig({
  base: "/linkedin-outreach-skill/",
  plugins: [react(), tailwindcss()],
  build: {
    outDir: "../docs",
    emptyOutDir: true,
  },
});
