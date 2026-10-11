// The site's pages, rendered to static HTML at build time (src/render.tsx). Nothing here runs in
// the browser: the only interactivity is plain HTML (popover). The site ships no JavaScript.
import { existsSync } from 'node:fs'
import { join } from 'node:path'
import type { CSSProperties, ReactNode } from 'react'
import { Calculator, Disc3, Thermometer, icons, type LucideProps } from 'lucide-react'
import { extras, projects, type Extra, type Project, type Shot } from './projects.ts'

// Rendered to inline SVG at build time, so the icons cost no JavaScript.
const ICONS: Record<Extra['icon'], (props: LucideProps) => ReactNode> = { weight: BathroomScale, calculator: Calculator, disc: Disc3, thermometer: Thermometer }

/** Lucide has no bathroom scale, so this one is drawn in the same style. */
function BathroomScale({ size = 24, strokeWidth = 2, ...rest }: LucideProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" {...rest}>
      <rect x="3" y="3" width="18" height="18" rx="4" />
      <path d="M8.5 9.5a5 5 0 0 1 7 0" />
      <path d="m12 10.5 1.2-1.7" />
    </svg>
  )
}

const SITE = 'https://larsabrasha.com'

function accentStyle(p: Project) {
  return {
    '--accent-light': p.accent,
    '--accent-dark': p.accentDark,
    '--soft-light': p.soft,
    '--soft-dark': p.softDark,
  } as CSSProperties
}

function Document(props: { title: string; description: string; path: string; image: string; children: ReactNode }) {
  return (
    <html lang="sv">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>{props.title}</title>
        <meta name="description" content={props.description} />
        <meta name="theme-color" content="#f2f1ee" media="(prefers-color-scheme: light)" />
        <meta name="theme-color" content="#171614" media="(prefers-color-scheme: dark)" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="canonical" href={SITE + props.path} />
        <meta property="og:title" content={props.title} />
        <meta property="og:description" content={props.description} />
        <meta property="og:image" content={SITE + props.image} />
        <meta property="og:url" content={SITE + props.path} />
        <meta property="og:locale" content="sv_SE" />
        <link rel="stylesheet" href="/src/style.css" />
      </head>
      <body className="bg-canvas text-ink antialiased">{props.children}</body>
    </html>
  )
}

function Header({ back }: { back?: boolean }) {
  return (
    <header className="mx-auto flex max-w-6xl items-center justify-between px-5 py-5 sm:px-8">
      <a href="/" className="flex items-center gap-3 font-semibold tracking-tight">
        <img src="/profile_150.jpeg" srcSet="/profile_150.jpeg 1x, /profile_300.jpeg 2x" width={36} height={36} alt="" className="rounded-full" />
        Lars Arvidsson
      </a>
      {back ? (
        <a href="/#projekt" className="text-sm text-muted hover:text-ink">
          ← Alla projekt
        </a>
      ) : (
        <SocialLinks className="hidden sm:flex" />
      )}
    </header>
  )
}

function SocialLinks({ className = '' }: { className?: string }) {
  const links = [
    ['GitHub', 'https://github.com/larsabrasha'],
    ['LinkedIn', 'https://www.linkedin.com/in/larsarvidsson'],
  ]
  return (
    <nav className={`flex gap-5 text-sm text-muted ${className}`}>
      {links.map(([label, href]) => (
        <a key={label} href={href} rel="me" className="hover:text-ink">
          {label}
        </a>
      ))}
    </nav>
  )
}

function Footer() {
  return (
    <footer className="mx-auto mt-24 flex max-w-6xl flex-col items-start justify-between gap-4 border-t border-line px-5 py-10 text-sm text-muted sm:flex-row sm:items-center sm:px-8">
      <p>© Lars Arvidsson</p>
      <SocialLinks />
    </footer>
  )
}

/** The dark-mode version of a screenshot, if there is one: the same name ending in -dark. Runs at build time, from the repo root. */
function darkSrc(shot: Shot) {
  const src = shot.src.replace(/\.webp$/, '-dark.webp')
  return existsSync(join(process.cwd(), 'public', src)) ? src : undefined
}

function Picture({ shot, eager = false, className }: { shot: Shot; eager?: boolean; className: string }) {
  const dark = darkSrc(shot)
  return (
    <picture>
      {dark && <source media="(prefers-color-scheme: dark)" srcSet={dark} />}
      <img
        src={shot.src}
        width={shot.width}
        height={shot.height}
        alt={shot.caption}
        loading={eager ? 'eager' : 'lazy'}
        fetchPriority={eager ? 'high' : undefined}
        decoding="async"
        className={className}
      />
    </picture>
  )
}

