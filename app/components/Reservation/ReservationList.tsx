'use client'

import ReservationCard from './ReservationCard'
import { deleteReservation } from '@/app/lib/actions'
import React, { useOptimistic } from 'react'
import { Booking } from '@/app/types/Bookings' 

interface ReservationListProps {
	bookings: Booking[]
}

export default function ReservationList({ bookings }: ReservationListProps) {
    //Utiliza el hook `useOptimistic` para manejar el estado optimista
	const [optimisticBookings, optimisticDelete] = useOptimistic(bookings, (currentBookings, bookingId) => {
        // Filtra las reservas actuales para eliminar la que coincida con el `bookingId` pasado.
		return currentBookings.filter(booking=> booking.id !== bookingId)
    })
	// Función que maneja la eliminación de una reserva
	async function handleDelete(bookingId: number) {
        optimisticDelete(bookingId)
		await deleteReservation(bookingId)
	}

	// Renderiza una lista de `ReservationCard`, pasando la función `handleDelete` a cada una.
	return (
		<ul>
			{optimisticBookings.map((booking) => (
				<li key={booking.id}>
					<ReservationCard onDelete={handleDelete} booking={booking} />
				</li>
			))}
		</ul>
	)
}
