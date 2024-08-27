import Link from "next/link";

function NotFound() {
  //Componente para la pagina del error 404
  return (
    <main className="text-center space-y-6 mt-4">
      <h1 className="text-3xl font-semibold">
        No se pudo encontrar la pagina :
      </h1>
      <Link
        href="/"
        className="inline-block bg-accent-500 text-primary-800 px-6 py-3 text-lg"
      >
        Inicio
      </Link>
    </main>
  );
}

export default NotFound;
