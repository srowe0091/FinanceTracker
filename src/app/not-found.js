'use client'

import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

import routes from '@/routes'

export default function NotFound() {
  const router = useRouter()

  useEffect(() => {
    router.replace(routes.home)
  }, [router])

  return null
}
