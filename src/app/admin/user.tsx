'use client'

import { useSession } from 'next-auth/react'

export const User = () => {
  const { data: session } = useSession();
  // console.log('session', session)
  return <>{JSON.stringify(session)}</>
}
