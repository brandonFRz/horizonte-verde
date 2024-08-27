import { createClient } from '@supabase/supabase-js';

// Obtén las variables de entorno para la URL y la clave anónima de Supabase
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Verifica si las variables de entorno están configuradas
if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Supabase environment variables are not set");
}

// Crea una instancia del cliente de Supabase utilizando la URL y la clave anónima
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
