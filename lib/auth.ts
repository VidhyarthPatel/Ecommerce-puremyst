import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials" 

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
    })
  ],

  session: {strategy: "jwt"}
})