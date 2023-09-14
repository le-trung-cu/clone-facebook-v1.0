'use client'

import { ReactNode } from 'react'
import { SessionProvider, useSession } from 'next-auth/react'
import { redirect, usePathname } from 'next/navigation'
import FacebookText from '@/public/facebook-text.svg'
import Image from 'next/image'

export default function AuthProvider({ children }: { children: ReactNode }) {
  return (
    <SessionProvider>
      <Guards>
        {children}
      </Guards>
    </SessionProvider>
  )
}

function Guards({ children }: { children: ReactNode }) {
  const session = useSession()
  const pathname = usePathname()
  return <>{children}</>

  if ( !['/login', '/reg'].includes(pathname)  && session.status == 'unauthenticated') {
    return redirect('/login')
  }
  if (pathname === '/login' && session.status === 'authenticated') {
    return redirect('/')
  }

  if (session.status === 'loading') {
    return (
      <main className="flex items-center justify-center min-h-screen">
        <Image className="mx-auto" src={FacebookText} alt="facebook logo" height={100} />
      </main>
    )
  }

  return <>{children}</>
}