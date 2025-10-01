import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// If deploying to https://<user>.github.io/<repo>/ set base to '/<repo>/'.
// For a custom domain or user/org root page, base should be '/'.
// Adjust automatically based on environment variable if desired.
const base = process.env.GITHUB_REPOSITORY?.endsWith('/react-portfolio') ? '/react-portfolio/' : '/'

export default defineConfig({
  base,
  plugins: [react()],
})
