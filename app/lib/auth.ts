import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import { createGuest, getGuest } from "./data-service";

//Autentificación de Google
export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.AUTH_GOOGLE_ID, 
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/auth/signin",
    signOut: "/auth/signout",
  },

//Verifica si el usuario ya está en la base de datos y si no lo crea.
  callbacks: {
    async signIn({ user }) {
      try {
        const existingGuest = await getGuest(user.email);
        if (!existingGuest) {
          await createGuest({ email: user.email, fullName: user.name });
        }
        return true; // Devuelve true para permitir el inicio de sesión
      } catch (error) {
        console.error("Error al inicio de sesion:", error);
        return false;
      }
    },

    //Añade el guestId a la sesión
    async session({ session }) {
      const guest = await getGuest(session.user.email);
      session.user.guestId = guest.id;
      return session;
    },
  },
};

export default NextAuth(authOptions);
