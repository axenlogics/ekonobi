import { randomBytes, randomUUID } from "crypto";
import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { ApiResponseI } from "../../../helpers/interfaces";
import { UserService } from "../../../helpers/userservice";

const authOptions: NextAuthOptions = {
    // site: process.env.NEXTAUTH_URL,
    // site: process.env.NEXTAUTH_URL,
    
    session: {
        strategy: "jwt",
        // Choose how you want to save the user session.
        // The default is `"jwt"`, an encrypted JWT (JWE) stored in the session cookie.
        // If you use an `adapter` however, we default it to `"database"` instead.
        // You can still force a JWT session by explicitly defining `"jwt"`.
        // When using `"database"`, the session cookie will only contain a `sessionToken` value,
        // which is used to look up the session in the database.
        // strategy: "database",

        // Seconds - How long until an idle session expires and is no longer valid.
        maxAge: 30 * 24 * 60 * 60, // 30 days

        // Seconds - Throttle how frequently to write to database to extend a session.
        // Use it to limit write operations. Set to 0 to always update the database.
        // Note: This option is ignored if using JSON Web Tokens
        updateAge: 24 * 60 * 60, // 24 hours

        // The session token is usually either a random UUID or string, however if you
        // need a more customized session token string, you can define your own generate function.
        generateSessionToken: () => {
            return randomUUID?.() ?? randomBytes(32).toString("hex")
        }
    },
    providers: [
        CredentialsProvider({
            type: "credentials",
            // credentials: {},
            credentials: {},
            async authorize(credentials, req): Promise<any> {
                // 
                const modal = credentials as any;
                // perform you login logic
                // find out user from db
                
                const res = await UserService.getInstance().loginNow(modal);

                if (!res.Status) {
                    throw new Error("Email or password is wrong");
                    // alert('email or password wrong new now new ');
                }

                // if everything is fine
                return modal;
            },
        }),
    ],
    pages: {
        signIn: "/login",
        
        // error: '/auth/error',
        // signOut: '/auth/signout'
    },
    callbacks: {
        jwt(params) {
            // update token
            // if (params.user?.role!) {
            //     params.token.role = params?.user?.role;
            // }
            // return final_token
            return params.token;
        },
        async redirect(params: { url: string }) {
          const { url } = params
    
          // url is just a path, e.g.: /videos/pets
          if (!url.startsWith('http')) return url
    
          // If we have a callback use only its relative path
          const callbackUrl = new URL(url).searchParams.get('callbackUrl')
          if (!callbackUrl) return url
    
          return new URL(callbackUrl as string).pathname
        },
    }
}

export default NextAuth(authOptions);
