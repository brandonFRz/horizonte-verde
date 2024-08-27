'use client';

import { useState } from 'react';

interface TextExpanderProps {
  children: string;
}

// Componente que maneja la expansión y contracción de texto
function TextExpander({ children }: TextExpanderProps) {
  // Estado para controlar si el texto está expandido o no.
  const [isExpanded, setIsExpanded] = useState(false);

  // Lógica para determinar qué texto se muestra en función del estado de expansión.
  const displayText = isExpanded
    ? children // Si está expandido, muestra todo el texto.
    : children.split(' ').slice(0, 40).join(' ') + '...';// Si no está expandido, muestra solo las primeras 40 palabras seguidas de '...'.

  return (
    <span>
      {displayText}{' '}  {/* Muestra el texto según el estado */}
      <button
        className='text-primary-700 border-b border-primary-700 leading-3 pb-1'
        onClick={() => setIsExpanded(!isExpanded)} // Al hacer clic, alterna entre expandido y contraído.
      >
        {isExpanded ? 'Mostrar menos' : 'Mostrar más'} {/* Cambia el texto del botón según el estado */}
      </button>
    </span>
  );
}

export default TextExpander;
