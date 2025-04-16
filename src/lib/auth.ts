import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "./db";
import Credentials from "next-auth/providers/credentials";
import { LoginSchema } from "./zod";
import { compareSync } from "bcryptjs";

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    Google,
    Credentials({
      id:'credentials',
      name: 'credentials',
      credentials: {
        email: { label: "username", type: 'text'},
        password: {label: "password", type: 'password'},
      },
      authorize: async (credentials) => {
        const validatedFields = LoginSchema.safeParse(credentials);
        if (!validatedFields.success) {
          return null;
        }
        const { email, password } = validatedFields.data;

        const user = await prisma.user.findUnique({ where: { email } });

        if (!user || !user.password) {
          throw new Error("No user found");
        }

        const passwordMatch = compareSync(password, user.password);
        if (!passwordMatch) return null;
        return user;
      },
    }),
  ],
  secret: process.env.AUTH_SECRET,
  pages: {
    signIn: "/login",
  },
  callbacks: {
    // authorized({ auth, request: { nextUrl } }) {
    //   console.log('testt')
    //   const isLoggedIn = !auth?.user;

    //   const ProtectedRoutes = ["/dashboard"];
    //   if (!isLoggedIn && ProtectedRoutes.includes(nextUrl.pathname)) {
    //     console.log('masuk')
    //     return Response.redirect(new URL("/login", nextUrl));
    //   }

    //   if (isLoggedIn && nextUrl.pathname.startsWith("/login")) {
    //     return Response.redirect(new URL("/dashboard", nextUrl));
    //   }
    //   return true
    // },
    async session({ session, token }) {
      if (session?.user) {
        // console.log('token', token)
        session.user.id = token.sub!;
        session.user.image = token.picture;
        session.user.name = token.name;
        session.user.role = token.role;
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        const foundUser = await prisma.user.findUnique({
          where: {
            id: user.id,
          },
        });

        if (foundUser) {
         
            token.role = foundUser.role;
          
        } else {
          token.id = user.id as string;
          token.role = "user";
        }
      }

      // console.log("token from jwt callback", token);

      return token;
    },
  },
  session: {
    strategy: "jwt",
  },
});
