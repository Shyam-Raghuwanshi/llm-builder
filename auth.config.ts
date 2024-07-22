import type { NextAuthConfig } from "next-auth";

import Google from "next-auth/providers/google";
import github from "next-auth/providers/github";

export default {
    providers: [
        Google({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
        github({
            clientId: process.env.GITHUB_CLIENT_ID,
            clientSecret: process.env.GITHUB_CLIENT_SECRET,
        }),
    ],
} satisfies NextAuthConfig


