import Header from "./components/Header/Header";
import { ReservationProvider } from "./components/Reservation/ReservationContext";
import "./styles/globals.css";

import { Josefin_Sans } from "next/font/google";

///Interfaces///
interface RootLayoutProps {
  children: React.ReactNode;
}
//Configuramos la fuente Josefin Sans con las opciones deseadas
const josefin = Josefin_Sans({
  subsets: ["latin"], // Especificamos el subconjunto de caracteres latino.
  display: "swap", // Utilizamos 'swap' para evitar un flash de texto no estilizado (FOUT).
});

// Componente RootLayout que define la estructura principal de la aplicación
export default function Rootlayout({ children }: RootLayoutProps) {
  return (
    <html lang="es">
      <body
        className={`${josefin.className} antialiased bg-primary-950 text-primary-50 min-h-screen flex flex-col`}
      >
        {/* Renderiza la cabecera de la aplicación */}
        <Header />
        <div className="flex-1 px-8 py-12">
          <main className="max-w-7xl mx-auto ">
            {/* Proveedor de contexto para gestionar las reservas, envolviendo a los componentes hijos */}
            <ReservationProvider>{children}</ReservationProvider>
          </main>
        </div>
      </body>
    </html>
  );
}
