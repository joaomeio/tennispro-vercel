import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

function parseEnvFile(filePath) {
  try {
    return Object.fromEntries(
      fs.readFileSync(filePath, 'utf-8')
        .split('\n')
        .map((l) => l.trim())
        .filter((l) => l && !l.startsWith('#') && l.includes('='))
        .map((l) => {
          const [key, ...rest] = l.split('=')
          const val = rest.join('=').trim().replace(/^["']|["']$/g, '')
          return [key.trim(), val]
        })
    )
  } catch {
    return {}
  }
}

export default defineConfig(() => {
  const env = parseEnvFile(path.join(__dirname, '.env.local'))

  return {
    plugins: [react()],
    server: {
      proxy: {
        '/api': 'http://localhost:3000',
      },
    },
    define: {
      'import.meta.env.VITE_SUPABASE_URL': JSON.stringify(
        env.VITE_SUPABASE_URL || process.env.VITE_SUPABASE_URL || ''
      ),
      'import.meta.env.VITE_SUPABASE_ANON_KEY': JSON.stringify(
        env.VITE_SUPABASE_ANON_KEY || process.env.VITE_SUPABASE_ANON_KEY || ''
      ),
    },
  }
})
