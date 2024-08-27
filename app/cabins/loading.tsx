import React from "react";
import Spinner from "../ui/Spinner";

//Componente de la pagina de carga con respecto a las cabañas
export default function Loading() {
  return (
    <div className="grid items-center justify-center">
      <p className="text-xl text-primary-200">
        Cargando la información de las cabañas...
      </p>
      <Spinner />
    </div>
  );
}
