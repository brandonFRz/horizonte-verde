"use client";

import { XMarkIcon } from "@heroicons/react/24/solid";
import { format } from "date-fns";
import { useReservation } from "./ReservationContext";

function ReservationReminder() {
  // Desestructura los valores 'range' y 'restartRange' del contexto de reservas
  const { range, restartRange } = useReservation();

  // Si 'range.from' o 'range.to' no están definidos, no se muestra el recordatorio
  if (!range.from || !range.to) return null;

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 py-5 px-8 rounded-full bg-accent-500 text-primary-800 text  font-semibold shadow-xl shadow-slate-900 flex gap-8 items-center">
      <p>
        <span>👋</span> No olvides confirmar tu reservar antes
        <br /> de {format(new Date(range.from), "MMM dd yyyy")} a{" "}
        {format(new Date(range.to), "MMM dd yyyy")}
      </p>
      <button
        onClick={restartRange}
        className="rounded-full p-1 hover:bg-accent-600 transition-all"
      >
        <XMarkIcon className="h-5 w-5" />
      </button>
    </div>
  );
}

export default ReservationReminder;
