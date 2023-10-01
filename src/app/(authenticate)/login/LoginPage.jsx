'use client'

import { useCallback, useState } from 'react'
import { useForm, Controller } from 'react-hook-form'

import { Button, Input } from '@/ui'
import { sbClient } from '@/libs'
import { Card } from '@/components'
import { LoginSchema } from '@/modules/authentication'

import Wallpaper from '@/media/wallpaper.jpg'
import LogoImage from '@/media/logo.png'

export const LoginPage = () => {
  const [error, updateError] = useState(null)

  const {
    control,
    handleSubmit,
    formState: { isSubmitting }
  } = useForm({
    mode: 'onTouched',
    resolver: LoginSchema,
    defaultValues: {
      email: '',
      password: ''
    }
  })

  const onSubmit = useCallback(async values => {
    updateError(null)
    const { error } = await sbClient.auth.signInWithPassword({
      email: values.email,
      password: values.password
    })

    if (error) updateError(error.message)
  }, [])

  return (
    <div
      className="w-screen h-screen center justify-start md:justify-center bg-no-repeat bg-right bg-cover animate-loginBackground"
      style={{ backgroundImage: `url('${Wallpaper.src}')` }}
    >
      <form className="w-full max-w-[350px] mt-8 md:mt-0" onSubmit={handleSubmit(onSubmit)}>
        <Card dark className="flex flex-col gap-4 w-full gap-4 max-w-[350px]">
          <div
            className="self-center h-24 w-32 bg-no-repeat bg-center bg-cover rounded-3xl"
            style={{ backgroundImage: `url('${LogoImage.src}')` }}
          />

          <Controller
            name="email"
            control={control}
            render={({ field, fieldState }) => (
              <Input type="email" label="E-mail" error={fieldState.error} {...field} />
            )}
          />

          <Controller
            name="password"
            control={control}
            render={({ field, fieldState }) => (
              <Input type="password" label="Password" error={fieldState.error} {...field} />
            )}
          />

          <p className="error text-center">{error}</p>

          <Button type="submit" size="lg" onClick={handleSubmit(onSubmit)} loading={isSubmitting}>
            Login
          </Button>
        </Card>
      </form>
    </div>
  )
}