/** A screenshot in a browser window or a phone. */
function Frame({ shot, eager, big = false }: { shot: Shot; eager?: boolean; big?: boolean }) {
  const shadow = big ? 'card-shadow' : 'shadow-frame'
  if (shot.frame === 'phone')
    return (
      <div className={`mx-auto max-w-[17rem] rounded-[2.4rem] bg-[#141311] p-2 ring-1 ring-line ${shadow}`}>
        <div className="overflow-hidden rounded-[1.9rem]">
          <Picture shot={shot} eager={eager} className="block h-auto w-full" />
        </div>
      </div>
    )
  return (
    <div className={`overflow-hidden rounded-xl border border-line bg-panel ${shadow}`}>
      <div className="flex gap-1.5 border-b border-line px-3 py-2.5" aria-hidden="true">
        <span className="size-2.5 rounded-full bg-line" />
        <span className="size-2.5 rounded-full bg-line" />
        <span className="size-2.5 rounded-full bg-line" />
      </div>
      <Picture shot={shot} eager={eager} className="block h-auto w-full" />
    </div>
  )
}

/** A framed screenshot with a caption and a popover that shows it large. */
function Zoomable({ shot, id, eager, caption = true, big = false }: { shot: Shot; id: string; eager?: boolean; caption?: boolean; big?: boolean }) {
  return (
    <figure className="group">
      <button
        type="button"
        popoverTarget={id}
        className="block w-full cursor-zoom-in text-left transition duration-300 group-hover:-translate-y-1"
        aria-label={`Visa större: ${shot.caption}`}
      >
        <Frame shot={shot} eager={eager} big={big} />
      </button>
      {caption && <figcaption className="mt-3 text-sm text-muted">{shot.caption}</figcaption>}
      <div id={id} popover="auto" className="lightbox">
        <button type="button" popoverTarget={id} popoverTargetAction="hide" className="block cursor-zoom-out" aria-label="Stäng">
          <Picture shot={shot} className="lightbox-img" />
        </button>
        <p className="mt-3 text-center text-sm text-white/80">{shot.caption}</p>
      </div>
    </figure>
  )
}

function Buttons({ p }: { p: Project }) {
  const base = 'inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium transition'
  return (
    <div className="flex flex-wrap gap-3">
      {p.live && (
        <a href={p.live.href} className={`${base} bg-accent text-on-accent hover:opacity-90`}>
          {p.live.label} <span aria-hidden="true">↗</span>
        </a>
      )}
      {p.code && (
        <a href={p.code} className={`${base} bg-panel ring-1 ring-line hover:ring-accent`}>
          Koden på GitHub <span aria-hidden="true">↗</span>
        </a>
      )}
    </div>
  )
}

/** One project on the start page: a card with text on one side and the screenshot on the other. */
function Showcase({ p, index }: { p: Project; index: number }) {
  const cover = p.shots[0]
  const phones = p.shots.filter((s) => s.frame === 'phone')
  const flip = index % 2 === 1
  const pill = 'inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium transition'
  const secondary = p.live ? { href: p.live.href, label: 'Öppna' } : p.code ? { href: p.code, label: 'Koden' } : undefined
  return (
    <section id={p.id} style={accentStyle(p)} className="reveal mx-auto max-w-6xl px-5 sm:px-8">
      <div className="card-shadow grid items-center gap-10 rounded-[2rem] bg-soft p-6 sm:p-10 lg:grid-cols-12 lg:gap-14 lg:p-14">
        <div className={`lg:col-span-5 ${flip ? 'lg:order-2' : ''}`}>
          <h2 className="text-base font-semibold text-accent">{p.name}</h2>
          <p className="mt-2 text-4xl leading-[1.08] font-bold tracking-tight sm:text-5xl">{p.headline}</p>
          <p className="mt-5 text-lg leading-relaxed text-muted">{p.line}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href={`/projekt/${p.id}/`} className={`${pill} bg-accent text-on-accent hover:opacity-90`}>
              Läs mer <span aria-hidden="true">→</span>
            </a>
            {secondary && (
              <a href={secondary.href} className={`${pill} bg-panel ring-1 ring-line hover:ring-accent`}>
                {secondary.label} <span aria-hidden="true">↗</span>
              </a>
            )}
          </div>
        </div>
        <div className={`lg:col-span-7 ${flip ? 'lg:order-1' : ''}`}>
          <a href={`/projekt/${p.id}/`} className="block transition duration-300 hover:-translate-y-1" aria-label={`Mer om ${p.name}`} tabIndex={-1}>
            {cover?.frame === 'phone' && phones.length >= 2 ? (
              <div className="flex justify-center gap-5 sm:gap-8">
                {phones.slice(0, 2).map((shot, n) => (
                  <div key={shot.src} className={`w-1/2 max-w-[15rem] ${n === 1 ? 'mt-10' : ''}`}>
                    <Frame shot={shot} eager={index === 0} />
                  </div>
                ))}
              </div>
            ) : (
              cover && <Frame shot={cover} eager={index === 0} />
            )}
          </a>
        </div>
      </div>
    </section>
  )
}

