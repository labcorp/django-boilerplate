import { defineConfig } from 'vite';
import { resolve } from 'path';
import tailwindcss from '@tailwindcss/vite'


export default defineConfig({
    base: "/static/",
    resolve: {
        alias: {
            '@': resolve('./_front/')
        }
    },
    plugins: [
        tailwindcss(),
    ],
    server: {
        cors: true,
        hmr: true,
        watch: {
          usePolling: true
        }
    },
    build: {
        manifest: "manifest.json",
        outDir: resolve("./_static"),
        assetsDir: 'dist',
        emptyOutDir: true,
        rollupOptions: {
            input: {
                main: resolve("./_front/js/main.js"),
                admin: resolve("./_front/js/admin.js"),
            }
        }
    }
})
