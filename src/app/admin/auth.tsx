'use client'

import { signIn, signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'
export const LoginButton = () => {
  return <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => signIn()}>Sign in</button>
}

export const LogoutButton = () => {
  const router = useRouter();
  return <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={async () => {
    await signOut({ redirect: false })
    router.push('/admin/login/')
  }}>Sign Out</button>
}
