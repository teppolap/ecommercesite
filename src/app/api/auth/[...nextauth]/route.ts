import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import NextAuth from "next-auth/next";

const authOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          redirect_uri: "https://top-shelf-market.vercel.app/api/auth/callback/google",
        },
      },
    }),
  ],
  callbacks: {
    async redirect({ url, baseUrl }: { url: string; baseUrl: string }) {
      // Ensure the callback URL is correct
      if (url.startsWith(baseUrl)) return url;
      if (url.startsWith("/")) return new URL(url, baseUrl).toString();
      return baseUrl;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
