"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Button from "@/app/ui/FilterButton"

export default function Filter() {
  const pathname = usePathname(); // Obtiene la ruta actual sin los parámetros de búsqueda
  const searchParams = useSearchParams(); // Obtiene los parámetros de búsqueda de la URL
  const router = useRouter(); // Proporciona acceso al enrutador de Next.js

  // Obtiene el filtro activo de los parámetros de búsqueda, por defecto "all"
  const activeFilter = searchParams.get("capacity") ?? "all";

  // Función para manejar el cambio de filtro
  function handleFilter(filter: string) {
    const params = new URLSearchParams(searchParams); // Crea un objeto URLSearchParams a partir de los parámetros de búsqueda actuales
    params.set("capacity", filter); // Actualiza el parámetro "capacity" con el nuevo valor
    router.replace(`${pathname}?${params.toString()}`, { scroll: false }); // Actualiza la URL sin recargar la página y sin desplazar la vista al inicio.
  }

  return (
    <div className="border border-primary-800 flex mt-10">
      <Button
        filter="all"
        handleFilter={handleFilter}
        activeFilter={activeFilter}
      >
        Todas las cabinas
      </Button>
      <Button
        filter="small"
        handleFilter={handleFilter}
        activeFilter={activeFilter}
      >
        De 1 a 3 personas
      </Button>
      <Button
        filter="medium"
        handleFilter={handleFilter}
        activeFilter={activeFilter}
      >
        De 4 a 7 personas
      </Button>
      <Button
        filter="large"
        handleFilter={handleFilter}
        activeFilter={activeFilter}
      >
        De 8 a 12 personas
      </Button>
    </div>
  );
}

