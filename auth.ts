import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import { write } from "./sanity/lib/Write";
import { client } from "./sanity/lib/client";
import { Get_User } from "./sanity/lib/query";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [GitHub],

  callbacks: {
    async signIn({ user, profile }) {
      if (!user || !profile) return false;

      try {
        const existingUser = await client.withConfig({useCdn:false}).fetch(Get_User, { id:profile.id });
         const random =Math.random().toString(36).substring(2, 4)
        if (!existingUser) {
          await write.create({
            _type: "author",
            id: profile.id,
            name: user.name,
            username: user.name+random,
            email: user.email,
            profilepic: user.image,
            bio: profile.bio || "",
          });
        }

        return true;
      } catch (error) {
        console.error("Error in sign");
        return false;
      }
    },

    async jwt({ token, user, account, profile }) {
      if (user && account) {  
          const signinUser = await client.withConfig({useCdn:false}).fetch(Get_User, { id:profile?.id });
          if (signinUser) {
            token.id = signinUser?._id;
          }
      
      }
      return token;
    },
    async session({ session, token }) {
      if (token?.id) {
        session.user.id = token.id; 
      } 
      return session
    },
  },
});
