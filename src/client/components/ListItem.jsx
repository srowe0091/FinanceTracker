import { ActionCard } from './Card'
import { LinkBox } from './Link'

export const ListItem = ({ children, ...rest }) => {
  return (
    <ActionCard className="center-row justify-between mb-4" {...rest}>
      {children}
    </ActionCard>
  )
}

export const LinkedListItem = ({ children }) => {
  return (
    <LinkBox>
      <ListItem>{children}</ListItem>
    </LinkBox>
  )
}
