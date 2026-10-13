import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    port: 3000,
    strictPort: true,
    // اسم مضيف المعاينة الخاص ببيئة Freebuff Cloud (لا تستخدم allowedHosts: true)
    allowedHosts: ['pv-abc82c757ec0-87f96bf2-c7b7-404f-8805-410098d60d12.style.dev'],
  },
});
