import NextAuth from "next-auth"
import authConfig from "./auth.config"
import { NextResponse } from "next/server"

const {auth: middleware} = NextAuth(authConfig)

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
}

const publicRoutes = ["/","/auth/login","/auth/register", "/blog/", "/category/"]

export default middleware((req) => {
  const {nextUrl, auth} = req
  const reg = /\/[a-z]+\/[a-z1-9\W]+/g
  const isLoggedIn = !!auth?.user
  console.log("route: ", nextUrl.pathname,"\n is public: ", publicRoutes.includes(nextUrl.pathname))
  if(!publicRoutes.includes(nextUrl.pathname) && !isLoggedIn){
    return NextResponse.redirect(new URL("/auth/login", nextUrl))
  }

  return NextResponse.next();
});