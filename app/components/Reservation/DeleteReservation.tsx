'use client'

import { TrashIcon } from '@heroicons/react/24/solid'
import { useTransition } from 'react'
import SpinnerMini from '@/app/ui/SpinnerMini'

interface DeleteReservationProps {
	bookingId: number
	onDelete?: (bookingId: number) => void
}

function DeleteReservation({ bookingId, onDelete }: DeleteReservationProps) {
	// `useTransition` para manejar transiciones pendientes de manera optimista
	const [isPending, startTransition] = useTransition()

	// Manejar la eliminación de la reservación
	function handleDelete() {
		if (confirm('¿Estás seguro de que deseas borrar esta reservación?'))
			startTransition(() => onDelete(bookingId))
	}

	return (
		<button
			onClick={handleDelete}
			className="group flex flex-grow items-center gap-2 px-3 text-xs font-bold uppercase text-primary-300 transition-colors hover:bg-accent-600 hover:text-primary-900"
		>
			{!isPending ? (
				<>
					<TrashIcon className="h-5 w-5 text-primary-600 transition-colors group-hover:text-primary-800" />
					<span className="mt-1">Borrar</span>
				</>
			) : (
				<span className="mx-auto">
					<SpinnerMini />
				</span>
			)}
		</button>
	)
}
export default DeleteReservation
