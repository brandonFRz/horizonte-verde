import React from 'react'
import { getServerSession } from 'next-auth'
import { Session } from '@/app/types/Session'
import { authOptions } from '@/app/lib/auth'
import { Booking } from '@/app/types/Bookings'
import { getBookings } from '@/app/lib/data-service'
import ReservationList from '@/app/components/Reservation/ReservationList'

export const metadata = {
	title: "Reservaciones",
  };

//Esta pagina asegura que los usuarios puedan visualizar y gestionar sus reservaciones
export default async function Page() {
	// Obtiene la sesión actual del usuario.
	const session: Session | null = await getServerSession(authOptions)

	//Si no hay una sesión activa muestra un mensaje pidiendo que se inicie sesión.
	if (!session) {
		return (
			<div>
				<h2 className="mb-7 text-2xl font-semibold text-accent-400">Tu reservaciones</h2>
				<p className="text-lg">Por favor, inicie sesión para ver sus reservaciones.</p>
			</div>
		)
	}

	//Obtiene las reservaciones del usuario usando el guestId
	const bookings: Booking[] = await getBookings(session.user.guestId)

	return (
		<div>
			<h2 className="mb-7 text-2xl font-semibold text-accent-400">Tu reservaciones</h2>
			{/* Si no hay reservaciones muestra un mensaje invitando al usuario a seguir explorando las cabañas disponibles */}
			{bookings.length === 0 ? (
				<p className="text-lg">
					No tienes reservaciones aun, compruebe nuestras{' '}
					<a className="text-accent-500 underline" href="/cabins">
						lujosas cabinas
					</a>
				</p>
			) : (
				//Si hay reservaciones muestra una lista de reservaciones usando el componente ReservationList
				<ReservationList bookings={bookings} />
			)}
		</div>
	)
}
