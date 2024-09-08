'use client'

import { Alert } from '@/components/admin/alert'
import { Button } from '@/components/admin/button'
import { Input } from '@/components/admin/input'
import { Label } from '@/components/admin/label'
import { signIn } from 'next-auth/react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useState } from 'react'

export const Form = () => {
  const router = useRouter()
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/admin/dashboard'
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const res = await signIn('credentials', {
        redirect: false,
        email,
        password,
        callbackUrl
      })
      if (!res?.error) {
        router.push('/admin/dashboard')
      } else {
        setError('Invalid email or password')
      }
    } catch (err: any) {
      setError(err.message)
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-12 w-full sm:w-[400px]">
      <div className="grid w-full items-center gap-1.5">
        <Label htmlFor="uername">Email/Username</Label>
        <Input
          className="w-full text-black"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          id="username"
          type="text"
        />
      </div>
      <div className="grid w-full items-center gap-1.5">
        <Label htmlFor="password">Password</Label>
        <Input
          className="w-full text-black"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          id="password"
          type="password"
        />
      </div>
      {error && <Alert>{error}</Alert>}
      <div className="w-full">
        <Button className="w-full" size="lg">
          Login
        </Button>
      </div>
    </form>
  )
}
