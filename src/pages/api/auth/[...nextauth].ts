import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { firebaseAdmin } from "@/lib/firebaseAdmin"
import { async } from "@firebase/util"

export default NextAuth({
  providers: [
    CredentialsProvider({
      credentials: {},
      authorize: async ({ idToken }: any, _req) => {
        if (idToken) {
          try {
            const decoded = await firebaseAdmin.auth().verifyIdToken(idToken)
            return { ...decoded }
          } catch (err) {
            console.error(err)
          }
        }
        return null
      },
    }),
  ],
  secret: process.env.SECRET,
  session: {
    jwt: true,
  },
  jwt: {
    secret: process.env.SECRET,
  },
  pages: {
    signIn: "/auth/signin",
  },
  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) {
        token = user
      }
      return token
    },
  },
  events: {},
  debug: process.env.NODE_ENV !== "production",
})
