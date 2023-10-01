import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

const email = yup.string().email('Must be a valid Email').required('Email is required')

export const LoginSchema = yupResolver(
  yup.object({
    email,
    password: yup.string().required('Password is required')
  })
)
