"use client";

import { ArrowRightStartOnRectangleIcon } from "@heroicons/react/24/solid";
import { signOut } from "next-auth/react";

// Función que maneja el cierre de sesión
function SignOutButton() {
  // Llama a la función signOut de next-auth, redirigiendo al usuario a la página principal ('/')
  const handleSignOut = async () => {
    await signOut({ callbackUrl: "/" });
  };

  return (
    <button
      // Botón que ejecuta la función handleSignOut cuando se hace clic
      onClick={handleSignOut}
      className="py-3 px-5 hover:bg-primary-900 hover:text-primary-100 transition-colors flex items-center gap-4 font-semibold text-primary-200 w-full"
    >
      <ArrowRightStartOnRectangleIcon className="h-5 w-5 text-primary-600" />
      <span>Cerrar sesión</span>
    </button>
  );
}

export default SignOutButton;
