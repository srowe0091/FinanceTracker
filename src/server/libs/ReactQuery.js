import { QueryClient } from '@tanstack/react-query'
import { cache } from 'react'

export const serverQueryClient = cache(() => new QueryClient())
