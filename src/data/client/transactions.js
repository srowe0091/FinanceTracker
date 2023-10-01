import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import { sbClient } from '@/libs'

export const useGetTransactions = () => {
  return useQuery({
    queryKey: ['transactions'],
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
