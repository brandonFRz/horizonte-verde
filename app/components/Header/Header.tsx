import Navigation from "./Navigation";
import Logo from "./Logo";

import React from 'react'

//El componente Header contiene el logo del sitio y su menu de navegación.
export default function Header() {
  return (
    <header className="border-b border-primary-900 px-8 py-5" >
      <div className="flex justify-between items-center max-w-7xl mx-auto">
        <Logo />
        <Navigation />  
      </div>
    </header>
  )
}
