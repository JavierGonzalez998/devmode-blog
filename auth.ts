import NextAuth, {type DefaultSession} from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { prisma } from "@/prisma"
import authConfig from "./auth.config"


declare module "next-auth" {
  /**
   * Returned by `auth`, `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      /** The user's postal address. */
      role: string;
      /**
       * By default, TypeScript merges new interface properties and overwrites existing ones.
       * In this case, the default session user properties will be overwritten,
       * with the new ones defined above. To keep the default session user properties,
       * you need to add them back into the newly declared interface.
       */
    } & DefaultSession["user"]
  }
}
 

export const { handlers, auth, signIn, signOut } = NextAuth({
    adapter: PrismaAdapter(prisma),
    ...authConfig,
    session: {strategy: "jwt"},
    callbacks: {
        jwt({ token, user }) {
          if (user) { // User is available during sign-in
            token.role = user.role
          }
          return token
        },
        async session({ session, token }) {
          // Asigna el valor de isAdmin del token a la sesión
          if (token) {
            session.user = {
              ...session.user,
              role: String(token.role),
            };
          }
          return session;
        },
      },
    
})