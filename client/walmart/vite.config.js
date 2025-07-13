import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 5173,

    // ✅ this is critical
    strictPort: true,

    // ✅ allow ngrok or any external host
    allowedHosts: [
      '.ngrok-free.app',  // wildcard domain match
    ]
  }
})
