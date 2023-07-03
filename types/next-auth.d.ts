import NextAuth from "next-auth"
import { JWT } from "next-auth/jwt"
import { auth } from "firebase-admin"

declare module "next-auth" {
  interface User extends auth.DecodedIdToken {}
}

declare module "next-auth/jwt" {
  interface JWT {
    idToken?: string
  }
}
