import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { resolve } from "path";
import { viteMockServe } from "vite-plugin-mock"

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue(), viteMockServe({
    mockPath: "./mock", // 设置模拟文件的存储文件夹
    enable: true, // 开启mock
  })],
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
    },
  },
});
