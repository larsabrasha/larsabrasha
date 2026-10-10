// Renders every page to a static HTML string. Used by vite.config.ts, at build time and per request in dev.
import { renderToStaticMarkup } from 'react-dom/server'
import { Home, ProjectPage } from './pages.tsx'
import { projects } from './projects.ts'

/** Page path (as served) → HTML. */
export function renderAll(): Map<string, string> {
  const pages = new Map<string, string>()
  pages.set('/', '<!doctype html>' + renderToStaticMarkup(<Home />))
  for (const p of projects) pages.set(`/projekt/${p.id}/`, '<!doctype html>' + renderToStaticMarkup(<ProjectPage p={p} />))
  return pages
}
