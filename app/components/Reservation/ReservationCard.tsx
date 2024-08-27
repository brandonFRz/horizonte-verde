import { PencilSquareIcon } from "@heroicons/react/24/solid";
import { format, formatDistance, isPast, isToday, parseISO } from "date-fns";
import { es } from "date-fns/locale";
import { Booking } from "../../types/Bookings";
import DeleteReservation from "./DeleteReservation";
import Image from "next/image";
import Link from "next/link";

///interfaces///
interface ReservationCardProps {
  booking: Booking;
  onDelete?: (bookingId: number) => void;
}

// Función para formatear la distancia de tiempo desde la fecha actual
export const formatDistanceFromNow = (dateStr: string): string =>
  formatDistance(parseISO(dateStr), new Date(), {
    addSuffix: true,
    locale: es,
  }).replace("about ", "");

function ReservationCard({ booking, onDelete }: ReservationCardProps) {
  //Destructuracion del objeto booking
  const {
    id,
    guestId,
    startDate,
    endDate,
    numNights,
    totalPrice,
    numGuest,
    status,
    created_at,
    cabins,
  } = booking;

  // Nombre e imagen de la cabaña con valores predeterminados en caso de que falten
  const cabinName = cabins?.name ?? "No se encontró el nombre de la cabaña";
  const cabinImage = cabins?.image ?? "/path/to/default-image.jpg";

  //Renderiza las cabañas que allá reservado el usuario.
  return (
    <div className="flex border border-primary-800">
      <div className="relative aspect-square h-32">
        <Image
          src={cabinImage}
          alt={`Cabin ${cabinName}`}
          fill
          className="border-r border-primary-800 object-cover"
        />
      </div>

      <div className="flex flex-grow flex-col px-6 py-3">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-semibold">
            {numNights} noches en la cabaña {cabinName}
          </h3>
          {isPast(new Date(startDate)) ? (
            <span className="flex h-7 items-center rounded-sm bg-yellow-800 px-3 text-xs font-bold uppercase text-yellow-200">
              ANTIGUO
            </span>
          ) : (
            <span className="flex h-7 items-center rounded-sm bg-green-800 px-3 text-xs font-bold uppercase text-green-200">
              EN RESERVA
            </span>
          )}
        </div>

        <p className="text-lg text-primary-300">
          {format(new Date(startDate), "EEE, MMM dd yyyy", { locale: es })} (
          {isToday(new Date(startDate))
            ? "Today"
            : formatDistanceFromNow(startDate)}
          ) &mdash;{" "}
          {format(new Date(endDate), "EEE, MMM dd yyyy", { locale: es })}
        </p>

        <div className="mt-auto flex items-baseline gap-5">
          <p className="text-xl font-semibold text-accent-400">${totalPrice}</p>
          <p className="text-primary-300">&bull;</p>
          <p className="text-lg text-primary-300">
            {numGuest} huesped{numGuest > 1 && "es"}
          </p>
          <p className="ml-auto text-sm text-primary-400">
            Reservado en{" "}
            {format(new Date(created_at), "EEE, MMM dd yyyy, p", {
              locale: es,
            })}
          </p>
        </div>
      </div>

      <div className="flex w-[100px] flex-col border-l border-primary-800">
        {!isPast(startDate) ? (
          <>
            <Link
              href={`/account/reservations/edit/${id}`}
              className="group flex flex-grow items-center gap-2 border-b border-primary-800 px-3 text-xs font-bold uppercase text-primary-300 transition-colors hover:bg-accent-600 hover:text-primary-900"
            >
              <PencilSquareIcon className="h-5 w-5 text-primary-600 transition-colors group-hover:text-primary-800" />
              <span className="mt-1">Editar</span>
            </Link>
            <DeleteReservation onDelete={onDelete} bookingId={id} />
          </>
        ) : null}
      </div>
    </div>
  );
}

export default ReservationCard;
