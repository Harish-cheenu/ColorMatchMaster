// vite.config.js
import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import federation from '@originjs/vite-plugin-federation'


export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());
  return {
    plugins: [
      react(),
      federation({
        name: 'colormatchmaster',
        filename: 'colormatchmaster.js',
        exposes: {
          './colormatchmaster': './src/App.jsx',
        },
        shared: ['react', 'react-dom']
      }),
      {
        name: 'asset-path-rewrite',
        configureServer(server) {
          server.middlewares.use((req, res, next) => {
            if (req.url.startsWith('/assets/')) {
              req.url = '/dist' + req.url;
            }
            next();
          });
        },
      },
    ],
    base: env.VITE_LOCAL_HOST,
    build: {
      target: "esnext",
      cssCodeSplit: false,
      assetsInlineLimit: 0,
      outDir: 'dist',
    },
    resolve: {
      alias: {
        '@assets': './src/assets'
      },
    },
  }
})