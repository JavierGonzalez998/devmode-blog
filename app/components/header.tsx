'use client'

import * as React from 'react'
import { useTheme } from 'next-themes'
import Link from 'next/link'
import { Moon, Sun } from 'lucide-react'
import { useSidebarState } from '../hooks/useSidebarState'
import { signOut } from 'next-auth/react'
import GetSession from '@/actions/get-session'

export default function Header() {
  const { theme, setTheme } = useTheme()
  const { isOpen } = useSidebarState()
  const [session, setSession] = React.useState<any>()

  React.useEffect(() => {
    const fetchSession = async() => {
      const session = await GetSession()
      setSession(session)
    }
    fetchSession()
  },[])
  return (
    <header className="border-b border-border sticky top-0 bg-background z-20">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link 
          href="/" 
          className={`text-2xl font-bold font-mono transition-transform duration-300 ${
            isOpen ? 'translate-x-64 md:translate-x-0' : 'translate-x-0'
          }`}
        >
          DevMode
        </Link>
        <div className="flex items-center space-x-4">
          {session ? (
            <>
              <Link href="/profile" className="text-sm">Profile</Link>
              <button onClick={() => signOut({callbackUrl: "/auth/signin"})} className="text-sm">Sign Out</button>
            </>
          ) : (
            <Link href="/auth/signin" className="text-sm">Sign In</Link>
          )}
          <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="p-2 rounded-full bg-primary text-primary-foreground"
            aria-label="Toggle dark mode"
          >
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>
      </div>
    </header>
  )
}

