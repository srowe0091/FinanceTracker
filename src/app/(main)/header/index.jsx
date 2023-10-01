import { Button } from '@/ui'
import { MenuIcon, CloseIcon } from '@/icons'
import { DesktopOnly, MobileOnly } from '@/components'

import { User } from './User'

export const Header = ({ isOpen, toggleDrawer }) => {
  return (
    <div className="flex px-4 h-full items-center justify-between shadow-header md:shadow-none">
      <MobileOnly>
        <Button size="icon" variant="ghost" onClick={toggleDrawer}>
          {isOpen ? <CloseIcon /> : <MenuIcon />}
        </Button>
      </MobileOnly>

      <DesktopOnly>
        <div />
      </DesktopOnly>

      <div className="flex gap-2 items-center">
        <User />
      </div>
    </div>
  )
}
