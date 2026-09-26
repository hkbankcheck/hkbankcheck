import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    host: '0.0.0.0',
    port: 47291,
    strictPort: true,
    // Cloud preview/proxy requests arrive with a rewritten Host header, which
    // Vite's DNS-rebinding protection blocks by default. Allow all hosts so
    // the preview tunnel can reach the dev server.
    allowedHosts: true,
  },
  preview: {
    host: '0.0.0.0',
    port: 47291,
    strictPort: true,
    allowedHosts: true,
  },
});
