import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import eslint from 'vite-plugin-eslint';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [
    react(),
    // eslint({  //Prevents proper render
    //   lintOnStart: true,
    //   failOnError: mode === "production"
    // })
  ],
  server: {
    proxy: {
      "/api": "http://localhost:8000", //to force frontend server to act like it's being served from the backend server
      // open: true    //to automatically open server in browser
    }
  }
}));
