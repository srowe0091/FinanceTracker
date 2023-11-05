'use client'

import { useList } from 'react-use'
import { groupBy } from 'lodash/fp'

import { Checkbox, Fab, Fade } from '@/ui'
import { cn } from 'ui/utils'
import { TransactionItem, TransactionList } from 'client/components/TransactionItem'
import { useGetAllUnpaidTransactions, usePayTransactions } from 'data/client/transactions'
import { useCallback, useMemo } from 'react'

export const Pay = () => {
  const { data } = useGetAllUnpaidTransactions()
  const { mutateAsync } = usePayTransactions()
  const [list, { set, push, filter, clear }] = useList([])

  const parsedData = useMemo(() => groupBy('name', data), [data])

  const handleSelectAll = useCallback(
    checked => {
      if (checked) set(data.map(t => t.id))
      else clear()
    },
    [data, set, clear]
  )

  const handleSelectAllUser = useCallback(
    user => checked => {
      if (checked) push(...parsedData[user].map(t => t.id))
      else set(list.filter(id => !parsedData[user].some(t => t.id === id)))
    },
    [parsedData, list, set, push]
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
      <div className="flex justify-center mb-8">
        <Checkbox value={list?.length === data?.length} onChange={handleSelectAll}>
          Select All
        </Checkbox>
      </div>

      {Object.entries(parsedData)?.map(([user, transactions]) => (
        <div key={user} className="flex flex-col gap-4">
          <Checkbox
            value={transactions.every(curr => list.some(id => id === curr.id))}
            onChange={handleSelectAllUser(user)}
          >
            {user}
          </Checkbox>
          <TransactionList className="mb-8">
            {transactions.map(transaction => (
              <TransactionItem
                key={transaction.id}
                transaction={transaction}
                className={cn({ 'outline outline-primary outline-2': list.includes(transaction.id) })}
                onClick={handleClick(transaction.id)}
              />
            ))}
          </TransactionList>
        </div>
      ))}

      <div className="block mb-16" />

      <Fade in={list.length > 0} onClick={() => mutateAsync(list)}>
        <Fab>Pay</Fab>
      </Fade>
    </Fade>
  )
}
