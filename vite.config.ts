import vue from "@vitejs/plugin-vue";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { join } from "path";
import { defineConfig } from "vite";
import { ArcoResolver } from "unplugin-vue-components/resolvers";
import { VitePluginDoubleshot } from "vite-plugin-doubleshot";

export default defineConfig({
  root: join(__dirname, "src/renderer"),
  plugins: [
    vue(),
    AutoImport({
      resolvers: [ArcoResolver()]
    }),
    Components({
      resolvers: [
        ArcoResolver({
          sideEffect: false
        })
      ]
    }),
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
  },
  css: {
    preprocessorOptions: {
      less: {
        modifyVars: {
          "arcoblue-6": "#f85959"
        },
        javascriptEnabled: true
      }
    }
  }
});
