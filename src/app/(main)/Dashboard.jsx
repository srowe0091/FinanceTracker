'use client'

import { useMemo } from 'react'
import { update, add } from 'lodash/fp'
import { isBefore, addWeeks, differenceInCalendarDays } from 'date-fns'

import { Fade, ContainerLoader, Skeleton, Divider, Badge } from '@/ui'
import { Card, ListItem } from '@/components'

import { useGetTransactions } from '@/data/client'
import { NewTransactionModal } from '@/modules/transactions'
import { formatCurrency, formatDate } from 'utils/normalizers'

const KNOWN_PAY_DATE = new Date('9/29/2023')

const nextPayDate = payInterval => {
  const today = new Date()

  if (!isBefore(today, payInterval)) {
    return nextPayDate(addWeeks(payInterval, 2))
  }

  return differenceInCalendarDays(payInterval, today)
}

export const Dashboard = () => {
  const { data, isLoading } = useGetTransactions()

  const { spent, groupedSpent } = useMemo(() => {
    const ALLOWANCE = 30000
    const totalSpent = data?.reduce(
      (acc, curr) => update(curr.group ? 'groupedSpent' : 'spent', add(curr.amount), acc),
      { groupedSpent: 0, spent: 0 }
    )

    if (!totalSpent) return {}

    return {
      spent: formatCurrency(ALLOWANCE - totalSpent.spent),
      groupedSpent: formatCurrency(totalSpent.groupedSpent)
    }
  }, [data])

  const nextDate = useMemo(() => nextPayDate(KNOWN_PAY_DATE), [])

  return (
    <Fade in>
      <div className="flex flex-col gap-3">
        <Card className="text-center flex flex-col gap-4">
          {isLoading ? (
            <div className="center w-full h-[72px]">
              <Skeleton className="w-full h-[30px]" />
            </div>
          ) : (
            <p>
              <span className="text-5xl font-bold">{spent}</span>
              <br />
              remaining
            </p>
          )}
        </Card>

        <div className="flex gap-3">
          <Card className="flex-1 text-center flex flex-col gap-4">
            <p>
              <span className="text-3xl font-bold">{nextDate}</span>
              <br />
              days left
            </p>
          </Card>
          <Card className="flex-1 text-center flex flex-col gap-4">
            {isLoading ? (
              <div className="center w-full h-[60px]">
                <Skeleton className="w-full h-[30px]" />
              </div>
            ) : (
              <p>
                <span className="text-3xl font-bold">{groupedSpent}</span>
                <br />
                Group spent
              </p>
            )}
          </Card>
        </div>
      </div>

      {!!data?.length && <Divider />}

      <div className="pb-16 relative">
        <ContainerLoader loading={isLoading} />

        <div className="flex flex-col gap-3">
          {data?.map(transaction => (
            <ListItem key={transaction.id} className="gap-2">
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
          ))}
        </div>
      </div>

      <NewTransactionModal />
    </Fade>
  )
}
