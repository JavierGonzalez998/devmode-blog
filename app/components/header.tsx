'use client'

import * as React from 'react'
import { useTheme } from 'next-themes'
import Link from 'next/link'
import { Moon, Sun } from 'lucide-react'
import { signOut } from 'next-auth/react'
import { useSessionStore } from '@/lib/zustand/providers/SessionStateProvider'

export default function Header() {
  const {session} = useSessionStore((store) => store);
  const { theme, setTheme } = useTheme()

  return (
    <header className="border-b border-border sticky top-0 bg-background z-20">
      <div className="container mx-auto px-4 py-3 flex justify-end items-center">
        <div className="flex items-center space-x-4">
          {session ? (
            <>
              <Link href="/profile" className="text-sm">Profile</Link>
              <button onClick={() => signOut({callbackUrl: "/auth/login"})} className="text-sm">Sign Out</button>
            </>
          ) : (
            <Link href="/auth/login" className="text-sm">Sign In</Link>
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

