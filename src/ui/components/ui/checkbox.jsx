import * as React from 'react'
import * as CheckboxPrimitive from '@radix-ui/react-checkbox'
import { CheckIcon } from '@/icons'

import { Label } from './label'

import { cn } from 'ui/utils'

const Checkbox = React.forwardRef(({ className, children, value, onChange, ...props }, ref) => {
  const htmlFor = React.useId()
  return (
    <Label htmlFor={htmlFor} className="peer center-row gap-2 cursor-pointer">
      <CheckboxPrimitive.Root
        id={htmlFor}
        ref={ref}
        className={cn(
          'peer h-5 w-5 shrink-0 rounded border border-primary disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground',
          className
        )}
        checked={value}
        onCheckedChange={onChange}
        {...props}
      >
        <CheckboxPrimitive.Indicator className="flex items-center justify-center text-current">
          <CheckIcon className="h-3 w-3" />
        </CheckboxPrimitive.Indicator>
      </CheckboxPrimitive.Root>
      <span>{children}</span>
    </Label>
  )
})
Checkbox.displayName = CheckboxPrimitive.Root.displayName

export { Checkbox }
