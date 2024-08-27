import { getCabin, getBookedDatesByCabinId } from "@/app/lib/data-service";

// Define el manejador para las solicitudes GET
export async function GET(request, { params }) {
  // Extrae el ID de la cabaña desde los parámetros de la solicitud
  const { cabinId } = params;

  // Intenta obtener la cabaña y las fechas reservadas simultáneamente usando Promise.all
  try {
    const [cabin, bookedDates] = await Promise.all([
      getCabin(cabinId),
      getBookedDatesByCabinId(cabinId),
    ]);

    // Retorna la respuesta en formato JSON con la cabaña y las fechas reservadas
    return Response.json({ cabin, bookedDates });
    // Si ocurre un error, retorna un mensaje indicando que no se encontró la cabaña
  } catch (error) {
    return Response.json({ message: "No se encontró la cabaña" });
  }
}
