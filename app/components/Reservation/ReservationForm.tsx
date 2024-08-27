"use client";
import React from "react";
import { useReservation } from "./ReservationContext";
import { Cabins } from "@/app/types/Cabins";
import { Session } from "@/app/types/Session";
import { differenceInDays } from "date-fns";
import { createReservation } from "../../lib/actions";
import Button from "../../ui/UpdateReservationButton";

///Interfaces///
interface ReservationFormProps {
  cabin: Cabins;
  user: Session["user"];
}

function ReservationForm({ cabin, user }: ReservationFormProps) {
  //Extrae los valores y funciones del contexto de reserva.
  const { maxCapacity, regularPrice, discount } = cabin;
  const { range } = useReservation();

  //Obtén las fechas del inicio y fin de la reserva.
  const startDate = range.from;
  const endDate = range.to;

  //Calcula el numero de noche y el precio total de la estancia.
  const numNights = differenceInDays(endDate, startDate);
  const cabinPrice = regularPrice - discount;
  const totalPrice = cabinPrice * numNights;

  //Prepara los datos de la reserva
  const bookingData = {
    cabinId: cabin.id,
    startDate,
    endDate,
    numNights,
    cabinPrice,
    totalPrice,
  };

  //Función que crea la reserva con los datos proporcionados.
  const createReservationWithData = createReservation.bind(null, bookingData);

  return (
    <div className="scale-[1.01]">
      {/* Información del usuario */}
      <div className="flex items-center justify-between bg-primary-800 px-16 py-2 text-primary-300">
        <p>Registrado como</p>
        <div className="flex items-center gap-4">
          <img
            // Importante para mostrar las imágenes de perfil de Google
            referrerPolicy="no-referrer"
            className="h-8 rounded-full"
            src={user.image}
            alt={user.name}
          />
          <p>{user.name}</p>
        </div>
      </div>

      {/* Formulario de reserva */}
      <form
        action={createReservationWithData}
        className="flex flex-col gap-5 bg-primary-900 px-16 py-10 text-lg"
      >
        {/* Selección del numero de huéspedes */}
        <div className="space-y-2">
          <label htmlFor="numGuests">Cuántos huéspedes?</label>
          {/* Genera las opciones para seleccionar el número de huéspedes */}
          <select
            name="numGuests"
            id="numGuests"
            className="w-full rounded-sm bg-primary-200 px-5 py-3 text-primary-800 shadow-sm"
            required
          >
            <option value="" key="">
              Seleccione el número de huéspedes...
            </option>
            {Array.from({ length: maxCapacity }, (_, i) => i + 1).map((x) => (
              <option value={x} key={x}>
                {x} {x === 1 ? "huesped" : "huéspedes"}
              </option>
            ))}
          </select>
        </div>

        {/* Campo para observaciones adicionales */}
        <div className="space-y-2">
          <label htmlFor="observations">
            Cualquier cosa que debamos saber sobre su estancia?
          </label>
          <textarea
            name="observations"
            id="observations"
            className="w-full rounded-sm bg-primary-200 px-5 py-3 text-primary-800 shadow-sm"
            placeholder="¿Tiene animales domésticos, alergias, necesidades especiales, etc.?"
          />
        </div>

        {/* Botón de reserva */}
        <div className="flex items-center justify-end gap-6">
          {/* Verifica si se han seleccionado las fechas */}
          {!(startDate && endDate) ? (
            <p className="text-base text-primary-300">
              Comience por seleccionar las fechas
            </p>
          ) : (
            <Button>Reserve ahora</Button>
          )}
        </div>
      </form>
    </div>
  );
}

export default ReservationForm;
