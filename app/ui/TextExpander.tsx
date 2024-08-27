'use client';

import { useState } from 'react';

interface TextExpanderProps {
  children: string;
}


function TextExpander({ children }: TextExpanderProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const displayText = isExpanded
    ? children
    : children.split(' ').slice(0, 40).join(' ') + '...';

  return (
    <span>
      {displayText}{' '}
      <button
        className='text-primary-700 border-b border-primary-700 leading-3 pb-1'
        onClick={() => setIsExpanded(!isExpanded)}
      >
        {isExpanded ? 'Mostrar menos' : 'Mostrar más'}
      </button>
    </span>
  );
}

export default TextExpander;
