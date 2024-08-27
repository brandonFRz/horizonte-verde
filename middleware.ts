import { withAuth } from "next-auth/middleware";

//Protege las rutas para asegurarse que solo usuarios autorizados puedan acceder a rutas bajo /account
export default withAuth({
  //Si el usuario no esta autenticados sera redirigido a '/auth/signin'
  pages: {
    signIn: "/auth/signin",
  },
});

//El objeto config define qué rutas serán protegidas por el middleware
export const config = {
  //Este array contiene las rutas que estarán protegidas en este caso las que comiencen con '/account'
  matcher: ["/account/"],
};

console.log("Middleware is running...");