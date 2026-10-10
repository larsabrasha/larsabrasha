// Tar skärmdumpar av projekten till public/bilder/. Körs manuellt: npm run screenshots [namn ...]
// SCHEME=dark tar mörka versioner (namn-dark.webp).
// Bilderna inifrån apparna (02- och framåt) och kropp, som behöver påhittad data, togs för hand.
import { chromium, type Page } from 'playwright'
import sharp from 'sharp'

type Shot = { name: string; file: string; url: string; width: number; height: number; prepare?: (page: Page) => Promise<void> }

const shots: Shot[] = [
  { name: 'bygg', file: 'bygg/01-start', url: 'https://bygg.larsabrasha.com/intro', width: 1280, height: 800 },
  { name: 'praliner', file: 'praliner/01-start', url: 'https://praliner.larsabrasha.com/', width: 1280, height: 800 },
  { name: 'piano', file: 'piano/01-idag', url: 'https://piano.larsabrasha.com/', width: 1280, height: 800 },
]

const only = process.argv.slice(2)
const dark = process.env.SCHEME === 'dark'
const browser = await chromium.launch()
for (const shot of shots.filter((s) => only.length === 0 || only.includes(s.name))) {
  const page = await browser.newPage({
    viewport: { width: shot.width, height: shot.height },
    deviceScaleFactor: 2,
    locale: 'sv-SE',
    colorScheme: dark ? 'dark' : 'light',
  })
  await page.goto(shot.url, { waitUntil: 'networkidle' })
  await shot.prepare?.(page)
  await page.waitForTimeout(1500)
  const png = await page.screenshot()
  await sharp(png).webp({ quality: 82 }).toFile(`public/bilder/${shot.file}${dark ? '-dark' : ''}.webp`)
  console.log(`public/bilder/${shot.file}${dark ? '-dark' : ''}.webp`)
  await page.close()
}
await browser.close()
