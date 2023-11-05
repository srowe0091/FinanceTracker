import { cn } from 'ui/utils'
import { forwardRef } from 'react'

export const Card = forwardRef(({ children, className, dark, ...rest }, ref) => {
  return (
    <div ref={ref} className={cn('p-6 bg-card rounded-lg select-none', className, { 'bg-black/80': dark })} {...rest}>
      {children}
    </div>
  )
})

export const ActionCard = forwardRef(({ children, ...rest }, ref) => {
  return (
    <Card ref={ref} {...rest}>
      {children}
    </Card>
  )
})
