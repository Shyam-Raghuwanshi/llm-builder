import NextAuth from "next-auth"
import Github from "next-auth/providers/github"
import Google from "next-auth/providers/google"

import { PrismaAdapter } from "@auth/prisma-adapter"

import { db } from "./lib/db"
import authConfig from "./auth.config";

export const { handlers, signIn, signOut, auth } = NextAuth({
    adapter: PrismaAdapter(db),
    session: { strategy: "jwt" },
    secret: process.env.NEXTAUTH_SECRET,
    ...authConfig
})