import { forwardRef } from 'react'
import NextLink from 'next/link'

export const LinkOverlay = forwardRef((props, ref) => {
  return <NextLink className="link-overlay" ref={ref} {...props} />
})

export const LinkBox = forwardRef((props, ref) => {
  return <div className="link-box" ref={ref} {...props} />
})
