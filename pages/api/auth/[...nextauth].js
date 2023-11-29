import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";

export default NextAuth({
    secret: process.env.NEXTAUTH_SECRET,
    session: {
        strategy: "jwt",
        maxAge: 8 * 60 * 60, // 30 days
    },
    providers :[
        CredentialsProvider({
            // The name to display on the sign in form (e.g. "Sign in with...")
            name: "credentials",
            // `credentials` is used to generate a form on the sign in page.
            // You can specify which fields should be submitted, by adding keys to the `credentials` object.
            // e.g. domain, username, password, 2FA token, etc.
            // You can pass any HTML attribute to the <input> tag through the object.
            credentials: {
              username: { label: "Usuario", type: "text", placeholder: "Su correo" },
              password: { label: "Contraseña", type: "password", placeholder: "Su contraseña" }
            },
            async authorize(credentials, req) {
              // Add logic here to look up the user from the credentials supplied                
              const res = await fetch(
                process.env.NEXT_PUBLIC_URL_BASE_SERVICE + '/user/login',
              {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    email: credentials?.username,
                    password: credentials?.password,
                }),
              })
              const user = await res.json()
              console.log(user)
              if (user) {
                // Any object returned will be saved in `user` property of the JWT
                return user
              } else {
                // If you return null then an error will be displayed advising the user to check their details.
                return null
              }
            }
          })
    ]
});