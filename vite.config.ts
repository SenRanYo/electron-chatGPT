import vue from "@vitejs/plugin-vue"
import { join } from "path"
import { defineConfig } from "vite"
import { VitePluginDoubleshot } from "vite-plugin-doubleshot"

// https://vitejs.dev/config/
export default defineConfig({
  root: join(__dirname, "src/renderer"),
  plugins: [
    vue(),
    VitePluginDoubleshot({
      type: "electron",
      main: "dist/main/index.js",
      entry: "src/main/index.ts",
      outDir: "dist/main",
      external: ["electron"],
      electron: {
        build: {
          config: "./build/config/index.json"
        },
        preload: {
          entry: "src/preload/index.ts",
          outDir: "dist/preload"
        }
      }
    })
  ],
  resolve: {
    alias: {
      "@": join(__dirname, "src"),
      "@main": join(__dirname, "src/main"),
      "@renderer": join(__dirname, "src/renderer")
    }
  },
  base: "./",
  build: {
    outDir: join(__dirname, "dist/renderer"),
    emptyOutDir: true
  }
})
