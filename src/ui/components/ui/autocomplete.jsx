import * as React from 'react'
import { toLower, includes } from 'lodash/fp'

import { ArrowDownIcon, CheckIcon } from '@/icons'

import { cn } from '../../utils'
import { Button } from './button'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandLoading } from './command'
import { Popover, PopoverContent, PopoverTrigger } from './popover'

export const AutoComplete = ({ async, multiple, options, placeholder, isLoading, value, onChange, onInputChange }) => {
  const [open, setOpen] = React.useState(false)

  const _value = React.useMemo(() => {
    return multiple ? value?.join(', ') : value
  }, [multiple, value])

  const onSelect = React.useCallback(
    selectedOption => {
      onInputChange?.('')
      if (multiple) {
        if (includes(selectedOption, value)) {
          onChange(value.filter(v => v !== selectedOption))
        } else {
          onChange(value.concat(selectedOption))
        }
        return
      } else {
        onChange(selectedOption === value ? '' : selectedOption)
      }
      setOpen(false)
    },
    [multiple, value, onChange, onInputChange]
  )

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between h-auto text-left"
        >
          {_value || placeholder}

          <ArrowDownIcon className="h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-0">
        <Command shouldFilter={!async}>
          <CommandInput onValueChange={onInputChange} />
          <CommandEmpty>No results</CommandEmpty>
          {isLoading && <CommandLoading>Searching....</CommandLoading>}
          <CommandGroup>
            {options.map(option => (
              <CommandItem key={option.value} onSelect={onSelect}>
                <CheckIcon
                  className={cn('mr-2 h-4 w-4', includes(toLower(option.value), value) ? 'opacity-100' : 'opacity-0')}
                />
                {option.label}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
