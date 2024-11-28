'use client'

import { useTheme } from 'next-themes'
import Link from 'next/link'
import { Moon, Sun } from 'lucide-react'

export default function Header() {
  const { theme, setTheme } = useTheme()

  return (
    <header className="border-b border-border sticky top-0 bg-background z-10">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold font-mono">
          DevMode
        </Link>
        <button
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          className="p-2 rounded-full bg-primary text-primary-foreground"
          aria-label="Toggle dark mode"
        >
          {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
        </button>
      </div>
    </header>
  )
}

