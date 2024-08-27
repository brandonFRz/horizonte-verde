import Link from "next/link";

//Componente para la pagina que se muestra una ves realizada la reserva
export default function Page() {
  return (
    <div className="text-center space-y-6 mt-4">
      <h1 className="text-3xl font-semibold">Gracias por tu reserva! 🎉</h1>
      {/* Enlace para gestionar las reservas del usuario, estilizado con subrayado y color de acento */}

      <Link
        href="/account/reservations"
        className="underline text-xl text-accent-500 inline-block"
      >
        Gestione sus reservas &rarr;
      </Link>
    </div>
  );
}