function ExtraIcon({ icon }: { icon: Extra['icon'] }) {
  const Icon = ICONS[icon]
  return (
    <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-canvas text-ink ring-1 ring-line">
      <Icon size={20} strokeWidth={1.75} aria-hidden="true" />
    </span>
  )
}

export function Home() {
  return (
    <Document
      title="Lars Arvidsson – projekt"
      description="Saker jag har byggt på fritiden: en 3D-app för möbelsnickeri, en pralinbutik, en pianoapp, ett presentationsprogram för kyrkor och en träningslogg."
      path="/"
      image="/bilder/bygg/01-start.webp"
    >
      <Header />
      <main>
        <section className="mx-auto max-w-6xl px-5 pt-12 pb-16 sm:px-8 sm:pt-20 sm:pb-24">
          <h1 className="hero-in max-w-4xl text-5xl leading-[1.02] font-bold tracking-tight sm:text-7xl">Lite saker jag har byggt.</h1>
          <p className="hero-in mt-8 max-w-2xl text-lg leading-relaxed text-muted sm:text-xl">
            Jag tycker om att skapa saker. Numera kommer jag med idéer och instruktioner, och sedan kodar Claude.
          </p>
        </section>
        <h2 id="projekt" className="sr-only">
          Projekt
        </h2>
        <div className="flex flex-col gap-14 sm:gap-20">
          {projects.map((p, i) => (
            <Showcase key={p.id} p={p} index={i} />
          ))}
        </div>
        <section className="mx-auto mt-24 max-w-6xl px-5 sm:px-8">
          <h2 className="text-3xl font-bold tracking-tight">Mindre projekt</h2>
          <ul className="mt-8 grid gap-4 sm:grid-cols-2">
            {extras.map((e) => (
              <li key={e.name} className="reveal">
                <a href={e.href} className="group flex h-full flex-col rounded-2xl border border-line bg-panel p-6 transition hover:-translate-y-1 hover:border-ink/30">
                  <span className="flex items-center justify-between gap-3 font-semibold tracking-tight">
                    <span className="flex items-center gap-3">
                      <ExtraIcon icon={e.icon} />
                      {e.name}
                    </span>
                    {e.href && (
                      <span className="text-muted transition group-hover:text-ink" aria-hidden="true">
                        ↗
                      </span>
                    )}
                  </span>
                  <span className="mt-2 text-sm leading-relaxed text-muted">{e.text}</span>
                </a>
              </li>
            ))}
          </ul>
        </section>
      </main>
      <Footer />
    </Document>
  )
}

