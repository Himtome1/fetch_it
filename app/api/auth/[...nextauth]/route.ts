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
            
            return data_raw.user
          }
          return false
        }
      })
    ],
    callbacks: {
      async session({ session, token }) {
        // Add the user's email to the session object
        session.user.email = token.email;
        return session;
      },
      async jwt({ token, user }) {
        // Save the user's email in the JWT token
        if (user?.email) {
          token.email = user.email;
        }
        return token;
      }
    },
    pages: {
      signIn: "/signIn",
      signOut: "/"
    }
    
})
export { handler as GET, handler as POST }
