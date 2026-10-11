import { chromium } from 'playwright'
const [, , out, path = '/', w = '1280', scheme = 'light'] = process.argv
const b = await chromium.launch()
const p = await b.newPage({ viewport: { width: +w, height: 800 }, colorScheme: scheme as 'light' })
const bad: string[] = []
p.on('response', (r) => { if (r.status() >= 400) bad.push(r.status() + ' ' + r.url()) })
p.on('console', (m) => { if (m.type() === 'error') bad.push('console: ' + m.text()) })
await p.goto('http://localhost:4317' + path, { waitUntil: 'networkidle' })
for (let y = 0; y < 20000; y += 600) { await p.mouse.wheel(0, 600); await p.waitForTimeout(60) }
await p.waitForTimeout(500)
await p.screenshot({ path: out, fullPage: true })
console.log(bad.join('\n') || 'no errors')
await b.close()
