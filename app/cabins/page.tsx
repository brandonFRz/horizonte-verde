import React, { Suspense } from "react";
import CabinList from "../components/Cabin/CabinList";
import Spinner from "../ui/Spinner";
import Filter from "../components/Cabin/Filter";
import ReservationReminder from "../components/Reservation/ReservationReminder"

///Interfaces///
interface PageProps {
  searchParams: { capacity: string };
}

//Componente principal de la pagina de cabañas
export default function Page({ searchParams }: PageProps) {
  //Si el parámetro de capacity esta presente en la url se usa, de lo contrario , se usa 'all' por defecto.
  const filter = searchParams?.capacity ?? "all";

  return (
    <div>
      <h1 className="text-4xl mb-5 text-accent-400 font-medium">
        Nuestras Lujosas Cabañas
      </h1>
      <div className="text-primary-200 text-lg">
        <p className="mb-5">
          Bienvenido a nuestro exclusivo refugio en la naturaleza, donde la
          comodidad y la serenidad se encuentran en perfecta armonía. Nuestras
          cabañas de lujo están diseñadas para ofrecer una experiencia
          inolvidable, combinando el encanto rústico con todas las comodidades
          modernas. Cada cabaña está equipada con una cocina completa, chimenea
          acogedora, y vistas espectaculares del paisaje circundante.
        </p>
        <p className="mb-5">
          Disfruta de la privacidad y el confort de nuestras cabañas, ideales
          para escapadas románticas, vacaciones familiares o retiros tranquilos.
          Explora los senderos naturales, relájate en el jacuzzi privado o
          simplemente disfruta de una noche estrellada desde tu terraza. Estamos
          comprometidos a brindarte una estancia excepcional, con atención
          personalizada y servicios de alta calidad.
        </p>
        <p>
          Reserva tu estancia hoy y descubre el lugar perfecto para desconectar
          y rejuvenecer. ¡Te esperamos!
        </p>
        {/* Componente de filtro alineado a la derecha */}
        <div className="flex justify-end ">
        <Filter/>
        </div>

        {/* Componente que muestra la lista de cabañas filtradas usando un suspense para manejar la carga */}
        <Suspense fallback={<Spinner />} key={filter}>
          <CabinList filter={filter} />
          {/* Componente que muestra un recordatorio para hacer una reserva */}
          <ReservationReminder/>
        </Suspense>
      </div>
    </div>


  );
}
