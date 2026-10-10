import { mkdirSync, rmSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// The pages are React components rendered to static HTML (src/render.tsx). In dev each request renders
// afresh; for a build they are written to .pages/ first, and Vite builds from there.
const PAGES = '.pages'

function staticPages(): Plugin {
  return {
    name: 'static-pages',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        const path = (req.url ?? '/').split('?')[0]!
        const route = path.endsWith('/') ? path : path + '/'
        try {
          const { renderAll } = (await server.ssrLoadModule('/src/render.tsx')) as typeof import('./src/render.tsx')
          const html = renderAll().get(route)
          if (!html) return next()
          if (route !== path) return res.writeHead(301, { Location: route }).end()
          res.setHeader('Content-Type', 'text/html; charset=utf-8')
          res.end(await server.transformIndexHtml(route, html))
        } catch (e) {
          next(e)
        }
      })
    },
  }
}

export default defineConfig(async ({ command }) => {
  const input: Record<string, string> = {}
  if (command === 'build') {
    const { renderAll } = await import('./src/render.tsx')
    rmSync(PAGES, { recursive: true, force: true })
    for (const [route, html] of renderAll()) {
      const file = join(PAGES, route, 'index.html')
      mkdirSync(dirname(file), { recursive: true })
      writeFileSync(file, html)
      input[route === '/' ? 'index' : route.slice(1, -1).replaceAll('/', '-')] = file
    }
  }
  return {
    root: command === 'build' ? PAGES : '.',
    publicDir: join(import.meta.dirname, 'public'),
    resolve: { alias: { '/src': join(import.meta.dirname, 'src') } },
    plugins: [react(), tailwindcss(), staticPages()],
    build: {
      outDir: join(import.meta.dirname, 'dist'),
      emptyOutDir: true,
      rollupOptions: { input: Object.fromEntries(Object.entries(input).map(([k, v]) => [k, join(import.meta.dirname, v)])) },
    },
  }
})
