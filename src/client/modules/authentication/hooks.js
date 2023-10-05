import { useEffect } from 'react'
import { useQuery, useQueryClient } from '@tanstack/react-query'

import { sbClient } from '@/libs'

export const useAuthorization = () => {
  const queryClient = useQueryClient()

  const { isLoading, data } = useQuery({
    queryKey: ['user'],
    queryFn: async () => {
      const { data, error } = await sbClient.auth.getSession()

      if (error) throw error

      if (data?.session?.user) {
        const user = await sbClient
          .from('profiles')
          .select('allowance, user_type')
          .eq('owner', data?.session?.user.id)
          .single()

        return Object.assign(data.session.user, { profile: user.data })
      }

      return null
    }
  })

  useEffect(() => {
    const {
      data: { subscription }
    } = sbClient.auth.onAuthStateChange(async event => {
      console.log(event)
      switch (event) {
        case 'SIGNED_IN':
          if (data === null) {
            queryClient.refetchQueries({ queryKey: ['user'] })
          }
          break
        case 'SIGNED_OUT':
          queryClient.clear()
          window.location.href = '/'
          break
        case 'TOKEN_REFRESHED':
          console.info('token refresh succeeded')
          break
        default:
          break
      }
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [queryClient, data])

  return { isAuthenticated: !!data, isLoading }
}
