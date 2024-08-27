import { getBookedDatesByCabinId, getSettings } from "@/app/lib/data-service";
import { Cabins } from "@/app/types/Cabins";
import DateSelector from "./DateSelector";
import ReservationForm from "./ReservationForm";
import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/auth";
import { Session } from "@/app/types/Session";
import LoginMessage from "./LoginMessage";

///Interfaces///
interface reservationProps {
  cabin: Cabins;
}

export default async function Reservation({ cabin }: reservationProps) {
  // Obtiene la configuración general "reglas de reserva"
  const settings = await getSettings();

  // Obtiene las fechas ya reservadas para la cabaña específica usando su Id
  const bookedDates = await getBookedDatesByCabinId(cabin.id);

  // Ejecuta ambas promesas en paralelo
  Promise.all([settings, bookedDates]);

  // Obtiene la sesión actual del usuario, si está autenticado
  const session: Session = await getServerSession(authOptions);

  return (
    <div className="grid grid-cols-2 border border-primary-800 min-h-[400p]">
      {/* Componente para seleccionar las fechas de la reserva */}
      <DateSelector settings={settings} bookDates={bookedDates} cabin={cabin} />
      
      {/* Si el usuario está autenticado, muestra el formulario de reserva, sino, muestra un mensaje para iniciar sesión */}
      {session?.user ? (
        <ReservationForm cabin={cabin} user={session.user} />
      ) : (
        <LoginMessage />
      )}
    </div>
  );
}
