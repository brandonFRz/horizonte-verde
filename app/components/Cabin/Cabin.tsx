import React from "react";
import TextExpander from "@/app/ui/TextExpander";
import Image from "next/image";
import { EyeSlashIcon, MapPinIcon, UsersIcon } from "@heroicons/react/24/solid";

export default function Cabin({ cabin }) {
  //Desestructuramos las propiedades del objeto cabin
  const { name, maxCapacity, image, description } = cabin;

  return (
    <div className="grid grid-cols-[3fr_4fr] gap-20 border border-primary-800 py-3 px-10 mb-24">
      {/* Contenedor para la imagen de la cabaña */}
      <div className="relative scale-[1.15] -translate-x-3">
        <Image
          src={image}
          fill
          className="object-cover"
          alt={`Cabin ${name}`}
        />
      </div>

      <div>
        <h3 className="text-accent-100 font-black text-7xl mb-5 translate-x-[-254px] bg-primary-950 p-6 pb-1 ">
          Cabaña {name}
        </h3>

        {/*Descripción de la cabaña usando un text expander para manejar el texto largo*/}
        <p className="text-lg text-primary-300 mb-10">
          <TextExpander>{description}</TextExpander>
        </p>

        {/* Lista de características de la cabaña */}
        <ul className="flex flex-col gap-4 mb-7">
          <li className="flex gap-3 items-center">
            <UsersIcon className="h-5 w-5 text-primary-600" />
            <span className="text-lg">
              Para hasta <span className="font-bold">{maxCapacity}</span>{" "}
              personas.
            </span>
          </li>
          <li className="flex gap-3 items-center">
            <MapPinIcon className="h-5 w-5 text-primary-600" />
            <span className="text-lg">
              Localizado en el centro de{" "}
              <span className="font-bold">los alpes suizos</span>
            </span>
          </li>
          <li className="flex gap-3 items-center">
            <EyeSlashIcon className="h-5 w-5 text-primary-600" />
            <span className="text-lg">
              Privacidad <span className="font-bold">100%</span> garantizada
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
}
