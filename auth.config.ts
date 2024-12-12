import type { NextAuthConfig, User } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { prisma } from "./prisma";
import bcrypt from "bcryptjs";
import { nanoid } from "nanoid";

export default {
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials):Promise<User | null> => {
        const user = await prisma.user.findUnique({
          where: {
            email: String(credentials.email),
          },
        });
        if (!user || !user.password) {
          throw new Error("Invalid credentials");
        }
        const isValid = await bcrypt.compare(
          String(credentials.password),
          user.password
        );

        if (!isValid) {
          throw new Error("Invalid credentials");
        }
        //verificacion de email
        if (!user.emailVerified) {
          const verifyTokenExists = await prisma.verificationtoken.findFirst({
            where: {
              identifier: user.email,
            },
          });
          // si existe un token, se elimina
          if (verifyTokenExists?.identifier) {
            await prisma.verificationtoken.delete({
              where: {
                identifier_token: {
                  identifier: String(user.email),
                  token: verifyTokenExists.token, 
                },
              },
            });
          }
          const token = nanoid();

          await prisma.verificationtoken.create({
            data: {
              identifier: user.email,
              token,
              expires: new Date(Date.now() + 1000 * 60 * 60 * 24),
            },
          });
        }
        return {
          id: String(user.id), // Convert `id` to string
          name: user.name,
          email: user.email,
          role: user.role, // Adjust this based on your schema
          emailVerified: user.emailVerified,
          image: user.image,
        };
      },
    }),
  ],
} satisfies NextAuthConfig;
