import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"


const handler = NextAuth(  {
  providers: [
      CredentialsProvider({
        name: 'Credentials',
        credentials: {
          email: { label: "Email", type: "text", placeholder: "email@provider.com" },
          password: { label: "Password", type: "password" }
        },
        async authorize(credentials, req) {
          const res = await fetch("http://localhost:3000/api/login", {
            method: 'POST',
            body: JSON.stringify(credentials),
            headers: { "Content-Type": "application/json" }
          })
          const data_raw = await res.json()
          if (data_raw.ok == true && data_raw.user) {
            return data_raw.user;
          }
          return false
        }
      })
    ],
    callbacks: {
      async jwt({ token, user }) {
        if (user){
          token.driver = user.driver as boolean
          console.log(`JWT CALLBACK: Driver: ${user.driver}`)
        }
          
        if (user?.email) {
          token.email = user.email;
        }
        if (user?.name) {
          token.name = user.name
        }
        return token;
      },
      async session({ session, token }) {
        const driver:boolean= token.driver as boolean

        session.user.driver = driver;
        console.log(`SESSION CALLBACK: Driver: ${session.user.driver}`)
        session.user.email = token.email;
        session.user.name = token.name;
        return session;
      }
      
    },
    pages: {
      signIn: "/signIn",
      signOut: "/"
    }
    
})
export { handler as GET, handler as POST }
