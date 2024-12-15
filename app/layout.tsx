import "./globals.css";
import { Inter, JetBrains_Mono } from "next/font/google";
import { ThemeProvider } from "./providers";
import Header from "@/app/components/header";
import Sidebar from "@/app/components/sidebar";
import { NotificationStoreProvider } from "@/lib/zustand/providers/NotificationStateProvider";
import { CategoryStoreProvider } from "@/lib/zustand/providers/CategoriesStateProvider";
import { PostsStoreProvider } from "@/lib/zustand/providers/PostsStateProvider";
import Notification from "./components/Notification/Notification";
const inter = Inter({ subsets: ["latin"] });
const jetbrainsMono = JetBrains_Mono({ subsets: ["latin"] });
import 'react-toastify/dist/ReactToastify.css';
import 'react-toastify/dist/ReactToastify.min.css'

export const metadata = {
  title: "DevMode Blog",
  description: "A blog about development and technology",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.className} ${jetbrainsMono.className} bg-background text-foreground`}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <CategoryStoreProvider>
            <NotificationStoreProvider>
              <div className="flex flex-col h-screen">
                <Header />
                <div className="flex gap-3 h-[93vh]">
                  <div className="h-full">
                    <Sidebar />
                  </div>
                  <main className="flex flex-col justify-center items-center w-full">
                    <PostsStoreProvider>
                      {children}
                    </PostsStoreProvider>
                  </main>
                </div>
              </div>
              <Notification/>
            </NotificationStoreProvider>
          </CategoryStoreProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
