import { Card } from '.'
import { LinkBox } from './Link'

import { cn } from 'ui/utils'

export const ListItem = ({ children, className, ...rest }) => {
  return (
    <Card className={cn('center-row justify-between p-2 px-3 bg-card', className)} {...rest}>
      {children}
    </Card>
  )
}

export const LinkedListItem = ({ children }) => {
  return (
    <LinkBox>
      <ListItem>{children}</ListItem>
    </LinkBox>
  )
}
