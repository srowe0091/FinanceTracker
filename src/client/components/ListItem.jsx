import { LinkBox } from './Link'

import { cn } from 'ui/utils'

export const ListItem = ({ children, className, ...rest }) => {
  return (
    <div className={cn('center-row justify-between p-3', className)} {...rest}>
      {children}
    </div>
  )
}

export const LinkedListItem = ({ children }) => {
  return (
    <LinkBox>
      <ListItem>{children}</ListItem>
    </LinkBox>
  )
}
