"use client";

import {
  differenceInDays,
  isPast,
  isSameDay,
  isWithinInterval,
} from "date-fns";
import { DateRange, DayPicker } from "react-day-picker";
import { Cabins } from "@/app/types/Cabins";
import { Settings } from "@/app/types/Settings";
import "react-day-picker/dist/style.css";
import { es } from "date-fns/locale";
import { useReservation } from "./ReservationContext";

///Interfaces///
interface dateSelectorProps {
  settings: Settings;
  bookDates: Date[];
  cabin: Cabins;
}

//Función auxiliar par verificar si el rango de fechas ya se encuentra reservado.
function isAlreadyBooked(
  range: { from: Date | null; to: Date | null },
  datesArr: Date[]
): boolean {
  return (
    range.from &&
    range.to &&
    datesArr.some((date) =>
      isWithinInterval(date, { start: range.from, end: range.to })
    )
  );
}

function DateSelector({ settings, bookDates, cabin }: dateSelectorProps) {
  //Obtener valores y funciones del contexto de reserva.
  const { range, setRange, restartRange } = useReservation();

  //// Verifica si el rango seleccionado ya está reservado
  const isBooked = isAlreadyBooked(range, bookDates);
  //Si ya está reservado, se muestra un rango vacío, si no se muestra el rango seleccionado
  const displayRange = isBooked ? { from: null, to: null } : range;

  //Extrae el precio regular y el descuento de la cabaña.
  const { regularPrice, discount } = cabin;
  // Calcular el número de noches basado en el rango de fechas seleccionado.
  const numNights = differenceInDays(displayRange.to, displayRange.from);
  // Calcular el precio total de la estancia
  const cabinPrice = numNights * (regularPrice - discount);

  // Extraer las configuraciones de la reserva
  const { minBookingLength, maxBookingLength } = settings;

  // Manejar la selección de fechas en el calendario
  const handleSelect = (range: DateRange | undefined) => {
    if (range) {
      setRange({ from: range.from, to: range.to });
    } else {
      setRange({ from: null, to: null });
    }
  };

  return (
    <div className="flex flex-col justify-between">
      {/* Componente de selección de fechas (calendario) */}
      <DayPicker
        className="place-self-center pt-16"
        mode="range"
        onSelect={handleSelect}
        selected={displayRange}
        min={minBookingLength}
        max={maxBookingLength}
        fromMonth={new Date()}
        fromDate={new Date()}
        toYear={new Date().getFullYear() + 5}
        captionLayout="dropdown"
        numberOfMonths={2}
        locale={es}
        disabled={(curDate) =>
          isPast(curDate) || bookDates.some((date) => isSameDay(date, curDate))
        }
      />

      {/* Muestra el precio y detalles de la reserva */}
      <div className="flex h-[72px] items-center justify-between bg-accent-500 px-8 text-primary-800">
        <div className="flex items-baseline gap-6">
          <p className="flex items-baseline gap-2">
            {discount > 0 ? (
              <>
                <span className="text-2xl">${regularPrice - discount}</span>
                <span className="font-semibold text-primary-700 line-through">
                  ${regularPrice}
                </span>
              </>
            ) : (
              <span className="text-2xl">${regularPrice}</span>
            )}
            <span className="">/noches</span>
          </p>

          {/* Muestra el número de noches y el total si se ha seleccionado un rango */}
          {numNights ? (
            <>
              <p className="bg-accent-600 px-3 py-2 text-2xl">
                <span>&times;</span> <span>{numNights}</span>
              </p>
              <p>
                <span className="text-lg font-bold uppercase">Total</span>{" "}
                <span className="text-2xl font-semibold">${cabinPrice}</span>
              </p>
            </>
          ) : null}
        </div>

		{/* Botón para reiniciar la selección de fechas */}
        {range.from || range.to ? (
          <button
            className="border border-primary-800 px-4 py-2 text-sm font-semibold"
            onClick={restartRange}
          >
            Reiniciar
          </button>
        ) : null}
      </div>
    </div>
  );
}

export default DateSelector;
