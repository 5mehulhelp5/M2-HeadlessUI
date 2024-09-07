'use client'

import { Alert } from '@/components/admin/alert'
import { Button } from '@/components/admin/button'
import { Input } from '@/components/admin/input'
import { Label } from '@/components/admin/label'
import { signIn } from 'next-auth/react'
import { use, useState } from 'react'
import { useRouter } from 'next/navigation'

export const RegisterForm = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [firstname, setFirstname] = useState('')
  const [lastname, setLastname] = useState('')
  const [username, setUsername] = useState('')
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()
  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const res = await fetch('/api/register', {
        method: 'POST',
        body: JSON.stringify({
          email,
          username,
          password,
          firstname,
          lastname
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      if (res.ok) {
        setTimeout(() =>
          router.push('/admin/login/')
          , 3000)
      } else {
        setError((await res.json()).error)
      }
    } catch (error: any) {
      setError(error?.message)
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-12 w-full sm:w-[400px]">
      <div className="grid w-full items-center gap-1.5">
        <Label htmlFor="firstname">First Name</Label>
        <Input
          className="w-full"
          required
          value={firstname}
          onChange={(e) => setFirstname(e.target.value)}
          id="firstname"
          type="text"
        />
      </div>
      <div className="grid w-full items-center gap-1.5">
        <Label htmlFor="lastname">Lasr Name</Label>
        <Input
          className="w-full"
          required
          value={lastname}
          onChange={(e) => setLastname(e.target.value)}
          id="lirstname"
          type="text"
        />
      </div>
      <div className="grid w-full items-center gap-1.5">
        <Label htmlFor="username">Username</Label>
        <Input
          className="w-full"
          required
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          id="username"
          type="text"
        />
      </div>
      <div className="grid w-full items-center gap-1.5">
        <Label htmlFor="email">Email</Label>
        <Input
          className="w-full"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          id="email"
          type="email"
        />
      </div>
      <div className="grid w-full items-center gap-1.5">
        <Label htmlFor="password">Password</Label>
        <Input
          className="w-full"
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
          Register
        </Button>
      </div>
    </form>
  )
}
