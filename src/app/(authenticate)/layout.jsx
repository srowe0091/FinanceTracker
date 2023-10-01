'use client'

import { redirect } from 'next/navigation'

import routes from '@/routes'
import { useAuthorization } from '@/modules/authentication'

const AuthenticateLayout = ({ children }) => {
  const { isAuthenticated } = useAuthorization()

  if (isAuthenticated) {
    return redirect(routes.home)
  }

  return children
}

export default AuthenticateLayout
