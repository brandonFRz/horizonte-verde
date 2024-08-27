"use client";

import { createContext, useState, useContext, ReactNode } from "react";

///Interfaces///
interface ReservationState {
  from: Date | null;
  to: Date | null;
}

interface ReservationContextType {
  range: ReservationState;
  setRange: React.Dispatch<React.SetStateAction<ReservationState>>;
  restartRange: () => void;
}

interface ReservationProviderProps {
  children: ReactNode;
}

//Asigna el estado inicial donde inicia y termina la reservación a null
const initialState: ReservationState = {
  from: null,
  to: null,
};

//Crea el contexto con un valor inicial undefined.
const ReservationContext = createContext<ReservationContextType | undefined>(
  undefined
);

//El componente proveedor que mantiene y gestiona el estado de la reserva
function ReservationProvider({ children }: ReservationProviderProps) {

  //useState que maneja el rango del estado.
  const [range, setRange] = useState<ReservationState>(initialState);

  //Función que reinicia el rango a su valores iniciales.
  const restartRange = () => {
    setRange(initialState);
  };

  //Proporcionar los valores del contexto a los componentes hijos.
  return (
    <ReservationContext.Provider value={{ range, setRange, restartRange }}>
      {children}
    </ReservationContext.Provider>
  );
}

//Asegura que el Custom hook se utiliza dentro de la ReservationProvider.
function useReservation() {
  const context = useContext(ReservationContext);
  if (context === undefined) {
    throw new Error("useReservation debe de estar entre ReservationProvider");
  }
  return context;
}

export { ReservationProvider, useReservation };
