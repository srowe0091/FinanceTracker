'use client'

import { useBoolean } from 'react-use'

import { Header } from './header'
import { Sidebar } from './sidebar'

export const MainLayout = ({ children }) => {
  const [isOpen, onToggle] = useBoolean(false) // drawer state

  return (
    <div className="bg-mainBackground w-screen h-screen grid grid-rows-[var(--sizeHeader)_0_1fr] grid-cols-[1fr] [grid-template-areas:'header'_'drawer'_'content'] md:grid-rows-[var(--sizeHeader)_1fr] md:grid-cols-[var(--sizeSideDrawer)_1fr] md:[grid-template-areas:'drawer_header'_'drawer_content']">
      <div className="z-50 [grid-area:drawer]">
        <Sidebar isOpen={isOpen} closeDrawer={onToggle} />
      </div>

      <div className="[grid-area:header]">
        <Header toggleDrawer={onToggle} isOpen={isOpen} />
      </div>

      <div className="[grid-area:content] pt-4 px-4 overflow-auto relative">{children}</div>
    </div>
  )
}
