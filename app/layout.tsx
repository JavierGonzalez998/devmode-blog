import './globals.css'
import { Inter, JetBrains_Mono } from 'next/font/google'
import { ThemeProvider } from './providers'
import Header from './components/header'
import Sidebar from './components/sidebar'
import { PrismaClient } from '@prisma/client'

const inter = Inter({ subsets: ['latin'] })
const jetbrainsMono = JetBrains_Mono({ subsets: ['latin'] })

export const metadata = {
  title: 'DevMode Blog',
  description: 'A blog about development and technology',
}

const prisma = new PrismaClient();

async function getCategories(){
  const categories = await prisma.categories.findMany()
  return categories
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const categories = await getCategories()
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} ${jetbrainsMono.className} bg-background text-foreground`}>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <Header />
            <div className="flex flex-col md:flex-row">
              <Sidebar categories={categories}/>
              <main className="flex-1 p-4 md:p-8">
                {children}
              </main>
            </div>
          </ThemeProvider>
      </body>
    </html>
  )
}

