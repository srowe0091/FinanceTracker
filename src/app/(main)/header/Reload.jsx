import { Button } from '@/ui'
import { RefreshIcon } from '@/icons'

export const Reload = () => {
  return (
    <Button onClick={() => location.reload()} variant="ghost" size="icon">
      <RefreshIcon />
    </Button>
  )
}
