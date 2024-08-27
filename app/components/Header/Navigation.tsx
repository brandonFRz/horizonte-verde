import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/auth";
import { Session } from "@/app/types/Session";

//Componte que contiene links para acceso rápido a diferentes sesiones del el sitio web. 
export default async function Navigation() {
  //Busca si el usuario ya inicio sesión para así desplegar la imagen con su nombre.
  const session: Session = await getServerSession(authOptions);

  return (
    <nav className="z-10 text-xl">
      <ul className="flex gap-16 items-center">
        <li>
          <Link
            className="hover:text-accent-400 transition-colors"
            href="/cabins"
          >
            Cabañas
          </Link>
        </li>
        <li>
          <Link
            className="hover:text-accent-400 transition-colors"
            href="/about"
          >
            Acerca de nosotros
          </Link>
        </li>
        <li>
          {session?.user?.image ? (
            <Link
              className="hover:text-accent-400 transition-colors flex items-center gap-4"
              href="/account"
            >
              <img
                className="h-8 rounded-full "
                src={session.user.image}
                alt={session.user.name}
                 referrerPolicy="no-referrer"/>
              <span >{session.user.name}</span>
            </Link>
          ) : (
            <Link
              className="hover:text-accent-400 transition-colors"
              href="/account"
            >
              Tu Cuenta
            </Link>
          )}
        </li>
      </ul>
    </nav>
  );
}
