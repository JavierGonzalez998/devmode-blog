'use client'

import Link from 'next/link'
import { Menu, X } from 'lucide-react'
import { useSidebarState } from '../hooks/useSidebarState'
import * as React from 'react'

interface props{
  categories: any;
}

export default function Sidebar({categories}:props) {
  const { isOpen, setIsOpen } = useSidebarState()

  return (
    <>
      <button
        className="md:hidden fixed top-4 left-4 z-30 p-2 bg-background border border-border rounded-md"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle sidebar"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>
      <aside className={`
        fixed top-0 left-0 z-20 h-full w-64 bg-background border-r border-border
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        md:relative md:translate-x-0
      `}>
        <div className="p-4 pt-16 md:pt-4">
          <h2 className="text-xl font-bold mb-4 font-mono">Categories</h2>
          <ul className="space-y-2">
            {categories.length > 0 ? categories.map((category: any) => (
              <li key={category.slug}>
                <Link
                  href={`/category/${category.slug}`}
                  className="text-muted-foreground hover:text-foreground transition-colors font-mono"
                  onClick={() => setIsOpen(false)}
                >
                  {category.name}
                </Link>
              </li>
            )) : null}
          </ul>
        </div>
      </aside>
    </>
  )
}

