import React from "react";
import CabinCard from "./CabinCard";
import { getCabins } from "../../lib/data-service";
import { Cabins } from "@/app/types/Cabins";

///Interfaces///
interface CabinListProps {
  filter: string; //valor que determina cual cabaña desplegar.
}

//Este componente muestra una lista con las cabañas que hay según su capacidad.
export default async function CabinList({ filter }: CabinListProps) {
  //Busca la lista de cabañas 
  const cabins: Cabins[] = await getCabins();

  if (cabins.length === 0) {
    return <div>No hay cabañas disponibles</div>;
  }

  //Variable donde se guardan las cabañas desplegadas según el filtro.
  let displayCabins;

  switch (filter) {
    case "all":
      displayCabins = cabins;
      break;
    case "small":
      displayCabins = cabins.filter((cabin) => cabin.maxCapacity <= 2);
      break;
    case "medium":
      displayCabins = cabins.filter(
        (cabin) => cabin.maxCapacity >= 4 && cabin.maxCapacity <= 7
      );
      break;
    case "large":
      displayCabins = cabins.filter((cabin) => cabin.maxCapacity >= 8);
      break;
    default:
      displayCabins = cabins
    }

  return (
    <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 xl:gap-14">
      {displayCabins.map((cabin) => (
        <CabinCard cabin={cabin} key={cabin.id} />
      ))}
    </div>
  );
}
