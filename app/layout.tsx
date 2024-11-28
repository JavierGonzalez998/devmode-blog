import './globals.css'
import { Inter, JetBrains_Mono } from 'next/font/google'
import { ThemeProvider } from './providers'
import Header from './components/header'
import Sidebar from './components/sidebar'

const inter = Inter({ subsets: ['latin'] })
const jetbrainsMono = JetBrains_Mono({ subsets: ['latin'] })

export const metadata = {
  title: 'DevMode Blog',
  description: 'A blog about development and technology',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} ${jetbrainsMono.className} bg-background text-foreground`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Header />
          <main className="container mx-auto px-4 py-8 flex">
            <Sidebar />
            <div className="flex-1">
              {children}
            </div>
          </main>
        </ThemeProvider>
      </body>
    </html>
  )
}

