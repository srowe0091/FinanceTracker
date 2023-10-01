'use client'

import { Fab, Fade } from '@/ui'
import { AddIcon } from '@/icons'
import { Card } from '@/components'

export const Dashboard = () => {
  return (
    <Fade in>
      <div className="flex flex-col gap-2">
        <Card className="text-center flex flex-col gap-4">
          <p>
            <span className="text-5xl font-bold">$300.00</span>
            <br />
            remaining
          </p>
        </Card>

        <div className="flex gap-2">
          <Card className="flex-1 text-center flex flex-col gap-4">
            <p>
              <span className="text-3xl font-bold">12</span>
              <br />
              days left
            </p>
          </Card>
          <Card className="flex-1 text-center flex flex-col gap-4">
            <p>
              <span className="text-3xl font-bold">$123.03</span>
              <br />
              Group spent
            </p>
          </Card>
        </div>
      </div>

      
      <Fab icon={AddIcon} />
    </Fade>
  )
}