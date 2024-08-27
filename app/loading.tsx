import React from 'react'
import Spinner from './ui/Spinner'

//Componente de la pagina de carga 
export default function Loading() {
  return (
    <>
    {/* Renderiza el componente Spinner que indica al usuario que se esta cargando la pagina. */}
    <Spinner />
    </>
  )
}
