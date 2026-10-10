import { createRoot } from 'react-dom/client'
import { Keyboard } from './Keyboard'

export function mountKeyboard(el: HTMLElement) {
  createRoot(el).render(<Keyboard />)
}
