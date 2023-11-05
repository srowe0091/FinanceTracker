import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import { sbClient } from '@/libs'
import { useUser } from '@/hooks'

export const useGetTransactions = () => {
  const user = useUser()

  return useQuery({
    queryKey: ['transactions', 'dashboard'],
    queryFn: async () => {
      const { data, error } = await sbClient
        .from('transactions')
        .select()
        .eq('paid', false)
        .or(`owner.eq.${user.id},group.eq.true`)
        .order('created_at', { ascending: false })

      if (error) throw error

      return data
    }
  })
}

export const useGetAllUnpaidTransactions = () => {
  return useQuery({
    queryKey: ['transactions', 'unpaid'],
    queryFn: async () => {
      const { data, error } = await sbClient
        .from('transactions')
        .select('*, ...profiles(name)')
        .eq('paid', false)
        .order('created_at', { ascending: false })

      if (error) throw error

      return data
    }
  })
}

export const useNewTransaction = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async variables => {
      const { data, error } = await sbClient.from('transactions').insert(variables).select(`id, amount, created_at`)

      if (error) throw error

      return data
    },
    onSettled: async () => {
      await Promise.allSettled([queryClient.invalidateQueries({ queryKey: ['transactions'], refetchType: 'all' })])
    }
  })
}

export const usePayTransactions = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async transactionIds => {
      const { data, error } = await sbClient.from('transactions').update({ paid: true }).in('id', transactionIds)

      if (error) throw error

      return data
    },
    onSettled: async () => {
      await Promise.allSettled([queryClient.invalidateQueries({ queryKey: ['transactions'], refetchType: 'all' })])
    }
  })
}
