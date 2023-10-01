import { useState, useCallback } from 'react'
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

export const useToggleState = (initial = false) => {
  const [_state, _updateState] = useState(initial)

  const _toggleOn = useCallback(() => _updateState(true), [])
  const _toggleOff = useCallback(() => _updateState(false), [])
  const _toggle = useCallback(val => _updateState(state => val ?? !state), [])

  return {
    isOpen: _state,
    open: _toggleOn,
    close: _toggleOff,
    toggle: _toggle
  }
}
