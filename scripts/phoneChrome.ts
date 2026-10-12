// Adds an iPhone status bar, Dynamic Island and home indicator to phone screenshots, so the app's own
// buttons are not squeezed against the frame's rounded corners. Take the screenshot of the content area
// only, 390 x 756 pt (844 pt minus 54 pt status bar and 34 pt home indicator), so that the result is a
// real 390 x 844 pt iPhone screen. Then: npx tsx scripts/phoneChrome.ts public/bilder/kropp/01-traning.webp ...
// Full-screen images (height/width >= 2) are skipped, so re-running is safe. With --status-bar, already finished
// iPhone images (780 x 1688) get their status bar redrawn, e.g. after changing the Dynamic Island.
// The Dynamic Island follows the iPhone 18 Pro: about 20 % of the screen width.
// Landscape images are treated as an iPad: take 1180 x 796 pt (820 minus a 24 pt status bar), and only a
// status bar is added. Full-screen iPad images (width/height <= 1.45) are skipped.
import sharp, { type Sharp } from 'sharp'

const TOP = 108 // 54 pt at 2x: status bar with room for the Dynamic Island
const BOTTOM = 68 // 34 pt at 2x: home indicator
const PAD_TOP = 48 // 24 pt at 2x: iPad status bar

/** The background at an edge, read from a thin strip at the far left so that tab bars and shadows in the middle do not tint it. */
async function edgeColour(img: Sharp, _width: number, top: number) {
  const { data } = await img.clone().extract({ left: 0, top, width: 8, height: 2 }).resize(1, 1).raw().toBuffer({ resolveWithObject: true })
  return { r: data[0]!, g: data[1]!, b: data[2]! }
}

const luminance = ({ r, g, b }: { r: number; g: number; b: number }) => (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255

function statusBar(width: number, ink: string) {
  const s = width / 780 // drawn for a 780 px wide (390 pt) screen
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${TOP}" viewBox="0 0 780 ${TOP / s}">
  <text x="112" y="74" text-anchor="middle" font-family="Helvetica Neue, Helvetica, Arial, sans-serif" font-size="34" font-weight="600" fill="${ink}">9:41</text>
  <rect x="310" y="24" width="160" height="64" rx="32" fill="#000"/>
  <g fill="${ink}">
    <rect x="586" y="58" width="6" height="12" rx="2"/><rect x="596" y="52" width="6" height="18" rx="2"/>
    <rect x="606" y="46" width="6" height="24" rx="2"/><rect x="616" y="40" width="6" height="30" rx="2"/>
  </g>
  <path d="M640 52 a24 24 0 0 1 34 0 M646 59 a15 15 0 0 1 22 0" stroke="${ink}" stroke-width="5" fill="none" stroke-linecap="round"/>
  <circle cx="657" cy="66" r="4" fill="${ink}"/>
  <rect x="688" y="44" width="50" height="26" rx="8" fill="none" stroke="${ink}" stroke-opacity="0.4" stroke-width="3"/>
  <rect x="692" y="48" width="42" height="18" rx="5" fill="${ink}"/>
  <rect x="741" y="52" width="4" height="10" rx="2" fill="${ink}" fill-opacity="0.4"/>
</svg>`
}

function padStatusBar(width: number, ink: string) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${PAD_TOP}">
  <text x="40" y="34" font-family="Helvetica Neue, Helvetica, Arial, sans-serif" font-size="26" font-weight="600" fill="${ink}">9:41  <tspan font-weight="400">mån 11 okt.</tspan></text>
  <g transform="translate(${width - 150} 0)">
    <path d="M40 22 a20 20 0 0 1 28 0 M45 28 a12 12 0 0 1 18 0" stroke="${ink}" stroke-width="4" fill="none" stroke-linecap="round"/>
    <circle cx="54" cy="34" r="3.5" fill="${ink}"/>
    <rect x="82" y="15" width="44" height="22" rx="7" fill="none" stroke="${ink}" stroke-opacity="0.4" stroke-width="3"/>
    <rect x="86" y="19" width="36" height="14" rx="4" fill="${ink}"/>
    <rect x="128" y="22" width="4" height="8" rx="2" fill="${ink}" fill-opacity="0.4"/>
  </g>
</svg>`
}

function homeIndicator(width: number, ink: string) {
  const w = width * 0.36
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${BOTTOM}"><rect x="${(width - w) / 2}" y="${BOTTOM - 26}" width="${w}" height="10" rx="5" fill="${ink}"/></svg>`
}

const redraw = process.argv.includes('--status-bar')
for (const file of process.argv.slice(2).filter((a) => !a.startsWith('--'))) {
  if (redraw) {
    const img = sharp(file)
    const { width = 0, height = 0 } = await img.metadata()
    if (width !== 780 || height !== 1688) continue
    const top = await edgeColour(img, width, TOP)
    const ink = luminance(top) > 0.5 ? '#000' : '#fff'
    const band = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${TOP}"><rect width="${width}" height="${TOP}" fill="rgb(${top.r},${top.g},${top.b})"/></svg>`
    const out = await img.clone().composite([{ input: Buffer.from(band), top: 0, left: 0 }, { input: Buffer.from(statusBar(width, ink)), top: 0, left: 0 }]).webp({ quality: 82 }).toBuffer()
    await sharp(out).toFile(file)
    console.log(`${file}: status bar redrawn`)
    continue
  }
  const img = sharp(file)
  const { width = 0, height = 0 } = await img.metadata()
  if (width > height) {
    if (width / height <= 1.45) {
      console.log(`${file}: already done`)
      continue
    }
    const top = await edgeColour(img, width, 0)
    const input = await img.toBuffer()
    await sharp(
      await sharp({ create: { width, height: height + PAD_TOP, channels: 3, background: top } })
        .composite([
          { input, top: PAD_TOP, left: 0 },
          { input: Buffer.from(padStatusBar(width, luminance(top) > 0.5 ? '#000' : '#fff')), top: 0, left: 0 },
        ])
        .webp({ quality: 82 })
        .toBuffer(),
    ).toFile(file)
    console.log(`${file}: ${width}x${height} -> ${width}x${height + PAD_TOP}`)
    continue
  }
  if (height / width >= 2) {
    console.log(`${file}: already done`)
    continue
  }
  const top = await edgeColour(img, width, 0)
  const bottom = await edgeColour(img, width, height - 2)
  const inkTop = luminance(top) > 0.5 ? '#000' : '#fff'
  const inkBottom = luminance(bottom) > 0.5 ? '#000' : '#fff'
  const input = await img.toBuffer()
  const out = await sharp({ create: { width, height: height + TOP + BOTTOM, channels: 3, background: top } })
    .composite([
      { input: Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${BOTTOM}"><rect width="${width}" height="${BOTTOM}" fill="rgb(${bottom.r},${bottom.g},${bottom.b})"/></svg>`), top: height + TOP, left: 0 },
      { input, top: TOP, left: 0 },
      { input: Buffer.from(statusBar(width, inkTop)), top: 0, left: 0 },
      { input: Buffer.from(homeIndicator(width, inkBottom)), top: height + TOP, left: 0 },
    ])
    .webp({ quality: 82 })
    .toBuffer()
  await sharp(out).toFile(file)
  console.log(`${file}: ${width}x${height} -> ${width}x${height + TOP + BOTTOM}`)
}
