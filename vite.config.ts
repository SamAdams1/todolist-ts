/// <reference types="vitest" />

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(),
        {
      name: 'custom-hmr-plugin',
      configureServer(server) {
        server.ws.on('custom:update', (data) => {
          server.ws.send({
            type: 'full-reload',
            path: '*',
          });
        });
      }
    }
  ],
  test: {
    globals: true,
    environment: 'jsdom',
    // css: true
  }
})
