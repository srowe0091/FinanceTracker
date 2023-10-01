import { cookies } from 'next/headers'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'

export const sb = () => {
  const sb = createServerComponentClient({ cookies })
  return sb
}
