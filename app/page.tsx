import Link from "next/link";
import Image from "next/image";
import bg from "../public/bg.png";

//Componente principal renderiza la pagina de inicio
export default function Home() {
  return (
    <main className="mt-24">
      {/* Imagen de fondo */}
      <Image
        src={bg}
        alt="Bosque con dos cabañas"
        className="object-cover object-top"
        quality={85}
        placeholder="blur"
        fill
      />

      {/* Contenedor con el contenido principal con un indice z alto para superponerlo sobre la imagen. */}
      <div className="relative z-10 text-center">
        <h1 className="text-8xl text-primary-50 mb-10 tracking-tight font-normal">
          Bienvenido
        </h1>
        <Link
          href="/cabins"
          className="bg-accent-500 px-8 py-6 text-primary-800 text-lg font-semibold hover:bg-accent-600 transition-all rounded-md"
        >
          Explora nuestras lujosas cabañas
        </Link>
      </div>
    </main>
  );
}
