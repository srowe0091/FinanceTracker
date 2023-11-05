import { Badge } from '@/ui'

import { ListItem } from './ListItem'

import { formatCurrency, formatDate } from 'utils/normalizers'
import { cn } from 'ui/utils'

export const TransactionList = ({ children, className }) => {
  return <div className={cn('flex flex-col gap-3', className)}>{children}</div>
}

export const TransactionItem = ({ transaction, className, ...rest }) => {
  return (
    <ListItem key={transaction.id} className={cn('gap-2', className)} {...rest}>
      <div className="w-full flex justify-between">
        <p className="">{transaction.memo || '--'}</p>
        {transaction.group && <Badge className="self-center">Group</Badge>}
      </div>

      <div className="text-right shrink-0">
        <span>
          <p className="text-sm">{formatCurrency(transaction.amount)}</p>
          <p className="text-xs">{formatDate(transaction.created_at, 'EEE MM/dd')}</p>
        </span>
      </div>
    </ListItem>
  )
}
