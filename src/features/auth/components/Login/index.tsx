'use client'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { clientFirebase } from '@/firebase/client'
import { useToast } from '@/hooks/use-toast'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const formSchema = z.object({
  id: z.string().max(20),
  password: z.string(),
})
const emailDomain = process.env.NEXT_PUBLIC_EMAIL_DOMAIN

export function LoginForm() {
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [signInWithEmailAndPassword, user, _loginLoading, error] = useSignInWithEmailAndPassword(
    clientFirebase.auth,
  )

  const router = useRouter()
  if (user) {
    router.push('/')
  }

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    disabled: isLoading,
  })

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true)
    const user = await signInWithEmailAndPassword(`${values.id}@${emailDomain}`, values.password)
    if (!user) {
      setIsLoading(false)
      toast({
        variant: 'destructive',
        title: 'ログインに失敗しました',
        description: 'ID と パスワードを確認してください',
      })
      return
    }
    router.push('/')
    setIsLoading(false)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6 w-full'>
        <Card className='mx-auto w-96'>
          <CardHeader>
            <CardTitle className='text-2xl'>Sign In</CardTitle>
            <CardDescription>IDとパスワードでログインしてください</CardDescription>
          </CardHeader>
          <CardContent className='grid gap-4'>
            <div className='grid gap-2'>
              <FormField
                control={form.control}
                name='id'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>ID</FormLabel>
                    <FormControl>
                      <Input placeholder='yatai-1' {...field} />
                    </FormControl>
                    <FormDescription>屋台に振り分けられたIDを入力してください</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className='grid gap-2'>
              <FormField
                control={form.control}
                name='password'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        placeholder='パスワードを入力'
                        type='password'
                        autoComplete='current-password'
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>IDに対応するパスワードを入力してください</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            {error && <p className='text-red-500'>{error.message}</p>}
          </CardContent>
          <CardFooter>
            <Button.Loading className='w-full' type='submit' loading={isLoading}>
              ログイン
            </Button.Loading>
          </CardFooter>
        </Card>
      </form>
    </Form>
  )
}
