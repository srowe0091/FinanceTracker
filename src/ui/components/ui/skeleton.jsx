import { cn } from 'ui/utils'

function Skeleton({ className, ...props }) {
  return <div className={cn('animate-pulse rounded-md bg-secondary', className)} {...props} />
}

export { Skeleton }
