import Cabin from "@/app/components/Cabin/Cabin";
import Reservation from "@/app/components/Reservation/Reservation";
import Spinner from "@/app/ui/Spinner";
import { getCabin, getCabins } from "@/app/lib/data-service";
import { Cabins } from "@/app/types/Cabins";
import { Suspense } from "react";


///Interfaces///
interface Params {
  params: {
    cabinId: number;
  };
}

//Función qe genera los parámetros estáticos para la generación de rutas dinámicas.
export async function generateStaticParams() {
  const cabins: Cabins[] = await getCabins();
  
  const ids = cabins.map((cabin) => ({
    cabinId: String(cabin.id),
  }));
  
  return ids;
}

// Función para generar los metadatos dinámicos, incluyendo el título de la página.
export async function generateMetadata({ params }: Params) {
  const cabin: Cabins = await getCabin(params.cabinId);
  return {
    title: `Cabaña ${cabin.name}`,
  };
}


// Componente de la página para mostrar los detalles de una cabaña específica.
export default async function Page({ params }: Params) {

  // Obtiene los detalles de la cabaña específica usando el ID pasado en los parámetros.
  const cabin: Cabins = await getCabin(params.cabinId);

  return (
    <div>
      <Cabin cabin={cabin}/>
      <div className="font-semibold text-4xl text-center text-accent-400 mb-10">
        <h2>Reserve hoy la cabaña {cabin.name}. Page al llegar</h2>
      </div>
      <Suspense fallback={<Spinner />}>
        <Reservation cabin={cabin} />
      </Suspense>
    </div>
  );
}
