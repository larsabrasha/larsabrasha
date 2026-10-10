import { useCallback, useEffect, useRef, useState } from 'react'

// One octave from middle C, with the same letters as in the Piano app (A = C).
const WHITE = [
  { note: 60, key: 'a', name: 'C' },
  { note: 62, key: 's', name: 'D' },
  { note: 64, key: 'd', name: 'E' },
  { note: 65, key: 'f', name: 'F' },
  { note: 67, key: 'g', name: 'G' },
  { note: 69, key: 'h', name: 'A' },
  { note: 71, key: 'j', name: 'H' },
  { note: 72, key: 'k', name: 'C' },
]
const BLACK = [
  { note: 61, key: 'w', after: 0 },
  { note: 63, key: 'e', after: 1 },
  { note: 66, key: 't', after: 3 },
  { note: 68, key: 'y', after: 4 },
  { note: 70, key: 'u', after: 5 },
]
const BY_KEY = new Map([...WHITE, ...BLACK].map((k) => [k.key, k.note]))

function frequency(note: number) {
  return 440 * 2 ** ((note - 69) / 12)
}

export function Keyboard() {
  const ctx = useRef<AudioContext | null>(null)
  const [down, setDown] = useState<ReadonlySet<number>>(new Set())

  const play = useCallback((note: number) => {
    ctx.current ??= new AudioContext()
    const ac = ctx.current
    const t = ac.currentTime
    const gain = ac.createGain()
    gain.gain.setValueAtTime(0, t)
    gain.gain.linearRampToValueAtTime(0.25, t + 0.01)
    gain.gain.exponentialRampToValueAtTime(0.001, t + 1.6)
    gain.connect(ac.destination)
    for (const [type, mult, level] of [['triangle', 1, 1], ['sine', 2, 0.3]] as const) {
      const osc = ac.createOscillator()
      const g = ac.createGain()
      osc.type = type
      osc.frequency.value = frequency(note) * mult
      g.gain.value = level
      osc.connect(g).connect(gain)
      osc.start(t)
      osc.stop(t + 1.7)
    }
    setDown((s) => new Set(s).add(note))
    setTimeout(() => setDown((s) => { const n = new Set(s); n.delete(note); return n }), 180)
  }, [])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.repeat || e.metaKey || e.ctrlKey || e.altKey) return
      const note = BY_KEY.get(e.key.toLowerCase())
      if (note !== undefined) play(note)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [play])

  const width = 100 / WHITE.length
  return (
    <div className="select-none" role="group" aria-label="Spela en oktav: klicka på tangenterna eller använd A till K på tangentbordet">
      <div className="relative h-24">
        {WHITE.map((k, i) => (
          <button
            key={k.note}
            type="button"
            onPointerDown={() => play(k.note)}
            aria-label={k.name}
            style={{ left: `${i * width}%`, width: `${width}%` }}
            className={`absolute top-0 h-full rounded-b-lg border border-[#d8d4cc] pb-1.5 text-[10px] text-[#8a847a] transition-colors ${down.has(k.note) ? 'bg-accent-soft' : 'bg-white'}`}
          >
            <span className="absolute inset-x-0 bottom-1.5">{k.key.toUpperCase()}</span>
          </button>
        ))}
        {BLACK.map((k) => (
          <button
            key={k.note}
            type="button"
            onPointerDown={() => play(k.note)}
            aria-label={`${WHITE[k.after]!.name}#`}
            style={{ left: `${(k.after + 1) * width - width * 0.3}%`, width: `${width * 0.6}%` }}
            className={`absolute top-0 z-10 h-[60%] rounded-b-md transition-colors ${down.has(k.note) ? 'bg-accent' : 'bg-[#1b1a18]'}`}
          />
        ))}
      </div>
      <p className="mt-2 text-xs text-muted">Prova: klicka, eller spela med A–K.</p>
    </div>
  )
}
