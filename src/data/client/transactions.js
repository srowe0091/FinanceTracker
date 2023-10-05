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
        .select()
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

// be6883c0-c3e1-4fde-b96d-78f7e0064e7e - steven

// c63c2e16-8388-4a82-af62-555d405d0e3d - jamie

// dd3cdfe8-e231-4a9c-a3cc-f0c42ba67abd - test
