import { forwardRef } from 'react'
import { Select as ShSelect, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'

export const Select = forwardRef(({ label, options, onChange, ...props }, ref) => {
  return (
    <ShSelect onValueChange={onChange} {...props}>
      <div className="flex flex-col gap-1">
        <label>{label}</label>
        <SelectTrigger ref={ref}>
          <SelectValue placeholder={label} />
        </SelectTrigger>
      </div>
      <SelectContent>
        {options.map(option => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </ShSelect>
  )
})
