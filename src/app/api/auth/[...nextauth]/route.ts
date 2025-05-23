import NextAuth, { NextAuthConfig } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const allowedEmails = ["higa1140@gmail.com"]; // 許可したいメールアドレス

export const authOptions: NextAuthConfig = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      return allowedEmails.includes(user.email!);
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };