import Image from "next/image";
import Link from "next/link";
import { UsersIcon } from "@heroicons/react/24/solid";
import { Cabins } from "@/app/types/Cabins";


///Interfaces///
interface CabinCardProps {
  cabin: Cabins;
}

//Componente que renderiza informacion importante de la cabaña ademas proporciona acceso directo a mas detalles.
export default function CabinCard({ cabin }: CabinCardProps) {
   // Desestructuración de las propiedades del objeto 'cabin' para un acceso más sencillo
  const { id, name, maxCapacity, regularPrice, discount, image } = cabin;

  return (
    <div className="flex border-primary-800 border mt-10">
      <div className="flex-auto relative">
        <Image
          src={image}
          fill
          alt={`Cabin ${name}`}
          className="object-cover border-r border-primary-800"
        />
      </div>

      <div className="flex-grow">
        <div className="pt-5 pb-4 px-7 bg-primary-950">
          <h3 className="text-accent-500 font-semibold text-2xl mb-3">
            Cabaña {name}
          </h3>

          <div className="flex gap-3 items-center mb-2">
            <UsersIcon className="h-5 w-5 text-primary-600" />
            <p className="text-lg text-primary-200">
              Para un máximo de <span className="font-bold">{maxCapacity}</span>{" "}
              invitados
            </p>
          </div>

          <p className="flex gap-3 justify-end items-baseline">
            {discount > 0 ? (
              <>
                <span className="text-3xl font-[350]">
                  ${regularPrice - discount}
                </span>
                <span className="line-through font-semibold text-primary-600">
                  ${regularPrice}
                </span>
              </>
            ) : (
              <span className="text-3xl font-[350]">${regularPrice}</span>
            )}
            <span className="text-primary-200">/ noches</span>
          </p>
        </div>

        <div className="bg-primary-950 border-t border-t-primary-800 text-right">
          <Link
            href={`/cabins/${id}`}
            className="border-l border-primary-800 py-4 px-6 inline-block hover:bg-accent-600 transition-all hover:text-primary-900"
          >
            Detalles y reserva &rarr;
          </Link>
        </div>
      </div>
    </div>
  );
}