export function ProjectPage({ p }: { p: Project }) {
  const i = projects.indexOf(p)
  const next = projects[(i + 1) % projects.length]!
  const [cover, ...rest] = p.shots
  const wide = rest.filter((s) => s.frame === 'browser')
  const phones = rest.filter((s) => s.frame === 'phone')
  const nextCover = next.shots[0]
  return (
    <Document title={`${p.name} – ${p.headline} · Lars Arvidsson`} description={p.summary} path={`/projekt/${p.id}/`} image={cover?.src ?? '/bilder/bygg/01-start.webp'}>
      <div style={accentStyle(p)}>
        <Header back />
        <main>
          <section className="mx-auto max-w-6xl px-5 pt-10 sm:px-8 sm:pt-16">
            <p className="hero-in text-lg font-semibold text-accent">{p.name}</p>
            <h1 className="hero-in mt-2 max-w-4xl text-5xl leading-[1.04] font-bold tracking-tight sm:text-7xl">{p.headline}</h1>
            <p className="hero-in mt-5 max-w-2xl text-xl leading-relaxed text-muted">{p.line}</p>
            <div className="hero-in mt-8">
              <Buttons p={p} />
            </div>
          </section>

          {cover && (
            <section className="mx-auto mt-14 max-w-6xl px-5 sm:px-8">
              <Zoomable shot={cover} id="bild-0" eager caption={false} big />
            </section>
          )}

          <section className="mx-auto mt-16 max-w-6xl px-5 sm:px-8">
            <div className="max-w-2xl space-y-5 text-lg leading-relaxed">
              {p.about.map((text) => (
                <p key={text}>{text}</p>
              ))}
            </div>
          </section>

          <section className="mx-auto mt-20 max-w-6xl px-5 sm:px-8">
            <h2 className="text-3xl font-bold tracking-tight">Det roliga under huven</h2>
            <div className="mt-8 grid gap-5 sm:grid-cols-2">
              {p.cool.map((c) => {
                const Icon = icons[c.icon]
                return (
                  <div key={c.title} className="reveal rounded-2xl bg-soft p-6 sm:p-8">
                    <span className="grid size-11 place-items-center rounded-xl bg-panel text-accent ring-1 ring-line">
                      <Icon size={22} strokeWidth={1.75} aria-hidden="true" />
                    </span>
                    <h3 className="mt-4 text-xl font-semibold tracking-tight">{c.title}</h3>
                    <p className="mt-2 leading-relaxed text-ink/85">{c.text}</p>
                  </div>
                )
              })}
            </div>
          </section>

          {p.trio && (
            <section className="mx-auto mt-20 max-w-6xl px-5 sm:px-8">
              <div className="card-shadow rounded-[2rem] bg-soft px-5 py-10 sm:p-14">
                <h2 className="text-3xl font-bold tracking-tight">{p.trio.title}</h2>
                <p className="mt-3 max-w-2xl text-lg leading-relaxed text-muted">{p.trio.text}</p>
                <div className="mt-10 grid grid-cols-3 gap-3 sm:gap-8">
                  {p.trio.shots.map((shot, n) => (
                    <div key={shot.src} className="reveal">
                      <Zoomable shot={shot} id={`trio-${n}`} />
                    </div>
                  ))}
                </div>
              </div>
            </section>
          )}

          {rest.length > 0 && (
            <section className="mx-auto mt-20 max-w-6xl px-5 sm:px-8">
              <h2 className="text-3xl font-bold tracking-tight">Fler bilder</h2>
              {wide.length > 0 && (
                <div className="mt-8 grid gap-x-8 gap-y-12 md:grid-cols-2">
                  {wide.map((shot) => (
                    <div key={shot.src} className="reveal">
                      <Zoomable shot={shot} id={`bild-${p.shots.indexOf(shot)}`} />
                    </div>
                  ))}
                </div>
              )}
              {phones.length > 0 && (
                <div className="mt-12 flex flex-wrap justify-center gap-x-8 gap-y-12">
                  {phones.map((shot) => (
                    <div key={shot.src} className="reveal w-[17rem] max-w-full">
                      <Zoomable shot={shot} id={`bild-${p.shots.indexOf(shot)}`} />
                    </div>
                  ))}
                </div>
              )}
            </section>
          )}

          <section className="mx-auto mt-16 max-w-6xl px-5 sm:px-8">
            <p className="text-sm text-muted">Byggt med {p.tech.join(', ')}.</p>
          </section>

          <section className="mx-auto mt-16 max-w-6xl px-5 sm:px-8">
            <a href={`/projekt/${next.id}/`} style={accentStyle(next)} className="card-shadow group grid items-center gap-8 overflow-hidden rounded-[2rem] bg-soft p-8 transition hover:-translate-y-1 sm:grid-cols-2 sm:p-12">
              <span>
                <span className="text-base font-semibold text-accent">Nästa: {next.name}</span>
                <span className="mt-2 block text-3xl leading-tight font-bold tracking-tight sm:text-4xl">{next.headline}</span>
                <span className="mt-4 inline-block text-2xl text-accent transition group-hover:translate-x-2" aria-hidden="true">
                  →
                </span>
              </span>
              {nextCover && (
                <span className={`block ${nextCover.frame === 'phone' ? 'mx-auto w-40' : ''}`}>
                  <Frame shot={nextCover} />
                </span>
              )}
            </a>
          </section>
        </main>
        <Footer />
      </div>
    </Document>
  )
}
