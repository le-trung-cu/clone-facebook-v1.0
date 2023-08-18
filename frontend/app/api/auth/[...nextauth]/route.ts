import NextAuth, { User } from 'next-auth'
import GithubProvider from 'next-auth/providers/github'
import CredentialsProvider from 'next-auth/providers/credentials'

const handler = NextAuth({
  providers: [
    GithubProvider({
      clientId: '',
      clientSecret: '',
    }),
    CredentialsProvider({
      credentials: {
        firstName: {},
        email: { label: "Email", type: "text", placeholder: "Email" },
        password: { label: "Password", type: "password" }
      },
      id: 'credentials',
      name: 'Credentials',
      async authorize(credentials, req) {

        const user = await fetch('http://localhost:8000/users/signin', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({email: credentials?.email, password: credentials?.password})
        }).then(res => res.json())
        .then(data => {
          return data
        })
        
        return  user
      },
    })
  ],
  callbacks: {
    async jwt({token, user, account}){
      if(account) {
        return {
          accessToken: (user as any).token,
          username: (user as any).username,
          email: user.email,
          id: user.id,
        }
      }
      return token
    },
    async session({session, token, user}) {
      session.user!.name = (token as any).username as string
      (session as any).accessToken = token.accessToken
      return session
    },
  }
})

export { handler as GET, handler as POST }