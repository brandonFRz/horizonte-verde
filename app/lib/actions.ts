"use server";

import { supabase } from "./supabase";
import { getServerSession } from "next-auth";
import { Session } from "@/app/types/Session";
import { authOptions } from "@/app/lib/auth";
import { revalidatePath } from "next/cache";
import {
  getBookings,
  createBooking,
  updateBooking,
  deleteBooking,
} from "./data-service";
import { redirect } from "next/navigation";
import { Booking } from "../types/Bookings";

// Actualizar el perfil del usuario
export async function updateProfile(formData: FormData): Promise<void> {
  //Obtener la sesión de usuario actual
  const session = (await getServerSession(authOptions)) as Session;
  if (!session) {
    throw new Error("No hay una sesión activa");
  }

  const { user } = session;
  if (!user.email) {
    throw new Error("No se ha encontrado el email del usuario en la sesión");
  }

  // Extraer datos del formulario
  const nationalID = formData.get("nationalID");
  const [nationality, countryFlag] = (
    formData.get("nationality") as string
  ).split("%");

  //Valida el DNI Nacional
  if (!/^[\w\s]{6,12}$/.test(nationalID as string)) {
    throw new Error("Por favor, introduce un DNI válido");
  }

  // Preparar los datos para actualizar el perfil
  const updateData = {
    nationality,
    countryFlag,
    nationalID,
  };

  // Actualizar perfil en Supabase
  const { error } = await supabase
    .from("guests")
    .update(updateData)
    .eq("email", user.email);

  if (error) throw new Error("Error actualizando el perfil: " + error.message);

  // Revalidar el caché de la ruta específica
  revalidatePath(`/profile/${user.guestId}`);
}

// Crear una nueva reservación
export async function createReservation(
  bookingData: Booking,
  formData: FormData
): Promise<void> {
  const session = (await getServerSession(authOptions)) as Session;
  if (!session) throw new Error("No hay una sesión activa");

  const guestId = session.user.guestId;

  //Crea un nuevo objeto con los datos de la reserva.
  const newBooking = {
    ...bookingData,
    numGuest: Number(formData.get("numGuests")),
    observations: formData.get("observations").slice(0, 500),
    totalPrice: bookingData.totalPrice,
    isPaid: false,
    hasBreakfast: false,
    status: "pending",
    guestId,
  };
  //Guarda los datos en la base de datos.
  await createBooking(newBooking);

  // Revalidar la ruta de reservaciones del usuario
  revalidatePath(`/account/reservations`);
  redirect(`/cabins/thankyou`);
}

// Borrar una reservación
export async function deleteReservation(bookingId: number): Promise<void> {
  const session = (await getServerSession(authOptions)) as Session;
  if (!session) throw new Error("No hay una sesión activa");

  //Obtén la reservas asociada con el usuario actual.
  const guestBooking = await getBookings(session.user.guestId);
  const guestBookingIds = guestBooking.map((booking) => booking.id);

  //Comprueba si el usuario tiene permiso para borrar las reservaciones.
  if (!guestBookingIds.includes(bookingId)) {
    throw new Error("No tienes permiso para borrar esta reservación");
  }

  //Elimina las reservas de la base de datos.
  await deleteBooking(bookingId);

  // Revalidar la ruta de reservaciones del usuario
  revalidatePath(`/account/reservations`);
}

// Actualizar una reservación
export async function updateBookingAction(formData): Promise<void> {
  const session = (await getServerSession(authOptions)) as Session;
  const bookingId = Number(formData.get("bookingId"));

  // Autenticar al usuario
  if (!session) throw new Error("No hay una sesión activa");

  // Verificar que el usuario tenga permisos para actualizar.
  const guestBooking = await getBookings(session.user.guestId);
  const guestBookingIds = guestBooking.map((booking) => booking.id);

  if (!guestBookingIds.includes(bookingId)) {
    throw new Error("No tienes permiso para actualizar esta reservación");
  }

  // Actualizar la reservación
  const updateData = {
    numGuest: Number(formData.get("numGuests")),
    observations: formData.get("observations").slice(0, 500),
  };

  await updateBooking(bookingId, updateData);

  // Revalidar el caché y redirigir al usuario
  revalidatePath("/account/reservations");
  revalidatePath(`/account/reservations/edit/${bookingId}`);
  redirect(`/account/reservations`);
}
