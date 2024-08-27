'use client'

import React from "react";

//Componente de la pagina de error
export default function Error({error, reset}) {
  return (
    <main className="flex justify-center items-center flex-col gap-6">
      <h1 className="text-3xl font-semibold">Hubo un error!</h1>
      <p className="text-lg">ERROR!</p>

      {/* Botón que permite al usuario intentar nuevamente la acción que causó el error. */}
      <button onClick={reset} className="inline-block bg-accent-500 text-primary-800 px-6 py-3 text-lg">
        Intenta de nuevo
      </button>
    </main>
  );
}
