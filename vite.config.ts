import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  assetsInclude: ['**/*.md', '**/*.pdf', '**/*.mp3', '**/*.otf', '**/*.ttf', '**/*.woff', '**/*.woff2'],
})
