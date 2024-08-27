import React from "react";
import { authOptions } from "@/app/lib/auth";
import { Session } from "@/app/types/Session";
import { getServerSession } from "next-auth";


export default async function Page() {
  //obtiene la sesión del usuario actual utilizando las opciones de autenticación configuradas.
  const session: Session = await getServerSession(authOptions);
  
  //Muestra un mensaje de bienvenida al usuario utilizando las opciones de autentificación.
  return (
    <h2 className="font-semibold text-2xl text-accent-400 mb-7">
      Bienvenido, {session?.user?.name}
    </h2>
  );
}
