'use client'

import { ThemeProvider as NextThemesProvider } from "next-themes"
import { type ThemeProviderProps } from "next-themes"
import { SessionProvider } from "next-auth/react"
import { type SessionProviderProps } from "next-auth/react"
export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}

export function Session({children}: SessionProviderProps){
  return <SessionProvider>{children}</SessionProvider>
}