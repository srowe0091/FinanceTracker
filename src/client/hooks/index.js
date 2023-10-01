import { useQueryClient } from '@tanstack/react-query'
import { useWindowSize } from 'react-use'

import { theme } from '@/ui'

export const useIsMobile = () => {
  const { width } = useWindowSize()
  return width < parseInt(theme.screens.md)
}

export const useUser = () => {
  const queryClient = useQueryClient()
  const data = queryClient.getQueryData(['user'])

  return data || {}
}
