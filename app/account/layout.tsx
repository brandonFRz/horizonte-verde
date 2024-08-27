import React from "react";
import SideNavigation from "../components/Account/SideNavigation";

///Interfaces///
interface LayoutProps {
  children: React.ReactNode;
}

export default function layout({ children }: LayoutProps) {
  return (
    //Contenedor principal que define un layout de dos columnas una para la navegación lateral y otra para el contenido principal
    <div className="grid grid-cols-[16rem_1fr] h-full gap-12">
      <SideNavigation />
      {children}
    </div>
  );
}
