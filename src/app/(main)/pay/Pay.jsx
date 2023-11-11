'use client'

import { useList } from 'react-use'
import { groupBy } from 'lodash/fp'

import { Checkbox, ContainerLoader, Fab, Fade } from '@/ui'
import { cn } from 'ui/utils'
import { TransactionItem, TransactionList } from 'client/components/TransactionItem'
import { useGetAllUnpaidTransactions, usePayTransactions } from 'data/client/transactions'
import { useCallback, useMemo } from 'react'

export const Pay = () => {
  const { data } = useGetAllUnpaidTransactions()
  const [list, { set, push, filter, clear }] = useList([])
  const { mutateAsync, isPending } = usePayTransactions({
    onSuccess: () => set([])
  })

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
      <ContainerLoader loading={isPending} />

      {list?.length === 0 && <p className='mt-10 text-center text-xl font-bold opacity-70'>No Transactions</p>}

      <div className="flex justify-center mb-8">
        {list?.length > 0 && (
          <Checkbox value={list?.length === data?.length} onChange={handleSelectAll}>
            Select All
          </Checkbox>
        )}
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

      <Fade in={list.length > 0}>
        <Fab onClick={() => mutateAsync(list)}>Pay</Fab>
      </Fade>
    </Fade>
  )
}
