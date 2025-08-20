import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials" 
import Facebook from "next-auth/providers/facebook";
import Google from "next-auth/providers/google";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
        credentials: {
            email: { label: "Email", type: "email", placeholder: "you@gmail.com" },
            password: { label: "password",type: "password" }
        },
        async authorize(credentials){
            if(!credentials?.email || !credentials?.password){
                throw new Error("Name, email and password is required");
            }

            return {
                id: "1",
                email: credentials.email as string,
                password: credentials.password as string,
            }
        }
    }),
    Google({
        clientId:process.env.AUTH_GOOGLE_ID,
        clientSecret:process.env.AUTH_GOOGLE_SECRET
    }),
    Facebook({
        clientId:process.env.AUTH_FACEBOOK_ID,
        clientSecret:process.env.AUTH_FACEBOOK_SECRET
    })
  ],

  session: {strategy: "jwt"}
})