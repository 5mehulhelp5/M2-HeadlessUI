'use client';
import { useSession } from 'next-auth/react'
import Link from 'next/link';
export default function UserInformation() {
    const { data: session } = useSession();
  return (
    <div className="sm:shadow-xl w-full px-8 pb-8 pt-12 flex flex-row items-center justify-between sm:bg-white rounded-xl space-y-12">
    <h1 className="font-semibold text-2xl">Welcome {session?.user?.name}</h1>
    <Link className="!mt-0" href="/admin">
      <p className="bg-blue-500  hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">View Details</p>
    </Link>
  </div>
  )
}