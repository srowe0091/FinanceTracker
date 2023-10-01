import { useWindowSize } from 'react-use'

import { theme } from '@/ui'

export const DesktopOnly = ({ children }) => {
  const { width } = useWindowSize()

  if (width < parseInt(theme.screens.md)) return null

  return children
}

export const MobileOnly = ({ children }) => {
  const { width } = useWindowSize()

  if (width >= parseInt(theme.screens.md)) return null

  return children
}
