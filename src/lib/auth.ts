import {
  GetServerSidePropsContext,
  NextApiRequest,
  NextApiResponse,
} from "next";
import NextAuth, { getServerSession, NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { db } from "./db";

const authOptions: NextAuthOptions = {
  session: { strategy: "jwt" },
  providers: [
    CredentialsProvider({
      id: "email-password-provider",
      name: "Email/Password Provider",
      credentials: {
        email: { type: "text", placeholder: "Email" },
        password: { type: "password" },
      },
      async authorize(credentials, req) {
        if (!credentials || !credentials.email || !credentials.password)
          return null;
        const user = await db.user.findUnique({
          where: { email: credentials.email },
          include: { userProviders: { where: { providerType: "PASSWORD" } } },
        });
        if (!user || user.userProviders.length < 1) return null;

        // IDK Why there would be multiple passwords but let's check them
        for (let provider of user.userProviders) {
          if (
            await bcrypt.compare(credentials.password, provider.providerToken)
          ) {
            return {
              id: user.id,
              email: user.email,
              username: user.username,
              image: user.imageUrl ?? undefined,
            };
          }
        }

        return null;
      },
    }),
  ],
  pages: {
    signIn: "/auth/login",
    signOut: "/auth/logout",
    error: "/auth/error",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.username = user.username;
        token.image = user.image;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.user.email = token.email;
        session.user.username = token.username;
        session.user.image = token.image;
      }
      return session;
    },
  },
};

export const handler = NextAuth(authOptions);

export function serverSession(
  ...args:
    | [GetServerSidePropsContext["req"], GetServerSidePropsContext["res"]]
    | [NextApiRequest, NextApiResponse]
    | []
) {
  return getServerSession(...args, authOptions);
}
