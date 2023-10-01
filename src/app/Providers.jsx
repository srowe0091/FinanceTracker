'use client'

import { ReactQueryProvider } from '@/libs'
import { Toaster } from '@/ui'

import { useAuthorization } from '@/modules/authentication'

const AuthCheck = ({ children }) => {
  const { isLoading } = useAuthorization()

  if (isLoading) {
    return null
  }

  return children
}

export const Providers = ({ children }) => {
  return (
    <ReactQueryProvider>
      <Toaster />
      <AuthCheck>{children}</AuthCheck>
    </ReactQueryProvider>
  )
}
