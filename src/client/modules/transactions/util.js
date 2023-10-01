import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

export const NewTransactionSchema = yupResolver(
  yup.object({
    amount: yup.number().required('Amount is required'),
    memo: yup.string()
  })
)
