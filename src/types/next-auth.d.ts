import NextAuth, { DefaultSession, DefaultUser } from "next-auth";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
  interface User {
    id: string;
    email: string;
    image?: string;
    username: string;
  }

  interface Session extends DefaultSession {
    user: {
      id: string;
      email: string;
      image?: string;
      username: string;
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    email: string;
    image?: string;
    username: string;
  }
}
