import path from "path";
import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react-swc";

import icons from "unplugin-icons/vite";
import { FileSystemIconLoader } from "unplugin-icons/loaders";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  return {
    plugins: [
      react(),
      icons({
        autoInstall: true,
        compiler: "jsx",
        jsx: "react",
        customCollections: {
          custom: FileSystemIconLoader("./src/assets/icons", (svg) =>
            svg.replace(/^<svg /, '<svg fill="currentColor" ')
          ),
        },
      }),
    ],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    esbuild: {
      include: /\.(tsx?|jsx?)$/,
      exclude: [],
      loader: "jsx",
    },
    define: {
      __APP_ENV__: env.APP_ENV,
    },
  };
});
