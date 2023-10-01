'use client'

import { Progress } from '@/ui'

export default function Loading() {
  return (
    <div className="fixed top-0 left-0 right-0 z-50">
      <Progress indeterminate />
    </div>
  )
}
