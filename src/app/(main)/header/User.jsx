import { useCallback } from 'react'

import { sbClient } from '@/libs'

import { Button, Menu, DropdownMenuLabel, DropdownMenuItem } from '@/ui'
import { useUser } from '@/hooks'
import { UserIcon, LogoutIcon } from '@/icons'

export const User = () => {
  const user = useUser()

  const handleLogout = useCallback(async () => {
    const { error } = await sbClient.auth.signOut()
    if (error) console.error('error signing out: ', error)
  }, [])

  return (
    <Menu
      trigger={
        <Button variant="ghost" size="icon">
          <UserIcon />
        </Button>
      }
    >
      <DropdownMenuItem onClick={handleLogout}>
        <LogoutIcon /> Logout
      </DropdownMenuItem>

      <DropdownMenuLabel className="opacity-50">{user.email}</DropdownMenuLabel>
    </Menu>
  )
}
