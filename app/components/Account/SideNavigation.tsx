"use client";

import React from "react";
import Link from "next/link";
import {
  CalendarDaysIcon,
  HomeIcon,
  UserIcon,
} from "@heroicons/react/24/solid";
import SignOutButton from "../../ui/SignOutButton";
import { usePathname } from "next/navigation";


///Intefaces///
interface NavLink {
  name: string;
  href: string;
  icon: JSX.Element;
}

//Array con los enlaces de navegación e iconos asociados.
const navLinks: NavLink[] = [
  {
    name: "Home",
    href: "/account",
    icon: <HomeIcon className="h-5 w-5 text-primary-600" />,
  },
  {
    name: "Reservaciones",
    href: "/account/reservations",
    icon: <CalendarDaysIcon className="h-5 w-5 text-primary-600" />,
  },
  {
    name: "Perfil de usuario",
    href: "/account/profile",
    icon: <UserIcon className="h-5 w-5 text-primary-600" />,
  },
];

function SideNavigation(): JSX.Element {
  //Obtiene la ruta actual de la pagina.
  const pathName = usePathname();

  return (
    <nav className="border-r border-primary-900">
      <ul className="flex flex-col gap-2 h-full text-lg">
        {/* Mapeo de los enlaces de navegación */}
        {navLinks.map((link) => (
          <li key={link.name}>
            <Link
              className={`py-3 px-5 hover:bg-primary-900 hover:text-primary-100 transition-colors flex items-center gap-4 font-semibold text-primary-200 ${pathName === link.href ? "bg-primary-900 text-primary-100" : "" }`}
              href={link.href}
            >
              {link.icon}
              <span>{link.name}</span>
            </Link>
          </li>
        ))}

        {/* Botón para cerrar session ubicado al final de la lista */}
        <li className="mt-auto">
          <SignOutButton />
        </li>
      </ul>
    </nav>
  );
}

export default SideNavigation;
