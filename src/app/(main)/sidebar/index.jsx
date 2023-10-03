import { Fragment, createElement, useEffect } from 'react'
import NextLink from 'next/link'

import { Button, Divider, Collapsible, CollapsibleContent } from '@/ui'
import { HomeIcon } from '@/icons'
import routes from '@/routes'
import { useIsMobile } from '@/hooks'

const navLink = [
  {
    label: 'Dashboard',
    route: routes.home,
    icon: HomeIcon
  }
]

export const Sidebar = ({ isOpen, closeDrawer }) => {
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
            {navLink.map(route => (
              <Fragment key={route.label}>
                {route.divider && <Divider className="py-0 self-stretch" />}

                <NextLink href={route.route} className="w-full">
                  <Button size="lg" variant="ghost" onClick={closeDrawer} className="w-full justify-start px-4">
                    {createElement(route.icon, { className: 'mr-2 h-4 w-4' })} {route.label}
                  </Button>
                </NextLink>
              </Fragment>
            ))}

            <Divider className="py-0 self-stretch" />
          </div>
        </div>
      </CollapsibleContent>
    </Collapsible>
  )
}
