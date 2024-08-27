
import { updateBookingAction } from '@/app/lib/actions'
import { getBooking, getCabin } from '@/app/lib/data-service'
import { Booking } from '@/app/types/Bookings'
import Button from '@/app/ui/UpdateReservationButton'

///Interfaces///
interface Params {
	reservationId: number
}

//Esta pagina te permite el editar tus reservaciones y actualizarlas de manera efectiva.
export default async function Page({ params }: { params: Params }) {
	//Obtienes la reservación usando el id de la reservación
	const booking: Booking = await getBooking(params.reservationId)
	const { numGuest, observations } = booking
	//Obtienes la capacidad de la cabaña que se usa para limitar el numero de huéspedes.
	const { maxCapacity } = await getCabin(booking.cabinId)
	const { reservationId } = params

	return (
		<div>
			<h2 className="mb-7 text-2xl font-semibold text-accent-400">
				Editar su Reservación #{reservationId}
			</h2>
			{/* Formulario para actualizar la reservación que se envía al servidor usando updateBookingAction*/}
			<form
				action={updateBookingAction}
				className="flex flex-col gap-6 bg-primary-900 px-12 py-8 text-lg"
			>
				{/* Un campo de entrada oculto que envía el reservationId cuando se envía el formulario.*/}
				<input type="hidden" value={reservationId} name="bookingId" />
				<div className="space-y-2">
					<label htmlFor="numGuests">¿Cuantos huéspedes planean hospedarse?</label>
					{/* Un menú desplegable para seleccionar el número de huéspedes */}
					<select
						name="numGuests"
						id="numGuests"
						defaultValue={numGuest}
						className="w-full rounded-sm bg-primary-200 px-5 py-3 text-primary-800 shadow-sm"
						required
					>
						{/* Cada opción en el desplegable representa un posible número de huéspedes */}
						<option value="" key="">
							Selecciona el numero de huéspedes...
						</option>
						{/* Genera un array de números del 1 al maxCapacity de la cabaña. */}
						{Array.from({ length: maxCapacity }, (_, i) => i + 1).map((x) => (
							<option value={x} key={x}>
								{x} {x === 1 ? 'huésped' : 'huéspedes'}
							</option>
						))}
					</select>
				</div>
				{/* Un área de texto donde el usuario puede agregar observaciones o solicitudes especiales. */}
				<div className="space-y-2">
					<label htmlFor="observations">¿Alguna cosa que debamos saber antes de tu llegada?</label>
					<textarea
						name="observations"
						className="w-full rounded-sm bg-primary-200 px-5 py-3 text-primary-800 shadow-sm"
						defaultValue={observations}
					/>
				</div>
				<div className="flex items-center justify-end gap-6">
					<Button>Actualiza su reservación</Button>
				</div>
			</form>
		</div>
	)
}

