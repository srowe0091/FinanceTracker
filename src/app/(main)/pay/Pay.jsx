'use client'

import { useList } from 'react-use'

import { Button, Checkbox, Fade } from '@/ui'
import { cn } from 'ui/utils'
import { TransactionItem, TransactionList } from 'client/components/TransactionItem'
import { useGetAllUnpaidTransactions, usePayTransactions } from 'data/client/transactions'
import { useCallback } from 'react'

export const Pay = () => {
  const { data } = useGetAllUnpaidTransactions()
  const { mutateAsync } = usePayTransactions()
  const [list, { set, push, filter, clear }] = useList([])

  const handleSelectAll = useCallback(
    checked => {
      if (checked) set(data.map(t => t.id))
      else clear()
    },
    [data, set, clear]
  )

  const handleClick = useCallback(
    id => () => {
      if (list.includes(id)) filter(value => value !== id)
      else push(id)
    },
    [list, push, filter]
  )

  return (
    <Fade in>
      <div className="flex justify-between mb-8">
        <Checkbox onChange={handleSelectAll}>Select All</Checkbox>

        <Button disabled={list.length === 0} onClick={() => mutateAsync(list)}>
          Pay
        </Button>
      </div>
      <TransactionList>
        {data?.map(transaction => (
          <TransactionItem
            key={transaction.id}
            transaction={transaction}
            className={cn({ 'ring-2': list.includes(transaction.id) })}
            onClick={handleClick(transaction.id)}
          />
        ))}
      </TransactionList>
    </Fade>
  )
}
