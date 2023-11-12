'use client'

import { useMemo } from 'react'
import { update, add } from 'lodash/fp'
import { isBefore, addWeeks, differenceInCalendarDays } from 'date-fns'

import { Fade, ContainerLoader, Skeleton, Divider } from '@/ui'
import { Card, TransactionItem, TransactionList } from '@/components'

import { useGetTransactions } from '@/data/client'
import { NewTransactionModal } from '@/modules/transactions'
import { formatCurrency } from 'utils/normalizers'
import { useUser } from '@/hooks'

const KNOWN_PAY_DATE = new Date('9/29/2023')
const GROUP_TOTAL = 47500

const nextPayDate = payInterval => {
  const today = new Date()

  if (!isBefore(today, payInterval)) {
    return nextPayDate(addWeeks(payInterval, 2))
  }

  return differenceInCalendarDays(payInterval, today)
}

export const Dashboard = () => {
  const user = useUser()
  const { data, isLoading } = useGetTransactions()

  const { spent, groupedSpent } = useMemo(() => {
    const totalSpent = data?.reduce(
      (acc, curr) => update(curr.group ? 'groupedSpent' : 'spent', add(curr.amount), acc),
      { groupedSpent: 0, spent: 0 }
    )

    if (!totalSpent) return {}

    return {
      spent: formatCurrency(user.profile.allowance - totalSpent.spent),
      groupedSpent: formatCurrency(GROUP_TOTAL - totalSpent.groupedSpent)
    }
  }, [data, user.profile.allowance])

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
                Group Left
              </p>
            )}
          </Card>
        </div>
      </div>

      {!!data?.length && <Divider />}

      <div className="pb-16 relative">
        <ContainerLoader loading={isLoading} />

        <TransactionList>
          {data?.map(transaction => (
            <TransactionItem key={transaction.id} transaction={transaction} />
          ))}
        </TransactionList>
      </div>

      <NewTransactionModal />
    </Fade>
  )
}
