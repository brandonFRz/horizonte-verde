import { notFound } from 'next/navigation'
import { eachDayOfInterval } from 'date-fns'
import { supabase } from './supabase'
import { Booking } from '../types/Bookings'
import { Cabins } from '../types/Cabins'
import { Guest } from '../types/Guest'
import { Settings } from '../types/Settings'

/////////////
// GET
//

// Obtener todas las cabañas que se encuentran en la base de datos.
export const getCabins = async function (): Promise<Cabins[]> {
	const { data, error } = await supabase
		.from('cabins')
		.select('id, name, maxCapacity, regularPrice, discount, description, image')
		.order('name')
	
	if (error) {
		console.error(error)
		throw new Error('Cabins could not be loaded')
	}
	
	// Retornar los datos como un array de cabañas.
	return data as Cabins[]
}

// Obtén una sola cabaña por su id de la base de datos.
export async function getCabin(id: number): Promise<Cabins> {
	const { data, error } = await supabase.from('cabins').select('*').eq('id', id).single()

	if (error) {
		console.error(error)
		notFound()
	}

	return data as Cabins
}

// Obtén el usuario por su email de la base de datos.
export async function getGuest(email: string): Promise<Guest | null> {
	const { data, error } = await supabase.from('guests').select('*').eq('email', email).single()

	if (error) {
		console.error('Error fetching guest:', error)
		return null // Asegúrate de devolver null en caso de error.
	}
	return data as Guest
}

// Obtener una reservación por su id de la base de datos.
export async function getBooking(id: number): Promise<Booking> {
	const { data, error, count } = await supabase
	  .from("bookings")
	  .select("*")
	  .eq("id", id)
	  .single();
  
	if (error) {
	  console.error(error);
	  throw new Error("Booking could not get loaded");
	}
  
	return data as Booking;
}
  
// Obtener todas las reservaciones de un usuario.
export async function getBookings(guestId: number): Promise<Booking[]> {
	const { data, error } = await supabase
		.from('bookings')
		.select(
			`
      id,
      created_at,
      startDate,
      endDate,
      numNights,
      numGuest,
      totalPrice,
      guestId,
      cabinId,
      status,
      hasBreakfast,
      isPaid,
      observations,
      cabins(name, image)
    `
		)
		.eq('guestId', guestId)
		.order('startDate')

	if (error) {
		console.error(error)
		throw new Error(error.message)
	}

	return data.map((booking: any) => ({
		...booking,
		cabins: booking.cabins ? booking.cabins : null
	})) as Booking[]
}

// Obtener las fechas reservadas de una cabaña por su id.
export async function getBookedDatesByCabinId(cabinId: string): Promise<Date[]> {
	let today = new Date()
	today.setUTCHours(0, 0, 0, 0) // Configurar la hora de hoy a UTC
	const todayStr = today.toISOString()

	const { data, error } = await supabase
		.from('bookings')
		.select('*')
		.eq('cabinId', cabinId)
		.or(`startDate.gte.${todayStr},status.eq.checked-in`)

	if (error) {
		console.error(error)
		throw new Error('Bookings could not get loaded')
	}

	const bookedDates = data
		.map((booking: Booking) => {
			return eachDayOfInterval({
				start: new Date(booking.startDate),
				end: new Date(booking.endDate)
			})
		})
		.flat()

	return bookedDates
}

//  Obtener la configuración
export async function getSettings(): Promise<Settings> {
	const { data, error } = await supabase.from('settings').select('*').single()

	if (error) {
		console.error(error)
		throw new Error('No se pudieron cargar las configuraciones')
	}
	return data as Settings
}

// Obtener todos los países con sus banderas
export async function getCountries(): Promise<any[]> {
	try {
		const res = await fetch('https://restcountries.com/v2/all?fields=name,flag')
		const countries = await res.json()
		return countries
	} catch {
		throw new Error('Could not fetch countries')
	}
}


/////////////
// UPDATE


// Actualizar el perfil de usuario.
export async function updateGuestProfile(email: string, updateData: any): Promise<void> {
	const { error } = await supabase.from('guests').update(updateData).eq('email', email)
	if (error) {
		throw new Error('Error actualizando el perfil: ' + error.message)
	}
}


// Actualizar una reservación
export async function updateBooking(bookingId: number, updateData: any): Promise<void> {
	const { error } = await supabase.from('bookings').update(updateData).eq('id', bookingId).single()
	if (error) {
		throw new Error('Booking could not be updated: ' + error.message)
	}
}

/////////////
// CREATE

// Crear un nuevo usuario
export async function createGuest(newGuest: any): Promise<Guest[]> {
	const { data, error } = await supabase.from('guests').insert([newGuest])

	if (error) {
		console.error(error)
		throw new Error('Guest could not be created')
	}

	return data as Guest[]
}



// Crear una nueva reservación
export async function createBooking(newBooking: any): Promise<void> {
	const { error } = await supabase.from('bookings').insert([newBooking])
	if (error) {
		throw new Error('Error al crear la reservación: ' + error.message)
	}
}


/////////////
// DELETE

// Borrar una reservación
export async function deleteBooking(bookingId: number): Promise<void> {
	const { error } = await supabase.from('bookings').delete().eq('id', bookingId)
	if (error) {
		throw new Error('Error al borrar la reservación: ' + error.message)
	}
}


