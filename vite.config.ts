import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueDevTools from "vite-plugin-vue-devtools";
import ui from "@nuxt/ui/vite";

export default defineConfig({
    resolve: {
        alias: {
            "@": fileURLToPath(new URL("./src", import.meta.url)),
        },
        conditions: [
            "import",
            "module",
            "browser",
            "default",
            "development",
            "production",
        ],
    },

    plugins: [
        vue(),
        vueDevTools(),

        ui({
            autoImport: {
                eslintrc: { enabled: true },
                dts: "./auto-imports.d.ts",
                dirs: [
                    { glob: "./src/store/**", types: true },
                    "./src/enums",
                    "./src/composables",
                    "./src/interfaces",
                ],
                vueTemplate: true,
                imports: [
                    "vue-router",
                    "pinia",
                    { vue: ["ref", "computed", "reactive"] },
                ],
            },
        }),
    ],
});
