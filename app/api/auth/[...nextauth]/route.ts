// Importa el manejador de autenticación desde el archivo de configuración de autenticación.
import authHandler from "@/app/lib/auth";

// Define las rutas GET y POST utilizando el manejador de autenticación
export const GET = authHandler;
export const POST = authHandler;