// The only JavaScript on the site: the playable keyboard in the piano section, loaded when it scrolls into view.
const slot = document.querySelector<HTMLElement>('[data-island="keyboard"]')
if (slot && 'IntersectionObserver' in window) {
  const io = new IntersectionObserver((entries) => {
    if (!entries.some((e) => e.isIntersecting)) return
    io.disconnect()
    void import('./island').then((m) => m.mountKeyboard(slot))
  }, { rootMargin: '200px' })
  io.observe(slot)
}
