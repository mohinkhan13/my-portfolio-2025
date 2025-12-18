import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');
    return {
      server: {
        port: 3000,
        host: '0.0.0.0',
      },
      plugins: [react()],
      
      // --- NEW: PERFORMANCE OPTIMIZATION ---
      build: {
        // 1. Minification (Size kam karega)
        // minify: 'terser', 
        cssCodeSplit: true,
        rollupOptions: {
          output: {
            // 2. Manual Chunking (Bhari libraries ko alag karega)
            manualChunks(id) {
              if (id.includes('node_modules')) {
                // React core alag
                if (id.includes('react') || id.includes('react-dom') || id.includes('react-router-dom')) {
                  return 'react-vendor';
                }
                // Firebase alag (agar use ho raha hai)
                if (id.includes('firebase')) {
                  return 'firebase-vendor';
                }
                // Icons alag
                if (id.includes('lucide')) {
                  return 'icons';
                }
                // Baaki sab 'vendor' me
                return 'vendor';
              }
            },
          },
        },
      },
      // -------------------------------------

      define: {
        'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
        'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY)
      },
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      }
    };
});