import * as React from 'react'
import * as CollapsiblePrimitive from '@radix-ui/react-collapsible'

import { cn } from 'ui/utils'

const Collapsible = CollapsiblePrimitive.Root

const CollapsibleTrigger = CollapsiblePrimitive.CollapsibleTrigger

const CollapsibleContent = React.forwardRef(({ className, ...props }, ref) => {
  return (
    <CollapsiblePrimitive.CollapsibleContent
      ref={ref}
      className={cn(
        'overflow-hidden data-[state=open]:animate-collapse-open data-[state=closed]:animate-collapse-close',
        className
      )}
      {...props}
    />
  )
})

export { Collapsible, CollapsibleTrigger, CollapsibleContent }
