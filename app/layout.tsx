import "./globals.css";
import { Inter, JetBrains_Mono } from "next/font/google";
import { ThemeProvider } from "./providers";
import Header from "@/app/components/header";
import Sidebar from "@/app/components/sidebar";
import { getCategories } from "@/actions/categories-actions";
import { NotificationStoreProvider } from "@/lib/zustand/providers/NotificationStateProvider";

const inter = Inter({ subsets: ["latin"] });
const jetbrainsMono = JetBrains_Mono({ subsets: ["latin"] });

export const metadata = {
  title: "DevMode Blog",
  description: "A blog about development and technology",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const categories = await getCategories();
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.className} ${jetbrainsMono.className} bg-background text-foreground`}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <NotificationStoreProvider>
          <div className="flex flex-col h-screen">
            <Header />
            <div className="flex gap-3 h-5/6">
              <div className="h-full">
                <Sidebar categories={categories} />
              </div>
              <main className="flex flex-col justify-center items-center w-full">{children}</main>
            </div>
          </div>            
          </NotificationStoreProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
