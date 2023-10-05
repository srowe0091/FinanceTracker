import { Fragment, createElement, useEffect, useState } from 'react'
import NextLink from 'next/link'

import { Button, Collapsible, CollapsibleContent } from '@/ui'
import { HomeIcon, MoneyIcon } from '@/icons'
import routes from '@/routes'
import { useIsMobile, useUser } from '@/hooks'

export const Sidebar = ({ isOpen, closeDrawer }) => {
  const user = useUser()
  const [navLinks] = useState(() => {
    return [
      {
        label: 'Home',
        route: routes.home,
        icon: HomeIcon
      },
      {
        label: 'Pay',
        route: routes.pay,
        icon: MoneyIcon,
        enabled: userType => userType === 'admin'
      }
    ].filter(link => {
      if (link.enabled) {
        return link.enabled(user.profile.user_type)
      }
      return true
    })
  })
  const isMobile = useIsMobile()

  useEffect(() => {
    if (isOpen && !isMobile) {
      closeDrawer()
    }
  }, [closeDrawer, isMobile, isOpen])

  return (
    <Collapsible open={isMobile ? isOpen : true}>
      <CollapsibleContent className="z-10">
        <div className="h-header bg-mainBackground md:bg-none w-screen p-4 gap-8 flex flex-col md:w-full md:h-screen md:shadow-sidebar">
          <div className="center gap-1">
            {navLinks.map(route => (
              <Fragment key={route.label}>
                <NextLink href={route.route} className="w-full">
                  <Button size="lg" variant="ghost" onClick={closeDrawer} className="w-full justify-start px-4">
                    {createElement(route.icon, { className: 'mr-2 h-4 w-4' })} {route.label}
                  </Button>
                </NextLink>
              </Fragment>
            ))}
          </div>
        </div>
      </CollapsibleContent>
    </Collapsible>
  )
}
