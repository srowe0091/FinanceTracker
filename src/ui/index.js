import './globals.css'
import '@fontsource/nunito-sans/400.css'
import '@fontsource/nunito-sans/600.css'
import '@fontsource/nunito-sans/700.css'

import resolveConfig from 'tailwindcss/resolveConfig'
import tailwindConfig from '../../tailwind.config'

export const { theme } = resolveConfig(tailwindConfig)

export * from './components/Drawer'
export * from './components/Modal'
export * from './components/Menu'
export * from './components/Loaders'
export * from './components/Select'
export * from './components/Divider'

// animations
export * from './components/Fade'

export * from './components/ui/accordion'
export * from './components/ui/autocomplete'
export * from './components/ui/badge'
export * from './components/ui/button'
export * from './components/ui/collapsible'
export * from './components/ui/checkbox'
export * from './components/ui/dropdown-menu'
export * from './components/ui/input'
export * from './components/ui/label'
export * from './components/ui/progress'
export * from './components/ui/radio-group'
export * from './components/ui/skeleton'
export * from './components/ui/tabs'
export * from './components/ui/toast'
export * from './components/ui/toaster'
export * from './components/ui/use-toast'

if (process.env.NODE_ENV !== 'production' && typeof window !== 'undefined') {
  window.theme = theme
}
